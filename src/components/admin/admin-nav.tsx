"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/career", label: "Career" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/philosophy", label: "Philosophy" },
  { href: "/admin/stats", label: "Stats" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/fun-facts", label: "Fun Facts" },
  { href: "/admin/settings", label: "Settings" },
] as const;

function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="grid-line-b flex flex-wrap gap-x-5 gap-y-2 px-6 py-3 md:px-10">
      {LINKS.map((link) => {
        const active =
          link.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-meta transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
              active ? "text-accent" : "text-fg-muted hover:text-fg"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export { AdminNav };
