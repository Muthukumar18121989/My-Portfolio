import { Search, Loader2, CheckCircle2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskPaneShell } from "./task-pane-shell";

// Fictional consultant data — no real McKinsey personnel.
const CONSULTANTS = [
  {
    name: "Aditi Rao",
    title: "Associate Partner",
    office: "Mumbai",
    practice: "Financial Services",
  },
  { name: "James Whitmore", title: "Engagement Manager", office: "London", practice: "Technology" },
  { name: "Priya Nandakumar", title: "Consultant", office: "Chennai", practice: "Operations" },
];

function ProfileExtractorPane() {
  return (
    <TaskPaneShell title="McK Tools — Profile Extractor">
      <label className="mb-3 flex items-center gap-2 rounded-sm border border-border bg-bg-surface px-2.5 py-2">
        <Search className="size-4 text-fg-muted" aria-hidden="true" />
        <input
          readOnly
          value="Rao"
          className="w-full bg-transparent text-sm text-fg outline-none"
        />
      </label>
      <p className="mb-2 font-mono text-[0.6rem] tracking-[0.15em] text-fg-muted uppercase">
        3 results
      </p>
      <div className="flex flex-col gap-2">
        {CONSULTANTS.map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-2.5 rounded-sm border border-border bg-bg-surface p-2.5"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[0.6rem] font-bold text-accent-fg">
              {c.name
                .split(" ")
                .map((p) => p[0])
                .join("")}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-fg">{c.name}</p>
              <p className="truncate text-xs text-fg-muted">
                {c.title} · {c.office}
              </p>
            </div>
          </div>
        ))}
      </div>
    </TaskPaneShell>
  );
}

function StateCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[0.6rem] tracking-[0.15em] text-fg-muted uppercase">
        {label}
      </span>
      <div
        className="flex min-h-32 flex-col justify-center gap-2 rounded-sm border border-[#c8c6c4] bg-bg p-3"
        style={{ fontFamily: "Segoe UI, Arial, sans-serif" }}
      >
        {children}
      </div>
    </div>
  );
}

function ProfileExtractorStates() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StateCard label="Default">
        <User className="size-5 text-fg-muted" aria-hidden="true" />
        <p className="text-xs text-fg-muted">Search for a consultant by name to get started.</p>
      </StateCard>
      <StateCard label="Loading">
        <Loader2 className="size-5 animate-spin text-accent" aria-hidden="true" />
        <p className="text-xs text-fg-muted">Searching directory…</p>
      </StateCard>
      <StateCard label="Profile Preview">
        <p className="text-xs font-medium text-fg">Aditi Rao</p>
        <p className="text-[0.65rem] text-fg-muted">
          Associate Partner, Mumbai. B.A. Economics, LSE. 9 years at McKinsey.
        </p>
        <Button size="sm" className="w-fit">
          Insert into slide
        </Button>
      </StateCard>
      <StateCard label="Success">
        <CheckCircle2 className="size-5 text-good" aria-hidden="true" />
        <p className="text-xs text-fg-muted">Profile inserted into current slide.</p>
      </StateCard>
    </div>
  );
}

export { ProfileExtractorPane, ProfileExtractorStates };
