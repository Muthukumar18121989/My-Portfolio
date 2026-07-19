import * as React from "react";

const HEURISTICS = [
  {
    name: "Visibility of System Status",
    finding:
      "No indicator of where a request stood in the pipeline — Production Managers re-opened each record individually to check status.",
  },
  {
    name: "Match Between System and Real World",
    finding:
      'Fields used IBM-platform terminology ("record," "queue object") instead of the team\'s own language ("request," "deck").',
  },
  {
    name: "Consistency and Standards",
    finding:
      "Assignment, status update, and delivery each used a different form layout, so muscle memory from one screen didn't transfer to the next.",
  },
  {
    name: "Recognition Rather Than Recall",
    finding:
      "VAs had to remember request IDs to search for them — nothing in the inbox let you recognize a request by its content at a glance.",
  },
  {
    name: "Error Prevention",
    finding:
      'The status dropdown allowed invalid transitions (e.g. "Delivered" back to "New") with no confirmation step.',
  },
  {
    name: "User Control and Freedom",
    finding:
      'There was no undo and no draft state — an accidental status change or premature "Send & Close" was final.',
  },
  {
    name: "Minimalist Design",
    finding:
      "Every screen exposed every field the underlying database supported, regardless of whether that task needed it.",
  },
  {
    name: "Flexibility and Efficiency",
    finding:
      "No bulk actions, saved filters, or keyboard shortcuts — a Manager assigning 20 requests repeated the same multi-click flow 20 times.",
  },
] as const;

function HeuristicEvaluation() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {HEURISTICS.map((h) => (
        <div
          key={h.name}
          className="flex flex-col gap-1.5 rounded-md border border-border bg-bg-surface p-4"
        >
          <h4 className="font-display text-sm font-extrabold text-fg">{h.name}</h4>
          <p className="text-sm leading-relaxed text-fg-muted">{h.finding}</p>
        </div>
      ))}
    </div>
  );
}

const FLOW_STEPS = [
  "Analyst sends a PowerPoint request by email",
  "Request appears in the application's Inbox",
  "Production Manager reviews the request",
  "Deadline is assigned",
  "Priority is assigned",
  "Production Virtual Assistant (VA) is allocated",
  "Work begins",
  "Status is updated throughout production",
  "Communication history is maintained",
  "Final PowerPoint is uploaded",
  "Delivery email is sent to the requestor",
  "Request is closed",
] as const;

function UserFlowDiagram() {
  return (
    <ol className="flex flex-col gap-0 border-l border-border">
      {FLOW_STEPS.map((step, i) => (
        <li key={step} className="flex items-baseline gap-3 py-2 pl-6">
          <span className="-ml-9 flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-bg font-mono text-[0.65rem] text-fg-muted">
            {i + 1}
          </span>
          <span className="text-sm text-fg">{step}</span>
        </li>
      ))}
    </ol>
  );
}

const OUTCOMES = [
  { value: "42%", label: "Faster request assignment" },
  { value: "35%", label: "Fewer clicks to complete a task" },
  { value: "50%", label: "Improved workflow visibility" },
  { value: "28%", label: "Fewer support queries" },
] as const;

function OutcomeMetrics() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {OUTCOMES.map((o) => (
          <div key={o.label} className="flex flex-col gap-1">
            <span className="font-display text-3xl font-extrabold text-accent">{o.value}</span>
            <span className="text-sm text-fg-muted">{o.label}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-fg-muted">
        Directional outcomes illustrating the scale of improvement from this redesign — not
        confidential internal figures.
      </p>
    </div>
  );
}

const LEARNINGS = [
  "Enterprise UX is rarely about adding features — this system already did everything it needed to. The work was almost entirely about removing friction from a process that was already correct.",
  "High-volume, repetitive workflows reward small efficiencies disproportionately. Saving two clicks on an action performed 50 times a day matters more than a beautiful one-off screen.",
  "Legacy system replacements succeed or fail on trust. VAs and Managers had years of muscle memory in the old tool — validating the redesign with them directly, not just testing it, was what got adoption.",
  "Cross-functional collaboration with a Business Analyst and Product Owner meant the redesign had to satisfy operational constraints (SLA tracking, audit trails) as much as usability goals — the two aren't in tension nearly as often as they seem at the start.",
] as const;

function KeyLearnings() {
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

export { HeuristicEvaluation, UserFlowDiagram, OutcomeMetrics, KeyLearnings };
