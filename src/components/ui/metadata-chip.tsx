import * as React from "react";
import { cn } from "@/lib/utils";

// A bordered mono pill for role/type/company/year metadata. `label` (e.g.
// "Role") is screen-reader-only — sighted users get the value alone inside
// its chip (position + context make the kind obvious), but a screen reader
// gets "Role: Senior UX Designer" rather than an ambiguous bare value.
export interface MetadataChipProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

function MetadataChip({ label, children, className }: MetadataChipProps) {
  return (
    <span
      className={cn(
        "text-meta inline-flex items-center gap-1.5 rounded-sm border border-border bg-bg px-2.5 py-1 text-fg-muted",
        className
      )}
    >
      {label && <span className="sr-only">{label}: </span>}
      {children}
    </span>
  );
}

export { MetadataChip };
