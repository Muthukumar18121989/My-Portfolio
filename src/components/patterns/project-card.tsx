import * as React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { MetadataBadge } from "@/components/ui/metadata-badge";
import { Button } from "@/components/ui/button";

// Project card — standard + locked/gated variant, uniform aspect ratio.
// Per PHASE-6-DESIGN-SYSTEM.md, matching the Airbnb-grid reference from
// PHASE-3-COMPETITOR-BENCHMARK.md and the locked-card pattern from
// PHASE-5-INFORMATION-ARCHITECTURE.md (shared between /work and /private).
//
// Locked cards do not navigate (fixed in PHASE-10.1.5, per
// COMPONENT_SYSTEM_AUDIT.md — the previous version had `href` on the whole
// card even when locked, which meant clicking it tried to open content the
// visitor doesn't have access to). Instead they render as a non-interactive
// container with one focusable action: "Request access". This component
// does not implement the request flow itself — that's Phase 11's
// access_requests/access_grants work (PHASE-7-TECHNICAL-ARCHITECTURE.md) —
// it only exposes the integration point via `onRequestAccess`.
export interface ProjectCardProps {
  href: string;
  title: string;
  role: string;
  type: string;
  description: string;
  /** When set, the card shows a lock badge and a "Request access" action
      instead of navigating anywhere. */
  locked?: boolean;
  /** Called when "Request access" is activated. Receives `href` so the
      caller knows which project was requested. Wiring this to a real
      request flow (modal, form submission) is out of scope here. */
  onRequestAccess?: (href: string) => void;
  /** Cover art slot — real project artifacts once content exists; falls
      back to a neutral placeholder when omitted (no CMS content yet). */
  cover?: React.ReactNode;
  className?: string;
}

function ProjectCard({
  href,
  title,
  role,
  type,
  description,
  locked = false,
  onRequestAccess,
  cover,
  className,
}: ProjectCardProps) {
  const content = (
    <>
      <div className="flex aspect-[16/9] items-center justify-center bg-bg">
        {locked ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-locked px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-locked uppercase">
            <Lock className="size-3" aria-hidden="true" />
            Recruiter only
          </span>
        ) : (
          (cover ?? <span className="size-6 rounded-full bg-accent" aria-hidden="true" />)
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-body text-base font-medium text-fg">{title}</h3>
        <div className="flex gap-2.5">
          <MetadataBadge>{role}</MetadataBadge>
          <MetadataBadge>{type}</MetadataBadge>
        </div>
        {locked ? (
          <>
            <p className="text-sm text-fg-muted">
              This project is gated — request access to view it.
            </p>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="mt-1 self-start"
              onClick={() => onRequestAccess?.(href)}
            >
              Request access
            </Button>
          </>
        ) : (
          <p className="text-sm text-fg-muted">{description}</p>
        )}
      </div>
    </>
  );

  const cardClasses = cn(
    "group overflow-hidden rounded-md border border-border bg-bg-surface",
    !locked && "transition-transform hover:-translate-y-0.5 hover:border-accent",
    className
  );

  if (locked) {
    // Not a link, not the whole card, so a screen reader or keyboard user
    // never lands on something that looks navigable but isn't. The one
    // focusable element inside is the "Request access" button.
    return (
      <div className={cardClasses} aria-label={`${title} (locked)`}>
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        cardClasses,
        "block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      )}
    >
      {content}
    </Link>
  );
}

export { ProjectCard };
