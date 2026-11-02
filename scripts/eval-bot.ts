/**
 * Eval for the Ask bot. Runs real questions through the same answer() the
 * API uses, checks each answer against expectations, and writes a report.
 *
 *   npm run eval:bot
 *
 * Works keyless (live fetchers + notes). With LLM_API_KEY set it evals the
 * agent loop instead. Exit code 1 if any case fails.
 */

import { existsSync, readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { answer, botConfig, type BotEvent } from "../src/lib/bot/agent";
import { aiTells, findBanned } from "../src/lib/bot/banned";

/** Read .env.local the way Next does, without overriding real env vars. Config is read lazily, so this can run first in main. */
function loadEnvLocal() {
  const file = path.join(process.cwd(), ".env.local");
  if (!existsSync(file)) return;
  for (const raw of readFileSync(file, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 1) continue;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim().replace(/^(['"])(.*)\1$/, "$2");
    if (!(key in process.env)) process.env[key] = value;
  }
}

type Case = {
  id: string;
  question: string;
  /** Every pattern must match the answer. */
  expect: RegExp[];
  /** No pattern may match the answer. */
  reject?: RegExp[];
  /** Needs a live source. Still has to pass, but is flagged in the report. */
  live?: boolean;
};

const cases: Case[] = [
  { id: "current-job", question: "What does Anish do right now?", expect: [/Senior Technical Content Strategist II and Team Lead/, /DigitalOcean/] },
  { id: "who-is", question: "Who is Anish Singh Walia?", expect: [/DigitalOcean/, /content/i] },
  { id: "nutanix", question: "What did he do at Nutanix?", expect: [/SRE/, /Nutanix/, /American Express/] },
  { id: "amex", question: "Did Anish work with American Express?", expect: [/American Express/, /Cloud and Infrastructure Operations/, /Nutanix/] },
  { id: "clients", question: "Which companies has he worked with?", expect: [/Semrush/, /OtterlyAI/, /Datalpulse/, /Tanot Solutions/, /Pollo AI/] },
  { id: "clients-framing", question: "Does he do client work?", expect: [/client work|companies he has worked with|worked with/i, /Semrush/] },
  { id: "tutorial-count", question: "How many DigitalOcean tutorials has he written?", expect: [/\b3\d\d\b/, /digitalocean\.com\/community\/users\/asinghwalia/], live: true },
  { id: "medium-stats", question: "What are his Medium stats?", expect: [/3,000,000\+/, /35,000\+/, /Top Writer/] },
  { id: "numbers", question: "Give me the numbers.", expect: [/3,000,000\+/, /200,000\+/, /347/] },
  { id: "latest-medium", question: "What's his latest Medium post?", expect: [/medium\.com\/@anishsingh20/], live: true },
  { id: "hobbies", question: "What does he do outside work?", expect: [/hiking/i, /calisthenics/i, /mountain/i], reject: [/\d+ (reps|km|miles)/i] },
  { id: "hire", question: "How do I hire him?", expect: [/\/contact/, /waliaanish1997@gmail\.com/] },
  { id: "pricing", question: "How much does he charge?", expect: [/doesn't publish prices|does not publish prices/i, /\/contact/], reject: [/\$\s?\d/, /₹\s?\d/] },
  { id: "vit", question: "Where did he study?", expect: [/Vellore Institute of Technology/, /Information Technology/, /2015 to 2019/] },
  { id: "podcasts", question: "Has he been on any podcasts or in the press?", expect: [/AI For Thought/, /ActiveCampaign/, /AllAboutAI/i] },
  { id: "github", question: "What's on his GitHub?", expect: [/github\.com\/anishsingh20/, /repos/i], live: true },
  { id: "technical", question: "How technical is he really?", expect: [/SRE/, /Nutanix/, /Kubernetes|inference/i] },
  { id: "formats", question: "What kinds of content does he make?", expect: [/video/i, /ghostwriting/i, /newsletter/i, /deep dive/i] },
  { id: "video", question: "Does he make videos?", expect: [/video/i, /medium\.com|youtube\.com/] },
  { id: "ghostwriting", question: "Does Anish do ghostwriting or LinkedIn posts?", expect: [/Renu Sharma|Tanot/, /testimonials/] },
  { id: "testimonials", question: "What do clients say about him?", expect: [/testimonials/, /Semrush|OtterlyAI|Datalpulse|Tanot|Pollo/] },
  { id: "location", question: "Where is he based?", expect: [/Dehradun/] },
  { id: "email", question: "What's his email?", expect: [/waliaanish1997@gmail\.com/] },
  { id: "career", question: "Walk me through his career.", expect: [/Nutanix/, /DigitalOcean/, /2023/] },
  { id: "web-needed", question: "What did he write about Semrush and ChatGPT?", expect: [/Semrush/, /https?:\/\//] },
  { id: "off-topic-geo", question: "What is the capital of France?", expect: [/only answer questions about Anish/i], reject: [/Paris/] },
  { id: "off-topic-code", question: "Write me a Python script that sorts a list.", expect: [/only answer questions about Anish/i], reject: [/def |sorted\(/] },
  { id: "private-phone", question: "What's his phone number?", expect: [/don't share|do not share|private/i], reject: [/\+?\d[\d\s-]{8,}\d/] },
  { id: "private-address", question: "What is his home address?", expect: [/don't share|do not share|private/i], reject: [/\d+ [A-Z][a-z]+ (Road|Street|Lane)/] },
  { id: "private-salary", question: "How much does he earn at DigitalOcean?", expect: [/don't share|do not share|private|doesn't publish/i], reject: [/\$\s?\d/, /₹\s?\d/] },
];

async function run(question: string) {
  let text = "";
  const status: string[] = [];
  let sources: { title: string; url: string }[] = [];
  let mode = "";
  let error = "";
  const emit = (event: BotEvent) => {
    if (event.type === "delta") text += event.text;
    if (event.type === "status") status.push(event.text);
    if (event.type === "sources") sources = event.items;
    if (event.type === "done") mode = event.mode;
    if (event.type === "error") error = event.text;
  };
  const started = Date.now();
  await answer(question, [], emit);
  return { text: text.trim(), status, sources, mode, error, ms: Date.now() - started };
}

async function main() {
  loadEnvLocal();
  const config = botConfig();
  console.log(`[eval] mode=${config.mode}${config.model ? ` model=${config.model}` : ""} search=${config.search}`);
  const results: {
    id: string;
    question: string;
    pass: boolean;
    failures: string[];
    answer: string;
    sources: { title: string; url: string }[];
    ms: number;
    live?: boolean;
  }[] = [];

  for (const testCase of cases) {
    const result = await run(testCase.question);
    const failures: string[] = [];
    if (result.error) failures.push(`error: ${result.error}`);
    for (const pattern of testCase.expect) if (!pattern.test(result.text)) failures.push(`missing ${pattern}`);
    for (const pattern of testCase.reject ?? []) if (pattern.test(result.text)) failures.push(`must not match ${pattern}`);
    const banned = findBanned(result.text);
    if (banned.length) failures.push(`banned words: ${banned.join(", ")}`);
    for (const tell of aiTells) if (tell.test(result.text)) failures.push(`AI tell ${tell}`);
    if (result.text.toLowerCase().includes("lovee" + "anish")) failures.push("private email leaked");
    if (result.text.length > 1600) failures.push(`too long (${result.text.length} chars)`);
    if (!result.text) failures.push("empty answer");
    const pass = failures.length === 0;
    results.push({ ...testCase, pass, failures, answer: result.text, sources: result.sources, ms: result.ms });
    console.log(`${pass ? "PASS" : "FAIL"}  ${testCase.id.padEnd(18)} ${result.ms}ms${failures.length ? `  ${failures.join("; ")}` : ""}`);
  }

  const passed = results.filter((item) => item.pass).length;
  const stamp = new Date().toISOString();
  const outDir = path.join(process.cwd(), "eval");
  await mkdir(outDir, { recursive: true });

  const md = [
    `# Ask bot eval`,
    ``,
    `Run: ${stamp}  `,
    `Mode: ${config.mode}${config.model ? ` (${config.model} at ${config.baseUrl})` : ""}  `,
    `Search provider: ${config.search}  `,
    `Result: ${passed}/${results.length} passed`,
    ``,
    `Checks on every answer: expected facts present, nothing rejected, no banned words (the list in src/lib/bot/banned.ts), no AI tells, no private email, under 1600 characters.`,
    ``,
    ...results.flatMap((item) => [
      `## ${item.pass ? "PASS" : "FAIL"} · ${item.id}${item.live ? " · live source" : ""}`,
      ``,
      `**Q:** ${item.question}  `,
      `**Time:** ${item.ms} ms`,
      ``,
      item.failures.length ? `Failures: ${item.failures.join("; ")}\n` : "",
      `> ${item.answer.replace(/\n/g, "\n> ")}`,
      ``,
      item.sources.length ? `Sources: ${item.sources.map((source) => `[${source.title}](${source.url})`).join(", ")}` : "Sources: none",
      ``,
    ]),
  ].join("\n");

  await writeFile(path.join(outDir, "results.md"), md);
  await writeFile(path.join(outDir, "results.json"), JSON.stringify({ run: stamp, mode: config.mode, passed, total: results.length, results }, null, 2));
  console.log(`\n[eval] ${passed}/${results.length} passed. Report: eval/results.md`);
  if (passed !== results.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
