import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, caseStudyBySlug } from "@data/services";
import { testimonials } from "@data/testimonials";
import { ArtifactFallback, BrowserFrame } from "@/components/browser-frame";
import { BrandLogo } from "@/components/brand-logo";
import { JsonLd } from "@/components/json-ld";
import { ScopeCta } from "@/components/work-ctas";
import { breadcrumbJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) return { title: "Work" };
  return {
    title: `${study.company} · ${study.title}`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) notFound();
  const quote = study.quoteId ? testimonials.find((item) => item.id === study.quoteId) : undefined;

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: study.company, path: `/work/${study.slug}` },
        ])}
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
          <Link href="/" className="hover:text-cream">Home</Link>
          {" / "}
          <Link href="/work" className="hover:text-cream">Work</Link>
          {" / "}
          <span className="text-ember">{study.company}</span>
        </p>
        <div className="mt-6 flex items-center gap-3">
          <BrandLogo name={study.company} size="md" />
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">{study.title}</h1>
        </div>
        <p className="mt-4 max-w-2xl text-lg text-muted">{study.summary}.</p>
        <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-line py-5 text-sm sm:grid-cols-4">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Client</dt>
            <dd className="mt-1 text-cream">{study.company}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Format</dt>
            <dd className="mt-1 text-cream">{study.format}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">My role</dt>
            <dd className="mt-1 text-cream">{study.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Year</dt>
            <dd className="mt-1 text-cream">{study.year}</dd>
          </div>
        </dl>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            {study.image ? (
              <BrowserFrame src={study.image.src} alt={study.image.alt} href={study.link.href} />
            ) : (
              <ArtifactFallback company={study.company} title={study.title} meta={`${study.format} · ${study.year}`} />
            )}
            {study.link.href.startsWith("/") ? (
              <Link href={study.link.href} className="mt-4 inline-block text-sm text-ember hover:underline">
                {study.link.label} ↗
              </Link>
            ) : (
              <a href={study.link.href} className="mt-4 inline-block text-sm text-ember hover:underline">
                {study.link.label} ↗
              </a>
            )}
          </div>
          <div className="grid gap-6">
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">The problem</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{study.problem}</p>
            </div>
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">What I did</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{study.work}</p>
            </div>
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">What came of it</h2>
              <p className="mt-2 text-sm leading-relaxed text-cream/95">{study.outcome}</p>
            </div>
            {quote?.quote ? (
              <figure className="rounded-2xl border border-line bg-panel p-5">
                <blockquote className="text-sm leading-relaxed text-cream/95">“{quote.quote}”</blockquote>
                <figcaption className="mt-3 text-xs text-muted">
                  {quote.linkedin ? (
                    <a href={quote.linkedin} className="hover:text-cream">
                      {quote.name}
                      {quote.role ? `, ${quote.role}` : ""}
                      {quote.company ? ` at ${quote.company}` : ""} ↗
                    </a>
                  ) : (
                    <>
                      {quote.name}
                      {quote.role ? `, ${quote.role}` : ""}
                      {quote.company ? ` at ${quote.company}` : ""}
                    </>
                  )}
                </figcaption>
              </figure>
            ) : null}
          </div>
        </div>
      </div>
      <ScopeCta />
    </main>
  );
}
