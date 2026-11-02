import type { Metadata } from "next";
import { earlyDays, experience } from "@data/experience";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Experience",
  description: "My path from SRE intern at Nutanix to Senior Technical Content Strategist II and Team Lead at DigitalOcean, with cloud consulting for American Express in between.",
  alternates: { canonical: "/experience" },
};

const camps = [
  { org: "DigitalOcean", roleId: "do-lead", camp: "Summit" },
  { org: "DigitalOcean", roleId: "do-writer", camp: "High camp" },
  { org: "Nutanix", roleId: "amex", camp: "Ridge" },
  { org: "Nutanix", roleId: "sr-sre", camp: "Camp 2" },
  { org: "Nutanix", roleId: "sre", camp: "Camp 1" },
  { org: "Nutanix", roleId: "sre-intern", camp: "Base camp" },
];

export default function ExperiencePage() {
  const roles = experience.flatMap((group) => group.roles.map((role) => ({ ...role, org: group.org, href: group.href })));
  const ordered = camps.map((camp) => ({ ...camp, role: roles.find((role) => role.id === camp.roleId)! }));
  const writing = experience.find((group) => group.id === "datascience-plus")!;

  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <PageHeader
        kicker="Experience"
        title="From base camp to team lead."
        lede="Dates and titles match my LinkedIn. The trail is how I think about it: summit at the top, SRE internship at the bottom."
      />
      <div className="relative mt-12">
        <svg viewBox="0 0 40 100" className="pointer-events-none absolute left-3 top-0 hidden h-full w-10 md:block" aria-hidden="true" preserveAspectRatio="none">
          <path className="trail-path" pathLength={1} d="M20 2 C28 12 8 18 20 28 C32 38 8 48 20 58 C30 68 10 78 20 98" fill="none" stroke="#e8611f" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <ol className="grid gap-4 md:pl-16">
          {ordered.map((stop) => (
            <li key={stop.roleId} className="rounded-2xl border border-line bg-panel p-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">{stop.camp}</p>
              <h2 className="mt-2 font-display text-2xl">{stop.role.title}</h2>
              <p className="mt-1 text-sm text-muted">
                {stop.role.org} · {stop.role.start} to {stop.role.end} · {stop.role.duration}
              </p>
              <p className="text-sm text-faint">{stop.role.location}</p>
              {stop.role.summary ? <p className="mt-3 text-sm leading-relaxed text-cream/90">{stop.role.summary}</p> : null}
            </li>
          ))}
        </ol>
      </div>
      <section className="mt-10 rounded-2xl border border-dashed border-line p-5">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">Parallel ridge</p>
        <h2 className="mt-2 font-display text-2xl">{writing.roles[0].title}, {writing.org}</h2>
        <p className="mt-1 text-sm text-muted">{writing.roles[0].start} to {writing.roles[0].end} · {writing.roles[0].location}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{writing.roles[0].summary}</p>
        {writing.href ? <a href={writing.href} className="mt-3 inline-block text-sm text-ember hover:underline">Author page</a> : null}
      </section>
      <section className="mt-12">
        <h2 className="font-display text-2xl">Approach trail</h2>
        <p className="mt-2 text-sm text-muted">Teams I was on at VIT, and a short internship, before the SRE years.</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {earlyDays.map((role) => (
            <li key={role.id} className="rounded-2xl border border-line p-4">
              <h3 className="font-medium">{role.title}</h3>
              <p className="mt-1 text-xs text-faint">{role.start} to {role.end} · {role.location}</p>
              <p className="mt-2 text-sm text-muted">{role.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
