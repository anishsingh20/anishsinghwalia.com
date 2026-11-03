import type { Metadata } from "next";
import Link from "next/link";
import { formats } from "@data/formats";
import { buyerFaqs, caseStudies, processSteps, services, trustPoints } from "@data/services";
import { SectionVoxels } from "@/components/ambient";
import { AwardBadge } from "@/components/award-badge";
import { CaseStudyCards } from "@/components/case-study-cards";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { CtaBand, LogoStrip, MetricsRow } from "@/components/proof-strip";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description: "Technical tutorials and deep dives, developer docs, launch content, LinkedIn ghostwriting for founders, short videos and infographics, and SEO and AI-search content strategy for B2B SaaS, developer-tool, cloud, and AI companies.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
      <JsonLd data={faqJsonLd(buyerFaqs)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <div className="mx-auto max-w-6xl px-4 py-14">
        <PageHeader
          kicker="Services"
          title="Technical content that developers trust and search engines find."
          lede="For heads of marketing, content leads, DevRel and developer-marketing managers, and founders at B2B SaaS, developer-tool, cloud, and AI companies. I was the engineer before I was the writer, so the content is right, and I run the SEO and AI-search tools every week, so it gets read."
        />
        <div className="mt-5"><AwardBadge /></div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg"><Link href="/contact">Tell me about your project</Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="#faq">Buyer&apos;s FAQ</Link></Button>
        </div>
        <div className="mt-8"><LogoStrip /></div>
      </div>

      <section className="section-topo relative border-y border-line">
        <SectionVoxels />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">What you get</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Six things companies hire me for</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {services.map((service) => {
              const internal = service.example.href.startsWith("/");
              return (
                <li key={service.id} id={service.id} className="flex scroll-mt-24 flex-col rounded-3xl border border-line bg-ink p-6">
                  <h3 className="font-display text-2xl text-cream">{service.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-cream/95">{service.outcome}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{service.detail}</p>
                  <p className="mt-4 text-sm">
                    <span className="text-faint">Example: </span>
                    {internal ? (
                      <Link href={service.example.href} className="text-ember hover:underline">{service.example.label}</Link>
                    ) : (
                      <a href={service.example.href} className="text-ember hover:underline">{service.example.label}</a>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-display text-3xl">Why engineers trust my content</h2>
          <ul className="mt-6 grid gap-3">
            {trustPoints.map((point) => (
              <li key={point.title} className="rounded-2xl border border-line bg-panel p-4">
                <p className="font-medium text-cream">{point.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-3xl">Where the writing has landed</h2>
          <div className="mt-6"><MetricsRow /></div>
          <div className="mt-6"><AwardBadge variant="card" /></div>
        </div>
      </section>

      <section className="section-ember border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">How it went</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Four engagements, start to finish</h2>
          <div className="mt-8"><CaseStudyCards items={caseStudies} /></div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">How we work together</p>
          <h2 className="mt-2 font-display text-3xl">Four steps, no surprises</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-line bg-panel p-5">
                <p className="font-mono text-xs text-ember">0{index + 1}</p>
                <h3 className="mt-2 font-display text-xl text-cream">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="what-i-make" className="section-aurora scroll-mt-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Every format</p>
          <h2 className="mt-2 font-display text-3xl">Pick a format. I&apos;ve shipped it.</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((format) => (
              <li key={format.id} className="flex flex-col rounded-2xl border border-line bg-ink p-5">
                <h3 className="font-display text-lg text-cream">{format.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{format.line}</p>
                {format.example ? (
                  format.example.href.startsWith("/") ? (
                    <Link href={format.example.href} className="mt-4 text-sm text-ember hover:underline">{format.example.label}</Link>
                  ) : (
                    <a href={format.example.href} className="mt-4 text-sm text-ember hover:underline">{format.example.label}</a>
                  )
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Before you write</p>
          <h2 className="mt-2 font-display text-3xl">Questions buyers ask</h2>
          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            {buyerFaqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-line bg-panel p-5">
                <dt className="font-medium text-cream">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand quoteId="andrew-byzov" title="Tell me what you need made." text="Format, audience, and what it's for. I'll come back with how I'd approach it." />
    </main>
  );
}
