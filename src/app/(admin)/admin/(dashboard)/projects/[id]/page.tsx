import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/auth";
import { ProjectForm } from "../project-form";
import type { Project } from "@/lib/content/types";

export const metadata: Metadata = { title: "Edit Project" };
export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  const project: Project = {
    id: data.id,
    slug: data.slug,
    title: data.title,
    company: data.company,
    role: data.role,
    type: data.type,
    year: data.year,
    summary: data.summary,
    featured: data.featured,
    visibility: data.visibility,
    impact: data.impact ?? [],
    enterpriseShowcase: data.enterprise_showcase ?? undefined,
    heroImage: data.hero_image_url
      ? { src: data.hero_image_url, alt: data.hero_image_alt ?? "" }
      : undefined,
    externalUrl: data.external_url ?? undefined,
    externalUrlLabel: data.external_url_label ?? undefined,
    screenshotStyle: data.screenshot_style ?? undefined,
    screenshotsHeading: data.screenshots_heading ?? undefined,
    sections: data.sections,
    screenshots: data.screenshots ?? [],
  };

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <h1 className="text-display-lg text-fg">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
