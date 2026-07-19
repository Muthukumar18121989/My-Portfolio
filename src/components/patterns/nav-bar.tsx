"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// NavBar — canonical site navigation. Mobile collapses below the `md`
// breakpoint into a slide-out drawer.

const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
] as const;

export interface NavBarProps {
  className?: string;
}

function NavBar({ className }: NavBarProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <nav
      className={cn(
        "flex items-center justify-between gap-4 border-b border-border px-6 py-4.5 md:px-16",
        className
      )}
    >
      <Link
        href="/"
        className="flex flex-col gap-0.5 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <span className="font-display text-base font-extrabold text-fg">Muthukumar</span>
        <span className="font-mono text-[0.625rem] tracking-[0.15em] text-fg-muted uppercase">
          UX UI Designer / Product Designer
        </span>
      </Link>

      {/* Desktop links — hidden below md, where the drawer takes over */}
      <ul className="hidden items-center gap-7 md:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* Mobile drawer trigger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          aria-controls="nav-drawer"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex text-fg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus md:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </div>

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-overlay md:hidden"
          style={{ zIndex: "var(--z-drawer)" }}
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        id="nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{ zIndex: "var(--z-drawer)" }}
        className={cn(
          "fixed inset-y-0 right-0 flex w-72 flex-col gap-1 bg-bg-surface p-6 shadow-lg transition-transform duration-250 ease-[var(--ease-snappy)] md:hidden",
          drawerOpen ? "translate-x-0" : "translate-x-full",
          "motion-reduce:transition-none"
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setDrawerOpen(false)}
          className="mb-4 self-end text-fg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setDrawerOpen(false)}
            className="rounded-sm px-3 py-3 text-base text-fg hover:bg-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export { NavBar };
