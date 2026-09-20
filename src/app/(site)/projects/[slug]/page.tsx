import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetadataChip } from "@/components/ui/metadata-chip";
import { Reveal } from "@/components/motion/section-reveal";
import { WordReveal } from "@/components/motion/text-reveal";
import {
  TwinxHeroArt,
  EuroclearHeroArt,
  ProductionWorkflowHeroArt,
  MckToolsHeroArt,
} from "@/components/patterns/case-study-hero-art";
import { LaptopMockup } from "@/components/patterns/laptop-mockup";
import { EnterpriseProjectCard } from "@/components/patterns/enterprise-project-card";
import { RecruiterGate } from "@/components/patterns/recruiter-gate";
import { ProductionWorkflowCaseStudy } from "@/components/case-studies/production-workflow/case-study";
import { MckToolsCaseStudy } from "@/components/case-studies/mck-tools/case-study";
import { getProjectBySlug } from "@/lib/data";
import type { CaseStudySection, Project } from "@/lib/content/types";

// The black-canvas visual system applied to the case-study frame — headings,
// metadata, section rhythm, image treatment. The bespoke Production Workflow
// and McK Tools recreations (src/components/case-studies/*) are untouched:
// this file only reskins what wraps them, per the brief's "reskin/reframe,
// don't replace" instruction. Content, sections, claims, and images below
// are all unchanged from the original template.
const HERO_ART: Record<string, React.ComponentType> = {
  "twinx-ai-platform": TwinxHeroArt,
  "euroclear-bank": EuroclearHeroArt,
  "production-workflow-revamp": ProductionWorkflowHeroArt,
  "mck-tools": MckToolsHeroArt,
};

const CUSTOM_CASE_STUDIES: Record<string, React.ComponentType> = {
  "production-workflow-revamp": ProductionWorkflowCaseStudy,
  "mck-tools": MckToolsCaseStudy,
};

// No generateStaticParams — projects are managed live via the admin, so
// this route renders dynamically (see the (site) layout's
// `export const dynamic = "force-dynamic"`) rather than being pre-built
// for a fixed set of slugs at build time.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    // Private projects shouldn't turn up in search results even though the
    // page itself is gated — keep them out of the index entirely.
    robots: project.visibility === "private" ? { index: false, follow: false } : undefined,
  };
}

const SECTION_ORDER: (keyof Project["sections"])[] = [
  "overview",
  "problem",
  "myRole",
  "research",
  "personas",
  "journey",
  "wireframes",
  "process",
  "uiDesign",
  "decisions",
  "challenges",
  "takeaways",
];

function Section({ section, index }: { section: CaseStudySection; index: number }) {
  return (
    <section className="grid-line-t flex flex-col gap-3 pt-10">
      <div className="flex items-baseline gap-4">
        <span className="text-meta text-accent">{String(index + 1).padStart(2, "0")}</span>
        <h2 className="text-display-md text-fg">{section.heading}</h2>
      </div>
      {section.placeholder ? (
        <p className="border border-dashed border-border bg-bg-surface p-5 text-sm text-fg-muted">
          {section.body}
        </p>
      ) : (
        <p className="max-w-3xl text-base leading-relaxed text-fg-muted">{section.body}</p>
      )}
    </section>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const HeroArt = HERO_ART[project.slug];
  const hasEnterpriseShowcase = Boolean(project.enterpriseShowcase?.length);
  const CustomCaseStudy = CUSTOM_CASE_STUDIES[project.slug];
  const bodySections = hasEnterpriseShowcase
    ? SECTION_ORDER.filter((key) => key !== "overview")
    : CustomCaseStudy
      ? (["overview", "problem", "myRole"] as const)
      : SECTION_ORDER;

  const screenshotsGrid = (
    <div className="grid gap-10 md:grid-cols-2">
      {project.screenshots.map((shot) =>
        project.screenshotStyle === "laptop" ? (
          <figure key={shot.src} className="flex flex-col gap-3">
            <LaptopMockup>
              <Image
                src={shot.src}
                alt={`${project.title} — ${shot.caption}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </LaptopMockup>
            <figcaption className="text-center text-sm text-fg-muted">{shot.caption}</figcaption>
          </figure>
        ) : project.screenshotStyle === "contain" ? (
          <figure key={shot.src} className="overflow-hidden border border-border bg-bg-surface">
            <div className="relative h-[420px] w-full">
              <Image
                src={shot.src}
                alt={`${project.title} — ${shot.caption}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="px-4 py-3 text-sm text-fg-muted">{shot.caption}</figcaption>
          </figure>
        ) : (
          <figure key={shot.src} className="overflow-hidden border border-border bg-bg-surface">
            <div className="relative aspect-[16/10]">
              <Image
                src={shot.src}
                alt={`${project.title} — ${shot.caption}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="px-4 py-3 text-sm text-fg-muted">{shot.caption}</figcaption>
          </figure>
        )
      )}
    </div>
  );

  // Everything below is gated as one unit for private projects (see the
  // return statement) — the page used to only gate the screenshots grid,
  // leaving the title, company, role, impact figures, and every case-study
  // section readable by anyone with the URL, including via the homepage's
  // own "Selected Work" cards, which link straight to it. "private" now
  // means the whole page, matching what the Project type's own doc comment
  // already claimed it meant.
  const body = (
    <>
      {/* Hero */}
      <div className="grid-line-t flex flex-col gap-6 pt-10">
        <Link
          href="/projects"
          className="inline-flex w-fit items-center gap-2 text-meta text-fg-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" /> All projects
        </Link>
        <h1 className="text-display-xl text-fg">
          <WordReveal text={project.title} />
        </h1>
        <Reveal variant="up" delay={0.15}>
          <div className="flex flex-wrap items-center gap-2.5">
            <MetadataChip label="Company">{project.company}</MetadataChip>
            <MetadataChip label="Role">{project.role}</MetadataChip>
            <MetadataChip label="Type">{project.type}</MetadataChip>
            <MetadataChip label="Year">{project.year}</MetadataChip>
            {project.externalUrl && (
              <Button asChild variant="secondary" size="sm" className="ml-1">
                <a href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                  {project.externalUrlLabel ?? "View live"}{" "}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </Button>
            )}
          </div>
        </Reveal>
        <Reveal variant="scale" delay={0.2}>
          <div className="aspect-[21/9] overflow-hidden border border-border bg-bg-surface">
            {project.heroImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={project.heroImage.src}
                  alt={project.heroImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            ) : HeroArt ? (
              <HeroArt />
            ) : null}
          </div>
        </Reveal>
      </div>

      {hasEnterpriseShowcase ? (
        <Reveal variant="up">
          <section className="grid-line-t flex flex-col gap-6 pt-10">
            <div className="flex flex-col gap-3">
              <h2 className="text-display-lg text-fg">Featured Enterprise Projects</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">
                {project.title} is one platform serving multiple business units. Below: the platform
                itself, its shared design system, and the domain-specific modules I designed under
                it.
              </p>
            </div>
            <div className="flex flex-col gap-8">
              {project.enterpriseShowcase!.map((card) => (
                <EnterpriseProjectCard key={card.title} card={card} />
              ))}
            </div>
          </section>
        </Reveal>
      ) : (
        /* Impact */
        <Reveal variant="up">
          <section className="grid-line-t grid gap-4 pt-10 md:grid-cols-3">
            {project.impact.map((line) => (
              <p key={line} className="text-sm leading-relaxed text-fg">
                {line}
              </p>
            ))}
          </section>
        </Reveal>
      )}

      {/* Body sections */}
      <div className="flex flex-col gap-14">
        {bodySections.map((key, i) => (
          <Reveal key={key} variant="up">
            <Section section={project.sections[key]} index={i} />
          </Reveal>
        ))}
      </div>

      {CustomCaseStudy && <CustomCaseStudy />}

      {/* Screenshots — heading defaults to "Application Screens" but is
          overridable per project (e.g. hardware renders aren't app UI). No
          gate here anymore: private projects are gated once, for the whole
          page, below — not re-gated per section. */}
      {project.screenshots.length > 0 && (
        <Reveal variant="up">
          <section className="grid-line-t flex flex-col gap-6 pt-10">
            <h2 className="text-display-md text-fg">
              {project.screenshotsHeading ?? "Application Screens"}
            </h2>
            {screenshotsGrid}
          </section>
        </Reveal>
      )}
    </>
  );

  return (
    <div className="flex flex-col gap-16 px-6 py-20 md:px-16 md:py-28">
      {project.visibility === "private" ? (
        <RecruiterGate
          password="viewrecruiter"
          message={`"${project.title}" is a private case study, shared with recruiters on request. Enter the access password to view it.`}
        >
          {body}
        </RecruiterGate>
      ) : (
        body
      )}
    </div>
  );
}
