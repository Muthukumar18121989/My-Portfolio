import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Testimonial block — quote + attribution + optional linked project.
// Per PHASE-6-DESIGN-SYSTEM.md and the Phase 4 editorial rule: only real,
// attributed quotes belong here. There is no placeholder/empty-state
// handling inside this component on purpose — the honest "not sourced yet"
// message used on Home/About is page-level copy, not this component's job.
export interface TestimonialBlockProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Optional link back to the project this testimonial speaks to. */
  project?: { title: string; href: string };
  className?: string;
}

function TestimonialBlock({
  quote,
  author,
  role,
  company,
  project,
  className,
}: TestimonialBlockProps) {
  return (
    <figure className={cn("flex flex-col gap-4", className)}>
      <blockquote className="text-lg leading-relaxed text-fg">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="flex flex-col gap-0.5 text-sm">
        <span className="font-medium text-fg">{author}</span>
        <span className="text-fg-muted">
          {role}, {company}
        </span>
        {project && (
          <Link href={project.href} className="mt-1 text-accent hover:underline">
            On {project.title} →
          </Link>
        )}
      </figcaption>
    </figure>
  );
}

export { TestimonialBlock };
