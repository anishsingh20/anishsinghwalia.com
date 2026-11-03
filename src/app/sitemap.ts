import type { MetadataRoute } from "next";
import { caseStudies } from "@data/services";
import { lastUpdated, site } from "@data/site";

const paths = [
  "",
  "/work",
  "/services",
  "/about",
  "/media",
  "/experience",
  "/clients",
  "/testimonials",
  "/game",
  "/ask",
  "/contact",
  ...caseStudies.map((study) => `/work/${study.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(lastUpdated);
  return paths.map((path) => ({
    url: `${site.url}${path || "/"}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.startsWith("/work/") ? 0.8 : 0.7,
  }));
}
