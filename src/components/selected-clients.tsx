import Link from "next/link";
import { caseStudies } from "@data/services";
import { BrandLogo } from "@/components/brand-logo";

export function SelectedClients() {
  return (
    <section className="border-y border-line">
      <div className="mx-auto max-w-6xl px-4">
        <p className="pt-8 font-mono text-xs uppercase tracking-[0.18em] text-ember">Selected clients</p>
        <ul className="mt-4 grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {caseStudies.map((study) => (
            <li key={study.id}>
              <Link
                href={`/work/${study.slug}`}
                className="group flex h-full items-start justify-between gap-3 px-0 py-5 sm:px-5 sm:py-8"
              >
                <div className="flex items-start gap-3">
                  <BrandLogo name={study.company} size="sm" />
                  <div>
                    <p className="font-display text-lg text-cream group-hover:text-ember">{study.company}</p>
                    <p className="mt-1 text-sm text-muted">{study.summary}</p>
                  </div>
                </div>
                <span className="mt-1 text-ember" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
