import Link from "next/link";
import type { CaseStudy } from "@data/services";
import { BrandLogo } from "@/components/brand-logo";

export function CaseStudyCards({ items }: { items: CaseStudy[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((study) => {
        const internal = study.link.href.startsWith("/");
        return (
          <li key={study.id} className="flex h-full flex-col rounded-3xl border border-line bg-ink/70 p-6 backdrop-blur-[2px]">
            <div className="flex items-center gap-3">
              <BrandLogo name={study.company} size="sm" />
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">{study.company}</p>
            </div>
            <h3 className="mt-4 font-display text-2xl leading-tight text-cream">{study.title}</h3>
            <dl className="mt-5 grid flex-1 gap-4 text-sm leading-relaxed">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">The problem</dt>
                <dd className="mt-1 text-muted">{study.problem}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">What I did</dt>
                <dd className="mt-1 text-muted">{study.work}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">What came of it</dt>
                <dd className="mt-1 text-cream/95">{study.outcome}</dd>
              </div>
            </dl>
            {internal ? (
              <Link href={study.link.href} className="mt-5 text-sm text-ember hover:underline">{study.link.label}</Link>
            ) : (
              <a href={study.link.href} className="mt-5 text-sm text-ember hover:underline">{study.link.label}</a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
