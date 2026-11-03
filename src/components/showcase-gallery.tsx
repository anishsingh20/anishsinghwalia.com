import { showcaseByGroup, type ShowcaseItem } from "@data/showcase";

function youtubeId(href: string) {
  const match = href.match(/[?&]v=([^&]+)/);
  return match?.[1] ?? "";
}

function Visual({ item }: { item: ShowcaseItem }) {
  if (item.embed === "youtube") {
    return (
      <div className="aspect-video bg-ink">
        <iframe
          title={item.title}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId(item.href)}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  if (item.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={item.image.src} alt={item.image.alt} className="aspect-video w-full object-cover object-top" />
    );
  }
  return (
    <div className="flex aspect-video flex-col justify-end bg-[linear-gradient(160deg,#211c18,rgba(232,97,31,0.28),#0c0b0a)] p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ember">{item.outlet}</p>
      <p className="mt-2 font-display text-2xl leading-tight text-cream">{item.title}</p>
    </div>
  );
}

function Card({ item }: { item: ShowcaseItem }) {
  const body = (
    <>
      <Visual item={item} />
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ember">{item.outlet}</p>
        <h3 className="mt-2 font-display text-xl leading-tight text-cream">{item.title}</h3>
        <span className="mt-4 text-sm text-ember">{item.embed === "youtube" ? "Watch on YouTube" : "Open the live piece"}</span>
      </div>
    </>
  );

  if (item.embed === "youtube") {
    return (
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink">
        <Visual item={item} />
        <div className="flex flex-1 flex-col p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ember">{item.outlet}</p>
          <h3 className="mt-2 font-display text-xl leading-tight text-cream">{item.title}</h3>
          <a href={item.href} className="mt-4 text-sm text-ember hover:underline">
            Watch on YouTube
          </a>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink transition hover:border-orange/40">
      <a href={item.href} className="flex h-full flex-col">
        {body}
      </a>
    </article>
  );
}

export function ShowcaseGallery({ limitPerGroup }: { limitPerGroup?: number }) {
  const groups = showcaseByGroup();

  return (
    <div className="grid gap-12">
      {groups.map(({ group, items }) => {
        const visible = limitPerGroup ? items.slice(0, limitPerGroup) : items;
        return (
          <section key={group}>
            <h3 className="font-display text-2xl text-cream">{group}</h3>
            <ul className={`mt-5 grid gap-5 ${visible.length > 1 ? "sm:grid-cols-2" : "max-w-xl"}`}>
              {visible.map((item) => (
                <li key={item.id}>
                  <Card item={item} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
