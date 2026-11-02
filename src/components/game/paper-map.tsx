import Link from "next/link";
import { stations } from "@data/game";

export function PaperMap() {
  return (
    <section id="on-paper" className="scroll-mt-24">
      <h2 className="font-display text-2xl">The same trek, on paper</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Five stops. Each one opens a real part of the site. This is the whole game if you would rather not play it.
      </p>
      <ol className="mt-6 grid gap-3">
        {stations.map((station, index) => (
          <li key={station.id} className="rounded-2xl border border-line bg-panel p-4">
            <p className="font-mono text-xs text-ember">Camp {index + 1}</p>
            <h3 className="mt-1 font-display text-xl">{station.name}</h3>
            <p className="mt-1 text-sm text-muted">{station.blurb}</p>
            <Link href={station.href} className="mt-2 inline-block text-sm text-ember hover:underline">
              Open this stop
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
