import type { Metadata } from "next";
import { testimonials } from "@data/testimonials";
import { PageHeader } from "@/components/page-header";
import { TestimonialGrid } from "@/components/testimonial-grid";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "LinkedIn recommendations for Anish Singh Walia from Semrush, OtterlyAI, Datalpulse, Tanot Solutions, Pollo AI, and other clients.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  const ordered = [...testimonials].sort((a, b) => Date.parse(b.dateLabel) - Date.parse(a.dateLabel));
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <PageHeader
        kicker="Testimonials"
        title="Recommendations, as they were written."
        lede="Quoted from LinkedIn. An ellipsis is LinkedIn's cutoff, left unfinished on purpose. One recommendation is hidden on his profile and is not included."
      />
      <div className="mt-10">
        <TestimonialGrid items={ordered} detailed />
      </div>
    </main>
  );
}
