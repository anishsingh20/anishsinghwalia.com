import type { Metadata } from "next";
import Link from "next/link";
import { engagements } from "@data/engagements";
import { formats } from "@data/formats";
import { buyerFaqs, processSteps, trustPoints } from "@data/services";
import { icp } from "@data/site";
import { AwardBadge } from "@/components/award-badge";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { MetricsRow } from "@/components/proof-strip";
import { WorkCtas, ScopeCta } from "@/components/work-ctas";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description: "Brand stories, thought leadership, LinkedIn, ghostwriting, video, infographics, blogs, newsletters and docs for AI-native companies and brands.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
      <JsonLd data={faqJsonLd(buyerFaqs)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <PageHeader
          kicker="Services"
          title="Content that gets you found."
          lede={icp}
        />
        <div className="mt-5"><AwardBadge /></div>
        <div className="mt-6"><WorkCtas /></div>
      </div>

      <section className="border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">How we work</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Three named engagements.</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {engagements.map((item) => (
              <li key={item.id} id={item.id} className="rounded-3xl border border-line bg-ink p-6">
                <h3 className="font-display text-2xl text-cream">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{item.deliverable}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="what-i-make" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">What I make</p>
          <h2 className="mt-2 font-display text-3xl">Six formats.</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">Why the work holds up</h2>
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
            <h2 className="font-display text-3xl">The numbers</h2>
            <div className="mt-6"><MetricsRow /></div>
            <div className="mt-6"><AwardBadge variant="card" /></div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">How a piece gets made</p>
          <h2 className="mt-2 font-display text-3xl">Four steps.</h2>
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

      <section id="faq" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-display text-3xl">Questions clients ask</h2>
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

      <ScopeCta title="Tell me what you need made." text="Format, audience, and what it's for." />
    </main>
  );
}
