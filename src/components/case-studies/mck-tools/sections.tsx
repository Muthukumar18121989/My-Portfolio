import { Search, Eye, Sliders, MousePointerClick, Layers2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetadataBadge } from "@/components/ui/metadata-badge";

const PROCESS_STEPS = [
  "Discover",
  "User Research",
  "Workflow Analysis",
  "Task Mapping",
  "Information Architecture",
  "Wireframes",
  "High-Fidelity Design",
  "Usability Testing",
  "Iteration",
  "Developer Handoff",
] as const;

function DesignProcess() {
  return (
    <ol className="flex flex-wrap gap-2">
      {PROCESS_STEPS.map((step, i) => (
        <li
          key={step}
          className="flex items-center gap-1.5 rounded-full border border-border bg-bg-surface px-3 py-1.5 text-xs text-fg-muted"
        >
          <span className="font-mono text-accent">{i + 1}</span>
          {step}
        </li>
      ))}
    </ol>
  );
}

function FlowDiagram({
  steps,
}: {
  steps: { label: string; icon: React.ComponentType<{ className?: string }> }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-md border border-border bg-bg-surface px-4 py-3">
            <step.icon className="size-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-fg">{step.label}</span>
          </div>
          {i < steps.length - 1 && <span className="text-fg-muted">→</span>}
        </div>
      ))}
    </div>
  );
}

function ProfileSearchFlow() {
  return (
    <FlowDiagram
      steps={[
        { label: "Profile Search", icon: Search },
        { label: "Profile Preview", icon: Eye },
        { label: "Insert into PowerPoint", icon: MousePointerClick },
      ]}
    />
  );
}

function IconSearchFlow() {
  return (
    <FlowDiagram
      steps={[
        { label: "Search Icon", icon: Search },
        { label: "Preview Icon", icon: Eye },
        { label: "Customize", icon: Sliders },
        { label: "Insert into Slide", icon: MousePointerClick },
      ]}
    />
  );
}

function DesignSystemRecap() {
  return (
    <div className="flex flex-col gap-6 rounded-md border border-border bg-bg-surface p-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Insert into slide</Button>
        <Button size="sm" variant="secondary">
          Cancel
        </Button>
        <Button size="sm" variant="ghost">
          View more
        </Button>
      </div>
      <label className="flex max-w-xs items-center gap-2 rounded-sm border border-border bg-bg px-2.5 py-2">
        <Search className="size-4 text-fg-muted" aria-hidden="true" />
        <span className="text-sm text-fg-muted">Search…</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {["All", "Charts", "People", "Strategy"].map((cat, i) => (
          <span
            key={cat}
            className={
              i === 0
                ? "rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-fg"
                : "rounded-full border border-border px-2.5 py-1 text-xs font-medium text-fg-muted"
            }
          >
            {cat}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <MetadataBadge>Outline</MetadataBadge>
        <MetadataBadge>Filled</MetadataBadge>
        <MetadataBadge>24px</MetadataBadge>
      </div>
    </div>
  );
}

const FUTURE_MODULES = [
  "Slide Library",
  "Template Manager",
  "Chart Library",
  "Smart Formatting",
  "Brand Assets",
  "Presentation Quality Checker",
  "Content Suggestions",
  "AI Productivity Assistant",
] as const;

function FutureModules() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {FUTURE_MODULES.map((mod) => (
        <div
          key={mod}
          className="flex flex-col items-center gap-2 rounded-md border border-dashed border-border bg-bg-surface p-4 text-center opacity-70"
        >
          <Layers2 className="size-4 text-fg-muted" aria-hidden="true" />
          <span className="text-xs text-fg-muted">{mod}</span>
        </div>
      ))}
    </div>
  );
}

const OUTCOMES = [
  "Reduced manual copy-paste effort when building consultant-facing slides",
  "Faster consultant profile creation, without leaving PowerPoint",
  "Improved presentation consistency through a shared icon library",
  "Reduced context switching between internal systems",
  "Better adoption through workflows that fit how consultants already worked",
] as const;

function OutcomeList() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {OUTCOMES.map((o) => (
        <li key={o} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-good" aria-hidden="true" />
          {o}
        </li>
      ))}
    </ul>
  );
}

const LEARNINGS = [
  "Designing inside Microsoft Office's own UI constraints (a fixed-width task pane, the ribbon's rigid grouping model) meant working within someone else's design system, not building a new one from scratch.",
  'Enterprise plugin UX succeeds by disappearing into the existing workflow — every screen was measured against "does this save a consultant a trip to another system," not against how novel the interface looked.',
  "Cross-functional collaboration with the Presentation Technology Team and QA meant validating that every interaction was achievable within the Office Add-in API before it shipped, not after.",
  "Balancing functionality with simplicity mattered most in the icon customization panel — stroke weight, color, and size controls all needed to fit in a 360px-wide pane without feeling cramped.",
  "Building a scalable, modular experience from day one (rather than a single-purpose tool) is what made it credible to propose the future roadmap of additional modules.",
] as const;

function KeyLearningsList() {
  return (
    <ul className="flex flex-col gap-4">
      {LEARNINGS.map((l) => (
        <li key={l} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          {l}
        </li>
      ))}
    </ul>
  );
}

export {
  DesignProcess,
  ProfileSearchFlow,
  IconSearchFlow,
  DesignSystemRecap,
  FutureModules,
  OutcomeList,
  KeyLearningsList,
};
