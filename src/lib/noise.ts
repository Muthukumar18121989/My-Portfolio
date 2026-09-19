import { createNoise2D, type NoiseFunction2D } from "simplex-noise";

/** Thin, typed re-export so callers don't need to know which noise library backs this. */
export function createGridNoise(): NoiseFunction2D {
  return createNoise2D();
}
