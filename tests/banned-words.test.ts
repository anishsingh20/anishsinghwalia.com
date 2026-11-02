import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { aiTells, findBanned, metaTells } from "../src/lib/bot/banned";

/**
 * Two scans. One over everything that ships or feeds the bot, one over the
 * built HTML in .next when a build exists. The word list lives in
 * src/lib/bot/banned.ts so this file never has to spell the words out.
 */

const root = process.cwd();

function walk(dir: string, keep: (file: string) => boolean, acc: string[] = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    if (["node_modules", ".git", "cache", "uploads"].includes(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, keep, acc);
    else if (keep(full)) acc.push(full);
  }
  return acc;
}

/** Files whose text can end up on the site or in the bot's mouth. */
function siteSources() {
  const dirs = ["data", "knowledge", "src", "public", "deploy", "research", "scripts"];
  const files = dirs.flatMap((dir) => walk(path.join(root, dir), (file) => /\.(tsx?|mjs|md|txt|json|yml|yaml|svg|xml)$/.test(file)));
  for (const file of ["README.md", "CONFIRM.md", ".env.example", "package.json"]) {
    if (existsSync(path.join(root, file))) files.push(path.join(root, file));
  }
  const skip = [path.join(root, "src/lib/bot/banned.ts")];
  return files.filter((file) => !skip.includes(file));
}

/** Copy that people read. Narrower than siteSources so helper code can mention the rules. */
function copySources() {
  return [
    ...walk(path.join(root, "data"), (file) => file.endsWith(".ts")),
    ...walk(path.join(root, "knowledge"), (file) => file.endsWith(".md")),
    ...walk(path.join(root, "src/app"), (file) => /\.tsx?$/.test(file)),
    ...walk(path.join(root, "src/components"), (file) => file.endsWith(".tsx")),
    path.join(root, "README.md"),
  ].filter((file) => existsSync(file) && !file.includes(path.join("src", "lib", "bot")));
}

describe("banned words", () => {
  it("do not appear in source, notes, config, or docs", () => {
    const hits: string[] = [];
    for (const file of siteSources()) {
      const found = findBanned(readFileSync(file, "utf8"));
      if (found.length) hits.push(`${path.relative(root, file)}: ${found.join(", ")}`);
    }
    expect(hits).toEqual([]);
  });

  it("do not appear in the built pages when a build exists", () => {
    const appDir = path.join(root, ".next", "server", "app");
    if (!existsSync(appDir) || !existsSync(path.join(root, ".next", "BUILD_ID"))) {
      console.info("[banned-words] no .next build found; run `npm run build` to check rendered output");
      return;
    }
    const built = walk(appDir, (file) => /\.(html|rsc|body|txt)$/.test(file));
    expect(built.length).toBeGreaterThan(0);
    const hits: string[] = [];
    for (const file of built) {
      const found = findBanned(readFileSync(file, "utf8"));
      if (found.length) hits.push(`${path.relative(root, file)}: ${found.join(", ")}`);
    }
    expect(hits).toEqual([]);
  });

  it("the copy avoids the AI tells", () => {
    const hits: string[] = [];
    for (const file of copySources()) {
      const text = readFileSync(file, "utf8");
      for (const tell of aiTells) {
        const match = text.match(tell);
        if (match) hits.push(`${path.relative(root, file)}: ${match[0]}`);
      }
    }
    expect(hits).toEqual([]);
  });

  it("the copy does not explain where its facts came from", () => {
    const hits: string[] = [];
    for (const file of copySources()) {
      const text = readFileSync(file, "utf8");
      for (const tell of metaTells) {
        const match = text.match(tell);
        if (match) hits.push(`${path.relative(root, file)}: ${match[0]}`);
      }
    }
    expect(hits).toEqual([]);
  });

  it("the built pages carry no audit-trail phrasing when a build exists", () => {
    const appDir = path.join(root, ".next", "server", "app");
    if (!existsSync(appDir) || !existsSync(path.join(root, ".next", "BUILD_ID"))) return;
    const built = walk(appDir, (file) => /\.(html|rsc|body|txt)$/.test(file));
    const hits: string[] = [];
    for (const file of built) {
      const text = readFileSync(file, "utf8");
      for (const tell of metaTells) {
        const match = text.match(tell);
        if (match) hits.push(`${path.relative(root, file)}: ${match[0]}`);
      }
    }
    expect(hits).toEqual([]);
  });

  it("the private inbox is not anywhere in the repo", () => {
    const needle = "lovee" + "anish";
    const hits = siteSources().filter((file) => readFileSync(file, "utf8").toLowerCase().includes(needle));
    expect(hits).toEqual([]);
  });
});
