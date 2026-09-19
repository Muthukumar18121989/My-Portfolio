"use client";

import * as React from "react";
import { motion, useScroll, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { MetadataChip } from "@/components/ui/metadata-chip";
import { StaggerGroup, StaggerItem } from "@/components/motion/section-reveal";
import type { CareerMilestone } from "@/lib/content";

// A single vertical line the length of the timeline, its scaleY bound to
// scroll progress (useScroll target=this container) — the line "draws
// itself" as you scroll through it. Milestones stagger in via StaggerGroup/
// StaggerItem, each led by a large year pulled straight from the existing
// dateRange string (no invented data).
function yearFromRange(dateRange: string): string {
  const match = dateRange.match(/\d{4}/);
  return match ? match[0] : dateRange;
}

function MilestoneNode({ current }: { current?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute top-1.5 left-[-5px] z-10 size-[10px] rounded-full border md:left-[calc(6rem-5px)]",
        current ? "border-accent bg-accent" : "border-fg-muted bg-bg"
      )}
    />
  );
}

function MilestoneCard({ milestone }: { milestone: CareerMilestone }) {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-border bg-bg-surface p-6 shadow-lg shadow-black/30">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-display-md text-fg">{milestone.company}</h3>
          <p className="text-sm text-accent">{milestone.role}</p>
        </div>
        {milestone.current && <span className="text-meta shrink-0 text-accent">Present</span>}
      </div>

      <MetadataChip label="Dates">
        {milestone.dateRange} &middot; {milestone.location}
      </MetadataChip>

      <p className="text-sm leading-relaxed text-fg-muted">{milestone.summary}</p>

      {milestone.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {milestone.skills.map((skill) => (
            <span
              key={skill}
              className="text-meta rounded-sm border border-border px-2.5 py-1 text-fg-muted"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {milestone.responsibilities.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {milestone.responsibilities.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-fg-muted">
              <span
                className="mt-1.5 size-1 shrink-0 rounded-full bg-fg-muted"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      )}

      {milestone.achievements.length > 0 && (
        <ul className="flex flex-col gap-1.5 border-t border-border pt-3">
          {milestone.achievements.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-fg">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export interface CareerTimelineProps {
  milestones: CareerMilestone[];
}

function CareerTimeline({ milestones }: CareerTimelineProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  return (
    <div ref={containerRef} className="relative">
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-0 w-px bg-border md:left-24"
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 w-px bg-accent md:left-24"
        style={
          shouldReduceMotion
            ? { height: "100%" }
            : { height: "100%", scaleY: scrollYProgress, transformOrigin: "top" }
        }
      />

      <StaggerGroup className="flex flex-col gap-14" stagger={0.12}>
        {milestones.map((milestone) => (
          <StaggerItem
            key={milestone.company}
            className="relative pl-8 md:grid md:grid-cols-[6rem_1fr] md:gap-8 md:pl-0"
          >
            <MilestoneNode current={milestone.current} />
            <span className="text-display-md hidden text-fg-muted md:block">
              {yearFromRange(milestone.dateRange)}
            </span>
            <div className="flex flex-col gap-3">
              <span className="text-meta text-fg-muted md:hidden">
                {yearFromRange(milestone.dateRange)}
              </span>
              <MilestoneCard milestone={milestone} />
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

export { CareerTimeline };
