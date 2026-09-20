import "server-only";
import { createPublicClient } from "@/lib/supabase/public";
import type {
  Profile,
  PhilosophyItem,
  StatItem,
  FunFact,
  SkillGroup,
  Certification,
  Education,
  CareerEntry,
  Testimonial,
  SiteSettings,
  Project,
} from "@/lib/content/types";

// Public read layer for the live site — every function here hits Supabase
// directly (no caching beyond whatever Next.js does automatically) so an
// admin save is visible on next request. See src/lib/supabase/public.ts
// for the client and supabase/schema.sql for the tables/RLS.

export async function getProfile(): Promise<Profile> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("profile").select("*").eq("id", 1).single();
  if (error || !data) throw new Error(`getProfile: ${error?.message ?? "no row"}`);

  return {
    name: data.name,
    role: data.role,
    roleLong: data.role_long,
    location: data.location,
    email: data.email,
    yearsExperience: data.years_experience,
    heroSummary: data.hero_summary,
    aboutIntro: data.about_intro,
    photoUrl: data.photo_url ?? null,
    linkedinUrl: data.linkedin_url ?? null,
  };
}

export async function getPhilosophy(): Promise<PhilosophyItem[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("philosophy_items")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getPhilosophy: ${error.message}`);

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    body: row.body,
    sortOrder: row.sort_order,
  }));
}

export async function getStats(): Promise<StatItem[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("stats")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getStats: ${error.message}`);

  return (data ?? []).map((row) => ({
    id: row.id,
    value: row.value,
    label: row.label,
    sortOrder: row.sort_order,
  }));
}

export async function getFunFacts(): Promise<FunFact[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("fun_facts")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getFunFacts: ${error.message}`);

  return (data ?? []).map((row) => ({
    id: row.id,
    content: row.content,
    sortOrder: row.sort_order,
  }));
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("skill_groups")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getSkillGroups: ${error.message}`);

  return (data ?? []).map((row) => ({
    id: row.id,
    label: row.label,
    items: row.items ?? [],
    sortOrder: row.sort_order,
  }));
}

export async function getCertifications(): Promise<Certification[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getCertifications: ${error.message}`);

  return (data ?? []).map((row) => ({
    id: row.id,
    content: row.content,
    sortOrder: row.sort_order,
  }));
}

export async function getEducation(): Promise<Education> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("education").select("*").eq("id", 1).single();
  if (error || !data) throw new Error(`getEducation: ${error?.message ?? "no row"}`);

  return {
    degree: data.degree,
    school: data.school,
    dateRange: data.date_range,
    detail: data.detail,
  };
}

export async function getCareerEntries(): Promise<CareerEntry[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("career_entries")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getCareerEntries: ${error.message}`);

  return (data ?? []).map((row) => ({
    id: row.id,
    company: row.company,
    initials: row.initials,
    role: row.role,
    dateRange: row.date_range,
    location: row.location,
    current: row.is_current,
    summary: row.summary,
    skills: row.skills ?? [],
    responsibilities: row.responsibilities ?? [],
    achievements: row.achievements ?? [],
    sortOrder: row.sort_order,
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getTestimonials: ${error.message}`);

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role ?? null,
    company: row.company ?? null,
    quote: row.quote,
    avatarUrl: row.avatar_url ?? null,
    published: row.published,
    sortOrder: row.sort_order,
  }));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  if (error || !data) throw new Error(`getSiteSettings: ${error?.message ?? "no row"}`);

  return { resumeUrl: data.resume_url ?? null, careerTags: data.career_tags ?? [] };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProject(row: any): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    company: row.company,
    role: row.role,
    type: row.type,
    year: row.year,
    summary: row.summary,
    featured: row.featured,
    visibility: row.visibility,
    impact: row.impact ?? [],
    enterpriseShowcase: row.enterprise_showcase ?? undefined,
    heroImage: row.hero_image_url
      ? { src: row.hero_image_url, alt: row.hero_image_alt ?? "" }
      : undefined,
    externalUrl: row.external_url ?? undefined,
    externalUrlLabel: row.external_url_label ?? undefined,
    screenshotStyle: row.screenshot_style ?? undefined,
    screenshotsHeading: row.screenshots_heading ?? undefined,
    sections: row.sections,
    screenshots: row.screenshots ?? [],
  };
}

export async function getProjects(): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getProjects: ${error.message}`);

  return (data ?? []).map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`getProjectBySlug: ${error.message}`);
  if (!data) return null;

  return mapProject(data);
}
