import type { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@data/testimonials";
import { PageHeader } from "@/components/page-header";
import { CtaBand, LogoStrip } from "@/components/proof-strip";
import { TestimonialGrid } from "@/components/testimonial-grid";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients at Semrush, OtterlyAI, DataImpulse, Tanot Solutions, Pollo AI, La Isla Designs, and DataForSEO wrote after working with me.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  const ordered = [...testimonials].sort((a, b) => Date.parse(b.dateLabel) - Date.parse(a.dateLabel));
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <PageHeader
          kicker="Testimonials"
          title="What clients wrote."
          lede="Marketing leads, founders, and partnership managers at the companies I've made content for, in their own words. Each card links to the person."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild><Link href="/contact">Tell me about your project</Link></Button>
          <Button asChild variant="outline"><Link href="/clients">The companies</Link></Button>
        </div>
        <div className="mt-8">
          <LogoStrip names={["Semrush", "OtterlyAI", "DataImpulse", "Tanot Solutions", "Pollo AI", "La Isla Designs", "DataForSEO"]} />
        </div>
        <div className="mt-10">
          <TestimonialGrid items={ordered} detailed />
        </div>
      </div>
      <CtaBand quoteId="daria-sukhoroslova" title="Want a recommendation like these?" text="Start with the brief. Tell me the format, the audience, and what the piece needs to do." showMetrics />
    </main>
  );
}
