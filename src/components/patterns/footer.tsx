"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/lib/content";
import { Reveal } from "@/components/motion/section-reveal";
import { WordReveal } from "@/components/motion/text-reveal";

// The final visual statement, not a links dump: a large "let's talk"
// statement (Reveal + WordReveal, the same primitives the homepage uses)
// leads, real contact channels follow as a plain metadata list, and a thin
// grid-line footer bar closes the page the way the nav bar opened it.
const FOOTER_LINKS = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
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
    <footer className={cn("grid-line-t bg-bg", className)}>
      <div className="flex flex-col gap-16 px-6 py-20 md:px-16 md:py-28">
        <Reveal variant="up">
          <Link
            href="/contact"
            className="group flex flex-col gap-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <span className="text-display-lg inline-flex items-center gap-4 text-fg">
              <WordReveal text="Let’s work together" />
              <ArrowUpRight
                className="size-10 shrink-0 text-fg-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent md:size-14"
                aria-hidden="true"
              />
            </span>
          </Link>
        </Reveal>

        <div className="grid-line-t grid gap-10 pt-10 md:grid-cols-3">
          <div className="flex flex-col gap-1">
            <span className="font-display text-base font-extrabold text-fg">MUTHUKUMAR</span>
            <span className="text-meta text-fg-muted">UX / UI Designer</span>
            <span className="mt-3 text-sm text-fg-muted">
              &copy; {new Date().getFullYear()} Muthukumar D. All rights reserved.
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-meta text-fg-muted">Site</span>
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {externalLinks.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <span className="text-meta text-fg-muted">Elsewhere</span>
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
      </div>
    </footer>
  );
}

export { Footer };
