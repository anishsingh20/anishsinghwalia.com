import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

export type Chunk = {
  id: string;
  file: string;
  title: string;
  text: string;
};

export type ChatTurn = { role: "user" | "assistant"; content: string };

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

export function fallbackAnswer(query: string, chunks: Chunk[]) {
  const ranked = scoreChunks(query, chunks);
  const best = ranked[0];
  const terms = tokenize(query);
  if (!best || best.score < 2.4 || terms.length === 0) {
    return {
      answer:
        "I don't have that in Anish's notes, so I won't guess. Ask him directly on the contact form at /contact, or email waliaanish1997@gmail.com.",
      sources: [] as string[],
      confident: false,
    };
  }

  const picked = ranked.filter((item, index) => index === 0 || item.score >= best.score * 0.72).slice(0, 2);
  const body = picked
    .map((item) =>
      item.chunk.text
        .replace(/^#+\s.*$/gm, "")
        .replace(/^Do not .+$/gim, "")
        .trim(),
    )
    .filter(Boolean)
    .join("\n\n");
  const clipped = body.length > 850 ? `${body.slice(0, 850).replace(/\s+\S*$/, "")}…` : body;
  return {
    answer: `From Anish's notes:\n\n${clipped}`,
    sources: [...new Set(picked.map((item) => item.chunk.file))],
    confident: true,
  };
}

const SYSTEM_RULES = `You are ask.anish, the assistant on Anish Singh Walia's portfolio.
Speak about Anish in the third person. Be warm, specific, and brief.
Use only the CONTEXT. Do not invent clients, quotes, metrics, job titles, summit names, distances, or rep counts.
If the context does not contain the answer, say you don't know and point to /contact and waliaanish1997@gmail.com.
Anish is a technical content strategist with an SRE and DevOps background. His work includes technical tutorials, deep dives, developer docs, AI and infrastructure content, thought leadership, LinkedIn ghostwriting, and content strategy. SEO and AI-search visibility are one part of the work. The audience is SaaS, AI-native, developer-tool, and cloud or infrastructure companies.
If asked about price, invite them to the contact form. Do not bring up a rate card.
Do not discuss his family.
If asked about readership, mention both public figures and that they conflict: LinkedIn About says 3,000,000+ average monthly readers; his banner says 35,000+ subscribers and 200,000+ monthly views.
Quote recommendations only when the exact words are in the context.
The only email you may share is waliaanish1997@gmail.com.`;

export async function answerQuestion(message: string, history: ChatTurn[] = []) {
  const chunks = await loadKnowledge();
  const ranked = scoreChunks(message, chunks).slice(0, 4);
  const context = ranked
    .filter((item) => item.score > 0)
    .map((item) => `## ${item.chunk.title} (${item.chunk.file})\n${item.chunk.text}`)
    .join("\n\n");
  const notes = fallbackAnswer(message, chunks);
  const key = process.env.LLM_API_KEY;
  const base = (process.env.LLM_BASE_URL || "https://inference.do-ai.run/v1").replace(/\/$/, "");
  const model = process.env.LLM_MODEL;

  if (!key || !model) {
    return { ...notes, mode: "notes" as const };
  }

  try {
    const response = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(20000),
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: "system", content: `${SYSTEM_RULES}\n\nCONTEXT:\n${context || "No matching notes."}` },
          ...history.slice(-6).map((turn) => ({ role: turn.role, content: turn.content.slice(0, 2000) })),
          { role: "user", content: message.slice(0, 1000) },
        ],
      }),
    });
    if (!response.ok) throw new Error(`LLM ${response.status}`);
    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const answer = data.choices?.[0]?.message?.content?.trim();
    if (!answer) throw new Error("empty completion");
    return {
      answer,
      sources: ranked.filter((item) => item.score > 0).map((item) => item.chunk.file),
      confident: true,
      mode: "model" as const,
    };
  } catch (error) {
    console.error("llm fallback", error instanceof Error ? error.message : error);
    return { ...notes, mode: "notes" as const };
  }
}
