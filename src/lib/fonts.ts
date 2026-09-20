import { Geist, Inter, JetBrains_Mono } from "next/font/google";

// Shared across both root layouts (site + admin — see src/app/(site)/layout.tsx
// and src/app/(admin)/layout.tsx) so the same font instances/CSS variables
// are used everywhere rather than loaded twice.
export const fontDisplay = Geist({
  variable: "--font-display",
  subsets: ["latin"],
});

export const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});
