"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/section-reveal";
import { DURATION, EASE_EDITORIAL, EASE_SNAPPY, VIEWPORT_ONCE } from "@/lib/motion";
import type { Project } from "@/lib/content";

// The homepage's "Selected Work" presentation: an editorial project index
// where each row expands in place rather than a grid of large preview
// cards. Rows never navigate — the whole point is a flat, archive-style
// list; the only route out of the section is the "View All Projects" CTA
// at the bottom, to /projects. Driven entirely by the real Project records
// passed in — no separate data source, no invented fields.

/** Only twinx-ai-platform carries toolkit data today (inside its enterprise
    showcase cards) — every other featured project simply has none, so the
    Tools block is omitted for them rather than backfilled with a guess. */
function getProjectTools(project: Project): string[] {
  if (!project.enterpriseShowcase?.length) return [];
  const seen = new Set<string>();
  for (const card of project.enterpriseShowcase) {
    card.toolkit?.forEach((tool) => seen.add(tool));
  }
  return Array.from(seen);
}

const detailVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const detailItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.fast, ease: EASE_EDITORIAL } },
};

const toolsContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.28 } },
};

const toolItemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.fast, ease: EASE_EDITORIAL } },
};

function ProjectTools({ tools }: { tools: string[] }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-meta text-fg-muted">Tools</span>
      <motion.div
        variants={shouldReduceMotion ? undefined : toolsContainerVariants}
        className="flex flex-wrap gap-2"
      >
        {tools.map((tool) => (
          <motion.span
            key={tool}
            variants={shouldReduceMotion ? undefined : toolItemVariants}
            className="text-meta border border-border px-2 py-1 text-fg-muted"
          >
            {tool}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

function ProjectDetails({
  project,
  tools,
  isOpen,
}: {
  project: Project;
  tools: string[];
  isOpen: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : detailVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      className="flex gap-4 pb-8 md:gap-8 md:pb-10"
    >
      <span aria-hidden="true" className="w-10 flex-none md:w-14" />
      <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="flex flex-1 flex-col gap-5">
          <motion.div variants={shouldReduceMotion ? undefined : detailItemVariants}>
            <p className="max-w-2xl text-sm leading-relaxed text-fg-muted md:text-base">
              {project.summary}
            </p>
          </motion.div>
          <motion.div variants={shouldReduceMotion ? undefined : detailItemVariants}>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <dt className="text-meta text-fg-muted">Role</dt>
                <dd className="text-sm text-fg">{project.role}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-meta text-fg-muted">Company</dt>
                <dd className="text-sm text-fg">{project.company}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-meta text-fg-muted">Year</dt>
                <dd className="text-sm text-fg">{project.year}</dd>
              </div>
            </dl>
          </motion.div>
          {tools.length > 0 && (
            <motion.div variants={shouldReduceMotion ? undefined : detailItemVariants}>
              <ProjectTools tools={tools} />
            </motion.div>
          )}
        </div>
        {project.heroImage && (
          <motion.div
            variants={shouldReduceMotion ? undefined : detailItemVariants}
            className="relative aspect-[4/3] w-24 flex-none overflow-hidden border border-border bg-bg-surface md:w-28"
          >
            <Image src={project.heroImage.src} alt="" fill sizes="112px" className="object-cover" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function PlusMinusIcon({ open }: { open: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0.01 : DURATION.fast;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative mt-1 flex size-7 flex-none items-center justify-center rounded-full border transition-colors duration-300 md:mt-1.5",
        open ? "border-accent" : "border-border group-hover:border-fg-muted"
      )}
    >
      <motion.span
        className={cn("absolute h-px w-3 bg-fg", open && "bg-accent")}
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration, ease: EASE_SNAPPY }}
      />
      <motion.span
        className={cn("absolute h-3 w-px bg-fg", open && "bg-accent")}
        animate={{ scaleY: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ duration, ease: EASE_SNAPPY }}
      />
    </span>
  );
}

function AnimatedDivider({ delay = 0 }: { delay?: number }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className="h-px w-full bg-border" />;
  }
  return (
    <div className="h-px w-full overflow-hidden">
      <motion.div
        className="h-px w-full bg-border"
        style={{ transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, delay, ease: EASE_EDITORIAL }}
      />
    </div>
  );
}

interface ProjectRowProps {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  dividerDelay: number;
  registerTriggerRef: (el: HTMLButtonElement | null) => void;
  onKeyNav: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

function ProjectRow({
  project,
  index,
  isOpen,
  onToggle,
  dividerDelay,
  registerTriggerRef,
  onKeyNav,
}: ProjectRowProps) {
  const shouldReduceMotion = useReducedMotion();
  const tools = getProjectTools(project);
  const triggerId = `project-trigger-${project.slug}`;
  const panelId = `project-panel-${project.slug}`;

  return (
    <div>
      <AnimatedDivider delay={dividerDelay} />
      <h3>
        <button
          ref={registerTriggerRef}
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          onKeyDown={onKeyNav}
          className="group flex w-full items-start justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus md:py-8"
        >
          <span className="flex items-baseline gap-4 md:gap-8">
            <span
              className={cn(
                "text-meta w-10 flex-none transition-colors duration-300 md:w-14",
                isOpen ? "text-accent" : "text-fg-muted group-hover:text-accent"
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "text-display-md block transition-transform duration-300 ease-out",
                  isOpen ? "text-accent" : "text-fg group-hover:translate-x-2"
                )}
              >
                {project.title}
              </span>
              <span className="text-meta text-fg-muted">
                {project.type} · {project.company}
              </span>
            </span>
          </span>
          <PlusMinusIcon open={isOpen} />
        </button>
      </h3>
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{
          height: { duration: shouldReduceMotion ? 0.01 : DURATION.base, ease: EASE_EDITORIAL },
          opacity: {
            duration: shouldReduceMotion ? 0.01 : DURATION.fast,
            delay: isOpen && !shouldReduceMotion ? 0.1 : 0,
          },
        }}
        className="overflow-hidden"
      >
        <ProjectDetails project={project} tools={tools} isOpen={isOpen} />
      </motion.div>
    </div>
  );
}

function ViewAllProjects() {
  return (
    <Reveal variant="up" delay={0.1}>
      <Link
        href="/projects"
        className="group relative flex flex-col gap-6 py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus md:py-10"
      >
        <span aria-hidden="true" className="relative block h-px w-full bg-border">
          <span className="absolute inset-y-0 left-0 block h-px w-0 bg-accent transition-[width] duration-500 ease-out group-hover:w-full" />
        </span>
        <span className="flex items-center justify-between gap-6">
          <span className="flex flex-col gap-1.5">
            <span className="text-display-md block text-fg transition-transform duration-300 ease-out group-hover:translate-x-2">
              View All Projects
            </span>
            <span className="text-meta block text-fg-muted transition-transform duration-300 ease-out group-hover:translate-x-2">
              Explore the complete work archive
            </span>
          </span>
          <span className="flex size-11 flex-none items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-accent">
            <ArrowRight
              className="size-4 text-fg transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-accent"
              aria-hidden="true"
            />
          </span>
        </span>
        <span aria-hidden="true" className="block h-px w-full bg-border" />
      </Link>
    </Reveal>
  );
}

export interface ProjectAccordionProps {
  projects: Project[];
}

function ProjectAccordion({ projects }: ProjectAccordionProps) {
  const [openSlug, setOpenSlug] = React.useState<string | null>(null);
  const triggerRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  function handleToggle(slug: string) {
    setOpenSlug((current) => (current === slug ? null : slug));
  }

  function handleKeyNav(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      triggerRefs.current[index + 1]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      triggerRefs.current[index - 1]?.focus();
    }
  }

  return (
    <div className="flex flex-col">
      <div>
        {projects.map((project, i) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={i}
            isOpen={openSlug === project.slug}
            onToggle={() => handleToggle(project.slug)}
            dividerDelay={i * 0.06}
            registerTriggerRef={(el) => {
              triggerRefs.current[i] = el;
            }}
            onKeyNav={(event) => handleKeyNav(event, i)}
          />
        ))}
        <AnimatedDivider delay={projects.length * 0.06} />
      </div>
      <ViewAllProjects />
    </div>
  );
}

export { ProjectAccordion };
