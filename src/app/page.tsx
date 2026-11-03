import Image from "next/image";
import Link from "next/link";
import { aboutFit } from "@data/about";
import { clients } from "@data/clients";
import { caseStudies, processSteps, services, trustPoints } from "@data/services";
import { audiences, site } from "@data/site";
import { landingTestimonials } from "@data/testimonials";
import { essays, tutorials } from "@data/writing";
import { SectionVoxels } from "@/components/ambient";
import { AwardBadge } from "@/components/award-badge";
import { BrandLogo } from "@/components/brand-logo";
import { CaseStudyCards } from "@/components/case-study-cards";
import { OffClock } from "@/components/off-clock";
import { CtaBand, LogoStrip, MetricsRow } from "@/components/proof-strip";
import { PullupChallenge } from "@/components/pullup-challenge";
import { TestimonialGrid } from "@/components/testimonial-grid";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const wall = clients.filter((client) => client.group === "brands" || client.group === "employers");
  const selected = [tutorials[0], essays[0], tutorials[2], essays[1]];
  return (
    <main>
      <section className="bg-grid section-ridge border-b border-line">
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
            <div className="mt-5"><AwardBadge /></div>
            <ul className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
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
              <Button asChild size="lg"><Link href="/contact">Tell me about your project</Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="#services">What I offer</Link></Button>
            </div>
            <div className="mt-8">
              <LogoStrip />
            </div>
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
        <div className="mt-6"><MetricsRow /></div>
      </section>

      <section id="services" className="section-topo relative scroll-mt-24 border-y border-line">
        <SectionVoxels />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">What you get</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Content developers trust, that also gets found.</h2>
            <p className="mt-3 text-muted">
              Six things companies hire me for. Each one links to a real example.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const internal = service.example.href.startsWith("/");
              return (
                <li key={service.id} className="flex flex-col rounded-2xl border border-line bg-ink p-5">
                  <h3 className="font-display text-lg text-cream">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/90">{service.outcome}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.detail}</p>
                  {internal ? (
                    <Link href={service.example.href} className="mt-4 text-sm text-ember hover:underline">{service.example.label}</Link>
                  ) : (
                    <a href={service.example.href} className="mt-4 text-sm text-ember hover:underline">{service.example.label}</a>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild><Link href="/services">How I work, and a buyer&apos;s FAQ</Link></Button>
            <Link href="/contact" className="text-sm text-ember hover:underline">Or skip ahead and tell me about your project</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">Why engineers trust my content</h2>
          <p className="mt-3 text-muted">Developers can tell when the writer has never run the thing. I have.</p>
          <ul className="mt-6 grid gap-3">
            {trustPoints.map((point) => (
              <li key={point.title} className="rounded-xl border border-line bg-panel px-4 py-3">
                <p className="text-sm font-medium text-cream">{point.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-3xl">Who it&apos;s for</h2>
          <p className="mt-3 text-muted">Heads of marketing, content leads, developer-marketing and DevRel managers, and founders at companies that sell to engineers.</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {audiences.map((item) => (
              <li key={item} className="rounded-full border border-line px-3 py-1.5 text-sm text-cream">{item}</li>
            ))}
          </ul>
          <h3 className="mt-8 font-display text-2xl">When to call me</h3>
          <ul className="mt-4 grid gap-3">
            {aboutFit.map((item) => (
              <li key={item} className="rounded-xl border border-line bg-panel px-4 py-3 text-sm leading-relaxed text-muted">{item}</li>
            ))}
          </ul>
          <Link href="/about" className="mt-4 inline-block text-sm text-ember hover:underline">More about me</Link>
        </div>
      </section>

      <section className="section-ember border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">How it went</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Four engagements, start to finish</h2>
            </div>
            <Link href="/clients" className="text-sm text-ember hover:underline">All the companies</Link>
          </div>
          <div className="mt-8">
            <CaseStudyCards items={caseStudies} />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl">Companies I&apos;ve worked with</h2>
              <p className="mt-2 text-muted">Brands I&apos;ve created content for, and the teams I&apos;ve been part of.</p>
            </div>
            <Link href="/clients" className="text-sm text-ember hover:underline">All of them</Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {wall.map((client) => (
              <li key={client.name} className="flex h-24 items-center justify-center gap-3 rounded-xl border border-line bg-panel px-3">
                <BrandLogo name={client.name} size="sm" />
                <span className="font-display text-base leading-tight tracking-tight">{client.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-aurora border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl md:text-4xl">What clients say</h2>
          <p className="mt-3 max-w-2xl text-muted">From the marketing leads and founders who hired me.</p>
          <div className="mt-8">
            <TestimonialGrid items={landingTestimonials()} />
          </div>
        </div>
      </section>

      <section className="section-topo border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">How we work together</p>
          <h2 className="mt-2 font-display text-3xl">Four steps, no surprises</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-line bg-ink p-5">
                <p className="font-mono text-xs text-ember">0{index + 1}</p>
                <h3 className="mt-2 font-display text-xl text-cream">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Button asChild size="lg"><Link href="/contact">Tell me about your project</Link></Button>
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
            <p className="mt-3 text-sm text-muted">Nutanix, American Express, then DigitalOcean. The whole climb, camp by camp.</p>
          </Link>
          <Link href="/game" className="rounded-3xl border border-line bg-panel p-6 hover:border-orange/50">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">Game Room</p>
            <h2 className="mt-3 font-display text-3xl">Walk around my cabin</h2>
            <p className="mt-3 text-sm text-muted">A voxel cabin in the foothills. Open the desk, the pager, the kettlebell, and the wall. Each one is a page on this site.</p>
          </Link>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
