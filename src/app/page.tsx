import Image from "next/image";
import Link from "next/link";
import { engagements } from "@data/engagements";
import { homeMedia } from "@data/media";
import { caseStudies } from "@data/services";
import { icp, site } from "@data/site";
import { testimonials } from "@data/testimonials";
import { RidgeBand } from "@/components/ambient";
import { AwardBadge } from "@/components/award-badge";
import { ClientWorkRows } from "@/components/client-work-rows";
import { OffClock } from "@/components/off-clock";
import { MetricsRow } from "@/components/proof-strip";
import { SelectedClients } from "@/components/selected-clients";
import { TestimonialGrid } from "@/components/testimonial-grid";
import { WorkCtas } from "@/components/work-ctas";

const homeQuotes = ["daria-sukhoroslova", "andrew-byzov", "renu-sharma"] as const;

export default function HomePage() {
  const quotes = homeQuotes.map((id) => testimonials.find((item) => item.id === id)!);
  const teaser = homeMedia();

  return (
    <main>
      <section className="relative overflow-hidden bg-grid border-b border-line">
        <RidgeBand />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">
              Anish Singh Walia / Technical content
            </p>
            <h1 className="mt-4 font-display text-5xl tracking-tight text-cream md:text-6xl">
              Technical content
              <br />
              <span className="text-orange">developers trust</span>
              <br />
              and search engines find.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90">{site.positioning}</p>
            <div className="mt-6"><AwardBadge /></div>
            <div className="mt-8">
              <WorkCtas secondaryHref="#work" secondaryLabel="See client work ↓" />
            </div>
            <p className="mt-4 text-sm text-faint">Dehradun · Working worldwide</p>
          </div>
          <Image
            src="/images/anish.webp"
            alt="Anish Singh Walia, portrait on an orange circle"
            width={640}
            height={640}
            priority
            className="mx-auto h-56 w-56 rounded-full object-cover ring-4 ring-orange/80 md:h-72 md:w-72"
          />
        </div>
      </section>

      <SelectedClients />

      <section id="work" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Proof</p>
              <h2 className="mt-2 font-display text-4xl">Client work.</h2>
            </div>
            <Link href="/work" className="text-sm text-ember hover:underline">All work ↗</Link>
          </div>
          <div className="mt-10">
            <ClientWorkRows items={caseStudies} />
          </div>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <MetricsRow compact />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Talks and press</p>
              <h2 className="mt-2 font-display text-4xl">In the room.</h2>
            </div>
            <Link href="/media" className="text-sm text-ember hover:underline">All media ↗</Link>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {teaser.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="block h-full overflow-hidden rounded-2xl border border-line bg-ink hover:border-orange/40">
                  <TeaserBody item={item} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl">What clients say.</h2>
            <Link href="/testimonials" className="text-sm text-ember hover:underline">Read all ↗</Link>
          </div>
          <div className="mt-8">
            <TestimonialGrid items={quotes} />
          </div>
        </div>
      </section>

      <section className="section-ember border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Work together</p>
          <h2 className="mt-2 font-display text-4xl">Three ways in.</h2>
          <p className="mt-3 max-w-2xl text-muted">{icp}</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {engagements.map((item) => (
              <li key={item.id} className="rounded-2xl border border-line bg-ink p-6">
                <h3 className="font-display text-2xl text-cream">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.deliverable}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <WorkCtas />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <OffClock compact />
        </div>
      </section>
    </main>
  );
}

function TeaserBody({ item }: { item: { title: string; outlet: string; meta: string; category: string; image?: { src: string; alt: string } } }) {
  return (
    <>
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image.src} alt={item.image.alt} className="aspect-[16/9] w-full object-cover object-top" />
      ) : null}
      <div className="p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ember">{item.category}</p>
        <p className="mt-2 font-display text-xl leading-tight text-cream">{item.title}</p>
        <p className="mt-2 text-sm text-muted">{item.outlet} · {item.meta}</p>
      </div>
    </>
  );
}
