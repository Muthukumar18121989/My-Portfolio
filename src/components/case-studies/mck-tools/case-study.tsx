import { MetadataBadge } from "@/components/ui/metadata-badge";
import { Reveal } from "@/components/patterns/reveal";
import { RibbonMockup } from "./ribbon-mockup";
import { ProfileExtractorPane, ProfileExtractorStates } from "./profile-extractor";
import { McKIconsPane, McKIconsStates } from "./mck-icons";
import {
  DesignProcess,
  ProfileSearchFlow,
  IconSearchFlow,
  DesignSystemRecap,
  FutureModules,
  OutcomeList,
  KeyLearningsList,
} from "./sections";

const CHALLENGE_ITEMS = [
  "Searching for consultant profile information across multiple internal systems",
  "Copying biographies and credentials manually into slides",
  "Looking for approved icons in a separate brand asset library",
  "Switching between tools mid-deck, breaking flow",
  "Maintaining presentation consistency across teams",
  "Repeating the same formatting tasks deck after deck",
] as const;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-xl font-extrabold text-fg md:text-2xl">{children}</h2>;
}

function MckToolsCaseStudy() {
  return (
    <div className="flex flex-col gap-16">
      {/* Team & duration */}
      <Reveal>
        <section className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-border py-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[0.625rem] tracking-[0.2em] text-fg-muted uppercase">
              Duration
            </span>
            <span className="text-sm text-fg">8 months</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[0.625rem] tracking-[0.2em] text-fg-muted uppercase">
              Team
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                "UX Designer (me)",
                "Business Analyst",
                "Product Owner",
                "Developers",
                "QA Team",
                "Presentation Technology Team",
              ].map((role) => (
                <MetadataBadge key={role}>{role}</MetadataBadge>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Business challenge */}
      <Reveal>
        <section className="flex flex-col gap-4">
          <SectionHeading>Business Challenge</SectionHeading>
          <p className="max-w-2xl text-sm text-fg-muted">
            Consultants frequently spent valuable time performing repetitive tasks while building
            presentations:
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {CHALLENGE_ITEMS.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-danger"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* Design process */}
      <Reveal>
        <section className="flex flex-col gap-6">
          <SectionHeading>Design Process</SectionHeading>
          <DesignProcess />
        </section>
      </Reveal>

      {/* Ribbon */}
      <Reveal>
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <SectionHeading>The PowerPoint Ribbon</SectionHeading>
            <p className="max-w-2xl text-sm text-fg-muted">
              McK Tools lives inside PowerPoint itself, as a dedicated ribbon tab — no separate
              application to open.
            </p>
          </div>
          <div className="overflow-x-auto">
            <RibbonMockup />
          </div>
        </section>
      </Reveal>

      {/* Tool 1 */}
      <Reveal>
        <section className="flex flex-col gap-6 border-t border-border pt-10">
          <div className="flex flex-col gap-2">
            <MetadataBadge>Tool 1</MetadataBadge>
            <SectionHeading>Profile Extractor</SectionHeading>
            <p className="max-w-2xl text-sm text-fg-muted">
              Search for a McKinsey consultant and insert their formatted profile — name,
              designation, office, and biography — directly into the current slide, without leaving
              PowerPoint.
            </p>
          </div>
          <ProfileExtractorPane />
          <ProfileExtractorStates />
        </section>
      </Reveal>

      {/* Tool 2 */}
      <Reveal>
        <section className="flex flex-col gap-6 border-t border-border pt-10">
          <div className="flex flex-col gap-2">
            <MetadataBadge>Tool 2</MetadataBadge>
            <SectionHeading>McK Icons</SectionHeading>
            <p className="max-w-2xl text-sm text-fg-muted">
              A centralized, approved icon library searchable directly inside PowerPoint — outline
              or filled, resizable, recolorable, without hunting through a shared drive.
            </p>
          </div>
          <McKIconsPane />
          <McKIconsStates />
        </section>
      </Reveal>

      {/* User flows */}
      <Reveal>
        <section className="flex flex-col gap-8 border-t border-border pt-10">
          <SectionHeading>User Flows</SectionHeading>
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[0.625rem] tracking-[0.2em] text-fg-muted uppercase">
              Profile Extractor
            </span>
            <ProfileSearchFlow />
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[0.625rem] tracking-[0.2em] text-fg-muted uppercase">
              McK Icons
            </span>
            <IconSearchFlow />
          </div>
        </section>
      </Reveal>

      {/* Design system */}
      <Reveal>
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <SectionHeading>Design System</SectionHeading>
            <p className="max-w-2xl text-sm text-fg-muted">
              The same buttons, search fields, tabs, and badges used consistently across both tools.
            </p>
          </div>
          <DesignSystemRecap />
        </section>
      </Reveal>

      {/* Future modules */}
      <Reveal>
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <SectionHeading>Scalable Plugin Architecture</SectionHeading>
            <p className="max-w-2xl text-sm text-fg-muted">
              McK Tools was designed to support additional productivity modules beyond the initial
              release — Profile Extractor and McK Icons shipped first, with room for more on the
              same architecture.
            </p>
          </div>
          <FutureModules />
        </section>
      </Reveal>

      {/* Outcome */}
      <Reveal>
        <section className="flex flex-col gap-6 border-t border-border pt-10">
          <SectionHeading>Outcome</SectionHeading>
          <OutcomeList />
        </section>
      </Reveal>

      {/* Key learnings */}
      <Reveal>
        <section className="flex flex-col gap-6">
          <SectionHeading>Key Learnings</SectionHeading>
          <KeyLearningsList />
        </section>
      </Reveal>
    </div>
  );
}

export { MckToolsCaseStudy };
