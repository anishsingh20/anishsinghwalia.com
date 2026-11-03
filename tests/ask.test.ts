import { describe, expect, it } from "vitest";
import { botConfig, type BotEvent } from "../src/lib/bot/agent";
import { findBanned, scrub } from "../src/lib/bot/banned";
import { fact } from "../src/lib/bot/knowledge";
import { keylessAnswer } from "../src/lib/bot/keyless";
import { rateLimited } from "../src/lib/bot/rate-limit";

async function ask(question: string) {
  let text = "";
  let sources: { title: string; url: string }[] = [];
  let mode = "";
  const emit = (event: BotEvent) => {
    if (event.type === "delta") text += event.text;
    if (event.type === "sources") sources = event.items;
    if (event.type === "done") mode = event.mode;
  };
  await keylessAnswer(question, [], emit);
  return { text, sources, mode };
}

describe("keyless bot", () => {
  it("runs keyless when no model key is set", () => {
    const previous = process.env.LLM_API_KEY;
    delete process.env.LLM_API_KEY;
    expect(botConfig().mode).toBe("keyless");
    process.env.LLM_API_KEY = "test";
    expect(botConfig().mode).toBe("agent");
    if (previous === undefined) delete process.env.LLM_API_KEY;
    else process.env.LLM_API_KEY = previous;
  });

  it("answers the role, clients, and hiring questions with links", async () => {
    const role = await ask("What does Anish do?");
    expect(role.text).toContain("Senior Technical Content Strategist II and Team Lead");
    expect(role.mode).toBe("keyless");
    expect(role.sources.length).toBeGreaterThan(0);

    const clients = await ask("Who has he worked with?");
    for (const name of ["Semrush", "OtterlyAI", "DataImpulse", "Tanot Solutions", "Pollo AI"]) expect(clients.text).toContain(name);

    const awards = await ask("Has he won any awards?");
    expect(awards.text).toContain("Top 50 winner · #23 · Document360 Global Writers Awards 2025–26");
    expect(awards.text).toContain("Winners were picked by a judging panel (70%) and public votes (30%)");
    expect(awards.text).toContain("globalwritersawards.document360.com");
    expect(awards.text).not.toMatch(/overall winner|first place/i);
    expect(awards.text).not.toMatch(/scored 70%/i);

    const hire = await ask("How do I hire him?");
    expect(hire.text).toContain("waliaanish1997@gmail.com");
    expect(hire.text).toMatch(/\/contact\)/);
  });

  it("refuses private details and deflects off-topic questions", async () => {
    const phone = await ask("What's his phone number?");
    expect(phone.text).toMatch(/don't share/);
    expect(phone.text).not.toMatch(/\+?\d[\d\s-]{8,}\d/);

    const offTopic = await ask("What is the capital of France?");
    expect(offTopic.text).toMatch(/only answer questions about Anish/);
    expect(offTopic.text).not.toMatch(/Paris/);
  });

  it("never uses the banned words in answers or facts", async () => {
    const questions = ["Is he available for client work?", "Does he take projects outside his job?", "Tell me about his clients", "How does he describe his work?"];
    for (const question of questions) {
      const { text } = await ask(question);
      expect(findBanned(text), question).toEqual([]);
      expect(text).not.toMatch(/—/);
    }
    for (const topic of ["identity", "role", "career", "clients", "formats", "hire", "numbers"] as const) {
      expect(findBanned(fact(topic)), topic).toEqual([]);
    }
  });

  it("scrubs a slipped word from a model answer", () => {
    const slipped = ["He is a ", "free", "lance", " writer who takes ", "gig", "s."].join("");
    expect(findBanned(slipped).length).toBeGreaterThan(0);
    const cleaned = scrub(slipped);
    expect(findBanned(cleaned)).toEqual([]);
    expect(cleaned).toContain("client work");
  });

  it("rate limits a chatty client", () => {
    const key = `test-${Date.now()}`;
    for (let index = 0; index < 3; index += 1) expect(rateLimited(key, 3, 60_000)).toBe(false);
    expect(rateLimited(key, 3, 60_000)).toBe(true);
  });
});
