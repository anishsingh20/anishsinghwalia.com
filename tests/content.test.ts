import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { bookingLabel, nav, site } from "../data/site";
import { stations } from "../data/game";
import { showcase } from "../data/showcase";
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

  it("defaults the booking URL to the Calendly intro call", () => {
    expect(site.bookingUrl).toBe("https://calendly.com/client-strategy-session/15min");
    expect(bookingLabel).toBe("Book an intro call");
    expect(bookingLabel).not.toMatch(/minute|\bmin\b/i);
    const button = readFileSync("src/components/book-intro.tsx", "utf8");
    expect(button).toContain('target="_blank"');
    expect(button).toContain('rel="noopener"');
    expect(button).not.toContain("↗");
  });

  it("gives every showcase image a real file", () => {
    for (const item of showcase) {
      expect(item.href.startsWith("http")).toBe(true);
      if (!item.image) continue;
      expect(item.image.src).toMatch(/^\/images\/.+\.(webp|jpg|png)$/);
      expect(item.image.alt.length).toBeGreaterThan(12);
      expect(existsSync(path.join(process.cwd(), "public", item.image.src.replace(/^\//, "")))).toBe(true);
    }
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
