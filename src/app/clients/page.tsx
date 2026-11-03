import type { Metadata } from "next";
import Link from "next/link";
import { clientGroups, clients } from "@data/clients";
import { caseStudies } from "@data/services";
import { BrandLogo } from "@/components/brand-logo";
import { CaseStudyCards } from "@/components/case-study-cards";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/proof-strip";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Clients",
  description: "Brands I've created content for: Semrush, Hostinger, Tanot Solutions, DataImpulse, OtterlyAI, Pollo AI, La Isla Designs. Where I've worked: DigitalOcean, Nutanix, American Express.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <PageHeader
          kicker="Clients"
          title="Companies I've worked with."
          lede="B2B, SaaS, developer-tool, and AI-native companies. Sponsored essays, ghostwriting, launch posts, carousels, and tutorials, plus the engineering teams I was part of before I wrote full-time."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild><Link href="/contact">Tell me about your project</Link></Button>
          <Button asChild variant="outline"><Link href="/testimonials">What they said</Link></Button>
        </div>
        <div className="mt-12 grid gap-12">
          {clientGroups.map((group) => (
            <section key={group.id}>
              <h2 className="font-display text-2xl">{group.title}</h2>
              <p className="mt-2 text-sm text-muted">{group.lede}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {clients.filter((client) => client.group === group.id).map((client) => (
                  <li key={client.name} className="flex flex-col rounded-2xl border border-line bg-panel p-5 transition hover:border-orange/40">
                    <div className="flex items-center gap-3">
                      <BrandLogo name={client.name} size="md" />
                      <div>
                        <p className="font-display text-xl tracking-tight">{client.name}</p>
                        <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-ember">{client.relationship}</p>
                      </div>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{client.detail}</p>
                    {client.link ? (
                      <a href={client.link.href} className="mt-3 inline-block text-sm text-ember hover:underline">{client.link.label}</a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <section className="section-topo border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">How it went</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Four engagements, start to finish</h2>
          <div className="mt-8">
            <CaseStudyCards items={caseStudies} />
          </div>
        </div>
      </section>
      <CtaBand quoteId="klaus-m-schremser" title="Want your company on this page?" text="Tell me the format and the audience. I'll come back with how I'd approach it and when I could start." />
    </main>
  );
}
