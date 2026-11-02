import type { Metadata } from "next";
import { authorPages, essays, linkedInPublicationTitles, press, tutorials } from "@data/writing";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Work",
  description: "My DigitalOcean tutorials, Medium essays, and press, including the ActiveCampaign workflow story and the AllAboutAI podcast.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <PageHeader
        kicker="Work"
        title="Tutorials, essays, and the stories about the work."
        lede="I've authored or refreshed 347 tutorials on DigitalOcean. The ones below are a sample I picked. Many of the 347 are refreshes of older tutorials, which is its own skill."
      />
      <Section title="DigitalOcean" items={tutorials} />
      <Section title="Essays and earlier tutorials" items={essays} />
      <section className="mt-12">
        <h2 className="font-display text-2xl">Press</h2>
        <ul className="mt-4 grid gap-3">
          {press.map((piece) => (
            <li key={piece.href} className="rounded-2xl border border-line p-4">
              <a href={piece.href} className="font-medium text-ember hover:underline">{piece.title}</a>
              <p className="mt-1 text-xs text-faint">{piece.meta}</p>
              {piece.note ? <p className="mt-2 text-sm text-muted">{piece.note}</p> : null}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-2xl">Older titles on my LinkedIn</h2>
        <p className="mt-2 text-sm text-muted">Early writing, mostly from college. LinkedIn lists the titles without links.</p>
        <ul className="mt-4 grid gap-2 text-sm text-cream">
          {linkedInPublicationTitles.map((title) => <li key={title}>{title}</li>)}
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-2xl">Author pages</h2>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm">
          {authorPages.map((page) => (
            <li key={page.href}><a href={page.href} className="text-ember hover:underline">{page.label}</a></li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function Section({ title, items }: { title: string; items: { title: string; href: string; meta: string; note?: string }[] }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {items.map((piece) => (
          <li key={piece.href + piece.title}>
            <a href={piece.href} className="block rounded-2xl border border-line px-4 py-4 hover:border-orange/40">
              <p className="font-medium">{piece.title}</p>
              <p className="mt-1 text-xs text-faint">{piece.meta}</p>
              {piece.note ? <p className="mt-2 text-sm text-muted">{piece.note}</p> : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
