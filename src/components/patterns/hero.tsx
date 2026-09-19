"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridWave } from "@/components/canvas/grid-wave";
import { CharReveal, WordReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/section-reveal";

// The cinematic centerpiece: GridWave fills the section as a scroll-linked
// background (useScroll + useTransform tie its scale/opacity to how far the
// hero has scrolled past), with the name/role revealing on load via
// CharReveal/WordReveal. Content is centered — one statement, stage-lit by
// the canvas behind it, not split across a two-column layout. All
// scroll-linked transforms are skipped under prefers-reduced-motion.
export interface HeroProfile {
  name: string;
  role: string;
  yearsExperience: number;
  heroSummary: string;
  location: string;
}

export interface HeroProps {
  profile: HeroProfile;
}

function Hero({ profile }: HeroProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-bg"
    >
      <motion.div
        className="absolute inset-0"
        style={shouldReduceMotion ? undefined : { scale: gridScale, opacity: gridOpacity }}
      >
        <GridWave />
      </motion.div>

      <div className="relative z-10 flex items-start justify-between px-6 pt-10 md:px-16 md:pt-12">
        <span className="text-meta text-fg-muted">{profile.location}</span>
        <span className="text-meta hidden text-fg-muted sm:inline">
          Available for select engagements
        </span>
      </div>

      <motion.div
        style={shouldReduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center gap-7 px-6 py-16 text-center md:px-16"
      >
        <Reveal variant="scale">
          <div className="relative size-20 overflow-hidden rounded-full border-2 border-border shadow-lg shadow-black/40 md:size-24">
            <Image
              src="/images/profile.jpg"
              alt={profile.name}
              fill
              sizes="96px"
              className="object-cover object-top grayscale contrast-125"
              priority
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
          </div>
        </Reveal>
        <h1 className="text-fg">
          <span className="block text-display-xl">
            <CharReveal text={profile.name} />
          </span>
        </h1>
        <p className="text-display-md text-fg-muted">
          <WordReveal text={`${profile.role} — ${profile.yearsExperience}+ years`} delay={0.5} />
        </p>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-fg-muted md:text-base">
          {profile.heroSummary}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button asChild size="lg">
            <Link href="/projects">
              View Work <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/resume">
              Download Resume <Download className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/contact">
              Contact <Mail className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-meta text-fg-muted">Scroll</span>
        <span aria-hidden="true" className="relative h-8 w-px overflow-hidden bg-border">
          {!shouldReduceMotion && (
            <motion.span
              className="absolute inset-x-0 top-0 h-full bg-accent"
              style={{ transformOrigin: "top" }}
              animate={{ scaleY: [0, 1, 0], y: ["-100%", "0%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </span>
      </div>
    </section>
  );
}

export { Hero };
