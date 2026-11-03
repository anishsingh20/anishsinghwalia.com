"use client";

import { useEffect, useRef } from "react";
import { excerptQuote, type Testimonial } from "@data/testimonials";
import { BrandLogo } from "@/components/brand-logo";
import { SmartLink } from "@/components/smart-link";
import { SocialIcon } from "@/components/social-icon";

function Card({ item }: { item: Testimonial }) {
  const quote = excerptQuote(item.quote ?? "");
  const designation = [item.role, item.company].filter(Boolean).join(", ");

  return (
    <article className="flex h-[17.5rem] w-[min(20.5rem,82vw)] shrink-0 flex-col rounded-2xl border border-line bg-panel p-5">
      <blockquote className="line-clamp-5 flex-1 text-[15px] leading-relaxed text-cream/95">
        “{quote}”
      </blockquote>
      <footer className="mt-4 flex items-center gap-3">
        {item.company ? <BrandLogo name={item.company} size="sm" /> : null}
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-cream">{item.name}</p>
          {designation ? <p className="truncate text-sm text-muted">{designation}</p> : null}
        </div>
        {item.linkedin ? (
          <SmartLink
            href={item.linkedin}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line text-cream/80 transition hover:border-orange/60 hover:text-ember"
            aria-label={`${item.name} on LinkedIn`}
          >
            <SocialIcon id="linkedin" />
          </SmartLink>
        ) : null}
      </footer>
    </article>
  );
}

function Row({ items, clone = false }: { items: Testimonial[]; clone?: boolean }) {
  return (
    <ul
      className={`flex gap-4 pr-4 ${clone ? "quote-clone" : ""}`}
      aria-hidden={clone || undefined}
    >
      {items.map((item) => (
        <li key={`${clone ? "clone-" : ""}${item.id}`}>
          <Card item={item} />
        </li>
      ))}
    </ul>
  );
}

export function QuoteMarquee({ items }: { items: Testimonial[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let frame = 0;
    const tick = () => {
      if (!paused.current) {
        el.scrollLeft += 0.85;
        const loopAt = el.scrollWidth / 2;
        if (loopAt > 0 && el.scrollLeft >= loopAt) {
          el.scrollLeft -= loopAt;
        }
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    const pause = () => {
      paused.current = true;
    };
    const resume = () => {
      if (el.matches(":hover") || el.contains(document.activeElement)) return;
      paused.current = false;
    };

    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    el.addEventListener("pointerdown", pause);
    window.addEventListener("pointerup", resume);
    const onVis = () => {
      paused.current = document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
      el.removeEventListener("pointerdown", pause);
      window.removeEventListener("pointerup", resume);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      ref={scroller}
      className="quote-marquee flex gap-0 overflow-x-auto overscroll-x-contain py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/50"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client quotes. Pauses when you hover, focus, or swipe. Arrow keys move along the row."
    >
      <Row items={items} />
      <Row items={items} clone />
    </div>
  );
}
