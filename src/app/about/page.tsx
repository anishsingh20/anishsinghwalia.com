import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutParagraphs, numberedRoles, originNote, principles, throughLine, values } from "@data/about";
import { certifications, education, languages, stack, tools, topSkills } from "@data/experience";
import { githubProjects } from "@data/writing";
import { site } from "@data/site";
import { AwardBadge } from "@/components/award-badge";
import { JsonLd } from "@/components/json-ld";
import { OffClock } from "@/components/off-clock";
import { PageHeader } from "@/components/page-header";
import { MetricsRow } from "@/components/proof-strip";
import { SmartLink } from "@/components/smart-link";
import { ScopeCta } from "@/components/work-ctas";
import { profilePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description: "An engineer who writes. Brand stories, thought leadership, LinkedIn, ghostwriting, video, and docs for AI-native companies and brands.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-12">
        <JsonLd data={profilePageJsonLd()} />
        <div>
          <PageHeader
            kicker="About"
            title="An engineer who writes."
            lede={throughLine}
          />
          <div className="mt-5"><AwardBadge /></div>
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-[220px_1fr]">
          <Image src="/images/anish.webp" alt="Anish Singh Walia" width={440} height={440} className="h-52 w-52 rounded-full object-cover ring-4 ring-orange/70" />
          <div className="grid gap-4 text-base leading-relaxed text-cream/95">
            {aboutParagraphs.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
          </div>
        </div>
        <section>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">The through-line</p>
          <blockquote className="mt-4 max-w-3xl font-display text-2xl leading-snug text-cream">
            {throughLine}
          </blockquote>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{originNote}</p>
        </section>
        <section>
          <h2 className="font-display text-2xl">Experience, selected</h2>
          <ol className="mt-6 grid gap-4">
            {numberedRoles.map((role, index) => (
              <li key={role.org} className="grid gap-2 border-t border-line pt-4 sm:grid-cols-[2rem_10rem_1fr]">
                <span className="font-mono text-sm text-ember">0{index + 1}</span>
                <p className="font-medium text-cream">{role.org}</p>
                <p className="text-sm leading-relaxed text-muted">{role.line}</p>
              </li>
            ))}
          </ol>
          <Link href="/experience" className="mt-4 inline-block text-sm text-ember hover:underline">Full timeline</Link>
        </section>
        <section>
          <h2 className="font-display text-2xl">How I work</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {principles.map((item, index) => (
              <li key={item.title} className="rounded-2xl border border-line bg-panel p-5">
                <p className="font-mono text-xs text-ember">0{index + 1}</p>
                <h3 className="mt-2 font-display text-xl text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
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
          <p className="mt-3 text-sm text-faint">Top skills: {topSkills.join(", ")}.</p>
          <p className="mt-2 text-sm text-muted">Search and research: {tools.join(", ")}.</p>
          <p className="mt-2 text-sm text-muted">The rest of the stack: {stack.join(", ")}.</p>
          <p className="mt-4 text-sm text-muted">Values I list on GitHub: {values.join(", ")}.</p>
          <p className="mt-4 text-sm text-cream">“{site.motto}”</p>
          <p className="text-xs text-faint">{site.mottoAttribution}</p>
        </section>
        <section>
          <h2 className="font-display text-2xl">Where the writing has landed</h2>
          <div className="mt-6"><MetricsRow /></div>
        </section>
        <AwardBadge variant="card" />
        <OffClock />
        <section id="side-projects">
          <h2 className="font-display text-2xl">Side projects</h2>
          <ul className="mt-4 grid gap-2 text-sm">
            {githubProjects.map((project) => (
              <li key={project.href}>
                <SmartLink href={project.href} className="text-ember hover:underline">{project.name}</SmartLink>
                <span className="text-faint"> · {project.note}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <ScopeCta title="Have something to launch? Let's talk." />
    </main>
  );
}
