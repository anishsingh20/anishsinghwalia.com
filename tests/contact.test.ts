import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import { handleContact } from "../src/lib/contact";

const valid = {
  name: "Amina Shah",
  email: "amina@example.com",
  company: "Northwind",
  projectType: "Long-form articles and deep dives",
  budget: "",
  timeline: "This quarter",
  message: "We need a brand story and thought leadership that shows up in AI answers.",
  company_fax: "",
};

beforeEach(() => {
  process.env.CONTACT_TRANSPORT = "mock";
  process.env.CONTACT_LOG_PATH = path.join(mkdtempSync(path.join(tmpdir(), "anish-")), "log.jsonl");
  delete process.env.RESEND_API_KEY;
});

describe("contact form", () => {
  it("accepts a complete inquiry on the mock transport", async () => {
    const result = await handleContact(valid);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.transport).toBe("mock");
  });

  it("rejects a short message and a bad email", async () => {
    const result = await handleContact({ ...valid, email: "nope", message: "hi" });
    expect(result.ok).toBe(false);
    if (!result.ok && "errors" in result) {
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.message).toBeTruthy();
    }
  });

  it("drops honeypot submissions without calling them a failure", async () => {
    const result = await handleContact({ ...valid, company_fax: "spam" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.dropped).toBe(true);
  });
});
