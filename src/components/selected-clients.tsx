import { featuredClients } from "@data/clients";
import { BrandLogo } from "@/components/brand-logo";

export function SelectedClients() {
  return (
    <section className="border-y border-line">
      <div className="mx-auto max-w-6xl px-4">
        <p className="pt-6 font-mono text-xs uppercase tracking-[0.18em] text-ember">Selected clients</p>
        <ul className="mt-3 grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {featuredClients.map((client) => {
            const inner = (
              <div className="flex items-start gap-3 px-0 py-4 sm:px-5 sm:py-6">
                <BrandLogo name={client.name} size="sm" />
                <div>
                  <p className="font-display text-lg text-cream group-hover:text-ember">{client.name}</p>
                  <p className="mt-1 text-sm text-ember">{client.tag}</p>
                  {client.note ? <p className="mt-1 text-sm text-muted">{client.note}</p> : null}
                </div>
              </div>
            );
            return (
              <li key={client.name}>
                {client.link ? (
                  <a href={client.link.href} className="group block h-full">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
