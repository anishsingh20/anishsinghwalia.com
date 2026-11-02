import Image from "next/image";
import Link from "next/link";
import { aboutFit } from "@data/about";
import { clients } from "@data/clients";
import { formats } from "@data/formats";
import { audiences, metrics, site } from "@data/site";
import { landingTestimonials } from "@data/testimonials";
import { essays, tutorials } from "@data/writing";
import { OffClock } from "@/components/off-clock";
import { PullupChallenge } from "@/components/pullup-challenge";
import { TestimonialGrid } from "@/components/testimonial-grid";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const wall = clients.filter((client) => client.group === "banner" || client.group === "client");
  const selected = [tutorials[0], essays[0], tutorials[2], essays[1]];
  return (
    <main>
      <section className="bg-grid border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">
              Dehradun · DigitalOcean · Content creator
            </p>
            <h1 className="mt-4 font-display text-5xl tracking-tight text-cream md:text-6xl">
              Anish Singh Walia
            </h1>
            <p className="mt-3 font-display text-2xl text-ember md:text-3xl">{site.headline}</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90">{site.positioning}</p>
            <ul className="mt-6 flex flex-wrap gap-2 text-xs text-muted">
              {[
                "Team Lead at DigitalOcean",
                "Ex-SRE, Nutanix",
                "Cloud consultant, American Express",
                "Information Technology degree, VIT",
              ].map((chip) => (
                <li key={chip} className="rounded-full border border-line px-3 py-1">{chip}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/contact">Work with me</Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="#what-i-make">What I make</Link></Button>
            </div>
            <p className="mt-6 text-sm text-faint">
              Companies I&apos;ve worked with include Semrush, OtterlyAI, Datalpulse, Tanot Solutions, and Pollo AI.
            </p>
          </div>
          <div className="grid gap-6">
            <Image
              src="/images/anish.webp"
              alt="Anish Singh Walia, portrait on an orange circle"
              width={640}
              height={640}
              priority
              className="mx-auto h-56 w-56 rounded-full object-cover ring-4 ring-orange/80 md:h-64 md:w-64"
            />
            <PullupChallenge />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">The numbers</p>
        <h2 className="mt-2 font-display text-3xl">Where the writing has landed</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {metrics.map((metric) => (
            <li key={metric.id} className="rounded-2xl border border-line bg-panel p-4">
              <p className="font-display text-2xl text-cream md:text-3xl">{metric.value}</p>
              <p className="mt-1 text-sm text-muted">{metric.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="what-i-make" className="scroll-mt-24 border-y border-line bg-panel/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">What I make</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Pick a format. I&apos;ve shipped it.</h2>
            <p className="mt-3 text-muted">
              I came up as an engineer, and I&apos;ve made every format below for real companies. Each tile links to an example.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((format) => (
              <li key={format.id} className="flex flex-col rounded-2xl border border-line bg-ink p-5">
                <h3 className="font-display text-lg text-cream">{format.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{format.line}</p>
                {format.example ? (
                  <a href={format.example.href} className="mt-4 text-sm text-ember hover:underline">
                    {format.example.label}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">Who it&apos;s for</h2>
          <p className="mt-3 text-muted">Teams that sell to engineers, or whose product is the engineering.</p>
          <ul className="mt-6 grid gap-3">
            {audiences.map((item) => (
              <li key={item} className="rounded-xl border border-line px-4 py-3 text-sm text-cream">{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-3xl">When to call me</h2>
          <p className="mt-3 text-muted">The three situations I hear most often.</p>
          <ul className="mt-6 grid gap-3">
            {aboutFit.map((item) => (
              <li key={item} className="rounded-xl border border-line bg-panel px-4 py-3 text-sm leading-relaxed text-muted">{item}</li>
            ))}
          </ul>
          <Link href="/about" className="mt-4 inline-block text-sm text-ember hover:underline">More about me</Link>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl">Companies I&apos;ve worked with</h2>
              <p className="mt-2 text-muted">The five on my banner, plus the companies named in my recommendations.</p>
            </div>
            <Link href="/clients" className="text-sm text-ember hover:underline">All of them</Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {wall.map((client) => (
              <li key={client.name} className="flex h-24 items-center justify-center rounded-xl border border-line bg-panel px-3 text-center font-display text-lg tracking-tight">
                {client.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-panel/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl md:text-4xl">What clients say</h2>
          <p className="mt-3 max-w-2xl text-muted">LinkedIn recommendations, quoted as they were written.</p>
          <div className="mt-8">
            <TestimonialGrid items={landingTestimonials()} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <OffClock />
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl">Selected writing</h2>
            <Link href="/work" className="text-sm text-ember hover:underline">All writing</Link>
          </div>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {selected.map((piece) => (
              <li key={piece.href}>
                <a href={piece.href} className="block h-full rounded-2xl border border-line px-4 py-4 hover:border-orange/50">
                  <p className="font-medium">{piece.title}</p>
                  <p className="mt-1 text-sm text-faint">{piece.meta}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-2">
          <Link href="/experience" className="rounded-3xl border border-line bg-panel p-6 hover:border-orange/50">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">Experience</p>
            <h2 className="mt-3 font-display text-3xl">From SRE intern to team lead</h2>
            <p className="mt-3 text-sm text-muted">Nutanix, American Express, then DigitalOcean. Dates and titles as they are on LinkedIn.</p>
          </Link>
          <Link href="/game" className="rounded-3xl border border-line bg-panel p-6 hover:border-orange/50">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">Game Room</p>
            <h2 className="mt-3 font-display text-3xl">Walk around my cabin</h2>
            <p className="mt-3 text-sm text-muted">A voxel cabin in the foothills. Open the desk, the pager, the kettlebell, and the wall. Each one is a page on this site.</p>
          </Link>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-16">
          <h2 className="font-display text-4xl">Have a launch, a doc set, or a video to make?</h2>
          <p className="max-w-xl text-muted">Tell me the format and what it&apos;s for. I&apos;ll write back with how I&apos;d do it.</p>
          <Button asChild size="lg"><Link href="/contact">Work with me</Link></Button>
        </div>
      </section>
    </main>
  );
}
