import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/site";
import { projects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin) return [];
  const origin = siteOrigin;
  return ["/", "/projects", "/30-projects", "/about", ...projects.map(p => "/projects/" + p.slug)]
    .map(path => ({ url: new URL(path, origin).href }));
}
