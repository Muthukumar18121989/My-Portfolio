"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminForAction } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { uploadAsset } from "@/lib/supabase/storage";

export interface SaveState {
  status: "idle" | "error";
  error?: string;
}

const RESERVED_SLUGS = new Set(["research", "presentations", "admin", "private", "recruiter"]);

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function saveProject(_prevState: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdminForAction();

  const id = String(formData.get("id") ?? "").trim() || null;
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || title);
  const company = String(formData.get("company") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const type = String(formData.get("type") ?? "").trim();
  const year = String(formData.get("year") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const featured = formData.get("featured") === "on";
  const visibility = formData.get("visibility") === "private" ? "private" : "public";
  const impact = String(formData.get("impact") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const heroImageAlt = String(formData.get("heroImageAlt") ?? "").trim();
  const externalUrl = String(formData.get("externalUrl") ?? "").trim();
  const externalUrlLabel = String(formData.get("externalUrlLabel") ?? "").trim();
  const screenshotsHeading = String(formData.get("screenshotsHeading") ?? "").trim();
  const sectionsRaw = String(formData.get("sectionsJson") ?? "").trim();
  const screenshotsRaw = String(formData.get("screenshotsJson") ?? "").trim();
  const enterpriseShowcaseRaw = String(formData.get("enterpriseShowcaseJson") ?? "").trim();

  if (!title || !company || !role || !type || !summary) {
    return { status: "error", error: "Title, company, role, type, and summary are required." };
  }
  if (!slug) return { status: "error", error: "Couldn't derive a slug from that title." };
  if (RESERVED_SLUGS.has(slug)) {
    return { status: "error", error: `"${slug}" is a reserved slug — pick another.` };
  }

  let sections: unknown;
  let screenshots: unknown;
  let enterpriseShowcase: unknown;
  try {
    sections = sectionsRaw ? JSON.parse(sectionsRaw) : {};
    screenshots = screenshotsRaw ? JSON.parse(screenshotsRaw) : [];
    enterpriseShowcase = enterpriseShowcaseRaw ? JSON.parse(enterpriseShowcaseRaw) : null;
  } catch {
    return {
      status: "error",
      error: "Sections/screenshots/enterprise showcase must be valid JSON.",
    };
  }

  const supabase = createAdminClient();
  const update: Record<string, unknown> = {
    slug,
    title,
    company,
    role,
    type,
    year,
    summary,
    featured,
    visibility,
    impact,
    hero_image_alt: heroImageAlt || null,
    external_url: externalUrl || null,
    external_url_label: externalUrlLabel || null,
    screenshots_heading: screenshotsHeading || null,
    sections,
    screenshots,
    enterprise_showcase: enterpriseShowcase,
  };

  const heroImage = formData.get("heroImage");
  if (heroImage instanceof File && heroImage.size > 0) {
    try {
      update.hero_image_url = await uploadAsset(heroImage, "projects");
    } catch (err) {
      return {
        status: "error",
        error: err instanceof Error ? err.message : "Hero image upload failed.",
      };
    }
  }

  if (id) {
    const { error } = await supabase.from("projects").update(update).eq("id", id);
    if (error) return { status: "error", error: error.message };
  } else {
    const { data: existing } = await supabase
      .from("projects")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (existing)
      return { status: "error", error: `A project with slug "${slug}" already exists.` };

    const { count } = await supabase.from("projects").select("*", { count: "exact", head: true });
    const { error } = await supabase.from("projects").insert({ ...update, sort_order: count ?? 0 });
    if (error) return { status: "error", error: error.message };
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdminForAction();
  const supabase = createAdminClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/", "layout");
  revalidatePath("/admin/projects");
}
