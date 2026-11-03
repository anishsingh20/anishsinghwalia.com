import { testimonials } from "@data/testimonials";
import { BrandLogo } from "@/components/brand-logo";

const ids = ["daria-sukhoroslova", "andrew-byzov"] as const;

const pulls: Record<(typeof ids)[number], string> = {
  "daria-sukhoroslova":
    "I am pleased to recommend Anish, a dedicated affiliate partner whose writing on LinkedIn and Medium is consistently precise, well-researched, and insightful.",
  "andrew-byzov":
    "Anish delivered a high-quality LinkedIn post for DataImpulse – from concept to publication.",
};

export function PullQuotes() {
  const items = ids.map((id) => testimonials.find((item) => item.id === id)!);

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.id} className="rounded-2xl border border-line bg-panel p-6">
          <blockquote className="text-[15px] leading-relaxed text-cream/95">“{pulls[item.id as (typeof ids)[number]]}”</blockquote>
          <footer className="mt-5 flex items-center gap-3">
            {item.company ? <BrandLogo name={item.company} size="sm" /> : null}
            <div>
              <p className="font-medium text-cream">{item.name}</p>
              <p className="text-sm text-muted">
                {[item.role, item.company].filter(Boolean).join(", ")}
              </p>
            </div>
          </footer>
        </li>
      ))}
    </ul>
  );
}
