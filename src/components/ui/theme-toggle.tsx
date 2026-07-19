"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

// Theme toggle — light/dark switch, per PHASE-6-DESIGN-SYSTEM.md.
// Binary light/dark (not the 3-state auto/dark/light cycle used in the
// Phase 9 review mockup) — a real toggle needs a definite on/off semantic
// for screen readers (aria-checked), which a 3-state cycle button can't
// express cleanly. Persists the choice; falls back to the OS preference
// (prefers-color-scheme, already wired in styles/theme.css) when unset.
const STORAGE_KEY = "design-os-theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem(STORAGE_KEY, theme);
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export interface ThemeToggleProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> {
  className?: string;
}

function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const [theme, setTheme] = React.useState<Theme | null>(null);

  React.useEffect(() => {
    // Reads browser-only state (localStorage/matchMedia) after mount to avoid
    // an SSR hydration mismatch — the server always renders `theme === null`.
    // This is a one-time sync from an external system on mount, the case
    // React's own docs call out as legitimate; the lint rule doesn't
    // distinguish it from an unjustified cascading-render pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme((window.localStorage.getItem(STORAGE_KEY) as Theme | null) ?? getSystemTheme());
  }, []);

  const toggle = () => {
    const next: Theme = (theme ?? getSystemTheme()) === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const isDark = (theme ?? "dark") === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggle}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-sm border border-border text-fg-muted",
        "outline-none transition-colors hover:text-fg",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        className
      )}
      {...props}
    >
      {isDark ? (
        <Moon className="size-4" aria-hidden="true" />
      ) : (
        <Sun className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}

export { ThemeToggle };
