import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/patterns/projects-grid";
import { Reveal } from "@/components/motion/section-reveal";
import { WordReveal } from "@/components/motion/text-reveal";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies from enterprise AI, financial infrastructure, and consulting work.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-14 px-6 py-20 md:px-16 md:py-28">
      <div className="grid-line-t flex flex-col gap-4 pt-10">
        <h1 className="text-display-xl text-fg">
          <WordReveal text="Projects" />
        </h1>
        <Reveal variant="up" delay={0.15}>
          <p className="max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
            Case studies from enterprise AI platforms, financial infrastructure, and global
            consulting engagements.
          </p>
        </Reveal>
      </div>
      <ProjectsGrid projects={projects} />
    </div>
  );
}
