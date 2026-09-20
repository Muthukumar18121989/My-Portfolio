import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";

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
