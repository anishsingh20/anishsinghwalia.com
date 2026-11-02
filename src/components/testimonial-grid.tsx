import Link from "next/link";
import { linkedInRecommendationsUrl, tileLabel, type Testimonial } from "@data/testimonials";

export function TestimonialGrid({
  items,
  detailed = false,
}: {
  items: Testimonial[];
  detailed?: boolean;
}) {
  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const tile = tileLabel(item);
          const meta = [
            item.company ? item.role : null,
            item.dateLabel,
            detailed ? item.relationship : null,
          ]
            .filter(Boolean)
            .join(" · ");
          return (
            <li key={item.id} id={item.id} className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-line bg-panel p-6 target:border-orange/60">
              <p className="font-display text-2xl tracking-tight text-cream">{tile}</p>
              <div className="mt-3 h-px w-12 bg-orange" aria-hidden="true" />
              {item.quote ? (
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-cream/95">
                  <p>“{item.quote}”</p>
                </blockquote>
              ) : (
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  I haven&apos;t copied this one over yet. It&apos;s on LinkedIn.
                </p>
              )}
              <footer className="mt-6">
                <p className="font-medium text-cream">{item.name}</p>
                {meta ? <p className="mt-1 text-sm text-muted">{meta}</p> : null}
              </footer>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-sm">
        <Link href={linkedInRecommendationsUrl} className="text-ember hover:underline">
          Read more on LinkedIn
        </Link>
      </p>
    </div>
  );
}
