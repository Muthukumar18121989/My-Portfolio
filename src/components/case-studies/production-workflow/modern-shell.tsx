import * as React from "react";
import { Search, LayoutDashboard, Inbox, UserCheck, CheckCircle2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The "modern redesign" shell — deliberately built from the portfolio's own
// real design tokens and components (bg-bg-surface, border-border, the
// actual <Button>), not a separate visual language. The in-world redesign
// is meant to look like this design system, so reusing it directly is both
// authentic to the narrative and guarantees it matches the rest of the site.
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Inbox", icon: Inbox },
  { label: "Assigned to me", icon: UserCheck },
  { label: "Completed", icon: CheckCircle2 },
];

export interface ModernShellProps {
  screenTitle: string;
  activeNavItem?: string;
  children: React.ReactNode;
}

function ModernShell({ screenTitle, activeNavItem = "Dashboard", children }: ModernShellProps) {
  return (
    <div className="overflow-hidden rounded-md border border-border shadow-lg">
      <div className="flex">
        <div className="hidden w-48 shrink-0 flex-col gap-1 border-r border-border bg-bg-surface p-3 sm:flex">
          <span className="mb-3 px-2 font-display text-sm font-extrabold text-fg">
            Production Hub
          </span>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-2 rounded-sm px-2 py-1.5 text-xs",
                item.label === activeNavItem ? "bg-accent text-accent-fg" : "text-fg-muted"
              )}
            >
              <item.icon className="size-3.5" aria-hidden="true" />
              {item.label}
            </div>
          ))}
        </div>

        <div className="min-w-0 flex-1 bg-bg">
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.15em] text-fg-muted uppercase">
                Production Hub
              </p>
              <h4 className="font-display text-sm font-extrabold text-fg">{screenTitle}</h4>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1.5 rounded-sm border border-border bg-bg-surface px-2 py-1 text-fg-muted md:flex">
                <Search className="size-3.5" aria-hidden="true" />
                <span className="text-xs">Search requests…</span>
              </div>
              <Bell className="size-4 text-fg-muted" aria-hidden="true" />
              <Button size="sm">New Request</Button>
              <span className="flex size-7 items-center justify-center rounded-full bg-accent font-mono text-[0.6rem] font-bold text-accent-fg">
                MS
              </span>
            </div>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export { ModernShell };
