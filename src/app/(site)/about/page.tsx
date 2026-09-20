import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimelineItem } from "@/components/patterns/timeline-item";
import { SectionBlock } from "@/components/patterns/section-block";
import { AboutPortrait } from "@/components/patterns/about-portrait";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/section-reveal";
import { WordReveal } from "@/components/motion/text-reveal";
import {
  getProfile,
  getStats,
  getPhilosophy,
  getCareerEntries,
  getSkillGroups,
  getFunFacts,
  getCertifications,
  getEducation,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Muthukumar D's professional journey, design philosophy, and skills.",
};

const TOTAL_SECTIONS = "05";

export default async function AboutPage() {
  const [
    profile,
    stats,
    philosophy,
    careerEntries,
    skillGroups,
    funFacts,
    certifications,
    education,
  ] = await Promise.all([
    getProfile(),
    getStats(),
    getPhilosophy(),
    getCareerEntries(),
    getSkillGroups(),
    getFunFacts(),
    getCertifications(),
    getEducation(),
  ]);

  return (
    <div className="flex flex-col overflow-x-clip">
      <section className="grid-line-t grid gap-14 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16 md:px-16 md:py-28">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-meta text-fg-muted">Get to know me</span>
            <h1 className="text-display-xl text-fg">
              <WordReveal text="About" />{" "}
              <WordReveal text="Muthukumar" delay={0.25} className="text-accent" />
            </h1>
          </div>
          <Reveal variant="up" delay={0.3}>
            <p className="max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
              {profile.aboutIntro}
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.4}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col gap-1">
                  <span className="text-display-md text-fg">{stat.value}</span>
                  <span className="text-xs leading-snug text-fg-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal variant="up" delay={0.5}>
            <Button asChild size="lg" className="self-start">
              <Link href="/contact">
                Let&rsquo;s Connect <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
        <Reveal variant="scale" delay={0.2}>
          <AboutPortrait name={profile.name} photoUrl={profile.photoUrl} />
        </Reveal>
      </section>

      <SectionBlock
        index="01"
        total={TOTAL_SECTIONS}
        eyebrow="How I work"
        title="Design philosophy"
      >
        <StaggerGroup className="grid gap-px border border-border bg-border md:grid-cols-3">
          {philosophy.map((item) => (
            <StaggerItem key={item.id} className="flex flex-col gap-3 bg-bg p-7">
              <span className="text-meta text-accent">{item.title}</span>
              <p className="text-sm leading-relaxed text-fg-muted">{item.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionBlock>

      <SectionBlock
        index="02"
        total={TOTAL_SECTIONS}
        eyebrow="Résumé, expanded"
        title="Professional journey"
      >
        <ol className="flex flex-col gap-8 border-l border-border">
          {careerEntries.map((entry) => (
            <TimelineItem
              key={entry.id}
              role={entry.role}
              company={entry.company}
              dateRange={entry.dateRange}
              achievements={entry.achievements}
            />
          ))}
        </ol>
      </SectionBlock>

      <SectionBlock index="03" total={TOTAL_SECTIONS} eyebrow="Toolkit" title="Skills & tools">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.id} variant="up" delay={gi * 0.06}>
              <div className="flex flex-col gap-1">
                <span className="text-meta mb-3 text-accent">{group.label}</span>
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="grid-line-t block py-2.5 text-sm text-fg-muted transition-all duration-300 hover:translate-x-2 hover:text-fg md:text-base"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        index="04"
        total={TOTAL_SECTIONS}
        eyebrow="Credentials"
        title="Certifications & education"
      >
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal variant="up">
            <div className="flex flex-col gap-4">
              <span className="text-meta text-fg-muted">Certifications</span>
              <ul className="flex flex-col gap-2">
                {certifications.map((cert) => (
                  <li key={cert.id} className="text-sm text-fg-muted">
                    {cert.content}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal variant="up" delay={0.08}>
            <div className="flex flex-col gap-4">
              <span className="text-meta text-fg-muted">Education</span>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-fg">{education.degree}</p>
                <p className="text-sm text-fg-muted">{education.school}</p>
                <p className="text-meta text-fg-muted">
                  {education.dateRange} &middot; {education.detail}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionBlock>

      <SectionBlock index="05" total={TOTAL_SECTIONS} eyebrow="Off the clock" title="Fun facts">
        <StaggerGroup className="flex flex-col">
          {funFacts.map((fact) => (
            <StaggerItem
              key={fact.id}
              className="grid-line-t py-4 text-sm leading-relaxed text-fg-muted"
            >
              {fact.content}
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal variant="up" delay={0.1}>
          <div className="grid-line-t flex flex-col items-start gap-4 pt-10">
            <p className="text-sm text-fg-muted">Want the full detail in one document?</p>
            <Button asChild size="lg">
              <Link href="/resume">
                Download Resume <Download className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </SectionBlock>
    </div>
  );
}
