import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Timeline item — resume career entry with a linked-case-studies slot.
// Per PHASE-6-DESIGN-SYSTEM.md and the Resume page spec in
// PHASE-5-INFORMATION-ARCHITECTURE.md ("each role links to the case
// studies produced during it"). Multiple timeline items are expected to
// share one continuous vertical rule — that's the parent list's job
// (border-l on the wrapping <ol>), not duplicated per item.
export interface TimelineItemProps {
  role: string;
  company: string;
  /** Pre-formatted date range, e.g. "2021 – Present" — formatting overlapping
      ranges is a content-entry concern (see the Phase 2 audit finding this
      fixes), not this component's. */
  dateRange: string;
  achievements: string[];
  /** Optional links to case studies produced during this role. */
  relatedProjects?: { title: string; href: string }[];
  className?: string;
}

function TimelineItem({
  role,
  company,
  dateRange,
  achievements,
  relatedProjects,
  className,
}: TimelineItemProps) {
  return (
    <li className={cn("flex flex-col gap-2 py-1 pl-6", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-lg font-extrabold text-fg">{role}</h3>
        <span className="font-mono text-xs text-fg-muted">{dateRange}</span>
      </div>
      <p className="text-sm font-medium text-accent">{company}</p>
      <ul className="flex list-disc flex-col gap-1 pl-4 text-sm text-fg-muted">
        {achievements.map((achievement, i) => (
          // Static, ordered content from one entry, never reordered — index key is safe here.
          <li key={i}>{achievement}</li>
        ))}
      </ul>
      {relatedProjects && relatedProjects.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-3">
          {relatedProjects.map((project) => (
            <Link
              key={project.href}
              href={project.href}
              className="text-sm text-accent hover:underline"
            >
              → {project.title}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}

export { TimelineItem };
