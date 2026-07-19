import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/patterns/marquee";
import { Reveal } from "@/components/patterns/reveal";
import { profile, stats, companies, marqueeSkills } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col gap-10 px-6 py-16 md:px-16 md:py-28">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-2xl flex-col gap-6">
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              {profile.location} &middot; Available for select engagements
            </p>
            <h1 className="font-display text-5xl leading-[1.05] font-extrabold text-fg md:text-7xl">
              {profile.name}
            </h1>
            <p className="font-display text-xl font-medium text-fg-muted md:text-2xl">
              {profile.role} — {profile.yearsExperience}+ years
            </p>
            <p className="max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
              {profile.heroSummary}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg">
                <Link href="/projects">
                  View Work <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/resume">
                  Download Resume <Download className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/contact">
                  Contact <Mail className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative size-40 shrink-0 overflow-hidden rounded-full border border-border bg-bg-surface md:size-52">
            <Image
              src="/images/profile.jpg"
              alt={`${profile.name}, ${profile.role}`}
              fill
              sizes="(min-width: 768px) 13rem, 10rem"
              className="object-cover object-[center_25%]"
              priority
            />
          </div>
        </div>
      </section>

      {/* Skills marquee */}
      <section className="border-y border-border py-6" aria-label="Skills and tools">
        <Marquee items={marqueeSkills} />
      </section>

      {/* Companies + stats */}
      <Reveal>
        <section className="flex flex-col gap-10 px-6 py-16 md:px-16">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs tracking-[0.2em] text-fg-muted uppercase">
              Selected companies
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-3">
              {companies.map((company) => (
                <span
                  key={company}
                  className="font-display text-lg font-medium text-fg-muted md:text-xl"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-border pt-10 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5">
                <span className="font-display text-3xl font-extrabold text-accent md:text-4xl">
                  {stat.value}
                </span>
                <span className="text-sm text-fg-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Testimonials — honest placeholder, no fabricated quotes */}
      <Reveal>
        <section className="flex flex-col gap-6 border-t border-border px-6 py-16 md:px-16">
          <h2 className="font-display text-2xl font-extrabold text-fg md:text-3xl">Testimonials</h2>
          <div className="rounded-md border border-dashed border-border bg-bg-surface p-8 text-center">
            <p className="text-sm text-fg-muted">
              Client and colleague testimonials are being collected and will appear here soon.
            </p>
          </div>
        </section>
      </Reveal>
    </>
  );
}
