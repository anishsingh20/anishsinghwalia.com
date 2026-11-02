import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutDo, aboutFit, aboutParagraphs, aboutTrack, originNote, values } from "@data/about";
import { formats } from "@data/formats";
import { certifications, education, languages, stack, tools, topSkills } from "@data/experience";
import { githubProjects } from "@data/writing";
import { site } from "@data/site";
import { JsonLd } from "@/components/json-ld";
import { OffClock } from "@/components/off-clock";
import { PageHeader } from "@/components/page-header";
import { profilePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description: "I'm Anish Singh Walia, a technical content creator and Senior Technical Content Strategist II and Team Lead at DigitalOcean, based in Dehradun. Information Technology degree from VIT. Former SRE at Nutanix and cloud consultant for American Express.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-16 px-4 py-14">
      <JsonLd data={profilePageJsonLd()} />
      <PageHeader
        kicker="About"
        title="I make technical content. I used to carry the pager."
        lede="SRE and DevOps at Nutanix, cloud consultant for American Express, now Senior Technical Content Strategist II and Team Lead at DigitalOcean. Beyond the day job I make videos, deep dives, LinkedIn posts, docs, and newsletters for B2B, SaaS, AI-native, and developer-tool companies."
      />
      <div className="grid items-start gap-10 lg:grid-cols-[220px_1fr]">
        <Image src="/images/anish.webp" alt="Anish Singh Walia" width={440} height={440} className="h-52 w-52 rounded-full object-cover ring-4 ring-orange/70" />
        <div className="grid gap-4 text-base leading-relaxed text-cream/95">
          {aboutParagraphs.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
        </div>
      </div>
      <section>
        <h2 className="font-display text-2xl">What I make</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {formats.map((item) => (
            <li key={item.id} className="rounded-2xl border border-line p-4 text-sm leading-relaxed">
              <span className="font-medium text-cream">{item.title}. </span>
              <span className="text-muted">{item.line}</span>
            </li>
          ))}
        </ul>
        <Link href="/#what-i-make" className="mt-3 inline-block text-sm text-ember hover:underline">Examples of each, on the home page</Link>
      </section>
      <section>
        <h2 className="font-display text-2xl">What I do day to day</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {aboutDo.map((item, index) => (
            <li key={item} className="rounded-2xl border border-line p-4 text-sm leading-relaxed"><span className="font-mono text-ember">{index + 1}. </span>{item}</li>
          ))}
        </ol>
      </section>
      <section>
        <h2 className="font-display text-2xl">Track record</h2>
        <ul className="mt-4 grid gap-2 text-sm text-muted">
          {aboutTrack.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
      <section>
        <h2 className="font-display text-2xl">When to call me</h2>
        <ul className="mt-4 grid gap-2">
          {aboutFit.map((item) => <li key={item} className="text-muted">{item}</li>)}
        </ul>
      </section>
      <section>
        <h2 className="font-display text-2xl">How I got here</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{originNote}</p>
      </section>
      <section className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Education</h2>
          <ul className="mt-4 grid gap-3">
            {education.map((item) => (
              <li key={item.school}>
                <p className="font-medium">{item.school}</p>
                <p className="text-sm text-muted">{item.credential ? `${item.credential} · ` : ""}{item.years}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl">Languages</h2>
          <p className="mt-4 text-muted">{languages.join(" · ")}</p>
          <h2 className="mt-8 font-display text-2xl">Certifications</h2>
          <ul className="mt-4 grid gap-1 text-sm text-muted">
            {certifications.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>
      <section>
        <h2 className="font-display text-2xl">Skills and tools</h2>
        <p className="mt-3 text-sm text-faint">Top skills on LinkedIn: {topSkills.join(", ")}.</p>
        <p className="mt-2 text-sm text-muted">Search and research: {tools.join(", ")}.</p>
        <p className="mt-2 text-sm text-muted">The rest of the stack: {stack.join(", ")}.</p>
        <p className="mt-4 text-sm text-muted">Values I list on GitHub: {values.join(", ")}.</p>
        <p className="mt-4 text-sm text-cream">“{site.motto}”</p>
        <p className="text-xs text-faint">{site.mottoAttribution}</p>
      </section>
      <OffClock />
      <section id="side-projects">
        <h2 className="font-display text-2xl">Side projects</h2>
        <ul className="mt-4 grid gap-2 text-sm">
          {githubProjects.map((project) => (
            <li key={project.href}>
              <a href={project.href} className="text-ember hover:underline">{project.name}</a>
              <span className="text-faint"> · {project.note}</span>
            </li>
          ))}
        </ul>
      </section>
      <figure>
        <Image src="/images/linkedin-banner.jpg" alt="My LinkedIn banner: Helping brands scale with AI, SEO and technology-led high-impact content. 2x Medium Top Writer. 35,000+ subscribers. Businesses I have helped: DigitalOcean, Semrush, Nutanix, American Express, Hostinger." width={1600} height={400} className="w-full rounded-2xl border border-line" />
        <figcaption className="mt-2 text-xs text-faint">The banner I use on LinkedIn.</figcaption>
      </figure>
    </main>
  );
}
