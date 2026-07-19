import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimelineItem } from "@/components/patterns/timeline-item";
import { Reveal } from "@/components/patterns/reveal";
import {
  profile,
  experience,
  skillGroups,
  funFacts,
  certifications,
  education,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Muthukumar D's professional journey, design philosophy, and skills.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-20 px-6 py-16 md:px-16 md:py-24">
      <section className="flex flex-col gap-6">
        <h1 className="font-display text-4xl font-extrabold text-fg md:text-6xl">About</h1>
        <p className="max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
          {profile.aboutIntro}
        </p>
      </section>

      <Reveal>
        <section className="flex flex-col gap-8">
          <h2 className="font-display text-2xl font-extrabold text-fg md:text-3xl">
            Design philosophy
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {profile.philosophy.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 rounded-md border border-border bg-bg-surface p-5"
              >
                <h3 className="font-display text-base font-extrabold text-fg">{item.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="flex flex-col gap-8">
          <h2 className="font-display text-2xl font-extrabold text-fg md:text-3xl">
            Professional journey
          </h2>
          <ol className="flex flex-col gap-8 border-l border-border">
            {experience.map((entry) => (
              <TimelineItem key={`${entry.company}-${entry.dateRange}`} {...entry} />
            ))}
          </ol>
        </section>
      </Reveal>

      <Reveal>
        <section className="flex flex-col gap-8">
          <h2 className="font-display text-2xl font-extrabold text-fg md:text-3xl">
            Skills &amp; tools
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-3">
                <p className="font-mono text-xs tracking-[0.2em] text-fg-muted uppercase">
                  {group.label}
                </p>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-fg">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-extrabold text-fg md:text-3xl">
              Certifications
            </h2>
            <ul className="flex flex-col gap-2">
              {certifications.map((cert) => (
                <li key={cert} className="text-sm text-fg-muted">
                  {cert}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-extrabold text-fg md:text-3xl">Education</h2>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-fg">{education.degree}</p>
              <p className="text-sm text-fg-muted">{education.school}</p>
              <p className="font-mono text-xs text-fg-muted">
                {education.dateRange} &middot; {education.detail}
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="flex flex-col gap-6">
          <h2 className="font-display text-2xl font-extrabold text-fg md:text-3xl">Fun facts</h2>
          <ul className="flex flex-col gap-3">
            {funFacts.map((fact) => (
              <li key={fact} className="text-sm leading-relaxed text-fg-muted">
                {fact}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <section className="flex flex-col items-start gap-4 border-t border-border pt-10">
        <p className="text-sm text-fg-muted">Want the full detail in one document?</p>
        <Button asChild size="lg">
          <Link href="/resume">
            Download Resume <Download className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
