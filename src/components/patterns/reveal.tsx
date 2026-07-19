"use client";

import * as React from "react";
import { motion } from "motion/react";

// Subtle fade/rise on scroll into view. Respects prefers-reduced-motion
// globally via the app's <MotionConfig reducedMotion="user"> in layout.tsx.
export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.3, 0, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { Reveal };
