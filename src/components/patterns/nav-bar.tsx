"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// NavBar — part of the black-canvas visual system, not a standard shadcn
// header: mono uppercase links, a thin bottom rule instead of a shadow, and
// a sliding underline (Motion layoutId) marking the active route instead of
// a static "current page" style.
const NAV_LINKS = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
] as const;

export interface NavBarProps {
  className?: string;
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "text-meta relative pb-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        active ? "text-fg" : "text-fg-muted hover:text-fg"
      )}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-active-underline"
          className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
    </Link>
  );
}

function NavBar({ className }: NavBarProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-border bg-bg px-6 py-5 md:px-16",
        className
      )}
    >
      <Link
        href="/"
        className="flex items-baseline gap-2 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <span className="font-display text-base font-extrabold tracking-tight text-fg">
          MUTHUKUMAR
        </span>
        <span className="text-meta hidden text-fg-muted sm:inline">UX / UI Designer</span>
      </Link>

      <ul className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <ThemeToggle />

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
          "fixed inset-y-0 right-0 flex w-72 flex-col gap-1 border-l border-border bg-bg p-6 transition-transform duration-300 ease-[var(--ease-editorial)] md:hidden",
          drawerOpen ? "translate-x-0" : "translate-x-full",
          "motion-reduce:transition-none"
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setDrawerOpen(false)}
          className="mb-6 self-end text-fg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setDrawerOpen(false)}
            className="text-meta border-b border-border px-1 py-4 text-fg hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export { NavBar };
