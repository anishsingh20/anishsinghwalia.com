"use client";

import { useMemo, useState } from "react";
import { mediaCategories, mediaItems, type MediaCategory, type MediaItem } from "@data/media";

function youtubeId(href: string) {
  const match = href.match(/[?&]v=([^&]+)/);
  return match?.[1] ?? "";
}

function Card({ item }: { item: MediaItem }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink">
      {item.embed === "youtube" ? (
        <div className="aspect-video bg-ink">
          <iframe
            title={item.title}
            src={`https://www.youtube-nocookie.com/embed/${youtubeId(item.href)}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image.src} alt={item.image.alt} className="aspect-video w-full object-cover object-top" />
      ) : (
        <div className="flex aspect-video items-end bg-[linear-gradient(160deg,#211c18,rgba(232,97,31,0.2),#0c0b0a)] p-5">
          <p className="font-display text-2xl text-cream">{item.outlet}</p>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ember">{item.category}</p>
        <h2 className="mt-2 font-display text-xl leading-tight text-cream">{item.title}</h2>
        <p className="mt-2 text-sm text-muted">{item.outlet} · {item.meta}</p>
        {item.note ? <p className="mt-2 flex-1 text-sm text-muted">{item.note}</p> : <div className="flex-1" />}
        <a href={item.href} className="mt-4 text-sm text-ember hover:underline">
          {item.category === "Podcast" ? "Watch" : "Open"}
        </a>
      </div>
    </article>
  );
}

export function MediaGrid({ items = mediaItems }: { items?: MediaItem[] }) {
  const [filter, setFilter] = useState<MediaCategory | "All">("All");
  const visible = useMemo(
    () => (filter === "All" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter media">
        {(["All", ...mediaCategories] as const).map((category) => {
          const active = filter === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(category)}
              className={`rounded-full border px-3 py-1.5 text-xs ${active ? "border-orange bg-orange/15 text-ember" : "border-line text-muted hover:text-cream"}`}
            >
              {category}
            </button>
          );
        })}
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {visible.map((item) => (
          <li key={item.id}>
            <Card item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
