import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

// Button — primary (accent fill) / secondary (outline) / ghost (text-only).
// Per PHASE-6-DESIGN-SYSTEM.md's component spec: sm/md/lg sizes, with
// default/hover/focus-visible/disabled/loading states.
//
// Disabled/loading styling uses a `data-disabled` attribute selector, not
// Tailwind's `disabled:` pseudo-class variant (fixed in PHASE-10.1.5, per
// COMPONENT_SYSTEM_AUDIT.md — `:disabled` only exists on real form
// controls; when `asChild` renders this as an <a> via Slot, the CSS
// pseudo-class silently never applied, so a "disabled" link rendered fully
// interactive and undimmed).
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm font-body font-medium " +
    "transition-colors transition-transform duration-150 outline-none select-none " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus " +
    "data-disabled:pointer-events-none data-disabled:opacity-disabled",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:-translate-y-px",
        secondary: "border border-border bg-transparent text-fg hover:border-accent",
        ghost: "bg-transparent text-fg-muted hover:text-fg",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Render as the child element instead of a <button> (e.g. wrap a Next.js <Link>). */
  asChild?: boolean;
  /** Disables interaction (see `asChild`'s note on how) and, for a real
      <button>, shows a spinner — the "loading" state from PHASE-6. With
      `asChild`, interaction is still blocked but no spinner renders: Radix's
      Slot clones props onto its single child rather than wrapping it, so
      there's no place to put a sibling icon without breaking that child. */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = !!(disabled || loading);
    const Comp = asChild ? Slot.Root : "button";

    // For a real <button>, the native `disabled` attribute is sufficient —
    // the browser handles both mouse and keyboard for free. For asChild
    // (typically wrapping a next/link <a>, which has no native disabled
    // state), interaction has to be blocked explicitly on every input path:
    // pointer-events via CSS, keyboard via removing it from the tab order,
    // and a click handler as defense-in-depth against anything that
    // bypasses both (e.g. a programmatic .click()).
    const asChildDisabledProps =
      asChild && isDisabled
        ? {
            "aria-disabled": true as const,
            tabIndex: -1,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              e.stopPropagation();
            },
          }
        : { onClick };

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        data-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        {...(asChild ? {} : { disabled: isDisabled })}
        {...asChildDisabledProps}
        {...props}
      >
        {asChild ? (
          // Radix's Slot requires exactly one React element child — it
          // clones props onto that element rather than rendering a wrapper,
          // so a sibling spinner can't be injected here the way it can for
          // a real <button>. (Caught by Storybook actually rendering this
          // story in PHASE-10.1.5 — "Slot failed to slot onto its children.")
          children
        ) : (
          <>
            {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            {children}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
