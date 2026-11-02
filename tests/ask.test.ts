import { describe, expect, it } from "vitest";
import { fallbackAnswer, loadKnowledge } from "../src/lib/ask";

describe("ask fallback", () => {
  it("answers hobbies, clients, and hiring from the notes", async () => {
    const chunks = await loadKnowledge();
    const hobbies = fallbackAnswer("What are his hobbies?", chunks);
    expect(hobbies.confident).toBe(true);
    expect(hobbies.answer.toLowerCase()).toMatch(/hik|calisthen|trekk|jump rope|skipping/);

    const brands = fallbackAnswer("Which brands has he worked with?", chunks);
    expect(brands.answer).toMatch(/Semrush/);
    expect(brands.answer).toMatch(/Datalpulse/);

    const hire = fallbackAnswer("How do I hire him and what are his rates?", chunks);
    expect(hire.answer.toLowerCase()).toMatch(/contact/);
    expect(hire.answer).toContain("waliaanish1997@gmail.com");
  });

  it("refuses to invent a shoe size", async () => {
    const chunks = await loadKnowledge();
    const answer = fallbackAnswer("What is his shoe size?", chunks);
    expect(answer.confident).toBe(false);
    expect(answer.answer).toMatch(/won't guess|contact/i);
  });
});
