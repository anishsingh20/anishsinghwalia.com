import Link from "next/link";
import { stations } from "@data/game";

export function PaperMap() {
  return (
    <section id="on-paper" className="scroll-mt-24">
      <h2 className="font-display text-2xl">What&apos;s in the cabin</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Eight things to walk up to. Each one opens a real part of this site. If you&apos;d rather skip the walk, this list is the whole room.
      </p>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2">
        {stations.map((station) => (
          <li key={station.id} className="rounded-2xl border border-line bg-panel p-4">
            <h3 className="font-display text-xl">{station.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{station.blurb}</p>
            <Link href={station.href} className="mt-3 inline-block text-sm text-ember hover:underline">
              {station.cta}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
