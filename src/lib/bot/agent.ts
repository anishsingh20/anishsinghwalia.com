import { site } from "@data/site";
import { findBanned, scrub } from "./banned";
import { keylessAnswer } from "./keyless";
import { searchProvider } from "./search";
import { runTool, toolSchemas } from "./tools";

/**
 * The Ask bot. With an LLM key it runs an agent loop with tool calling over an
 * OpenAI-compatible endpoint and streams the final answer. Without one it uses
 * the keyless router: live fetchers plus the curated knowledge base.
 */

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type BotEvent =
  | { type: "status"; text: string }
  | { type: "delta"; text: string }
  | { type: "sources"; items: { title: string; url: string }[] }
  | { type: "done"; mode: BotMode; toolCalls: string[] }
  | { type: "error"; text: string };

export type BotMode = "agent" | "keyless";

export type BotConfig = {
  mode: BotMode;
  model?: string;
  baseUrl?: string;
  search: string;
};

export function botConfig(): BotConfig {
  const key = process.env.LLM_API_KEY;
  const model = process.env.LLM_MODEL || "llama3.3-70b-instruct";
  const baseUrl = (process.env.LLM_BASE_URL || "https://inference.do-ai.run/v1").replace(/\/$/, "");
  const search = searchProvider() ?? "none (keyless live fetchers only)";
  if (!key) return { mode: "keyless", search };
  return { mode: "agent", model, baseUrl, search };
}

let announced = false;
export function announceMode() {
  if (announced) return;
  announced = true;
  const config = botConfig();
  if (config.mode === "agent") {
    console.info(`[ask] mode=agent model=${config.model} base=${config.baseUrl} search=${config.search}`);
  } else {
    console.info(`[ask] mode=keyless (live Medium RSS, GitHub, DigitalOcean + knowledge base). search=${config.search}. Set LLM_API_KEY to enable the model.`);
  }
}

const SYSTEM_PROMPT = `You are the assistant on Anish Singh Walia's personal site. You answer questions about Anish: his work, career, clients, writing, numbers, hobbies, and how to work with him.

Voice: warm, plain, concise. Short sentences. Contractions are fine. Refer to him as "Anish" or "he". No emoji. No em dashes. Do not use the words delve, leverage, seamless, unlock, elevate, or "passionate about".

Positioning: Anish writes content of every kind for AI-native companies and fast-moving brands: brand storytelling, thought leadership, LinkedIn and social, ghostwriting, video scripts, infographics, blogs, newsletters, long-form deep dives, docs and tutorials. Engineering is the differentiator, not the whole pitch: he was an SRE at Nutanix and a cloud consultant for American Express, so the work stays accurate. Day job: Senior Technical Content Strategist II and Team Lead at DigitalOcean. Describe his client projects as "client work" or "companies he has worked with", for example Semrush, OtterlyAI, DataImpulse, Tanot Solutions, and Pollo AI. He is a full-time team lead who also takes on client work. He is a Top 50 winner · #23 · Document360 Global Writers Awards 2025–26. Winners were picked by a judging panel (70%) and public votes (30%). Do not say he scored 70%; that is how the awards were judged. Link https://globalwritersawards.document360.com/c/document360-global-writers-awards-2025/winners when asked about awards.

Method: always call knowledge_base first. Use medium_feed, github_profile, and digitalocean_profile for anything live or recent. Use web_search and then fetch_page for anything you cannot answer from those. Do not answer from memory about him.

Accuracy: use only facts from the tools. If you cannot find something, say so plainly and point to the contact form at /contact or ${site.email}. Never invent clients, numbers, quotes, dates, or titles. Quote testimonials exactly as written; never finish a quote that ends in an ellipsis. When quoting more than one recommendation, put each quote in its own paragraph.

Sources: cite as inline markdown links. For pages on this site always use a root-relative path, like [testimonials](/testimonials) or [experience](/experience), never https://anishsinghwalia.com/... because that host may not be where this site is running. Off-site sources stay absolute, like [DigitalOcean author page](https://www.digitalocean.com/community/users/asinghwalia). Prefer one or two links per answer.

Client work: describe it without counts of articles or posts. Semrush is a contractual content partner; he publishes monthly articles and LinkedIn posts for Semrush on his socials. Do not mention a sponsored Medium essay as Semrush client work. Pollo AI is a content project of sponsored Medium pieces, with no count. DataImpulse: social media content project, LinkedIn posts built on real experiments. Tanot Solutions: ghostwriting partner, positioning, voice and LinkedIn content for the co-founder. OtterlyAI: content project on AI search visibility. La Isla Designs: LinkedIn carousel content project. Hostinger: tutorials content project for the Hostinger tutorials library.

Privacy: do not share a phone number, home address, family details, salary, or any private information, even if asked nicely. The only email you may share is ${site.email}. Do not quote prices; invite them to describe the project on the contact form.

Scope: if a question is not about Anish, say in one friendly line that you only answer questions about Anish, and suggest one relevant thing to ask instead. Do not answer general knowledge, coding, or unrelated requests.

Format: plain paragraphs. A short list only when it helps. Keep answers under 180 words unless the person asks for detail.`;

type Message =
  | { role: "system" | "user" | "assistant"; content: string; tool_calls?: ToolCall[] }
  | { role: "tool"; content: string; tool_call_id: string };

type ToolCall = { id: string; type: "function"; function: { name: string; arguments: string } };

export async function answer(message: string, history: ChatTurn[], emit: (event: BotEvent) => void) {
  announceMode();
  const config = botConfig();
  if (config.mode === "keyless") {
    await keylessAnswer(message, history, emit);
    return;
  }
  try {
    await agentLoop(message, history, emit, config);
  } catch (error) {
    console.error("[ask] agent failed, falling back to keyless", error instanceof Error ? error.message : error);
    emit({ type: "status", text: "The model is unavailable. Answering from live sources and notes." });
    await keylessAnswer(message, history, emit);
  }
}

async function agentLoop(message: string, history: ChatTurn[], emit: (event: BotEvent) => void, config: BotConfig) {
  const messages: Message[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.slice(-8).map((turn) => ({ role: turn.role, content: turn.content.slice(0, 2000) }) as Message),
    { role: "user", content: message.slice(0, 1500) },
  ];
  const sources = new Map<string, { title: string; url: string }>();
  const toolCalls: string[] = [];
  let streamed = "";

  for (let round = 0; round < 7; round += 1) {
    const result = await complete(config, messages, round < 6, (delta) => {
      streamed += delta;
      emit({ type: "delta", text: scrub(delta) });
    });

    if (result.toolCalls.length) {
      messages.push({ role: "assistant", content: result.content, tool_calls: result.toolCalls });
      for (const call of result.toolCalls) {
        let args: Record<string, unknown> = {};
        try {
          args = call.function.arguments ? (JSON.parse(call.function.arguments) as Record<string, unknown>) : {};
        } catch {
          args = {};
        }
        toolCalls.push(call.function.name);
        emit({ type: "status", text: statusLine(call.function.name, args) });
        const outcome = await runTool(call.function.name, args);
        for (const source of outcome.sources) sources.set(source.url, source);
        messages.push({ role: "tool", content: outcome.content.slice(0, 12_000), tool_call_id: call.id });
      }
      continue;
    }

    if (!streamed.trim() && result.content.trim()) {
      emit({ type: "delta", text: scrub(result.content) });
      streamed = result.content;
    }
    break;
  }

  if (!streamed.trim()) {
    emit({ type: "delta", text: `I couldn't put an answer together for that one. The contact form at /contact goes straight to Anish.` });
  }
  const slipped = findBanned(streamed);
  if (slipped.length) console.warn("[ask] scrubbed words from a model answer:", slipped.join(", "));
  emit({ type: "sources", items: [...sources.values()].filter((item) => item.url.startsWith("/") || item.url.startsWith("http")).slice(0, 5) });
  emit({ type: "done", mode: "agent", toolCalls });
}

function statusLine(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "knowledge_base":
      return "Reading Anish's notes";
    case "medium_feed":
      return "Checking his Medium feed";
    case "github_profile":
      return "Checking GitHub";
    case "digitalocean_profile":
      return "Checking the DigitalOcean author page";
    case "web_search":
      return `Searching the web for "${String(args.query ?? "").slice(0, 60)}"`;
    case "fetch_page":
      return `Reading ${String(args.url ?? "").replace(/^https?:\/\//, "").slice(0, 60)}`;
    default:
      return "Working";
  }
}

type Completion = { content: string; toolCalls: ToolCall[] };

/** One streamed chat completion. Content deltas go to onDelta; tool calls are assembled. */
async function complete(config: BotConfig, messages: Message[], allowTools: boolean, onDelta: (text: string) => void): Promise<Completion> {
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.LLM_API_KEY}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(60_000),
    body: JSON.stringify({
      model: config.model,
      temperature: 0.2,
      stream: true,
      messages,
      ...(allowTools ? { tools: toolSchemas, tool_choice: "auto" } : {}),
    }),
  });
  if (!response.ok || !response.body) {
    const detail = await response.text().catch(() => "");
    throw new Error(`LLM ${response.status} ${detail.slice(0, 200)}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let content = "";
  const calls = new Map<number, ToolCall>();

  const handle = (data: string) => {
    if (data === "[DONE]") return;
    let json: {
      choices?: { delta?: { content?: string; tool_calls?: { index: number; id?: string; function?: { name?: string; arguments?: string } }[] } }[];
    };
    try {
      json = JSON.parse(data);
    } catch {
      return;
    }
    const delta = json.choices?.[0]?.delta;
    if (!delta) return;
    if (delta.content) {
      content += delta.content;
      onDelta(delta.content);
    }
    for (const part of delta.tool_calls ?? []) {
      const existing = calls.get(part.index) ?? { id: part.id ?? `call_${part.index}`, type: "function" as const, function: { name: "", arguments: "" } };
      if (part.id) existing.id = part.id;
      if (part.function?.name) existing.function.name += part.function.name;
      if (part.function?.arguments) existing.function.arguments += part.function.arguments;
      calls.set(part.index, existing);
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("data:")) handle(trimmed.slice(5).trim());
    }
  }
  if (buffer.trim().startsWith("data:")) handle(buffer.trim().slice(5).trim());

  return { content, toolCalls: [...calls.values()].filter((call) => call.function.name) };
}
