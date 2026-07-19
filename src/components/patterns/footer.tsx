import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/lib/content";

// Footer — canonical footer, repeats primary nav + contact channels.
// Deliberately excludes phone/street address (see PHASE-2-FRAMER-AUDIT.md —
// publishing a personal mobile number and home address invites spam and
// isn't information recruiters need). Only real, resume-sourced links
// render; Behance/Dribbble are omitted until real URLs are added in
// src/lib/content/profile.ts.

const FOOTER_COLUMNS = [
  {
    links: [
      { label: "Projects", href: "/projects" },
      { label: "About", href: "/about" },
      { label: "Resume", href: "/resume" },
    ],
  },
  {
    links: [{ label: "Contact", href: "/contact" }],
  },
] as const;

export interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps) {
  const externalLinks = [
    { label: "LinkedIn", href: socialLinks.linkedin },
    { label: "Behance", href: socialLinks.behance },
    { label: "Dribbble", href: socialLinks.dribbble },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  return (
    <footer
      className={cn(
        "flex flex-wrap justify-between gap-8 border-t border-border px-6 py-10 md:px-16",
        className
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className="font-display text-base font-extrabold text-fg">Muthukumar</span>
        <span className="font-mono text-[0.625rem] tracking-[0.15em] text-fg-muted uppercase">
          UX UI Designer / Product Designer
        </span>
        <span className="mt-2 text-sm text-fg-muted">
          &copy; {new Date().getFullYear()} Muthukumar D. All rights reserved.
        </span>
      </div>

      <div className="flex flex-wrap gap-12">
        {FOOTER_COLUMNS.map((col, i) => (
          // Columns are static and never reordered — index key is safe here.
          <div key={i} className="flex flex-col gap-2">
            {col.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
        {externalLinks.length > 0 && (
          <div className="flex flex-col gap-2">
            {externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}

export { Footer };
