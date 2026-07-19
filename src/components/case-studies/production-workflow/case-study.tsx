import { Button } from "@/components/ui/button";
import { MetadataBadge } from "@/components/ui/metadata-badge";
import { Reveal } from "@/components/patterns/reveal";
import { HeuristicEvaluation, UserFlowDiagram, OutcomeMetrics, KeyLearnings } from "./sections";
import { BeforeAfter } from "./before-after";
import {
  LegacyInbox,
  LegacyAssignment,
  LegacyTaskDetail,
  LegacyStatusUpdate,
  LegacyDelivery,
} from "./legacy-screens";
import {
  ModernInbox,
  ModernAssignment,
  ModernTaskDetail,
  ModernStatusTracker,
  ModernDelivery,
} from "./modern-screens";

const PROCESS_STEPS = [
  "Discover",
  "Research",
  "Heuristic Evaluation",
  "Workflow Analysis",
  "Information Architecture",
  "Wireframes",
  "High-Fidelity UI",
  "Usability Improvements",
  "Developer Handoff",
] as const;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-xl font-extrabold text-fg md:text-2xl">{children}</h2>;
}

function ProductionWorkflowCaseStudy() {
  return (
    <div className="flex flex-col gap-16">
      {/* Team & duration */}
      <Reveal>
        <section className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-border py-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[0.625rem] tracking-[0.2em] text-fg-muted uppercase">
              Duration
            </span>
            <span className="text-sm text-fg">6 months</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[0.625rem] tracking-[0.2em] text-fg-muted uppercase">
              Team
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                "UX Designer (me)",
                "Business Analyst",
                "Developers",
                "Product Owner",
                "Production Managers",
                "Production VAs",
              ].map((role) => (
                <MetadataBadge key={role}>{role}</MetadataBadge>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Design process */}
      <Reveal>
        <section className="flex flex-col gap-6">
          <SectionHeading>Design Process</SectionHeading>
          <ol className="flex flex-wrap gap-2">
            {PROCESS_STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-1.5 rounded-full border border-border bg-bg-surface px-3 py-1.5 text-xs text-fg-muted"
              >
                <span className="font-mono text-accent">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      {/* Heuristic evaluation */}
      <Reveal>
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <SectionHeading>Heuristic Evaluation</SectionHeading>
            <p className="max-w-2xl text-sm text-fg-muted">
              An evaluation of the legacy platform against Nielsen&rsquo;s usability heuristics —
              the basis for prioritizing what to fix first.
            </p>
          </div>
          <HeuristicEvaluation />
        </section>
      </Reveal>

      {/* User flow */}
      <Reveal>
        <section className="flex flex-col gap-6">
          <SectionHeading>End-to-End Request Flow</SectionHeading>
          <UserFlowDiagram />
        </section>
      </Reveal>

      {/* Legacy vs modern */}
      <Reveal>
        <section className="flex flex-col gap-3">
          <SectionHeading>Legacy vs. Modern</SectionHeading>
          <p className="max-w-2xl text-sm text-fg-muted">
            Every screen recreated below uses fictional request data — no real client names,
            deadlines, or content from the original engagement.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <BeforeAfter
          screenTitle="Inbox Queue"
          legacyTreeItem="Inbox"
          modernNavItem="Inbox"
          legacy={<LegacyInbox />}
          modern={<ModernInbox />}
          improvements={[
            "Status and priority read at a glance via color, not a text column you have to scan",
            "Live counts replace a manual count of rows in the tree nav",
            "One consistent card pattern instead of a dense, unstyled table",
            "Requestor initials give instant recognition without opening the record",
          ]}
        />
      </Reveal>

      <Reveal>
        <BeforeAfter
          screenTitle="Assignment"
          legacyTreeItem="Inbox"
          modernNavItem="Inbox"
          legacy={<LegacyAssignment />}
          modern={<ModernAssignment />}
          improvements={[
            "Priority is a one-click pill, not a dropdown with no visual weight",
            "The request being assigned is shown as context, not just an ID in the title",
            "Fewer fields on screen — only what's needed to assign, not the entire record",
            "A single primary action instead of an unlabeled bevelled button",
          ]}
        />
      </Reveal>

      <Reveal>
        <BeforeAfter
          screenTitle="Task Detail"
          legacyTreeItem="In Progress"
          modernNavItem="Assigned to me"
          legacy={<LegacyTaskDetail />}
          modern={<ModernTaskDetail />}
          improvements={[
            "Metadata and activity history are visually separated instead of stacked tables",
            "Status and priority use the same chip language as the inbox — one system, not several",
            "Attachments are recognizable file chips instead of a filename buried in a table row",
          ]}
        />
      </Reveal>

      <Reveal>
        <BeforeAfter
          screenTitle="Status Tracker"
          legacyTreeItem="In Progress"
          modernNavItem="Assigned to me"
          legacy={<LegacyStatusUpdate />}
          modern={<ModernStatusTracker />}
          improvements={[
            "A visual stepper shows where the request sits in the whole lifecycle, not just the last change",
            "Invalid backward transitions aren't offered as options at all",
            "The comment feed reads like a conversation, not a timestamped log table",
          ]}
        />
      </Reveal>

      <Reveal>
        <BeforeAfter
          screenTitle="Delivery Confirmation"
          legacyTreeItem="Completed"
          modernNavItem="Completed"
          legacy={<LegacyDelivery />}
          modern={<ModernDelivery />}
          improvements={[
            "A clear success state confirms the action instead of a plain checkbox and button",
            "The file and recipient are shown as recognizable elements, not raw form fields",
            "Closing a request reads as a confirmation, not an irreversible form submit",
          ]}
        />
      </Reveal>

      {/* Design system recap */}
      <Reveal>
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <SectionHeading>Design System</SectionHeading>
            <p className="max-w-2xl text-sm text-fg-muted">
              A small set of reusable elements — buttons, chips, and cards — used consistently
              across every screen above, so the whole redesign feels like one product.
            </p>
          </div>
          <div className="flex flex-col gap-6 rounded-md border border-border bg-bg-surface p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Primary action</Button>
              <Button size="sm" variant="secondary">
                Secondary action
              </Button>
              <Button size="sm" variant="ghost">
                Ghost action
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {["New", "In Progress", "Pending Review", "Completed"].map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent"
                >
                  {s}
                </span>
              ))}
              {["Low", "Medium", "High"].map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-fg-muted/15 px-2.5 py-1 text-xs font-medium text-fg-muted"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Outcome */}
      <Reveal>
        <section className="flex flex-col gap-6 border-t border-border pt-10">
          <SectionHeading>Outcome</SectionHeading>
          <OutcomeMetrics />
        </section>
      </Reveal>

      {/* Key learnings */}
      <Reveal>
        <section className="flex flex-col gap-6">
          <SectionHeading>Key Learnings</SectionHeading>
          <KeyLearnings />
        </section>
      </Reveal>
    </div>
  );
}

export { ProductionWorkflowCaseStudy };
