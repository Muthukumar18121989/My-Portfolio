import * as React from "react";
import { cn } from "@/lib/utils";

// Metadata badge — role/type/tool tags, mono type, per PHASE-6-DESIGN-SYSTEM.md.
// All three tag kinds (role/type/tool) share one neutral style rather than a
// per-kind color scheme — that's a deliberate choice, not an oversight: the
// approved Phase 9 mockups never color-differentiated them (unlike the
// visibility-state pills, which do use semantic color). Content and position
// carry the distinction, not color.
export interface MetadataBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

function MetadataBadge({ className, children, ...props }: MetadataBadgeProps) {
  return (
    <span
      className={cn(
        "font-mono text-[0.625rem] tracking-[0.15em] text-fg-muted uppercase",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { MetadataBadge };
