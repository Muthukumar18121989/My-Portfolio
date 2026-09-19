"use client";

import * as React from "react";
import Image from "next/image";
import { Search, Globe, Lock } from "lucide-react";
import { ProjectCard } from "@/components/patterns/project-card";
import { RecruiterGate } from "@/components/patterns/recruiter-gate";
import {
  TwinxHeroArt,
  EuroclearHeroArt,
  ProductionWorkflowHeroArt,
  MckToolsHeroArt,
} from "@/components/patterns/case-study-hero-art";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content";

// Per-project cover art for the grid card — the same hand-drawn hero art
// used on each case-study page for projects without a real product image,
// so a card never falls back to the generic accent-dot placeholder.
const COVER_ART: Record<string, React.ReactNode> = {
  "twinx-ai-platform": <TwinxHeroArt />,
  "euroclear-bank": <EuroclearHeroArt />,
  "production-workflow-revamp": <ProductionWorkflowHeroArt />,
  "mck-tools": <MckToolsHeroArt />,
};

function getCover(project: Project) {
  if (project.heroImage) {
    return (
      // object-contain, not object-cover: these banners are wide (21:9) and
      // carry headline text near the edges — cropping to the card's 16:9 box
      // was cutting that text off. Contain shows the full image; the
      // letterboxing is invisible because the banners' own near-black
      // background already matches the card's bg-bg.
      <Image
        src={project.heroImage.src}
        alt={project.heroImage.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-contain"
      />
    );
  }
  return COVER_ART[project.slug];
}

export interface ProjectsGridProps {
  projects: Project[];
}

function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [visibility, setVisibility] = React.useState<"public" | "private">("public");
  const [privateUnlocked, setPrivateUnlocked] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [type, setType] = React.useState<string>("All");

  const visibleProjects = React.useMemo(
    () => projects.filter((p) => p.visibility === visibility),
    [projects, visibility]
  );

  const types = React.useMemo(
    () => ["All", ...Array.from(new Set(visibleProjects.map((p) => p.type)))],
    [visibleProjects]
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return visibleProjects.filter((project) => {
      const matchesType = type === "All" || project.type === type;
      const matchesQuery =
        q.length === 0 ||
        project.title.toLowerCase().includes(q) ||
        project.role.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [visibleProjects, query, type]);

  const grid =
    filtered.length === 0 ? (
      <p className="rounded-md border border-dashed border-border bg-bg-surface p-8 text-center text-sm text-fg-muted">
        No projects match &ldquo;{query}&rdquo;.
      </p>
    ) : (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard
            key={project.slug}
            href={`/projects/${project.slug}`}
            title={project.title}
            role={project.role}
            type={project.type}
            description={project.summary}
            cover={getCover(project)}
          />
        ))}
      </div>
    );

  return (
    <div className="flex flex-col gap-8">
      <div
        className="inline-flex w-fit rounded-full border border-border bg-bg-surface p-1"
        role="group"
        aria-label="Toggle between public and private projects"
      >
        {(["public", "private"] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={visibility === v}
            onClick={() => {
              setVisibility(v);
              setType("All");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs tracking-[0.08em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
              visibility === v ? "bg-accent text-accent-fg" : "text-fg-muted hover:text-fg"
            )}
          >
            {v === "public" ? (
              <Globe className="size-3.5" aria-hidden="true" />
            ) : (
              <Lock className="size-3.5" aria-hidden="true" />
            )}
            {v}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="relative w-full max-w-sm">
          <span className="sr-only">Search projects</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full rounded-sm border border-border bg-bg-surface py-2.5 pr-3 pl-9 text-sm text-fg placeholder:text-fg-muted outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus"
          />
        </label>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by project type">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={type === t}
              onClick={() => setType(t)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-xs tracking-[0.08em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
                type === t
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border text-fg-muted hover:text-fg"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {visibility === "private" ? (
        <RecruiterGate
          password="viewrecruiter"
          message="These projects are shared with recruiters on request. Enter the access password to view them."
          unlocked={privateUnlocked}
          onUnlock={() => setPrivateUnlocked(true)}
        >
          {grid}
        </RecruiterGate>
      ) : (
        grid
      )}
    </div>
  );
}

export { ProjectsGrid };
