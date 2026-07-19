import * as React from "react";
import { cn } from "@/lib/utils";

// Subtle, continuous marquee — pure CSS animation (no JS), paused entirely
// under prefers-reduced-motion via Tailwind's `motion-reduce:` variant.
export interface MarqueeProps {
  items: readonly string[];
  className?: string;
}

function Marquee({ items, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-3 motion-reduce:animate-none">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 rounded-full border border-border bg-bg-surface px-4 py-2 font-mono text-xs tracking-[0.1em] text-fg-muted uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export { Marquee };
