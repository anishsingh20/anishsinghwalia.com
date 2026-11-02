import Image from "next/image";
import Link from "next/link";
import { audiences, services } from "@data/faq";
import { clients } from "@data/clients";
import { kubectlPods, metrics, site } from "@data/site";
import { landingTestimonials } from "@data/testimonials";
import { tutorials } from "@data/writing";
import { OffClock } from "@/components/off-clock";
import { TestimonialGrid } from "@/components/testimonial-grid";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const wall = clients.filter((client) => client.group === "banner" || client.group === "client");
  return (
    <main>
      <section className="bg-grid border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">
              Dehradun · DigitalOcean · Freelance
            </p>
            <h1 className="mt-4 font-display text-5xl tracking-tight text-cream md:text-6xl">
              Anish Singh Walia
            </h1>
            <p className="mt-5 max-w-xl text-xl leading-relaxed text-cream">{site.positioning}</p>
            <p className="mt-4 text-sm text-muted">{site.jobTitle} at {site.employer}</p>
            <ul className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
              {["Bachelor's in Information Technology, VIT", "DevOps / SRE background", "AI super user", "Geek at heart"].map((chip) => (
                <li key={chip} className="rounded-full border border-line px-3 py-1">{chip}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/contact">Work with me</Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/work">See the work</Link></Button>
            </div>
          </div>
          <div>
            <Image
              src="/images/anish.webp"
              alt="Anish Singh Walia, portrait on an orange circle"
              width={640}
              height={640}
              priority
              className="mx-auto h-72 w-72 rounded-full object-cover ring-4 ring-orange/80 md:h-80 md:w-80"
            />
            <pre className="mt-6 overflow-x-auto rounded-2xl border border-line bg-panel p-4 font-mono text-[11px] leading-relaxed text-muted">
              <span className="text-ember">$ kubectl get all -n anish</span>
              {"\n"}
              {kubectlPods.map((pod) => `${pod.name.padEnd(16)} 1/1  Running`).join("\n")}
              <span className="cursor-blink text-orange"> ▍</span>
            </pre>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Trail log</p>
        <h2 className="mt-2 font-display text-3xl">The public numbers</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {metrics.map((metric) => (
            <li key={metric.id} className="rounded-2xl border border-line bg-panel p-4">
              <p className="font-display text-2xl text-cream md:text-3xl">{metric.value}</p>
              <p className="mt-1 text-sm text-muted">{metric.label}</p>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-faint">{metric.source}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl text-sm text-faint">
          LinkedIn About says 3,000,000+ average monthly readers. The banner says 35,000+ subscribers and 200,000+ monthly views. Both stay visible, with their sources, until one figure is retired.
        </p>
      </section>

      <section className="border-y border-line bg-panel/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">The work</h2>
            <p className="mt-3 text-muted">
              Tutorials, docs, and deep dives first. Strategy, ghostwriting, and search visibility sit alongside that.
            </p>
            <ul className="mt-6 grid gap-3">
              {services.map((item) => (
                <li key={item.title} className="rounded-xl border border-line bg-ink px-4 py-3 text-sm leading-relaxed">
                  <span className="font-medium text-cream">{item.title}. </span>
                  <span className="text-muted">{item.body}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl">Who it is for</h2>
            <p className="mt-3 text-muted">SaaS, AI-native, developer-tool, and cloud or infrastructure teams.</p>
            <ul className="mt-6 grid gap-3">
              {audiences.map((item) => (
                <li key={item} className="rounded-xl border border-line px-4 py-3 text-sm leading-relaxed text-muted">{item}</li>
              ))}
            </ul>
            <Link href="/about" className="mt-4 inline-block text-sm text-ember hover:underline">Read the full About</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl">Companies</h2>
            <p className="mt-2 text-muted">Banner brands, plus the companies named in recommendations.</p>
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
      </section>

      <section className="border-t border-line bg-panel/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl md:text-4xl">What my clients say</h2>
          <p className="mt-3 max-w-2xl text-muted">What people say about the work we&apos;ve done together.</p>
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
          <ul className="mt-6 grid gap-3">
            {tutorials.slice(0, 4).map((piece) => (
              <li key={piece.href}>
                <a href={piece.href} className="block rounded-2xl border border-line px-4 py-4 hover:border-orange/50">
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
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">The ascent</p>
            <h2 className="mt-3 font-display text-3xl">From SRE intern to Team Lead</h2>
            <p className="mt-3 text-sm text-muted">Nutanix, American Express, then DigitalOcean. The route is drawn like a trail, and the dates are the LinkedIn record.</p>
          </Link>
          <Link href="/game" className="rounded-3xl border border-line bg-panel p-6 hover:border-orange/50">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">Game Room</p>
            <h2 className="mt-3 font-display text-3xl">Climb the SERP</h2>
            <p className="mt-3 text-sm text-muted">A short trek. Collect a pager, a kettlebell, a keyword, a badge, and the summit flag. Each one opens a page.</p>
          </Link>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-16">
          <h2 className="font-display text-4xl">Have a tutorial, a doc set, or a launch to write?</h2>
          <Button asChild size="lg"><Link href="/contact">Work with me</Link></Button>
        </div>
      </section>
    </main>
  );
}
