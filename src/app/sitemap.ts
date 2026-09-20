import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";

// Outside the (site) route group, so it doesn't inherit that layout's
// force-dynamic — without its own dynamic export here, Next.js tries to
// prerender this at *build* time and calls Supabase before any runtime env
// vars are guaranteed to be available, which is exactly what broke the
// first Vercel deploy ("Error: supabaseUrl is required.", building
// /sitemap.xml). Forcing dynamic also means the sitemap always reflects
// live project visibility, same as every other page.
export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const staticRoutes = ["", "/about", "/projects", "/resume", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects
    .filter((project) => project.visibility === "public")
    .map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: new Date(),
    }));

  return [...staticRoutes, ...projectRoutes];
}
