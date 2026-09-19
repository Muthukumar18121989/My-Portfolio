import { Hero } from "@/components/patterns/hero";
import { SectionBlock } from "@/components/patterns/section-block";
import { ProjectAccordion } from "@/components/patterns/project-accordion";
import { CareerTimeline } from "@/components/patterns/career-timeline";
import { AboutPreview } from "@/components/patterns/about-preview";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/section-reveal";
import { profile, careerJourney, careerStats, projects, skillGroups } from "@/lib/content";

const TOTAL_SECTIONS = "06";

// Curated order for the homepage's "Selected Work" index — deliberately
// distinct from `project.featured` (which also governs the /projects grid):
// this list adds Virtual Personal Stylist alongside the 4 featured
// enterprise case studies. All fields shown come straight from the real
// Project records in src/lib/content/projects.ts.
const SELECTED_WORK_SLUGS = [
  "twinx-ai-platform",
  "euroclear-bank",
  "virtual-personal-stylist",
  "production-workflow-revamp",
  "mck-tools",
] as const;

const selectedWorkProjects = SELECTED_WORK_SLUGS.map((slug) =>
  projects.find((p) => p.slug === slug)
).filter((p): p is (typeof projects)[number] => Boolean(p));

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
        <ProjectAccordion projects={selectedWorkProjects} />
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

      <AboutPreview index="05" total={TOTAL_SECTIONS} eyebrow="Beyond the résumé" />

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
