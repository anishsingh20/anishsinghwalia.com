import type { Metadata } from "next";
import { authorPages, essays, tutorials } from "@data/writing";
import { PageHeader } from "@/components/page-header";
import { ShowcaseGallery } from "@/components/showcase-gallery";
import { ScopeCta } from "@/components/work-ctas";

export const metadata: Metadata = {
  title: "Work",
  description: "Published pieces: video, LinkedIn, long-form, ghostwriting, and tutorials. Each one opens the live work.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <PageHeader
          kicker="Work"
          title="What the work looks like."
          lede="Published pieces, grouped by format. Each card opens the live work."
        />
        <div className="mt-12">
          <ShowcaseGallery />
        </div>
        <section className="mt-16">
          <h2 className="font-display text-2xl">More tutorials</h2>
          <ul className="mt-4 grid gap-3">
            {tutorials.slice(0, 6).map((piece) => (
              <li key={piece.href}>
                <a href={piece.href} className="block rounded-2xl border border-line px-4 py-4 hover:border-orange/40">
                  <p className="font-medium">{piece.title}</p>
                  <p className="mt-1 text-xs text-faint">{piece.meta}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-12">
          <h2 className="font-display text-2xl">More essays</h2>
          <ul className="mt-4 grid gap-3">
            {essays.slice(0, 4).map((piece) => (
              <li key={piece.href}>
                <a href={piece.href} className="block rounded-2xl border border-line px-4 py-4 hover:border-orange/40">
                  <p className="font-medium">{piece.title}</p>
                  <p className="mt-1 text-xs text-faint">{piece.meta}</p>
                </a>
              </li>
            ))}
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
      </div>
      <ScopeCta />
    </main>
  );
}
