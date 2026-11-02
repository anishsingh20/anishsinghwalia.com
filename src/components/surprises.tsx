"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { mountainQuote } from "@data/hobbies";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

export function Surprises() {
  const [trail, setTrail] = useState(false);
  const keys = useRef<string[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (document.body.dataset.suppressEggs === "true") return;
      if (event.key === "Escape") {
        setTrail(false);
        return;
      }
      keys.current = [...keys.current, event.code].slice(-KONAMI.length);
      if (KONAMI.every((code, index) => keys.current[index] === code)) {
        setTrail(true);
        keys.current = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (trail) closeRef.current?.focus();
  }, [trail]);

  if (!trail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="presentation" onClick={() => setTrail(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="trail-title"
        className="w-full max-w-md rounded-3xl border border-orange/40 bg-ink p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <svg viewBox="0 0 320 140" className="h-28 w-full" aria-hidden="true">
          <path d="M0 120 L70 90 L120 100 L180 50 L230 70 L320 20" fill="none" stroke="#e8611f" strokeWidth="3" />
          <circle cx="320" cy="20" r="6" fill="#ffb088" />
          <path d="M40 120 L90 70 L150 120 Z" fill="#211c18" />
          <path d="M150 120 L210 40 L280 120 Z" fill="#2e2925" />
        </svg>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">You found it</p>
        <h2 id="trail-title" className="mt-2 font-display text-2xl">The mountains are the other office.</h2>
        <p className="mt-3 text-muted">“{mountainQuote}”</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/game" className="rounded-full bg-orange px-4 py-2 text-sm font-medium text-ink" onClick={() => setTrail(false)}>
            Visit the cabin
          </Link>
          <button ref={closeRef} type="button" className="rounded-full border border-line px-4 py-2 text-sm" onClick={() => setTrail(false)}>
            Stay here
          </button>
        </div>
      </div>
    </div>
  );
}
