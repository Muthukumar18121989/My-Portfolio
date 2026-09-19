"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { DURATION, EASE_EDITORIAL, DISTANCE, BLUR, STAGGER, VIEWPORT_ONCE } from "@/lib/motion";

// Reusable scroll-reveal primitives — each section on the homepage picks a
// `variant` that fits its own visual rhythm (see src/app/page.tsx) rather
// than every section using the same fade-up. `StaggerGroup`/`StaggerItem`
// handle the "children enter progressively" pattern (project grid,
// capability list) via Motion's variant propagation, not a manual per-item
// delay calculation.

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "blur" | "scale";
  as?: "div" | "section";
}

function Reveal({ children, className, delay = 0, variant = "up", as = "div" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Tag = as === "section" ? motion.section : motion.div;

  const hidden = shouldReduceMotion
    ? undefined
    : variant === "blur"
      ? { opacity: 0, filter: `blur(${BLUR.md}px)` }
      : variant === "scale"
        ? { opacity: 0, scale: 0.96 }
        : { opacity: 0, y: DISTANCE.md };

  const shown =
    variant === "blur"
      ? { opacity: 1, filter: "blur(0px)" }
      : variant === "scale"
        ? { opacity: 1, scale: 1 }
        : { opacity: 1, y: 0 };

  return (
    <Tag
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.base, delay, ease: EASE_EDITORIAL }}
    >
      {children}
    </Tag>
  );
}

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

export interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

function StaggerGroup({ children, className, stagger = STAGGER.base }: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      custom={stagger}
      variants={staggerContainerVariants}
    >
      {children}
    </motion.div>
  );
}

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: DISTANCE.sm },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_EDITORIAL } },
};

function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

export { Reveal, StaggerGroup, StaggerItem };
