import type { Metadata } from "next";
import { caseStudies } from "@data/services";
import { authorPages, essays, tutorials } from "@data/writing";
import { ClientWorkRows } from "@/components/client-work-rows";
import { PageHeader } from "@/components/page-header";
import { ScopeCta } from "@/components/work-ctas";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies for Semrush, Tanot Solutions, DataImpulse and DigitalOcean, plus tutorials and essays.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <PageHeader
          kicker="Work"
          title="What the work looks like."
          lede="Four engagements, start to finish. Then a sample of the tutorials and essays."
        />
        <div className="mt-12">
          <ClientWorkRows items={caseStudies} />
        </div>
        <section className="mt-16">
          <h2 className="font-display text-2xl">Tutorials</h2>
          <ul className="mt-4 grid gap-3">
            {tutorials.slice(0, 6).map((piece) => (
              <li key={piece.href}>
                <a href={piece.href} className="block rounded-2xl border border-line px-4 py-4 hover:border-orange/40">
                  <p className="font-medium">{piece.title}</p>
                  <p className="mt-1 text-xs text-faint">{piece.meta} ↗</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-12">
          <h2 className="font-display text-2xl">Essays</h2>
          <ul className="mt-4 grid gap-3">
            {essays.slice(0, 4).map((piece) => (
              <li key={piece.href}>
                <a href={piece.href} className="block rounded-2xl border border-line px-4 py-4 hover:border-orange/40">
                  <p className="font-medium">{piece.title}</p>
                  <p className="mt-1 text-xs text-faint">{piece.meta} ↗</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-12">
          <h2 className="font-display text-2xl">Author pages</h2>
          <ul className="mt-4 flex flex-wrap gap-3 text-sm">
            {authorPages.map((page) => (
              <li key={page.href}><a href={page.href} className="text-ember hover:underline">{page.label} ↗</a></li>
            ))}
          </ul>
        </section>
      </div>
      <ScopeCta />
    </main>
  );
}
