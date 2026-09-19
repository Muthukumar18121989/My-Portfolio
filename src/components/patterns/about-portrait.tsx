"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Compass, Component, Layers, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// The "animation around me" treatment for the About page: a portrait with a
// slow-rotating dashed ring behind it and four floating badge chips orbiting
// the corners. Badge labels are short paraphrases of real content already in
// src/lib/content/profile.ts (funFacts, philosophy) — not invented
// personality claims. The source photo (public/images/profile.jpg) has a
// light, busy background from its original shoot; since there's no dark-
// background version of it yet, it's desaturated and given a dark/accent
// color-wash overlay here (CSS only) to sit believably on a black canvas —
// swapping in an actual dark-background photo later would look even better.
const BADGES: { icon: LucideIcon; label: string; position: string }[] = [
  { icon: Layers, label: "Systems Thinker", position: "-top-4 left-0 md:-left-6" },
  { icon: Component, label: "Design Systems Advocate", position: "-top-4 right-0 md:-right-6" },
  { icon: Compass, label: "Research-Led", position: "-bottom-4 left-0 md:-left-8" },
  { icon: Sparkles, label: "AI-Augmented Workflow", position: "-bottom-4 right-0 md:-right-8" },
];

function FloatingBadge({
  icon: Icon,
  label,
  position,
  delay,
}: {
  icon: LucideIcon;
  label: string;
  position: string;
  delay: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={cn("absolute z-20 hidden sm:block", position)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex items-center gap-2 rounded-md border border-border bg-bg-surface/95 px-3 py-2 shadow-lg shadow-black/40 backdrop-blur-sm"
        animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }
        }
      >
        <Icon className="size-3.5 text-accent" aria-hidden="true" />
        <span className="text-meta text-fg">{label}</span>
      </motion.div>
    </motion.div>
  );
}

export interface AboutPortraitProps {
  name: string;
  className?: string;
}

function AboutPortrait({ name, className }: AboutPortraitProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn("relative mx-auto flex items-center justify-center", className)}>
      {/* Decorative rotating ring — purely ornamental, hidden from a11y tree */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full border border-dashed border-border"
        style={{ margin: "-2.5rem" }}
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={
          shouldReduceMotion ? undefined : { duration: 70, repeat: Infinity, ease: "linear" }
        }
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full bg-accent/15 blur-3xl"
        style={{ margin: "-1.5rem" }}
      />

      <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-border shadow-2xl shadow-black/50">
        <Image
          src="/images/profile.jpg"
          alt={name}
          fill
          sizes="(min-width: 768px) 24rem, 80vw"
          className="object-cover object-top grayscale contrast-125"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-bg/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent mix-blend-color" />
      </div>

      {BADGES.map((badge, i) => (
        <FloatingBadge key={badge.label} {...badge} delay={i * 0.15} />
      ))}
    </div>
  );
}

export { AboutPortrait };
