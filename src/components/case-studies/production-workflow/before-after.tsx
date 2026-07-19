import * as React from "react";
import { ArrowRight } from "lucide-react";
import { LegacyShell } from "./legacy-shell";
import { ModernShell } from "./modern-shell";

export interface BeforeAfterProps {
  screenTitle: string;
  legacyTreeItem?: string;
  modernNavItem?: string;
  legacy: React.ReactNode;
  modern: React.ReactNode;
  improvements: string[];
}

function BeforeAfter({
  screenTitle,
  legacyTreeItem,
  modernNavItem,
  legacy,
  modern,
  improvements,
}: BeforeAfterProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-display text-lg font-extrabold text-fg md:text-xl">{screenTitle}</h3>
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[0.625rem] tracking-[0.2em] text-fg-muted uppercase">
            Legacy
          </span>
          <div className="overflow-x-auto">
            <LegacyShell screenTitle={screenTitle} activeTreeItem={legacyTreeItem}>
              {legacy}
            </LegacyShell>
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex">
          <ArrowRight className="size-6 text-fg-muted" aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-[0.625rem] tracking-[0.2em] text-accent uppercase">
            Modern
          </span>
          <ModernShell screenTitle={screenTitle} activeNavItem={modernNavItem}>
            {modern}
          </ModernShell>
        </div>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {improvements.map((imp) => (
          <li key={imp} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-good" aria-hidden="true" />
            {imp}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { BeforeAfter };
