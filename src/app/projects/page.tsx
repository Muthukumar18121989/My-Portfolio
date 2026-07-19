import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/patterns/projects-grid";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies from enterprise AI, financial infrastructure, and consulting work.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-10 px-6 py-16 md:px-16 md:py-24">
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-4xl font-extrabold text-fg md:text-6xl">Projects</h1>
        <p className="max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
          Case studies from enterprise AI platforms, financial infrastructure, and global consulting
          engagements.
        </p>
      </div>
      <ProjectsGrid projects={[...projects]} />
    </div>
  );
}
