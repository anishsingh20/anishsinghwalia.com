"use client";

import { useEffect, useRef, useState } from "react";
import { pullupMilestones } from "@data/pullup";

/**
 * Tap, click, or press Space/Enter on the button to do a pull-up.
 * Every milestone opens a fact. Personal best stays in this browser.
 * Restored from 63e62e9 (last home placement) / 558f9d2 (component).
 */

const STORAGE_KEY = "asw-pullup-best";

export function PullupChallenge() {
  const [reps, setReps] = useState(0);
  const [best, setBest] = useState(0);
  const [up, setUp] = useState(false);
  const [reduce, setReduce] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const stored = Number(window.localStorage.getItem(STORAGE_KEY) || 0);
    if (stored > 0) setBest(stored);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  function rep() {
    const next = reps + 1;
    setReps(next);
    if (next > best) {
      setBest(next);
      window.localStorage.setItem(STORAGE_KEY, String(next));
    }
    setUp(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setUp(false), reduce ? 0 : 260);
  }

  function reset() {
    setReps(0);
    setUp(false);
  }

  const next = pullupMilestones.find((item) => item.reps > reps);
  const reached = pullupMilestones.filter((item) => item.reps <= reps);
  const latest = reached[reached.length - 1];
  const progress = next ? reps / next.reps : 1;

  return (
    <section aria-label="Pull-up challenge" className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Rep challenge</p>
          <h2 className="mt-1 font-display text-2xl text-cream">Do a few pull-ups with me</h2>
          <p className="mt-1 text-sm text-muted">Tap, click, or press Space. Each set opens a real fact.</p>
        </div>
        <p className="text-right font-mono text-xs text-faint">
          Best <span className="text-cream">{best}</span>
        </p>
      </div>

      <div className="mt-4 grid grid-cols-[112px_1fr] items-center gap-4">
        <svg viewBox="0 0 120 150" className="h-36 w-28" aria-hidden="true">
          <rect x="10" y="18" width="100" height="6" rx="3" fill="#e8611f" />
          <rect x="14" y="0" width="6" height="22" fill="#4a3b31" />
          <rect x="100" y="0" width="6" height="22" fill="#4a3b31" />
          <g
            style={{
              transform: `translateY(${up ? -22 : 0}px)`,
              transition: reduce ? "none" : "transform 220ms cubic-bezier(.3,1.4,.5,1)",
            }}
          >
            <rect x="52" y="50" width="16" height="16" rx="3" fill="#c98a5b" />
            <rect x="52" y="48" width="16" height="6" rx="2" fill="#e9c25a" />
            <rect x="54" y="60" width="12" height="6" rx="2" fill="#3a2a1e" />
            <rect x="50" y="68" width="20" height="30" rx="4" fill="#1f2430" />
            <circle cx="60" cy="80" r="3.5" fill="#e8611f" />
            <path
              d={up ? "M50 70 L40 40 L40 24 M70 70 L80 40 L80 24" : "M50 70 L42 46 L40 24 M70 70 L78 46 L80 24"}
              fill="none"
              stroke="#c98a5b"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M54 98 L52 126 M66 98 L68 126" fill="none" stroke="#2a2f3a" strokeWidth="7" strokeLinecap="round" />
            <rect x="46" y="124" width="12" height="7" rx="2" fill="#111" />
            <rect x="62" y="124" width="12" height="7" rx="2" fill="#111" />
          </g>
        </svg>
        <div>
          <p className="font-display text-5xl tabular-nums text-cream" aria-live="polite">
            {reps}
            <span className="ml-2 font-sans text-sm text-faint">{reps === 1 ? "rep" : "reps"}</span>
          </p>
          <div
            className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={next?.reps ?? reps}
            aria-valuenow={reps}
            aria-label={next ? `Progress to ${next.label}` : "All milestones reached"}
          >
            <div className="h-full bg-orange transition-[width] duration-200" style={{ width: `${Math.min(100, progress * 100)}%` }} />
          </div>
          <p className="mt-2 text-xs text-faint">
            {next ? `${next.reps - reps} more to ${next.label}` : "That's the set. Go outside."}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={rep}
          className="h-11 flex-1 rounded-full bg-orange px-5 text-sm font-semibold text-ink hover:bg-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/60 active:scale-[0.98]"
        >
          Pull up
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={reps === 0}
          className="h-11 rounded-full border border-line px-4 text-sm text-muted hover:text-cream disabled:opacity-40"
        >
          Reset
        </button>
      </div>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {pullupMilestones.map((item) => {
          const open = reps >= item.reps;
          return (
            <li
              key={item.reps}
              className={`rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] ${open ? "border-orange/50 text-ember" : "border-line text-faint"}`}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
      <div className="mt-3 min-h-[3.4rem] rounded-2xl border border-dashed border-line px-4 py-3 text-sm" aria-live="polite">
        {latest ? (
          <p className="text-cream">
            <span className="font-mono text-xs text-ember">{latest.label} · </span>
            {latest.text}
          </p>
        ) : (
          <p className="text-muted">Every four reps opens a fact. Space or Enter works when the button is focused.</p>
        )}
      </div>
    </section>
  );
}
