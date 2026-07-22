import { cn } from "@/lib/utils";
import type { CareerMilestone } from "@/lib/content";

// "Career Journey" — replaces the old "Selected Companies" line, which
// incorrectly listed a client (Euroclear Bank) alongside actual employers.
// Company logos aren't available/licensed for reuse here, so each milestone
// gets a simple initials badge instead of a real logo image.

function LogoBadge({ initials, current }: { initials: string; current?: boolean }) {
  return (
    <span
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-bold",
        current ? "border-accent bg-accent text-accent-fg" : "border-border bg-bg text-fg-muted"
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

function MilestoneCard({ milestone }: { milestone: CareerMilestone }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <LogoBadge initials={milestone.initials} current={milestone.current} />
          <div>
            <h3 className="font-display text-base font-extrabold text-fg">{milestone.company}</h3>
            <p className="text-sm text-accent">{milestone.role}</p>
          </div>
        </div>
        {milestone.current && (
          <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.1em] text-accent-fg uppercase">
            Present
          </span>
        )}
      </div>

      <p className="font-mono text-[0.65rem] tracking-[0.1em] text-fg-muted uppercase">
        {milestone.dateRange} &middot; {milestone.location}
      </p>

      <p className="text-sm leading-relaxed text-fg-muted">{milestone.summary}</p>

      {milestone.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {milestone.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border px-2.5 py-1 text-[0.7rem] text-fg-muted"
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

export interface CareerJourneyProps {
  milestones: CareerMilestone[];
}

function CareerJourney({ milestones }: CareerJourneyProps) {
  return (
    <>
      {/* Desktop: horizontal connected timeline */}
      <div className="relative hidden md:block">
        <div className="absolute top-[5.5px] right-0 left-0 h-px bg-border" aria-hidden="true" />
        <div className="grid snap-x snap-mandatory auto-cols-[minmax(280px,1fr)] grid-flow-col gap-6 overflow-x-auto pb-4">
          {milestones.map((milestone) => (
            <div key={milestone.company} className="flex snap-start flex-col items-stretch gap-4">
              <span
                className={cn(
                  "z-10 size-3 rounded-full border-2",
                  milestone.current ? "border-accent bg-accent" : "border-border bg-bg"
                )}
                aria-hidden="true"
              />
              <MilestoneCard milestone={milestone} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="flex flex-col gap-6 border-l border-border pl-6 md:hidden">
        {milestones.map((milestone) => (
          <div key={milestone.company} className="relative">
            <span
              className={cn(
                "absolute top-6 -left-[1.6rem] size-3 rounded-full border-2",
                milestone.current ? "border-accent bg-accent" : "border-border bg-bg"
              )}
              aria-hidden="true"
            />
            <MilestoneCard milestone={milestone} />
          </div>
        ))}
      </div>
    </>
  );
}

export { CareerJourney };
