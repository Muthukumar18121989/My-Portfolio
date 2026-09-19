"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MetadataChip } from "@/components/ui/metadata-chip";
import type { Project } from "@/lib/content";

// A visual case-study object, not a generic card: numbered, full-color hero
// art (reused from src/components/patterns/case-study-hero-art.tsx), corner
// coordinate marks that appear on hover, and a subtle image scale + title
// shift — a premium product-interface hover, not a big zoom.
export interface ShowcaseProjectCardProps {
  project: Project;
  index: number;
  heroArt?: React.ReactNode;
}

function CornerMarks({ visible }: { visible: boolean }) {
  const cls = cn(
    "pointer-events-none absolute size-3 border-accent transition-opacity duration-300",
    visible ? "opacity-100" : "opacity-0"
  );
  return (
    <>
      <span className={cn(cls, "top-2 left-2 border-t border-l")} aria-hidden="true" />
      <span className={cn(cls, "top-2 right-2 border-t border-r")} aria-hidden="true" />
      <span className={cn(cls, "bottom-2 left-2 border-b border-l")} aria-hidden="true" />
      <span className={cn(cls, "right-2 bottom-2 border-r border-b")} aria-hidden="true" />
    </>
  );
}

function ShowcaseProjectCard({ project, index, heroArt }: ShowcaseProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-md border border-border bg-bg-surface shadow-lg shadow-black/30",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        )}
      >
        <CornerMarks visible={hovered} />

        <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg">
          <motion.div
            className="h-full w-full"
            animate={reduceMotion ? undefined : { scale: hovered ? 1.045 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {heroArt ?? <div className="flex h-full w-full items-center justify-center bg-bg" />}
          </motion.div>
          <span className="text-meta absolute top-3 left-3 text-fg-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <motion.div
          className="flex flex-1 flex-col gap-3 p-5"
          animate={reduceMotion ? undefined : { y: hovered ? -2 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-display-md text-fg">{project.title}</h3>
            <ArrowUpRight
              className={cn(
                "mt-1 size-4 shrink-0 text-fg-muted transition-transform duration-300",
                hovered && "-translate-y-0.5 translate-x-0.5 text-accent"
              )}
              aria-hidden="true"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <MetadataChip label="Role">{project.role}</MetadataChip>
            <MetadataChip label="Type">{project.type}</MetadataChip>
          </div>

          <p className="text-sm leading-relaxed text-fg-muted">{project.summary}</p>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export { ShowcaseProjectCard };
