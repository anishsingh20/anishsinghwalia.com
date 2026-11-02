import { award } from "@data/site";

function Laurel({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8M12 17v4" />
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4.5a.5.5 0 0 0-.5.5C4 9 5.5 11 8 11.5M17 6h2.5a.5.5 0 0 1 .5.5c0 2.5-1.5 4.5-4 5" />
    </svg>
  );
}

/**
 * The Document360 award, as the winners page states it. Two sizes: a pill for
 * heroes and proof strips, and a card for the About page.
 */
export function AwardBadge({ variant = "pill", className = "" }: { variant?: "pill" | "card"; className?: string }) {
  if (variant === "card") {
    return (
      <a
        href={award.href}
        className={`group block rounded-3xl border border-orange/40 bg-[linear-gradient(135deg,rgba(232,97,31,0.16),rgba(232,97,31,0.03))] p-6 transition hover:border-orange/70 ${className}`}
      >
        <div className="flex items-start gap-4">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange text-ink">
            <Laurel className="h-6 w-6" />
          </span>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">{award.edition}</p>
            <p className="mt-1 font-display text-2xl text-cream">{award.name}</p>
            <p className="mt-1 text-sm text-cream/90">
              {award.placement}. Listed as {award.listedAs}.
            </p>
            <p className="mt-2 text-sm text-muted">{award.how}</p>
            <span className="mt-3 inline-block text-sm text-ember group-hover:underline">See the winners list</span>
          </div>
        </div>
      </a>
    );
  }
  return (
    <a
      href={award.href}
      className={`inline-flex max-w-full items-center gap-2 rounded-full border border-orange/50 bg-orange/10 px-3 py-1.5 text-xs font-medium leading-snug text-ember transition hover:bg-orange/20 ${className}`}
    >
      <Laurel />
      <span>
        Top 50 Winner, #{award.rank} · {award.name} {award.edition}
      </span>
    </a>
  );
}
