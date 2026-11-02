import type { Metadata } from "next";
import Image from "next/image";
import { aboutDo, aboutFit, aboutParagraphs, aboutTrack, originNote, values } from "@data/about";
import { services } from "@data/faq";
import { certifications, education, languages, stack, tools, topSkills } from "@data/experience";
import { githubProjects } from "@data/writing";
import { site } from "@data/site";
import { JsonLd } from "@/components/json-ld";
import { OffClock } from "@/components/off-clock";
import { PageHeader } from "@/components/page-header";
import { profilePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description: "Anish Singh Walia is a Senior Technical Content Strategist and Team Lead at DigitalOcean, based in Dehradun. Bachelor's in Information Technology from VIT, with an SRE and cloud consulting background.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-16 px-4 py-14">
      <JsonLd data={profilePageJsonLd()} />
      <PageHeader
        kicker="About"
        title="A technical content geek who used to carry the pager."
        lede="SRE and DevOps at Nutanix, cloud consultant for American Express, now Senior Technical Content Strategist II and Team Lead at DigitalOcean. The work is tutorials, developer docs, AI and infra deep dives, thought leadership, and content strategy. Search visibility is one part of it."
      />
      <div className="grid items-start gap-10 lg:grid-cols-[220px_1fr]">
        <Image src="/images/anish.webp" alt="Anish Singh Walia" width={440} height={440} className="h-52 w-52 rounded-full object-cover ring-4 ring-orange/70" />
        <div className="grid gap-4 text-base leading-relaxed text-cream/95">
          <p>
            He writes for SaaS, AI-native, developer-tool, and cloud companies: technical tutorials and deep dives, developer docs, AI and infrastructure content, thought leadership, LinkedIn ghostwriting, and content strategy.
          </p>
          <p className="text-sm text-faint">The paragraphs below are his LinkedIn About, in his own words.</p>
          {aboutParagraphs.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
        </div>
      </div>
      <section>
        <h2 className="font-display text-2xl">What the work covers</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {services.map((item) => (
            <li key={item.title} className="rounded-2xl border border-line p-4 text-sm leading-relaxed">
              <span className="font-medium text-cream">{item.title}. </span>{item.body}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-display text-2xl">How he describes it on LinkedIn</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {aboutDo.map((item, index) => (
            <li key={item} className="rounded-2xl border border-line p-4 text-sm leading-relaxed"><span className="font-mono text-ember">{index + 1}. </span>{item}</li>
          ))}
        </ol>
      </section>
      <section>
        <h2 className="font-display text-2xl">Track record, in his words</h2>
        <ul className="mt-4 grid gap-2 text-sm text-muted">
          {aboutTrack.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mt-3 text-sm text-faint">The reader count is the LinkedIn figure. His banner also cites 35,000+ subscribers and 200,000+ monthly views.</p>
      </section>
      <section>
        <h2 className="font-display text-2xl">Who he names on LinkedIn</h2>
        <ul className="mt-4 grid gap-2">
          {aboutFit.map((item) => <li key={item} className="text-muted">{item}</li>)}
        </ul>
      </section>
      <section>
        <h2 className="font-display text-2xl">How he got here</h2>
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
        <p className="mt-2 text-sm text-muted">Tools named in his About: {tools.join(", ")}.</p>
        <p className="mt-2 text-sm text-muted">Also in the daily stack and the GitHub README: {stack.join(", ")}.</p>
        <p className="mt-4 text-sm text-muted">Values he lists: {values.join(", ")}.</p>
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
              <span className="text-faint"> — {project.note}</span>
            </li>
          ))}
        </ul>
      </section>
      <figure>
        <Image src="/images/linkedin-banner.jpg" alt="Anish's LinkedIn banner: Helping brands scale with AI, SEO and technology-led high-impact content. 2x Medium Top Writers. 35,000+ subscribers and 200,000+ monthly views. Brands: DigitalOcean, Semrush, Nutanix, American Express, Hostinger." width={1600} height={400} className="w-full rounded-2xl border border-line" />
        <figcaption className="mt-2 text-xs text-faint">The banner he uses on LinkedIn.</figcaption>
      </figure>
    </main>
  );
}
