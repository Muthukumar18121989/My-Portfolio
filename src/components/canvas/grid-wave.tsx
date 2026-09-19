"use client";

import * as React from "react";
import { createGridNoise } from "@/lib/noise";

// Interactive structural grid — the hero's visual foundation. A field of
// intersecting lines drifts on a slow simplex-noise field and distorts
// around the pointer, rendered on <canvas> (not Three.js/WebGL — a 2D
// line grid doesn't need a 3D renderer, and canvas keeps this cheap enough
// to run continuously behind page content).
//
// No source file for this was actually included in the request that asked
// for it — this is an original implementation built to the written spec
// (grid, noise drift, mouse distortion, black bg / white lines), not a
// copy-paste of a supplied component.
//
// Performance: all animation state lives in refs, never React state, so a
// running frame never triggers a re-render. The loop is cancelled on
// unmount, paused via IntersectionObserver when scrolled out of view, and
// skipped entirely under prefers-reduced-motion (a single static frame is
// drawn instead).
export interface GridWaveProps {
  className?: string;
}

const GridWave: React.FC<GridWaveProps> = ({ className = "" }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const noise2D = createGridNoise();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cellSize = 44;
    let cols = 0;
    let rows = 0;
    let rafId: number | null = null;
    let visible = true;
    let time = 0;

    const pointer = { x: -9999, y: -9999, active: false };

    const isDarkTheme = () => document.documentElement.getAttribute("data-theme") !== "light";

    function resize() {
      if (!parent || !canvas || !ctx) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Coarser grid on small viewports — fewer points to displace/draw.
      cellSize = width < 640 ? 64 : width < 1024 ? 52 : 44;
      cols = Math.ceil(width / cellSize) + 2;
      rows = Math.ceil(height / cellSize) + 2;
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }
    function handlePointerLeave() {
      pointer.active = false;
    }

    const NOISE_AMPLITUDE = 9;
    const NOISE_SPEED = 0.00018;
    const INTERACTION_RADIUS = 190;
    const INTERACTION_STRENGTH = 24;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const rgb = isDarkTheme() ? "245 245 244" : "10 10 10";
      const lineAlpha = 0.14;
      const highlightAlpha = 0.4;

      const points: { x: number; y: number }[][] = [];
      for (let iy = 0; iy <= rows; iy++) {
        const row: { x: number; y: number }[] = [];
        for (let ix = 0; ix <= cols; ix++) {
          const baseX = ix * cellSize - cellSize;
          const baseY = iy * cellSize - cellSize;
          const n = noise2D(ix * 0.14, iy * 0.14 + time * NOISE_SPEED);
          let dx = n * NOISE_AMPLITUDE;
          let dy = Math.cos(n * 3.1) * NOISE_AMPLITUDE * 0.6;

          if (pointer.active) {
            const distX = baseX - pointer.x;
            const distY = baseY - pointer.y;
            const dist = Math.sqrt(distX * distX + distY * distY);
            if (dist < INTERACTION_RADIUS) {
              const falloff = 1 - dist / INTERACTION_RADIUS;
              const angle = Math.atan2(distY, distX);
              dx += Math.cos(angle) * INTERACTION_STRENGTH * falloff;
              dy += Math.sin(angle) * INTERACTION_STRENGTH * falloff;
            }
          }

          row.push({ x: baseX + dx, y: baseY + dy });
        }
        points.push(row);
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgb(${rgb} / ${lineAlpha})`;
      for (let iy = 0; iy <= rows; iy++) {
        ctx.beginPath();
        for (let ix = 0; ix <= cols; ix++) {
          const p = points[iy][ix];
          if (ix === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let ix = 0; ix <= cols; ix++) {
        ctx.beginPath();
        for (let iy = 0; iy <= rows; iy++) {
          const p = points[iy][ix];
          if (iy === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // A faint brighter halo of intersection points near the cursor — the
      // "living design system" touch without drawing attention away from
      // the typography.
      if (pointer.active) {
        ctx.fillStyle = `rgb(${rgb} / ${highlightAlpha})`;
        for (let iy = 0; iy <= rows; iy++) {
          for (let ix = 0; ix <= cols; ix++) {
            const p = points[iy][ix];
            const dist = Math.hypot(p.x - pointer.x, p.y - pointer.y);
            if (dist < INTERACTION_RADIUS * 0.5) {
              const r = (1 - dist / (INTERACTION_RADIUS * 0.5)) * 1.6;
              if (r > 0.2) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      }
    }

    function loop() {
      if (!visible) return;
      time += 16;
      draw();
      rafId = requestAnimationFrame(loop);
    }

    resize();
    draw();

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(loop);
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerleave", handlePointerLeave);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) draw();
    });
    resizeObserver.observe(parent);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !prefersReducedMotion && rafId === null) {
          rafId = requestAnimationFrame(loop);
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />
  );
};

export { GridWave };
