import Link from "next/link";
import { logoStrip } from "@data/clients";
import { metrics } from "@data/site";
import { testimonials } from "@data/testimonials";
import { AwardBadge } from "@/components/award-badge";
import { BrandLogo } from "@/components/brand-logo";
import { WorkCtas } from "@/components/work-ctas";

export function LogoStrip({ names = logoStrip, size = "sm" as const }: { names?: readonly string[]; size?: "sm" | "md" }) {
  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label="Companies I've worked with">
      {names.map((name) => (
        <li key={name} className="flex items-center gap-2 rounded-full border border-line bg-panel py-1 pl-1 pr-3 text-xs text-muted">
          <BrandLogo name={name} size={size} />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}

export function MetricsRow({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={`grid grid-cols-2 gap-3 ${compact ? "sm:grid-cols-4" : "md:grid-cols-4"}`}>
      {metrics.map((metric) => (
        <li key={metric.id} className={compact ? "min-w-0 px-1 py-2" : "min-w-0 rounded-2xl border border-line bg-panel p-4"}>
          <p
            className={`metric-figure font-display leading-none text-cream ${compact ? "" : "metric-figure-lg"}`}
            title={metric.value}
          >
            {metric.compact}
          </p>
          <p className="mt-1 text-xs text-muted sm:text-sm">
            <span className="sr-only">{metric.value} </span>
            {metric.label}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** One short line from a client, with their name. */
export function QuoteLine({ id }: { id: string }) {
  const item = testimonials.find((entry) => entry.id === id);
  if (!item?.quote) return null;
  const firstSentence = item.quote.split(/(?<=[.!?])\s/)[0];
  return (
    <figure className="rounded-2xl border border-line bg-panel p-4">
      <blockquote className="text-sm leading-relaxed text-cream/95">“{firstSentence}”</blockquote>
      <figcaption className="mt-2 text-xs text-muted">
        <Link href={`/testimonials#${item.id}`} className="hover:text-cream">
          {item.name}
          {item.role ? `, ${item.role}` : ""}
          {item.company ? ` at ${item.company}` : ""}
        </Link>
      </figcaption>
    </figure>
  );
}

export function CtaBand({
  title = "Have something to launch?",
  text = "Tell me the format and what it's for.",
}: {
  title?: string;
  text?: string;
  quoteId?: string;
  showMetrics?: boolean;
}) {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <AwardBadge />
        <h2 className="mt-5 font-display text-4xl text-cream md:text-5xl">{title}</h2>
        <p className="mt-3 max-w-xl text-lg text-muted">{text}</p>
        <div className="mt-7">
          <WorkCtas />
        </div>
      </div>
    </section>
  );
}
