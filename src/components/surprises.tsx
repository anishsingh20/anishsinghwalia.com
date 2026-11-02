"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { kubectlPods } from "@data/site";
import { mountainQuote } from "@data/hobbies";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];
const COMMAND = "kubectl get all -n anish";

export function Surprises() {
  const [terminal, setTerminal] = useState(false);
  const [trail, setTrail] = useState(false);
  const buffer = useRef("");
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
        setTerminal(false);
        setTrail(false);
        return;
      }

      keys.current = [...keys.current, event.code].slice(-KONAMI.length);
      if (KONAMI.every((code, index) => keys.current[index] === code)) {
        setTrail(true);
        keys.current = [];
      }

      if (event.key.length === 1) {
        buffer.current = (buffer.current + event.key.toLowerCase()).slice(-COMMAND.length);
        if (buffer.current === COMMAND) {
          setTerminal(true);
          buffer.current = "";
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (terminal || trail) closeRef.current?.focus();
  }, [terminal, trail]);

  return (
    <>
      {terminal ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center" role="presentation" onClick={() => setTerminal(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="kubectl-title"
            className="w-full max-w-xl rounded-2xl border border-line bg-ink p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <p id="kubectl-title" className="font-mono text-sm text-ember">kubectl get all -n anish</p>
              <button ref={closeRef} type="button" className="text-sm text-muted hover:text-cream" onClick={() => setTerminal(false)}>
                Close
              </button>
            </div>
            <p className="mt-2 text-sm text-muted">The same block he keeps in his GitHub README. Every pod is running.</p>
            <div className="mt-4 overflow-x-auto font-mono text-xs text-cream">
              <div className="grid grid-cols-[1.4fr_0.5fr_0.7fr] gap-2 border-b border-line pb-2 text-faint">
                <span>NAME</span><span>READY</span><span>STATUS</span>
              </div>
              {kubectlPods.map((pod) => (
                <Link key={pod.name} href={pod.href} className="grid grid-cols-[1.4fr_0.5fr_0.7fr] gap-2 py-1.5 hover:text-ember" onClick={() => setTerminal(false)}>
                  <span>{pod.name}</span><span>1/1</span><span className="text-orange">Running</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {trail ? (
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
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">Trailhead found</p>
            <h2 id="trail-title" className="mt-2 font-display text-2xl">The mountains are the other office.</h2>
            <p className="mt-3 text-muted">“{mountainQuote}”</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/game" className="rounded-full bg-orange px-4 py-2 text-sm font-medium text-ink" onClick={() => setTrail(false)}>
                Climb the SERP
              </Link>
              <button ref={closeRef} type="button" className="rounded-full border border-line px-4 py-2 text-sm" onClick={() => setTrail(false)}>
                Stay here
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
