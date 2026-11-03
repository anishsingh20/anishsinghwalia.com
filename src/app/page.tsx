import Image from "next/image";
import Link from "next/link";
import { engagements } from "@data/engagements";
import { featuredShowcase } from "@data/showcase";
import { buyerFaqs } from "@data/services";
import { icp, site } from "@data/site";
import { landingTestimonials } from "@data/testimonials";
import { RidgeBand } from "@/components/ambient";
import { AwardBadge } from "@/components/award-badge";
import { HowWeWork } from "@/components/how-we-work";
import { OffClock } from "@/components/off-clock";
import { LogoStrip, MetricsRow } from "@/components/proof-strip";
import { PullupChallenge } from "@/components/pullup-challenge";
import { QuoteMarquee } from "@/components/quote-marquee";
import { SelectedClients } from "@/components/selected-clients";
import { ShowcaseGallery } from "@/components/showcase-gallery";
import { WorkCtas } from "@/components/work-ctas";

const homeFaqQuestions = [
  "What formats do you take on?",
  "Do you ghostwrite, and whose name goes on it?",
  "I am not in India. Can we still work together?",
  "How do we start?",
];

export default function HomePage() {
  const quotes = landingTestimonials();
  const faqs = homeFaqQuestions.map((question) => buyerFaqs.find((faq) => faq.question === question)!);

  return (
    <main>
      <section className="relative overflow-hidden bg-grid border-b border-line">
        <RidgeBand />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">
              Anish Singh Walia / Content
            </p>
            <h1 className="mt-4 font-display text-5xl tracking-tight text-cream md:text-6xl">
              Content that
              <br />
              <span className="text-orange">gets you found.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90">{site.positioning}</p>
            <p className="mt-3 max-w-xl text-sm text-muted">{icp}</p>
            <div className="mt-6"><AwardBadge /></div>
            <div className="mt-8">
              <WorkCtas secondaryHref="#work" secondaryLabel="See the work" />
            </div>
            <p className="mt-4 text-sm text-faint">Dehradun · IST · Working worldwide</p>
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

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <LogoStrip names={["Semrush", "DigitalOcean", "Tanot Solutions", "DataImpulse", "OtterlyAI", "Pollo AI"]} />
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Clients</p>
              <h2 className="mt-1 font-display text-3xl">What they wrote.</h2>
            </div>
            <Link href="/testimonials" className="text-sm text-ember hover:underline">Read all</Link>
          </div>
          <QuoteMarquee items={quotes} />
        </div>
      </section>

      <SelectedClients />

      <section id="work" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Work</p>
              <h2 className="mt-2 font-display text-4xl">What I make.</h2>
              <p className="mt-3 max-w-2xl text-muted">Six live pieces. Each one opens the published work.</p>
            </div>
            <Link href="/work" className="text-sm text-ember hover:underline">All work</Link>
          </div>
          <div className="mt-6">
            <ShowcaseGallery items={featuredShowcase()} grouped={false} />
          </div>
          <div className="mt-8">
            <WorkCtas />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <PullupChallenge />
        </div>
      </section>

      <section className="border-t border-line">
        <HowWeWork />
      </section>

      <section className="border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <MetricsRow compact />
        </div>
      </section>

      <section id="faq" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="font-display text-4xl">Questions clients ask</h2>
          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-line bg-panel p-5">
                <dt className="font-medium text-cream">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-ember border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Work together</p>
          <h2 className="mt-2 font-display text-4xl">Three ways in.</h2>
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
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Game room</p>
          <h2 className="mt-2 font-display text-4xl">Walk the cabin.</h2>
          <p className="mt-3 max-w-xl text-muted">
            A voxel cabin in the foothills. Desk, pager, kettlebell. Each object opens a page.
          </p>
          <Link href="/game" className="mt-6 inline-block text-sm text-ember hover:underline">
            Open the cabin
          </Link>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <OffClock compact />
        </div>
      </section>
    </main>
  );
}
