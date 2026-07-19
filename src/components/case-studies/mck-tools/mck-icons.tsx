import {
  Search,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Globe,
  Building2,
  Target,
  Lightbulb,
  Handshake,
  ShieldCheck,
  Rocket,
  Layers,
  Star,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskPaneShell } from "./task-pane-shell";

const ICON_GRID = [
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Globe,
  Building2,
  Target,
  Lightbulb,
  Handshake,
  ShieldCheck,
  Rocket,
  Layers,
];

const CATEGORIES = ["All", "Charts", "People", "Strategy", "Growth"];

function McKIconsPane() {
  return (
    <TaskPaneShell title="McK Tools — McK Icons">
      <label className="mb-3 flex items-center gap-2 rounded-sm border border-border bg-bg-surface px-2.5 py-2">
        <Search className="size-4 text-fg-muted" aria-hidden="true" />
        <input
          readOnly
          value="growth"
          className="w-full bg-transparent text-sm text-fg outline-none"
        />
      </label>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat, i) => (
          <span
            key={cat}
            className={cn(
              "rounded-full px-2.5 py-1 text-[0.65rem] font-medium",
              i === 0 ? "bg-accent text-accent-fg" : "border border-border text-fg-muted"
            )}
          >
            {cat}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {ICON_GRID.map((Icon, i) => (
          <div
            key={i}
            className={cn(
              "flex aspect-square items-center justify-center rounded-sm border border-border bg-bg-surface",
              i === 2 && "border-accent"
            )}
          >
            <Icon className="size-4 text-fg" aria-hidden="true" />
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

function McKIconsStates() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StateCard label="Favourites">
        <div className="flex gap-1.5">
          {[Star, TrendingUp, Users].map((Icon, i) => (
            <div
              key={i}
              className="flex size-7 items-center justify-center rounded-sm border border-border bg-bg-surface"
            >
              <Icon className="size-3.5 text-fg" aria-hidden="true" />
            </div>
          ))}
        </div>
        <p className="text-xs text-fg-muted">3 saved icons</p>
      </StateCard>
      <StateCard label="Customize">
        <div className="flex items-center gap-1.5 text-xs text-fg-muted">
          <span>Style:</span>
          <span className="rounded-full bg-accent px-2 py-0.5 text-[0.6rem] text-accent-fg">
            Outline
          </span>
          <span className="rounded-full border border-border px-2 py-0.5 text-[0.6rem]">
            Filled
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-fg-muted">
          <span>Stroke:</span>
          <span className="h-1 w-12 rounded-full bg-accent" />
        </div>
        <div className="flex gap-1">
          {["bg-accent", "bg-good", "bg-danger", "bg-fg"].map((c) => (
            <span key={c} className={cn("size-3.5 rounded-full", c)} />
          ))}
        </div>
      </StateCard>
      <StateCard label="Empty State">
        <p className="text-xs text-fg-muted">No icons match &ldquo;quantum&rdquo;.</p>
        <p className="text-[0.65rem] text-fg-muted">Try a different search term.</p>
      </StateCard>
      <StateCard label="Insert Confirmation">
        <CheckCircle2 className="size-5 text-good" aria-hidden="true" />
        <p className="text-xs text-fg-muted">Icon inserted at 24px, outline style.</p>
      </StateCard>
    </div>
  );
}

export { McKIconsPane, McKIconsStates };
