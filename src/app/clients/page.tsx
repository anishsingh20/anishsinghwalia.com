import type { Metadata } from "next";
import Link from "next/link";
import { clientGroups, clients } from "@data/clients";
import { BrandLogo } from "@/components/brand-logo";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ScopeCta } from "@/components/work-ctas";

export const metadata: Metadata = {
  title: "Clients",
  description: "Companies I've made content for: Semrush, Hostinger, Tanot Solutions, DataImpulse, OtterlyAI, Pollo AI, La Isla Designs. Where I've worked: DigitalOcean, Nutanix, American Express.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <PageHeader
          kicker="Clients"
          title="Companies I've worked with."
          lede="B2B SaaS, developer-tool, cloud and AI-native companies. The four case studies are on Work."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild><Link href="/contact">Tell me about your project</Link></Button>
          <Button asChild variant="outline"><Link href="/work">See client work</Link></Button>
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
                      client.link.href.startsWith("/") ? (
                        <Link href={client.link.href} className="mt-3 inline-block text-sm text-ember hover:underline">{client.link.label} ↗</Link>
                      ) : (
                        <a href={client.link.href} className="mt-3 inline-block text-sm text-ember hover:underline">{client.link.label} ↗</a>
                      )
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <ScopeCta title="Want your company on this page?" />
    </main>
  );
}
