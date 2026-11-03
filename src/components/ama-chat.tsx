"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SmartLink } from "@/components/smart-link";

const starters = [
  "What does Anish do?",
  "Who has he worked with?",
  "What was he doing before DigitalOcean?",
  "What are his Medium numbers?",
  "What's his latest Medium post?",
  "What does he do outside work?",
  "How do I start a project with him?",
  "How technical is he?",
];

type Source = { title: string; url: string };

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  status?: string;
  sources?: Source[];
  mode?: "agent" | "keyless";
  failed?: boolean;
  live?: boolean;
};

type BotEvent =
  | { type: "status"; text: string }
  | { type: "delta"; text: string }
  | { type: "sources"; items: Source[] }
  | { type: "done"; mode: "agent" | "keyless"; toolCalls: string[] }
  | { type: "error"; text: string };

let nextId = 1;

export function AmaChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [mode, setMode] = useState<"agent" | "keyless" | null>(null);
  const [blocked, setBlocked] = useState("");
  const [reduce, setReduce] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pendingRef = useRef("");

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    fetch("/api/chat")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { mode?: "agent" | "keyless" } | null) => data?.mode && setMode(data.mode))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages]);

  function patch(id: number, update: (message: Message) => Message) {
    setMessages((current) => current.map((message) => (message.id === id ? update(message) : message)));
  }

  async function send(text: string) {
    const message = text.trim();
    if (!message || pending) return;
    const history = messages
      .filter((item) => item.content && !item.failed)
      .slice(-8)
      .map((item) => ({ role: item.role, content: item.content }));
    const userId = nextId++;
    const botId = nextId++;
    pendingRef.current = "";
    setMessages((current) => [
      ...current,
      { id: userId, role: "user", content: message },
      { id: botId, role: "assistant", content: "", status: "Warming up", live: true },
    ]);
    setDraft("");
    setBlocked("");
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });
      if (!response.ok || !response.body) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        if (response.status === 429) setBlocked(data.error ?? "Too many questions right now.");
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      const handle = (line: string) => {
        if (!line.trim()) return;
        let event: BotEvent;
        try {
          event = JSON.parse(line) as BotEvent;
        } catch {
          return;
        }
        if (event.type === "status") patch(botId, (item) => ({ ...item, status: event.text }));
        if (event.type === "delta") {
          if (reduce) {
            pendingRef.current += event.text;
            patch(botId, (item) => ({ ...item, status: undefined }));
          } else {
            patch(botId, (item) => ({ ...item, status: undefined, content: item.content + event.text }));
          }
        }
        if (event.type === "sources") patch(botId, (item) => ({ ...item, sources: event.items }));
        if (event.type === "done") {
          setMode(event.mode);
          const buffered = pendingRef.current;
          pendingRef.current = "";
          patch(botId, (item) => ({
            ...item,
            mode: event.mode,
            status: undefined,
            live: false,
            content: item.content || buffered,
          }));
        }
        if (event.type === "error") patch(botId, (item) => ({ ...item, status: undefined, live: false, failed: true, content: item.content || event.text }));
      };
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        lines.forEach(handle);
      }
      if (buffer) handle(buffer);
      const leftover = pendingRef.current;
      pendingRef.current = "";
      patch(botId, (item) => {
        const content = item.content || leftover;
        if (content) return { ...item, content, live: false, status: undefined };
        return { ...item, failed: true, live: false, status: undefined, content: "I didn't get an answer back. Try once more, or use the contact form." };
      });
    } catch (error) {
      const text = error instanceof Error && error.message && !error.message.startsWith("HTTP") ? error.message : "The connection dropped. Try again, or use the contact form.";
      patch(botId, (item) => ({ ...item, status: undefined, live: false, failed: true, content: text }));
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  const lastUser = [...messages].reverse().find((item) => item.role === "user");
  const lastFailed = messages[messages.length - 1]?.failed;

  return (
    <div className="ama-shell rounded-3xl border border-line bg-panel">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <p className="font-mono text-xs text-ember">ask.anish</p>
        <p className="font-mono text-[11px] text-faint" aria-live="polite">
          {mode === "agent" ? "model + live sources" : mode === "keyless" ? "live sources + notes, no model" : "connecting"}
        </p>
      </div>

      <div ref={logRef} className="grid max-h-[34rem] min-h-[14rem] gap-5 overflow-y-auto px-4 py-4" aria-live="polite">
        {messages.length === 0 ? (
          <div className="grid gap-4">
            <p className="text-sm leading-relaxed text-muted">
              Ask about my work, clients, the years before DigitalOcean, the numbers, hobbies, or how a project starts. I read live from Medium, GitHub, and DigitalOcean, and I link what I cite. If I can&apos;t find it, I say so.
            </p>
            <div className="flex flex-wrap gap-2" aria-label="Starter questions">
              {starters.map((starter, index) => (
                <button
                  key={starter}
                  type="button"
                  className={`starter-chip starter-chip-${index % 4} rounded-full border border-line bg-panel-2 px-3 py-1.5 text-left text-xs text-muted hover:border-ember hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange`}
                  onClick={() => void send(starter)}
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {messages.map((message) => (
          <article
            key={message.id}
            className={`${message.role === "user" ? "ml-6 sm:ml-16" : "ama-answer mr-2 sm:mr-10"} ${message.live ? "ama-answer-live" : ""}`}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
              {message.role === "user" ? "You" : message.failed ? "Didn't work" : message.mode === "agent" ? "Anish's bot" : message.mode === "keyless" ? "Anish's bot · from live sources and notes" : "Anish's bot"}
            </p>
            {message.status ? <Thinker label={message.status} reduce={reduce} /> : null}
            {message.content ? (
              <div className={`mt-1 text-sm leading-relaxed ${message.failed ? "text-ember" : "text-cream"}`}>
                <RichText text={message.content} />
                {message.live && !reduce ? <span className="ama-caret" aria-hidden="true" /> : null}
              </div>
            ) : null}
            {message.sources?.length ? (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Sources">
                {message.sources.map((source, index) => (
                  <li key={source.url} className="source-chip" style={{ animationDelay: `${index * 70}ms` }}>
                    <SmartLink
                      href={source.url}
                      className="inline-block rounded-full border border-line bg-panel-2 px-2.5 py-1 text-[11px] text-muted hover:border-ember hover:text-cream"
                    >
                      {source.title}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}

        {lastFailed && lastUser ? (
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => void send(lastUser.content)} disabled={pending}>
              Try again
            </Button>
            <Button asChild variant="ghost" size="sm">
              <SmartLink href="/contact">Use the contact form</SmartLink>
            </Button>
          </div>
        ) : null}
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
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void send(draft);
            }
          }}
          placeholder="Ask about clients, the SRE years, hobbies, or hiring."
          rows={2}
          className="min-h-20"
          maxLength={1000}
          disabled={Boolean(blocked)}
        />
        {blocked ? <p className="mt-2 text-sm text-ember" role="alert">{blocked}</p> : null}
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-faint">Enter sends. Shift+Enter adds a line.</p>
          <Button type="submit" disabled={pending || !draft.trim() || Boolean(blocked)}>
            {pending ? "Working" : "Ask"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Thinker({ label, reduce }: { label: string; reduce: boolean }) {
  return (
    <div className="mt-2 flex items-center gap-3 text-sm text-ember">
      <svg viewBox="0 0 72 90" className="h-12 w-10 shrink-0" aria-hidden="true">
        <rect x="8" y="10" width="56" height="4" rx="2" fill="#e8611f" />
        <rect x="10" y="0" width="4" height="14" fill="#4a3b31" />
        <rect x="58" y="0" width="4" height="14" fill="#4a3b31" />
        <g className={reduce ? undefined : "thinker-puller"}>
          <rect x="30" y="28" width="12" height="12" rx="2" fill="#c98a5b" />
          <rect x="30" y="26" width="12" height="5" rx="2" fill="#e9c25a" />
          <rect x="28" y="42" width="16" height="22" rx="3" fill="#1f2430" />
          <circle cx="36" cy="52" r="2.4" fill="#e8611f" />
          <path d="M28 44 L18 22 L18 14 M44 44 L54 22 L54 14" fill="none" stroke="#c98a5b" strokeWidth="4" strokeLinecap="round" />
          <path d="M32 64 L30 82 M40 64 L42 82" fill="none" stroke="#2a2f3a" strokeWidth="5" strokeLinecap="round" />
        </g>
      </svg>
      <p>{label}</p>
    </div>
  );
}

/** Paragraphs, lists, markdown links, and quoted recommendations as blocks. */
function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <div className="grid gap-3">
      {blocks.map((block, index) => {
        const lines = block.split("\n");
        const isList = lines.length > 1 && lines.every((line) => /^\s*([-*]|\d+\.)\s+/.test(line));
        if (isList) {
          return (
            <ul key={index} className="grid list-disc gap-1 pl-5">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>
                  <Inline text={line.replace(/^\s*([-*]|\d+\.)\s+/, "")} />
                </li>
              ))}
            </ul>
          );
        }
        const quoted = /^\s*["“]/.test(block);
        if (quoted) {
          const [first, ...rest] = lines;
          return (
            <blockquote key={index} className="ama-quote border-l-2 border-orange/70 pl-3">
              <p className="text-cream/95">
                <Inline text={first.replace(/^\s*/, "")} />
              </p>
              {rest.length ? (
                <footer className="mt-2 text-xs text-muted">
                  {rest.map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {lineIndex > 0 ? <br /> : null}
                      <Inline text={line} />
                    </span>
                  ))}
                </footer>
              ) : null}
            </blockquote>
          );
        }
        return (
          <p key={index}>
            {lines.map((line, lineIndex) => (
              <span key={lineIndex}>
                {lineIndex > 0 ? <br /> : null}
                <Inline text={line} />
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

const inlinePattern = /(\[[^\]]+\]\((?:https?:\/\/|\/)[^\s)]+\)|https?:\/\/[^\s)]+|[\w.+-]+@[\w.-]+\.[a-z]{2,}|\*\*[^*]+\*\*)/gi;

function Inline({ text }: { text: string }) {
  const parts = text.split(inlinePattern);
  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        const markdown = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
        if (markdown) {
          const [, label, href] = markdown;
          return (
            <SmartLink key={index} href={href} className="text-ember underline underline-offset-2">
              {label}
            </SmartLink>
          );
        }
        if (/^\*\*.+\*\*$/.test(part)) return <strong key={index}>{part.slice(2, -2)}</strong>;
        if (/^https?:\/\//i.test(part)) {
          const clean = part.replace(/[.,;:]+$/, "");
          return (
            <span key={index}>
              <SmartLink href={clean} className="text-ember underline underline-offset-2">
                {clean.replace(/^https?:\/\//, "")}
              </SmartLink>
              {part.slice(clean.length)}
            </span>
          );
        }
        if (part.includes("@") && /\.[a-z]{2,}$/i.test(part)) {
          return (
            <SmartLink key={index} href={`mailto:${part}`} className="text-ember underline underline-offset-2">
              {part}
            </SmartLink>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
