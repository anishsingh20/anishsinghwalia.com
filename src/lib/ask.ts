import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

export type Chunk = {
  id: string;
  file: string;
  title: string;
  text: string;
};

const STOP = new Set([
  "the", "and", "for", "with", "his", "her", "you", "your", "what", "how", "does",
  "did", "has", "have", "about", "from", "that", "this", "are", "was", "who", "can",
  "him", "she", "its", "it's", "anish", "singh", "walia", "tell", "please", "really",
  "into", "just", "like", "them", "they", "their", "would", "could", "should",   "me",
  "my", "we", "our", "any", "some", "than", "then", "been", "being", "when", "where",
  "which", "while", "also", "more", "most", "very", "here", "there", "through", "walk",
  "is", "it", "of", "on", "in", "an", "or", "be", "at", "do", "if", "so", "as", "by", "up",
]);

let cache: Chunk[] | null = null;

export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9+.#]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP.has(token));
}

export function chunkMarkdown(file: string, markdown: string): Chunk[] {
  const lines = markdown.split(/\r?\n/);
  const chunks: Chunk[] = [];
  let title = file.replace(/\.md$/, "");
  let body: string[] = [];
  let index = 0;

  const flush = () => {
    const text = body.join("\n").trim();
    if (!text) return;
    chunks.push({
      id: `${file}#${index}`,
      file,
      title,
      text: `${title}\n${text}`,
    });
    index += 1;
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      title = line.replace(/^##\s+/, "").trim();
      body = [];
      continue;
    }
    if (line.startsWith("# ")) {
      flush();
      title = line.replace(/^#\s+/, "").trim();
      body = [];
      continue;
    }
    body.push(line);
  }
  flush();
  return chunks;
}

export async function loadKnowledge(dir = path.join(process.cwd(), "knowledge")): Promise<Chunk[]> {
  const cacheable = process.env.NODE_ENV === "production";
  if (cacheable && cache && dir === path.join(process.cwd(), "knowledge")) return cache;
  const files = (await readdir(dir)).filter((file) => file.endsWith(".md")).sort();
  const chunks: Chunk[] = [];
  for (const file of files) {
    const markdown = await readFile(path.join(dir, file), "utf8");
    chunks.push(...chunkMarkdown(file, markdown));
  }
  if (cacheable && dir === path.join(process.cwd(), "knowledge")) cache = chunks;
  return chunks;
}

export function scoreChunks(query: string, chunks: Chunk[]) {
  const terms = tokenize(query);
  const documents = chunks.map((chunk) => new Set(tokenize(`${chunk.title} ${chunk.text}`)));
  const idf = new Map<string, number>();
  for (const term of new Set(terms)) {
    const df = documents.filter((doc) => doc.has(term)).length;
    idf.set(term, Math.log((chunks.length + 1) / (df + 1)) + 1);
  }

  return chunks
    .map((chunk) => {
      const titleTokens = new Set(tokenize(chunk.title));
      const bodyTokens = new Set(tokenize(chunk.text));
      let score = 0;
      for (const term of terms) {
        if (!bodyTokens.has(term) && !titleTokens.has(term)) continue;
        const weight = idf.get(term) ?? 1;
        score += weight;
        if (titleTokens.has(term)) score += weight * 1.8;
      }
      return { chunk, score };
    })
    .sort((a, b) => b.score - a.score);
}
