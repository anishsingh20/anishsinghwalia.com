import Link from "next/link";
import { logoStrip } from "@data/clients";
import { metrics } from "@data/site";
import { testimonials } from "@data/testimonials";
import { AwardBadge } from "@/components/award-badge";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";

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
        <li key={metric.id} className="rounded-2xl border border-line bg-panel p-4">
          <p className={`break-words font-display leading-tight text-cream ${compact ? "text-lg lg:text-xl" : "text-2xl md:text-3xl"}`}>{metric.value}</p>
          <p className="mt-1 text-xs text-muted sm:text-sm">{metric.label}</p>
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

/**
 * The call to action that closes each page, with the proof beside it:
 * logos, a client quote, the award, the numbers.
 */
export function CtaBand({
  title = "Have a launch, a doc set, or a video to make?",
  text = "Tell me the format and what it's for. I'll write back with how I'd do it.",
  quoteId = "andrew-byzov",
  showMetrics = true,
}: {
  title?: string;
  text?: string;
  quoteId?: string;
  showMetrics?: boolean;
}) {
  return (
    <section className="section-aurora relative overflow-hidden border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <AwardBadge />
          <h2 className="mt-5 font-display text-4xl text-cream md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-xl text-lg text-muted">{text}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/contact">Tell me about your project</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/services">What I offer</Link></Button>
          </div>
          <div className="mt-8">
            <LogoStrip />
          </div>
        </div>
        <div className="grid gap-4">
          <QuoteLine id={quoteId} />
          {showMetrics ? <MetricsRow compact /> : null}
        </div>
      </div>
    </section>
  );
}
