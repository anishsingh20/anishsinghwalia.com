import type { Metadata } from "next";
import { earlyDays, experience } from "@data/experience";
import { PageHeader } from "@/components/page-header";
import { SmartLink } from "@/components/smart-link";
import { ScopeCta } from "@/components/work-ctas";

export const metadata: Metadata = {
  title: "Experience",
  description: "Nutanix to American Express to DigitalOcean, where I lead the team that writes infra and AI tutorials.",
  alternates: { canonical: "/experience" },
};

const camps = [
  { org: "DigitalOcean", roleId: "do-lead", camp: "Now" },
  { org: "DigitalOcean", roleId: "do-writer", camp: "2023" },
  { org: "Nutanix", roleId: "amex", camp: "Amex" },
  { org: "Nutanix", roleId: "sr-sre", camp: "Sr SRE" },
  { org: "Nutanix", roleId: "sre", camp: "SRE" },
  { org: "Nutanix", roleId: "sre-intern", camp: "Intern" },
];

export default function ExperiencePage() {
  const roles = experience.flatMap((group) => group.roles.map((role) => ({ ...role, org: group.org, href: group.href })));
  const ordered = camps.map((camp) => ({ ...camp, role: roles.find((role) => role.id === camp.roleId)! }));
  const writing = experience.find((group) => group.id === "datascience-plus")!;

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <PageHeader
          kicker="Experience"
          title="Nutanix. American Express. DigitalOcean."
          lede="The through-line: four years running infrastructure, then the team that writes the infra and AI tutorials."
        />
        <ol className="mt-12 grid gap-4">
          {ordered.map((stop, index) => (
            <li key={stop.roleId} className="rounded-2xl border border-line bg-panel p-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">0{index + 1} · {stop.camp}</p>
              <h2 className="mt-2 font-display text-2xl">{stop.role.title}</h2>
              <p className="mt-1 text-sm text-muted">
                {stop.role.org} · {stop.role.start} to {stop.role.end} · {stop.role.duration}
              </p>
              <p className="text-sm text-faint">{stop.role.location}</p>
              {stop.role.summary ? <p className="mt-3 text-sm leading-relaxed text-cream/90">{stop.role.summary}</p> : null}
            </li>
          ))}
        </ol>
        <section className="mt-10 rounded-2xl border border-dashed border-line p-5">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember">Also writing</p>
          <h2 className="mt-2 font-display text-2xl">{writing.roles[0].title}, {writing.org}</h2>
          <p className="mt-1 text-sm text-muted">{writing.roles[0].start} to {writing.roles[0].end} · {writing.roles[0].location}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{writing.roles[0].summary}</p>
          {writing.href ? <SmartLink href={writing.href} className="mt-3 inline-block text-sm text-ember hover:underline">Author page</SmartLink> : null}
        </section>
        <section className="mt-12">
          <h2 className="font-display text-2xl">Before that</h2>
          <p className="mt-2 text-sm text-muted">Teams at VIT, and a short internship, before the SRE years.</p>
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
      </div>
      <ScopeCta />
    </main>
  );
}
