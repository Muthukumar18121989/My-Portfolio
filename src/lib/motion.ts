// Single source of truth for motion values used across the site's scroll
// and reveal system (src/components/motion/*, src/components/mode/*). Every
// animation should pull from here rather than hardcoding its own duration/
// easing/distance — keeps the motion language consistent instead of every
// component inventing its own feel.

/** Expo-out — the primary "editorial" ease: fast start, long confident settle. */
export const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** Quicker, snappier ease for small UI feedback (hovers, toggles). */
export const EASE_SNAPPY: [number, number, number, number] = [0.2, 0, 0, 1];
/** Smooth in-out for scroll-linked (progress-driven) transforms. */
export const EASE_FLUID: [number, number, number, number] = [0.3, 0, 0, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
} as const;

export const STAGGER = {
  tight: 0.025,
  base: 0.05,
  loose: 0.1,
} as const;

export const DISTANCE = {
  sm: 16,
  md: 32,
  lg: 64,
} as const;

export const BLUR = {
  sm: 4,
  md: 10,
} as const;

/** Standard viewport config for whileInView reveals — trigger once, slightly before entering. */
export const VIEWPORT_ONCE = { once: true, margin: "-10% 0px -10% 0px" } as const;
