import Link from "next/link";
import type { CaseStudy } from "@data/services";
import { ArtifactFallback, BrowserFrame } from "@/components/browser-frame";
import { BrandLogo } from "@/components/brand-logo";

export function ClientWorkRows({ items }: { items: CaseStudy[] }) {
  return (
    <ul className="grid gap-16">
      {items.map((study, index) => {
        const imageOnRight = index % 2 === 1;
        return (
          <li key={study.id} className="grid items-center gap-8 lg:grid-cols-2">
            <div className={imageOnRight ? "lg:order-2" : undefined}>
              {study.image ? (
                <Link href={`/work/${study.slug}`} className="block">
                  <BrowserFrame src={study.image.src} alt={study.image.alt} />
                </Link>
              ) : (
                <Link href={`/work/${study.slug}`} className="block">
                  <ArtifactFallback company={study.company} title={study.title} meta={`${study.format} · ${study.year}`} />
                </Link>
              )}
            </div>
            <div className={imageOnRight ? "lg:order-1" : undefined}>
              <div className="flex items-center gap-3">
                <BrandLogo name={study.company} size="sm" />
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">
                  {study.company} · {study.format}
                </p>
              </div>
              <h3 className="mt-3 font-display text-3xl leading-tight text-cream">{study.title}</h3>
              <p className="mt-3 text-muted">{study.summary}.</p>
              <p className="mt-3 text-sm text-faint">My role · {study.role}</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <Link href={`/work/${study.slug}`} className="text-ember hover:underline">
                  View project ↗
                </Link>
                {study.link.href.startsWith("/") ? (
                  <Link href={study.link.href} className="text-muted hover:text-cream">
                    {study.link.label} ↗
                  </Link>
                ) : (
                  <a href={study.link.href} className="text-muted hover:text-cream">
                    {study.link.label} ↗
                  </a>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
