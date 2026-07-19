import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Article card — for the Writing index. Per PHASE-9-UI-DESIGN.md's built
// pattern: a single-row layout (title + dek on the left, status on the
// right), not the image-led grid card used for projects — articles don't
// have cover art in the approved design.
export interface ArticleCardProps {
  href: string;
  title: string;
  dek: string;
  /** e.g. "Draft", or a formatted publish date once published. */
  status: string;
  className?: string;
}

function ArticleCard({ href, title, dek, status, className }: ArticleCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between gap-4 rounded-md border border-border bg-bg-surface px-5 py-4.5",
        "transition-colors hover:border-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-body text-base font-medium text-fg">{title}</h3>
        <p className="text-sm text-fg-muted">{dek}</p>
      </div>
      <span className="shrink-0 font-mono text-[0.625rem] tracking-[0.15em] text-fg-muted uppercase">
        {status}
      </span>
    </Link>
  );
}

export { ArticleCard };
