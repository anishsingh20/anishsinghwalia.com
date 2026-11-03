import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { bookingLabel, nav, site } from "../data/site";
import { stations } from "../data/game";
import { pullupMilestones } from "../data/pullup";
import { showcase } from "../data/showcase";
import { excerptQuote, landingTestimonials, testimonials } from "../data/testimonials";

function walk(dir: string, acc: string[] = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git" || entry === "research" || entry === "uploads") continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (/\.(tsx?|md|css|json|txt|yml|yaml)$/.test(entry)) acc.push(full);
  }
  return acc;
}

function copySources() {
  const root = process.cwd();
  const files = [
    ...walk(path.join(root, "data")),
    ...walk(path.join(root, "knowledge")),
    ...walk(path.join(root, "src/app")),
    ...walk(path.join(root, "src/components")),
    path.join(root, "README.md"),
  ];
  return files.filter((file) => existsSync(file) && !file.includes(path.join("src", "lib", "bot")));
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

  it("excerpts home quotes as prefixes of the real recommendations", () => {
    const quoted = landingTestimonials();
    expect(quoted.map((item) => item.company).filter(Boolean)).toEqual(
      expect.arrayContaining(["Semrush", "DataImpulse", "Tanot Solutions", "OtterlyAI", "Pollo AI", "La Isla Designs", "DataForSEO"]),
    );
    expect(quoted).toHaveLength(8);
    for (const item of quoted) {
      const excerpt = excerptQuote(item.quote);
      expect(item.quote.startsWith(excerpt)).toBe(true);
      expect(excerpt.length).toBeGreaterThan(40);
    }
    const home = readFileSync("src/app/page.tsx", "utf8");
    expect(home).toContain("QuoteMarquee");
    expect(home).toContain("PullupChallenge");
    expect(existsSync("src/components/pull-quotes.tsx")).toBe(false);
  });

  it("opens sourced facts in the pull-up challenge", () => {
    const text = pullupMilestones.map((item) => item.text).join(" ");
    expect(text).toContain("Top 50 winner · #23");
    expect(text).toContain("Document360");
    expect(text).toContain("347");
    expect(text).toContain("Senior Technical Content Strategist II and Team Lead");
    expect(text).toContain("DigitalOcean");
    expect(text).toContain("3,000,000+");
    for (const name of ["Semrush", "DataImpulse", "Tanot Solutions", "OtterlyAI", "Pollo AI", "La Isla Designs"]) {
      expect(text).toContain(name);
    }
  });

  it("defaults the booking URL to the Calendly intro call", () => {
    expect(site.bookingUrl).toBe("https://calendly.com/client-strategy-session/15min");
    expect(bookingLabel).toBe("Book an intro call");
    expect(bookingLabel).not.toMatch(/minute|\bmin\b/i);
    const button = readFileSync("src/components/book-intro.tsx", "utf8");
    expect(button).toContain('target="_blank"');
    expect(button).toContain('rel="noopener"');
    expect(button).not.toContain("↗");
  });

  it("gives every showcase piece a real image file", () => {
    for (const item of showcase) {
      expect(item.href.startsWith("http")).toBe(true);
      expect(item.image?.src).toMatch(/^\/images\/.+\.(webp|jpg|png)$/);
      expect(item.image.alt.length).toBeGreaterThan(12);
      expect(existsSync(path.join(process.cwd(), "public", item.image.src.replace(/^\//, "")))).toBe(true);
    }
    expect(showcase.some((item) => item.id === "video-library" && item.group.startsWith("Long-form"))).toBe(true);
    expect(showcase.filter((item) => item.group === "Videos").every((item) => item.play)).toBe(true);
  });

  it("does not embed YouTube iframes in the work gallery", () => {
    const gallery = readFileSync("src/components/showcase-gallery.tsx", "utf8");
    expect(gallery).not.toMatch(/iframe/i);
    expect(gallery).not.toMatch(/youtube-nocookie|youtube\.com\/embed/);
  });

  it("does not ship dedicated case-study routes", () => {
    expect(existsSync(path.join(process.cwd(), "src/app/work/[slug]/page.tsx"))).toBe(false);
    const copy = copySources();
    const hits = copy.filter((file) => /[`'"]\/work\/(?:semrush|tanot-solutions|dataimpulse|digitalocean-inference-benchmarks)|\/work\/\$\{/.test(readFileSync(file, "utf8")));
    expect(hits).toEqual([]);
  });

  it("labels Game in the main nav", () => {
    expect(nav.some((item) => item.href === "/game" && /game/i.test(item.label))).toBe(true);
  });

  it("does not use arrow glyphs in copy", () => {
    const hits: string[] = [];
    for (const file of copySources()) {
      const text = readFileSync(file, "utf8");
      if (text.includes("↗") || text.includes("↓")) hits.push(path.relative(process.cwd(), file));
    }
    expect(hits).toEqual([]);
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
