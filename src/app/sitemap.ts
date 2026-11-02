import type { MetadataRoute } from "next";
import { site } from "@data/site";

const paths = ["", "/services", "/about", "/experience", "/clients", "/testimonials", "/work", "/game", "/ask", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-02");
  return paths.map((path) => ({
    url: `${site.url}${path || "/"}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
