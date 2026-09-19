"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { DURATION, EASE_EDITORIAL, STAGGER, DISTANCE, BLUR, VIEWPORT_ONCE } from "@/lib/motion";

// Three reusable animated-text primitives, used selectively (not on every
// heading — see callers). All three put the real, unsplit string in an
// `aria-label` and mark the animated fragments `aria-hidden`, so screen
// readers get one clean read regardless of how the text is chopped up for
// the visual effect — a word- or character-split heading is a known a11y
// footgun if you skip this.
//
// Callers wrap these in their own heading element, e.g.
// `<h1><WordReveal text="…" /></h1>` — these don't render a tag themselves.

export interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Single block "mask" reveal — the whole element slides up out of a clipped band. Use for one strong statement, not body copy. */
function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <span className={cn("inline-block overflow-hidden align-bottom", className)}>
      <motion.span
        className="inline-block"
        initial={shouldReduceMotion ? undefined : { y: "110%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, delay, ease: EASE_EDITORIAL }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export interface WordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}

/** Word-by-word fade + rise + blur-in. Use for a short statement (a sentence, not a paragraph). */
function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = STAGGER.base,
}: WordRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden">
          <motion.span
            className={cn("inline-block", wordClassName)}
            initial={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, y: DISTANCE.sm, filter: `blur(${BLUR.sm}px)` }
            }
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={VIEWPORT_ONCE}
            transition={{
              duration: DURATION.base,
              delay: delay + i * stagger,
              ease: EASE_EDITORIAL,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export interface CharRevealProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
}

/** Character-by-character rise-in. Sparing use only — a name, a short label, never a sentence. */
function CharReveal({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = STAGGER.tight,
}: CharRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const chars = Array.from(text);

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={cn("inline-block", charClassName)}
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: DISTANCE.md }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: DURATION.fast, delay: delay + i * stagger, ease: EASE_EDITORIAL }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

export { TextReveal, WordReveal, CharReveal };
