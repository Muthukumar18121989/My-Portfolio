import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/patterns/hero";
import { SectionBlock } from "@/components/patterns/section-block";
import { ShowcaseProjectCard } from "@/components/patterns/showcase-project-card";
import { CareerTimeline } from "@/components/patterns/career-timeline";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/section-reveal";
import {
  TwinxHeroArt,
  EuroclearHeroArt,
  ProductionWorkflowHeroArt,
  MckToolsHeroArt,
} from "@/components/patterns/case-study-hero-art";
import {
  profile,
  careerJourney,
  careerStats,
  projects,
  skillGroups,
  funFacts,
  type Project,
} from "@/lib/content";

const TOTAL_SECTIONS = "06";

// Fallback abstract hero art for featured projects that don't have a real
// banner image yet.
const FALLBACK_HERO_ART: Record<string, ReactNode> = {
  "twinx-ai-platform": <TwinxHeroArt />,
  "euroclear-bank": <EuroclearHeroArt />,
  "production-workflow-revamp": <ProductionWorkflowHeroArt />,
  "mck-tools": <MckToolsHeroArt />,
};

// Rendered here (a Server Component) and passed down as elements, not
// component references — a component *type* isn't serializable across the
// server/client boundary into ShowcaseProjectCard (a Client Component);
// the rendered result is. Prefers each project's real heroImage, falling
// back to the abstract SVG art only when one hasn't been supplied.
function getFeaturedArt(project: Project): ReactNode {
  if (project.heroImage) {
    return (
      <Image
        src={project.heroImage.src}
        alt={project.heroImage.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    );
  }
  return FALLBACK_HERO_ART[project.slug];
}

const featuredProjects = projects.filter((p) => p.featured);

export default function Home() {
  return (
    <>
      <Hero
        profile={{
          name: profile.name,
          role: profile.role,
          yearsExperience: profile.yearsExperience,
          heroSummary: profile.heroSummary,
          location: profile.location,
        }}
      />

      <SectionBlock
        index="01"
        total={TOTAL_SECTIONS}
        eyebrow="How I work"
        title="Design philosophy"
        description="Three ideas that show up in almost every project below."
      >
        <StaggerGroup className="grid gap-px border border-border bg-border md:grid-cols-3">
          {profile.philosophy.map((item) => (
            <StaggerItem key={item.title} className="flex flex-col gap-3 bg-bg p-7">
              <span className="text-meta text-accent">{item.title}</span>
              <p className="text-sm leading-relaxed text-fg-muted">{item.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionBlock>

      <SectionBlock
        index="02"
        total={TOTAL_SECTIONS}
        eyebrow="Selected work"
        title="Case studies"
        description="Enterprise AI, financial infrastructure, and internal tooling — from research through shipped design systems."
      >
        <StaggerGroup className="grid gap-6 md:grid-cols-2" stagger={0.08}>
          {featuredProjects.map((project, i) => (
            <StaggerItem key={project.slug}>
              <ShowcaseProjectCard project={project} index={i} heroArt={getFeaturedArt(project)} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal variant="up">
          <Button asChild variant="secondary" size="lg" className="self-start">
            <Link href="/projects">
              View all projects <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </SectionBlock>

      <SectionBlock
        index="03"
        total={TOTAL_SECTIONS}
        eyebrow="A decade of practice"
        title="Career journey"
        description="Designing enterprise experiences, solving complex business problems, and building scalable digital products."
      >
        <CareerTimeline milestones={careerJourney} />

        <Reveal variant="up">
          <div className="grid-line-t flex flex-col gap-6 pt-10">
            <div className="flex flex-wrap gap-10">
              <div className="flex flex-col gap-1.5">
                <span className="text-display-md text-accent">{careerStats.years}</span>
                <span className="text-meta text-fg-muted">Years Experience</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-display-md text-accent">{careerStats.organizations}</span>
                <span className="text-meta text-fg-muted">Organizations</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {careerStats.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-meta border border-border px-3 py-1.5 text-fg-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </SectionBlock>

      <SectionBlock
        index="04"
        total={TOTAL_SECTIONS}
        eyebrow="Toolkit"
        title="Capabilities"
        description="What I bring to a project, end to end."
      >
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.label} variant="up" delay={gi * 0.06}>
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
        index="05"
        total={TOTAL_SECTIONS}
        eyebrow="Beyond the résumé"
        title="About"
        description={profile.aboutIntro}
      >
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <StaggerGroup className="flex flex-col gap-4">
            {funFacts.map((fact) => (
              <StaggerItem
                key={fact}
                className="grid-line-t pt-4 text-sm leading-relaxed text-fg-muted"
              >
                {fact}
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal variant="up">
            <Button asChild variant="secondary" size="lg" className="self-start">
              <Link href="/about">
                More about me <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </SectionBlock>

      <SectionBlock index="06" total={TOTAL_SECTIONS} eyebrow="Testimonials" title="Kind words">
        <Reveal variant="up">
          <p className="border border-dashed border-border p-8 text-sm text-fg-muted">
            Client and colleague testimonials are being collected and will appear here soon.
          </p>
        </Reveal>
      </SectionBlock>
    </>
  );
}
