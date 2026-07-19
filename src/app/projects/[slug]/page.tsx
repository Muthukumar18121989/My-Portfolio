import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MetadataBadge } from "@/components/ui/metadata-badge";
import { Reveal } from "@/components/patterns/reveal";
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
import { projects, getProjectBySlug } from "@/lib/content";
import type { CaseStudySection } from "@/lib/content";

const HERO_ART: Record<string, React.ComponentType> = {
  "twinx-ai-platform": TwinxHeroArt,
  "euroclear-bank": EuroclearHeroArt,
  "production-workflow-revamp": ProductionWorkflowHeroArt,
  "mck-tools": MckToolsHeroArt,
};

// Case studies whose content (heuristics, before/after screens, plugin
// mockups) doesn't fit the generic 12-section template get a dedicated
// component instead — additive per-slug, same pattern as enterpriseShowcase.
const CUSTOM_CASE_STUDIES: Record<string, React.ComponentType> = {
  "production-workflow-revamp": ProductionWorkflowCaseStudy,
  "mck-tools": MckToolsCaseStudy,
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

const SECTION_ORDER: (keyof (typeof projects)[number]["sections"])[] = [
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

function Section({ section }: { section: CaseStudySection }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-xl font-extrabold text-fg md:text-2xl">{section.heading}</h2>
      {section.placeholder ? (
        <p className="rounded-md border border-dashed border-border bg-bg-surface p-5 text-sm text-fg-muted">
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
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const HeroArt = HERO_ART[project.slug];
  const hasEnterpriseShowcase = Boolean(project.enterpriseShowcase?.length);
  const CustomCaseStudy = CUSTOM_CASE_STUDIES[project.slug];
  const bodySections = hasEnterpriseShowcase
    ? SECTION_ORDER.filter((key) => key !== "overview")
    : CustomCaseStudy
      ? (["overview", "problem", "myRole"] as const)
      : SECTION_ORDER;

  return (
    <div className="flex flex-col gap-16 px-6 py-16 md:px-16 md:py-24">
      {/* Hero */}
      <div className="flex flex-col gap-6">
        <Link
          href="/projects"
          className="w-fit text-sm text-fg-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          ← All projects
        </Link>
        <h1 className="font-display text-4xl font-extrabold text-fg md:text-6xl">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-2.5">
          <MetadataBadge>{project.company}</MetadataBadge>
          <MetadataBadge>{project.role}</MetadataBadge>
          <MetadataBadge>{project.type}</MetadataBadge>
          <MetadataBadge>{project.year}</MetadataBadge>
        </div>
        <div className="aspect-[21/9] overflow-hidden rounded-md border border-border bg-bg-surface">
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
      </div>

      {hasEnterpriseShowcase ? (
        <Reveal>
          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-2xl font-extrabold text-fg md:text-3xl">
                Featured Enterprise Projects
              </h2>
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
        <Reveal>
          <section className="grid gap-4 border-y border-border py-8 md:grid-cols-3">
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
        {bodySections.map((key) => (
          <Reveal key={key}>
            <Section section={project.sections[key]} />
          </Reveal>
        ))}
      </div>

      {CustomCaseStudy && <CustomCaseStudy />}

      {/* Application screens */}
      {project.screenshots.length > 0 && (
        <Reveal>
          <section className="flex flex-col gap-6 border-t border-border pt-10">
            <h2 className="font-display text-xl font-extrabold text-fg md:text-2xl">
              Application Screens
            </h2>
            <RecruiterGate>
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
                      <figcaption className="text-center text-sm text-fg-muted">
                        {shot.caption}
                      </figcaption>
                    </figure>
                  ) : project.screenshotStyle === "contain" ? (
                    <figure
                      key={shot.src}
                      className="overflow-hidden rounded-md border border-border bg-bg-surface"
                    >
                      <div className="relative h-[420px] w-full">
                        <Image
                          src={shot.src}
                          alt={`${project.title} — ${shot.caption}`}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-contain"
                        />
                      </div>
                      <figcaption className="px-4 py-3 text-sm text-fg-muted">
                        {shot.caption}
                      </figcaption>
                    </figure>
                  ) : (
                    <figure
                      key={shot.src}
                      className="overflow-hidden rounded-md border border-border bg-bg-surface"
                    >
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={shot.src}
                          alt={`${project.title} — ${shot.caption}`}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="px-4 py-3 text-sm text-fg-muted">
                        {shot.caption}
                      </figcaption>
                    </figure>
                  )
                )}
              </div>
            </RecruiterGate>
          </section>
        </Reveal>
      )}
    </div>
  );
}
