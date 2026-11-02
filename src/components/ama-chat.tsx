"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const suggestions = [
  "What's it like to work with Anish?",
  "Which brands has he worked with?",
  "How technical is he, really?",
  "What kinds of projects does he take?",
  "What do clients say?",
  "What are his hobbies?",
  "How do I start a project?",
  "Walk me through his career",
];

type Message = { role: "user" | "assistant"; content: string; mode?: "notes" | "model" };

export function AmaChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ask about Anish's work, clients, background, or how a project starts. If it isn't in his notes, I'll say so and point you to the contact form.",
      mode: "notes",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function send(text: string) {
    const message = text.trim();
    if (!message || pending) return;
    const history = messages.filter((item) => item.role === "user" || item.content.length > 0);
    const next = [...messages, { role: "user" as const, content: message }];
    setMessages(next);
    setDraft("");
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: history.slice(-6).map((item) => ({ role: item.role, content: item.content })),
        }),
      });
      const data = (await response.json()) as { answer?: string; mode?: "notes" | "model"; error?: string };
      if (!response.ok || !data.answer) throw new Error(data.error || "no answer");
      setMessages((current) => [...current, { role: "assistant", content: data.answer!, mode: data.mode }]);
    } catch {
      setError("The assistant missed that step. Try again, or use the contact form.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-3xl border border-line bg-panel">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <p className="font-mono text-xs text-ember">ask.anish</p>
        <p className="font-mono text-[11px] text-faint">notes first, model when configured</p>
      </div>
      <div className="flex flex-wrap gap-2 px-4 py-3" aria-label="Suggested questions">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="rounded-full border border-line px-3 py-1.5 text-left text-xs text-muted hover:border-ember hover:text-cream"
            onClick={() => send(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
      <div className="grid max-h-[32rem] gap-4 overflow-y-auto px-4 py-2" aria-live="polite">
        {messages.map((message, index) => (
          <article key={`${message.role}-${index}`} className={message.role === "user" ? "ml-8" : "mr-4"}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
              {message.role === "user" ? "You" : message.mode === "model" ? "Live model" : "From his notes"}
            </p>
            <div className="mt-1 text-sm leading-relaxed text-cream">
              <RichText text={message.content} />
            </div>
          </article>
        ))}
        {pending ? <p className="font-mono text-xs text-ember">Looking through the notes…</p> : null}
      </div>
      <form
        className="border-t border-line p-4"
        onSubmit={(event) => {
          event.preventDefault();
          void send(draft);
        }}
      >
        <label htmlFor="ask-input" className="sr-only">Ask about Anish</label>
        <Textarea
          id="ask-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void send(draft);
            }
          }}
          placeholder="Ask about clients, the SRE years, hobbies, or hiring."
          rows={3}
        />
        {error ? <p className="mt-2 text-sm text-ember" role="alert">{error}</p> : null}
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-faint">Enter sends. Shift+Enter adds a line.</p>
          <Button type="submit" disabled={pending || !draft.trim()}>Ask</Button>
        </div>
      </form>
    </div>
  );
}

function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <div className="grid gap-3">
      {blocks.map((block, index) => (
        <p key={index}>
          {block.split("\n").map((line, lineIndex) => (
            <span key={lineIndex}>
              {lineIndex > 0 ? <br /> : null}
              <Line text={line} />
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

function Line({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+|\/contact|[\w.+-]+@[\w.-]+\.[a-z]{2,})/gi);
  return (
    <>
      {parts.map((part, index) => {
        if (part === "/contact") return <Link key={index} href="/contact" className="text-ember underline">contact form</Link>;
        if (part.startsWith("http")) return <a key={index} href={part} className="text-ember underline">{part}</a>;
        if (part.includes("@") && part.includes(".")) return <a key={index} href={`mailto:${part}`} className="text-ember underline">{part}</a>;
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
