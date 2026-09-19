"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/section-reveal";
import { WordReveal } from "@/components/motion/text-reveal";

// Shared chrome for every homepage/page section — a coordinate-style index
// row (section number / total, eyebrow label, a thin rule) above a heading
// that reveals word-by-word, then the section's own content.
export interface SectionBlockProps {
  index: string;
  total?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

function SectionBlock({
  index,
  total = "07",
  eyebrow,
  title,
  description,
  children,
  className,
  id,
}: SectionBlockProps) {
  return (
    <section
      id={id}
      className={cn("grid-line-t flex flex-col gap-12 px-6 py-20 md:px-16 md:py-28", className)}
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
        <h2 className="text-display-lg text-fg">
          <WordReveal text={title} />
        </h2>
        {description && (
          <Reveal variant="up" delay={0.1}>
            <p className="max-w-2xl text-sm leading-relaxed text-fg-muted md:text-base">
              {description}
            </p>
          </Reveal>
        )}
      </div>
      {children}
    </section>
  );
}

export { SectionBlock };
