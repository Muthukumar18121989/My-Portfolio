import { Paperclip, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DUMMY_REQUESTS } from "./legacy-screens";

const PRIORITY_STYLES: Record<string, string> = {
  High: "bg-danger/15 text-danger",
  Medium: "bg-warning/15 text-warning",
  Low: "bg-fg-muted/15 text-fg-muted",
};

const STATUS_STYLES: Record<string, string> = {
  New: "bg-accent/15 text-accent",
  "In Progress": "bg-info/15 text-info",
  "Pending Review": "bg-warning/15 text-warning",
  Completed: "bg-good/15 text-good",
};

function Chip({ label, styles }: { label: string; styles: Record<string, string> }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[0.65rem] font-medium whitespace-nowrap",
        styles[label] ?? "bg-fg-muted/15 text-fg-muted"
      )}
    >
      {label}
    </span>
  );
}

function ModernInbox() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "New", value: 24 },
          { label: "In progress", value: 12 },
          { label: "Pending review", value: 6 },
        ].map((stat) => (
          <div key={stat.label} className="rounded-md border border-border bg-bg-surface p-3">
            <p className="font-display text-xl font-extrabold text-fg">{stat.value}</p>
            <p className="text-xs text-fg-muted">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {DUMMY_REQUESTS.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between gap-3 rounded-md border border-border bg-bg-surface px-3 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-border font-mono text-[0.6rem] font-bold text-fg">
                {r.requestor
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-fg">{r.title}</p>
                <p className="font-mono text-[0.65rem] text-fg-muted">
                  {r.id} · Due {r.deadline}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-1.5">
              <Chip label={r.priority} styles={PRIORITY_STYLES} />
              <Chip label={r.status} styles={STATUS_STYLES} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModernAssignment() {
  const req = DUMMY_REQUESTS[0];
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border border-border bg-bg-surface p-3">
        <p className="text-sm font-medium text-fg">{req.title}</p>
        <p className="font-mono text-[0.65rem] text-fg-muted">
          {req.id} · Requested by {req.requestor}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[0.6rem] tracking-[0.15em] text-fg-muted uppercase">
            Deadline
          </span>
          <span className="rounded-sm border border-border bg-bg-surface px-3 py-2 text-sm text-fg">
            18 Nov, 5:00 PM
          </span>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[0.6rem] tracking-[0.15em] text-fg-muted uppercase">
            Assign to
          </span>
          <span className="rounded-sm border border-border bg-bg-surface px-3 py-2 text-sm text-fg">
            K. Ibrahim
          </span>
        </label>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[0.6rem] tracking-[0.15em] text-fg-muted uppercase">
          Priority
        </span>
        <div className="flex gap-2">
          {["Low", "Medium", "High"].map((p) => (
            <span
              key={p}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                p === "High" ? "bg-accent text-accent-fg" : "border border-border text-fg-muted"
              )}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
      <Button size="sm" className="self-start">
        Assign request
      </Button>
    </div>
  );
}

function ModernTaskDetail() {
  const req = DUMMY_REQUESTS[3];
  return (
    <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          <Chip label={req.priority} styles={PRIORITY_STYLES} />
          <Chip label={req.status} styles={STATUS_STYLES} />
        </div>
        <p className="text-sm font-medium text-fg">{req.title}</p>
        <p className="font-mono text-[0.65rem] text-fg-muted">
          {req.id} · Due {req.deadline} · Assigned to K. Ibrahim
        </p>
        <div className="flex items-center gap-2 rounded-md border border-dashed border-border p-3 text-xs text-fg-muted">
          <Paperclip className="size-3.5" aria-hidden="true" />
          Due_Diligence_Summary_v4_DRAFT.pptx
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-md border border-border bg-bg-surface p-3">
        <p className="font-mono text-[0.6rem] tracking-[0.15em] text-fg-muted uppercase">
          Activity
        </p>
        {[
          ["K. Ibrahim", "Started build from v3 template."],
          ["D. Okafor", "Please update slide 4 chart."],
          ["K. Ibrahim", "Updated, awaiting comments."],
        ].map(([who, note], i) => (
          <div key={i} className="text-xs">
            <span className="font-medium text-fg">{who}</span>
            <span className="text-fg-muted"> — {note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModernStatusTracker() {
  const steps = ["New", "Assigned", "In Progress", "Review", "Delivered"];
  const currentIndex = 3;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              {i < currentIndex ? (
                <CheckCircle2 className="size-5 text-good" aria-hidden="true" />
              ) : i === currentIndex ? (
                <Circle className="size-5 fill-accent text-accent" aria-hidden="true" />
              ) : (
                <Circle className="size-5 text-border" aria-hidden="true" />
              )}
              <span
                className={cn("text-[0.65rem]", i <= currentIndex ? "text-fg" : "text-fg-muted")}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("mx-1 h-px flex-1", i < currentIndex ? "bg-good" : "bg-border")} />
            )}
          </div>
        ))}
      </div>
      <div className="rounded-md border border-border bg-bg-surface p-3 text-sm text-fg-muted">
        First draft complete, routed to requestor for sign-off.
      </div>
    </div>
  );
}

function ModernDelivery() {
  const req = DUMMY_REQUESTS[4];
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-2 rounded-full bg-good/15 px-3 py-1.5 text-sm font-medium text-good">
        <CheckCircle2 className="size-4" aria-hidden="true" />
        Delivered
      </div>
      <div className="flex items-center gap-2 rounded-md border border-border bg-bg-surface px-3 py-2 text-sm text-fg">
        <Paperclip className="size-4 text-fg-muted" aria-hidden="true" />
        Board_Readout_Template_FINAL.pptx
      </div>
      <p className="text-sm text-fg-muted">
        Delivery email sent to <span className="text-fg">{req.requestor}</span> — request{" "}
        <span className="font-mono">{req.id}</span> closed.
      </p>
      <Button size="sm" variant="secondary">
        View request archive
      </Button>
    </div>
  );
}

export { ModernInbox, ModernAssignment, ModernTaskDetail, ModernStatusTracker, ModernDelivery };
