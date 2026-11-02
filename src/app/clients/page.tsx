import type { Metadata } from "next";
import { clientGroups, clients } from "@data/clients";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Clients",
  description: "Brands Anish Singh Walia has worked with, including DigitalOcean, Semrush, Nutanix, American Express, Hostinger, Tanot Solutions, Datalpulse, OtterlyAI, and Pollo AI.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <PageHeader
        kicker="Clients"
        title="The brands on the wall."
        lede="Names only, set in type. No borrowed logo files. Each one has a public source: his banner, a recommendation, or a byline."
      />
      <div className="mt-12 grid gap-12">
        {clientGroups.map((group) => (
          <section key={group.id}>
            <h2 className="font-display text-2xl">{group.title}</h2>
            <p className="mt-2 text-sm text-muted">{group.lede}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {clients.filter((client) => client.group === group.id).map((client) => (
                <li key={client.name} className="rounded-2xl border border-line bg-panel p-5">
                  <p className="font-display text-2xl tracking-tight">{client.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ember">{client.relationship}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{client.detail}</p>
                  {client.href ? (
                    <a href={client.href} className="mt-3 inline-block text-sm text-ember hover:underline">Source</a>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
