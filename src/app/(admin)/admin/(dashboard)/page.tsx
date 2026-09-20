import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { href: "/admin/profile", label: "Profile", desc: "Name, role, bio, photo" },
  { href: "/admin/projects", label: "Projects", desc: "Case studies, public/private, uploads" },
  { href: "/admin/career", label: "Career Timeline", desc: "Work experience history" },
  { href: "/admin/testimonials", label: "Testimonials", desc: "Client & colleague quotes" },
  { href: "/admin/philosophy", label: "Design Philosophy", desc: "The 3 homepage statements" },
  { href: "/admin/stats", label: "Stats", desc: "About page headline numbers" },
  { href: "/admin/skills", label: "Skills & Tools", desc: "Capability groups" },
  { href: "/admin/certifications", label: "Certifications", desc: "Credentials list" },
  { href: "/admin/education", label: "Education", desc: "Degree & school" },
  { href: "/admin/fun-facts", label: "Fun Facts", desc: "Off-the-clock list" },
  { href: "/admin/settings", label: "Settings", desc: "Resume upload, career tags" },
] as const;

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-display-lg text-fg">Dashboard</h1>
        <p className="text-sm text-fg-muted">
          Every section below edits real content — saves are live on the site immediately.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group flex flex-col gap-1.5 border border-border bg-bg-surface p-5 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <span className="text-base font-medium text-fg group-hover:text-accent">
              {section.label}
            </span>
            <span className="text-sm text-fg-muted">{section.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
