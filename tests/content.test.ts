import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { bookingLabel, site } from "../data/site";
import { stations } from "../data/game";
import { caseStudies } from "../data/services";
import { testimonials } from "../data/testimonials";

function walk(dir: string, acc: string[] = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git" || entry === "research" || entry === "uploads") continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (/\.(tsx?|md|css|json|txt|yml|yaml)$/.test(entry)) acc.push(full);
  }
  return acc;
}

describe("public facts", () => {
  it("uses the GitHub contact address", () => {
    expect(site.email).toBe("waliaanish1997@gmail.com");
  });

  it("does not publish the other inbox", () => {
    const files = walk(process.cwd());
    const banned = "lovee" + "anish@gmail.com";
    const hits = files.filter((file) => readFileSync(file, "utf8").includes(banned));
    expect(hits).toEqual([]);
  });

  it("keeps recommendation quotes verbatim and drops the hidden one", () => {
    const source = readFileSync("research/testimonials.md", "utf8");
    expect(testimonials.some((item) => item.name.includes("Shiva"))).toBe(false);
    expect(source).toMatch(/excluded/i);
    const quotes = [...source.matchAll(/^"(.*)"\s*$/gm)].map((match) => match[1]);
    expect(quotes.length).toBeGreaterThanOrEqual(8);
    for (const quote of quotes) {
      expect(testimonials.some((item) => item.quote === quote)).toBe(true);
    }
    expect(testimonials.find((item) => item.name.startsWith("Evgeniia"))?.quote).toBeNull();
  });

  it("defaults the booking URL to the Calendly intro call", () => {
    expect(site.bookingUrl).toBe("https://calendly.com/client-strategy-session/15min");
    expect(bookingLabel).toBe("Book an intro call");
    expect(bookingLabel).not.toMatch(/minute|\bmin\b/i);
    const button = readFileSync("src/components/book-intro.tsx", "utf8");
    expect(button).toContain('target="_blank"');
    expect(button).toContain('rel="noopener"');
  });

  it("gives every case study a real framed screenshot", () => {
    for (const study of caseStudies) {
      expect(study.image?.src).toMatch(/^\/images\/work\/.+\.webp$/);
      expect(study.image?.alt.length).toBeGreaterThan(12);
      expect(existsSync(path.join(process.cwd(), "public", study.image!.src.replace(/^\//, "")))).toBe(true);
    }
  });

  it("gives every game station a real page", () => {
    const ids = new Set(stations.map((station) => station.id));
    expect(ids.size).toBe(stations.length);
    for (const station of stations) {
      expect(station.href.startsWith("/")).toBe(true);
      expect(station.blurb.length).toBeGreaterThan(10);
    }
  });
});
