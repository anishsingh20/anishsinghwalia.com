import { showcaseByGroup, type ShowcaseItem } from "@data/showcase";

function PlayMark() {
  return (
    <span className="absolute inset-0 grid place-items-center bg-ink/25">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange text-ink shadow-lg">
        <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" aria-hidden="true" fill="currentColor">
          <path d="M8 5.14v13.72L19 12 8 5.14Z" />
        </svg>
      </span>
    </span>
  );
}

function Visual({ item }: { item: ShowcaseItem }) {
  return (
    <div className="relative aspect-video bg-ink">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.image.src} alt={item.image.alt} className="h-full w-full object-cover object-top" />
      {item.play ? <PlayMark /> : null}
    </div>
  );
}

function Card({ item, wide }: { item: ShowcaseItem; wide?: boolean }) {
  return (
    <article className="flex h-full overflow-hidden rounded-2xl border border-line bg-ink transition hover:border-orange/40">
      <a href={item.href} className={`flex h-full ${wide ? "flex-col md:flex-row" : "flex-col"}`}>
        <div className={wide ? "md:w-1/2" : ""}>
          <Visual item={item} />
        </div>
        <div className={`flex flex-1 flex-col p-5 ${wide ? "md:justify-center md:p-8" : ""}`}>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ember">{item.outlet}</p>
          <h3 className={`mt-2 font-display leading-tight text-cream ${wide ? "text-2xl md:text-3xl" : "text-xl"}`}>
            {item.title}
          </h3>
          <span className="mt-4 text-sm text-ember">{item.play ? "Watch on YouTube" : "Open the live piece"}</span>
        </div>
      </a>
    </article>
  );
}

function gridClass(count: number) {
  if (count <= 1) return "grid gap-5";
  if (count === 2 || count === 4) return "grid gap-5 sm:grid-cols-2";
  return "grid gap-5 sm:grid-cols-2 lg:grid-cols-3";
}

function itemClass(count: number, index: number) {
  if (count === 1) return "";
  const last = index === count - 1;
  if (!last) return "";
  const cols = count === 2 || count === 4 ? 2 : 3;
  if (count % cols !== 1) return "";
  return cols === 2 ? "sm:col-span-2" : "sm:col-span-2 lg:col-span-3";
}

function Grid({ items }: { items: ShowcaseItem[] }) {
  return (
    <ul className={gridClass(items.length)}>
      {items.map((item, index) => (
        <li key={item.id} className={itemClass(items.length, index)}>
          <Card item={item} wide={items.length === 1} />
        </li>
      ))}
    </ul>
  );
}

export function ShowcaseGallery({
  items,
  grouped = true,
}: {
  items?: ShowcaseItem[];
  grouped?: boolean;
}) {
  if (!grouped) {
    return <Grid items={items ?? []} />;
  }

  const groups = showcaseByGroup();

  return (
    <div className="grid gap-8">
      {groups.map(({ group, items: groupItems }) => (
        <section key={group}>
          <h3 className="font-display text-2xl text-cream">{group}</h3>
          <div className="mt-4">
            <Grid items={groupItems} />
          </div>
        </section>
      ))}
    </div>
  );
}
