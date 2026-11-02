import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import nodemailer from "nodemailer";
import { z } from "zod";
import { budgets, projectTypes, timelines } from "@data/contact";
import { site } from "@data/site";

const optionalChoice = <T extends readonly [string, ...string[]]>(values: T) =>
  z.union([z.literal(""), z.enum(values)]).optional().default("");

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Add your name.").max(80),
  email: z.string().trim().email("Enter a real email.").max(160),
  company: z.string().trim().min(2, "Add your company.").max(120),
  projectType: z.enum(projectTypes, { message: "Pick a project type." }),
  budget: optionalChoice(budgets),
  timeline: optionalChoice(timelines),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a little about the project.")
    .max(5000),
  company_fax: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult =
  | { ok: true; transport: "smtp" | "mock"; id: string; dropped?: false }
  | { ok: true; transport: "mock"; id: "discarded"; dropped: true }
  | { ok: false; errors: Record<string, string> }
  | { ok: false; error: string };

function destination() {
  return process.env.CONTACT_TO || process.env.CONTACT_TO_EMAIL || site.email;
}

function resolveTransport(): "smtp" | "mock" {
  if (process.env.CONTACT_TRANSPORT === "mock") return "mock";
  if (process.env.SMTP_HOST) return "smtp";
  return "mock";
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function renderBody(input: ContactInput) {
  return [
    `Name: ${oneLine(input.name)}`,
    `Email: ${oneLine(input.email)}`,
    `Company: ${oneLine(input.company)}`,
    `Project: ${input.projectType}`,
    `Budget: ${oneLine(input.budget || "not given")}`,
    `Timeline: ${oneLine(input.timeline || "not given")}`,
    "",
    input.message.trim(),
  ].join("\n");
}

async function deliver(input: ContactInput): Promise<{ transport: "smtp" | "mock"; id: string }> {
  const transport = resolveTransport();
  const to = destination();
  const subject = oneLine(`Work with Anish: ${input.name} (${input.company})`);
  const text = renderBody(input);
  const from = process.env.CONTACT_FROM || process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || site.email;

  if (transport === "smtp") {
    const port = Number(process.env.SMTP_PORT || 587);
    const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !pass) {
      throw new Error("SMTP is missing host, user, or password");
    }
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass },
    });
    const info = await transporter.sendMail({
      from,
      to,
      replyTo: oneLine(input.email),
      subject,
      text,
    });
    return { transport, id: info.messageId };
  }

  const id = `mock_${Date.now().toString(36)}`;
  const file = process.env.CONTACT_LOG_PATH || path.join(os.tmpdir(), "anish-contact-log.jsonl");
  await mkdir(path.dirname(file), { recursive: true });
  await appendFile(
    file,
    `${JSON.stringify({ id, to, subject, at: new Date().toISOString(), text })}\n`,
    "utf8",
  );
  return { transport: "mock", id };
}

export async function handleContact(payload: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors };
  }

  if (parsed.data.company_fax.trim()) {
    return { ok: true, transport: "mock", id: "discarded", dropped: true };
  }

  try {
    const sent = await deliver(parsed.data);
    return { ok: true, ...sent };
  } catch (error) {
    console.error("contact delivery failed", error instanceof Error ? error.message : error);
    return {
      ok: false,
      error: "I couldn't send that just now. Email me directly and it will still reach me.",
    };
  }
}

export function mailtoHref() {
  const subject = encodeURIComponent("Work with Anish");
  const body = encodeURIComponent(
    "Name:\nCompany:\nProject type:\n\nTell me about the project:\n",
  );
  return `mailto:${destination()}?subject=${subject}&body=${body}`;
}
