import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { clients } from "../data/clients";
import { metrics } from "../data/site";
import type { BotEvent } from "../src/lib/bot/agent";
import { keylessAnswer } from "../src/lib/bot/keyless";
import { extractHrefs, isInternalHref, pathWithoutHash } from "../src/lib/href";

const root = process.cwd();
const origin = process.env.SITE_ORIGIN || "http://127.0.0.1:3847";

const probes = [
  "What does Anish do?",
  "Who has he worked with?",
  "How do I hire him?",
  "What was he doing before DigitalOcean?",
  "What do clients say about him?",
  "What does he do outside work?",
  "Where did he study?",
  "Has he been on any podcasts?",
  "How technical is he really?",
  "What kinds of content does he make?",
  "Does he make videos?",
  "Does Anish do ghostwriting or LinkedIn posts?",
  "How much does he charge?",
  "Walk me through his career.",
  "What's his phone number?",
  "What's his email?",
  "Where is he based?",
];

function walk(dir: string, acc: string[] = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (full.endsWith(".tsx") || full.endsWith(".ts")) acc.push(full);
  }
  return acc;
}

function routeFile(pathname: string) {
  const clean = pathWithoutHash(pathname);
  if (clean === "/") return path.join(root, "src/app/page.tsx");
  return path.join(root, "src/app", clean.replace(/^\//, ""), "page.tsx");
}

async function ask(question: string) {
  let text = "";
  let sources: { title: string; url: string }[] = [];
  const emit = (event: BotEvent) => {
    if (event.type === "delta") text += event.text;
    if (event.type === "sources") sources = event.items;
  };
  await keylessAnswer(question, [], emit);
  return { text, sources };
}

describe("internal and external links", () => {
  it("gives every bot-emitted internal path a real route that returns 200", async () => {
    const internal = new Set<string>();
    for (const question of probes) {
      const { text, sources } = await ask(question);
      expect(text, question).not.toContain("anishsinghwalia.com");
      for (const href of extractHrefs(text)) {
        expect(href, `${question} -> ${href}`).not.toMatch(/anishsinghwalia\.com/i);
        if (isInternalHref(href)) internal.add(pathWithoutHash(href));
      }
      for (const source of sources) {
        expect(source.url, `${question} source ${source.title}`).not.toMatch(/anishsinghwalia\.com/i);
        if (isInternalHref(source.url)) internal.add(pathWithoutHash(source.url));
      }
    }

    expect([...internal].sort()).toEqual(
      expect.arrayContaining(["/about", "/clients", "/contact", "/experience", "/testimonials"]),
    );

    for (const pathname of internal) {
      expect(existsSync(routeFile(pathname)), pathname).toBe(true);
      const response = await fetch(`${origin}${pathname}`, { redirect: "manual" });
      expect(response.status, `${origin}${pathname}`).toBe(200);
    }
  }, 60_000);

  it("opens every raw external anchor in a new tab via SmartLink", () => {
    const smart = readFileSync(path.join(root, "src/components/smart-link.tsx"), "utf8");
    expect(smart).toContain('target="_blank"');
    expect(smart).toContain('rel="noopener noreferrer"');

    const hits: string[] = [];
    for (const file of walk(path.join(root, "src"))) {
      if (file.endsWith(`${path.sep}smart-link.tsx`)) continue;
      const text = readFileSync(file, "utf8");
      if (/<a[\s>]/.test(text)) hits.push(path.relative(root, file));
    }
    expect(hits).toEqual([]);
  });

  it("does not mention article or post counts in client work copy", () => {
    const copy = [
      readFileSync("data/clients.ts", "utf8"),
      readFileSync("knowledge/10-clients.md", "utf8"),
    ].join("\n");
    expect(copy).not.toMatch(/two Medium pieces|three articles|Read the essay/i);
    expect(copy).toContain("Contractual content partner");
    expect(copy).toContain("I publish monthly articles and LinkedIn posts for Semrush on my socials");
    expect(clients.find((client) => client.name === "Semrush")?.link).toBeUndefined();
    expect(clients.find((client) => client.name === "Pollo AI")?.brief).toBe("Content project: sponsored Medium pieces.");
  });

  it("keeps metric figures compact and unbreakable", () => {
    const row = readFileSync("src/components/proof-strip.tsx", "utf8");
    expect(row).toContain("metric-figure");
    expect(row).not.toContain("break-words");
    expect(metrics.find((metric) => metric.id === "readers")?.compact).toBe("3M+");
    expect(metrics.find((metric) => metric.id === "subscribers")?.compact).toBe("35K+");
    expect(metrics.find((metric) => metric.id === "readers")?.value).toBe("3,000,000+");
  });
});
