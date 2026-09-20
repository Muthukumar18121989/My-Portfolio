"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/section-reveal";
import { WordReveal } from "@/components/motion/text-reveal";
import { DURATION, EASE_EDITORIAL, VIEWPORT_ONCE } from "@/lib/motion";
import type { SkillGroup } from "@/lib/content/types";

// The homepage's About section, deliberately kept to an intermission rather
// than a preview of every /about detail: no portrait, no stat blocks, no
// floating badges, no multi-paragraph bio — those stay on /about. Content
// (role, bio excerpt, skill-group taxonomy for the node diagram standing in
// for a photo) is passed down from the page, which already fetched it from
// Supabase — nothing invented, nothing fetched twice.

function AnimatedRule({ delay = 0 }: { delay?: number }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className="h-px w-full bg-border" />;
  }
  return (
    <div className="h-px w-full overflow-hidden">
      <motion.div
        className="h-px w-full bg-border"
        style={{ transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, delay, ease: EASE_EDITORIAL }}
      />
    </div>
  );
}

/** Stands in for a photo: the site's real skill-group taxonomy (Design,
    Tools, Methods, AI Tools) as a small connected node column. A gentle
    cursor-proximity brighten on the nearest node — disabled entirely under
    prefers-reduced-motion — replaces any imagery. */
function DisciplineNodes({ skillGroups }: { skillGroups: SkillGroup[] }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const nodeRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
  const shouldReduceMotion = useReducedMotion();

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const pointerY = event.clientY - containerRect.top;
    nodeRefs.current.forEach((node) => {
      if (!node) return;
      const nodeRect = node.getBoundingClientRect();
      const nodeY = nodeRect.top - containerRect.top + nodeRect.height / 2;
      const proximity = Math.max(0, 1 - Math.abs(pointerY - nodeY) / 70);
      node.style.transform = `scale(${1 + proximity})`;
      node.style.opacity = String(0.6 + proximity * 0.4);
      node.style.borderColor = proximity > 0.3 ? "var(--color-accent)" : "var(--color-fg-muted)";
      node.style.backgroundColor = proximity > 0.3 ? "var(--color-accent)" : "transparent";
    });
  }

  function handleMouseLeave() {
    nodeRefs.current.forEach((node) => {
      if (!node) return;
      node.style.transform = "scale(1)";
      node.style.opacity = "0.6";
      node.style.borderColor = "var(--color-fg-muted)";
      node.style.backgroundColor = "transparent";
    });
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col"
    >
      {skillGroups.map((group, i) => (
        <div key={group.id} className="relative flex items-center gap-4 py-3.5">
          {i > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-3.5 left-[3.5px] h-3.5 w-px bg-border"
            />
          )}
          <span
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            aria-hidden="true"
            className="size-[7px] flex-none rounded-full border border-fg-muted opacity-60 transition-[transform,opacity,background-color,border-color] duration-300 ease-out"
          />
          <span className="text-meta text-fg-muted">{group.label}</span>
        </div>
      ))}
    </div>
  );
}

function AboutCTA() {
  return (
    <Link
      href="/about"
      className="group inline-flex w-fit items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
    >
      <span
        aria-hidden="true"
        className="h-px w-8 bg-border transition-all duration-300 ease-out group-hover:w-14 group-hover:bg-accent"
      />
      <span className="text-meta text-fg transition-transform duration-300 ease-out group-hover:translate-x-1">
        Explore About
      </span>
      <ArrowRight
        className="size-4 text-fg transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:text-accent"
        aria-hidden="true"
      />
    </Link>
  );
}

export interface AboutPreviewProps {
  index: string;
  total: string;
  eyebrow: string;
  role: string;
  bioExcerpt: string;
  skillGroups: SkillGroup[];
}

function AboutPreview({ index, total, eyebrow, role, bioExcerpt, skillGroups }: AboutPreviewProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const statementY = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <section
      ref={sectionRef}
      className="grid-line-t flex flex-col gap-12 overflow-x-clip px-6 py-20 md:px-16 md:py-28"
    >
      <div className="flex flex-col gap-5">
        <Reveal variant="up">
          <div className="flex items-center gap-4">
            <span className="text-meta text-accent">
              {index} <span className="text-fg-muted">/ {total}</span>
            </span>
            <span aria-hidden="true" className="h-px w-8 flex-none bg-border" />
            <span className="text-meta text-fg-muted">{eyebrow}</span>
          </div>
        </Reveal>
        <AnimatedRule delay={0.1} />
      </div>

      <div className="grid gap-12 md:grid-cols-12 md:gap-x-12">
        <div className="flex flex-col gap-10 md:col-span-4">
          <Reveal variant="up" delay={0.2}>
            <span className="text-meta text-fg-muted">About</span>
          </Reveal>
          <Reveal variant="up" delay={0.25}>
            <DisciplineNodes skillGroups={skillGroups} />
          </Reveal>
        </div>

        <div className="flex flex-col gap-8 md:col-span-8">
          <motion.div style={shouldReduceMotion ? undefined : { y: statementY }}>
            <Reveal variant="up" delay={0.25}>
              <h2 className="text-display-lg text-fg">
                <WordReveal text={role} delay={0.25} />
              </h2>
            </Reveal>
          </motion.div>
          <Reveal variant="up" delay={0.35}>
            <p className="max-w-xl text-sm leading-relaxed text-fg-muted md:text-base">
              {bioExcerpt}
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.45}>
            <AboutCTA />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export { AboutPreview };
