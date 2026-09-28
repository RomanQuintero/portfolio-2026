import type { Metadata } from "next";
import { profile } from "./profile";

/** Supply the real public origin at build/deploy time; never guess a domain. */
export function publicOrigin(value: string | undefined): string | null {
  try {
    const url = new URL(value || "");
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return url.origin;
  } catch { return null; }
}
export const siteOrigin = publicOrigin(process.env.SITE_URL);
export const siteDescription = "Software engineering across applied AI, intelligent systems and the physical world. Selected work and the 30 Projects experimental build program.";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const socialTitle = path === "/" ? "Roman Quintero — Software Engineer" : title + " / " + profile.name;
  return {
    title: path === "/" ? { absolute: socialTitle } : title,
    description,
    ...(siteOrigin ? { alternates: { canonical: new URL(path, siteOrigin).href } } : {}),
    openGraph: {
      title: socialTitle, description, type: "website", siteName: profile.name, locale: "en_US",
      ...(siteOrigin ? { url: new URL(path, siteOrigin).href } : {}),
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Roman Quintero — Software Engineer. Applied AI. Intelligent systems. Experimental software." }],
    },
    twitter: {
      card: "summary_large_image", title: socialTitle, description,
      images: [{ url: "/opengraph-image.png", alt: "Roman Quintero — Software Engineer" }],
    },
  };
}
