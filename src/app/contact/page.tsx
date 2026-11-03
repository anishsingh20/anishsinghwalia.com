import type { Metadata } from "next";
import { site } from "@data/site";
import { BookIntroButton } from "@/components/book-intro";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { LogoStrip, QuoteLine } from "@/components/proof-strip";
import { AwardBadge } from "@/components/award-badge";
import { SmartLink } from "@/components/smart-link";
import { mailtoHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Work with me",
  description: "Tell me about the company, the format, and what it's for. Content for AI-native companies and brands.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-3xl gap-10 px-4 py-14">
      <PageHeader
        kicker="Work with me"
        title="Tell me about your project."
        lede="Book an intro call, use the form, or email me. Company, format, what it's for."
      />
      {site.bookingUrl ? (
        <div className="flex flex-wrap items-center gap-3">
          <BookIntroButton size="lg" variant="default" />
          <p className="text-sm text-muted">or use the form below</p>
        </div>
      ) : null}
      <ContactForm mailto={mailtoHref()} />
      <p className="text-sm text-muted">
        Email me at <SmartLink className="text-ember hover:underline" href={`mailto:${site.email}`}>{site.email}</SmartLink>
      </p>
      <aside className="grid gap-4 rounded-3xl border border-line bg-panel p-5">
        <AwardBadge />
        <QuoteLine id="klaus-m-schremser" />
        <LogoStrip names={["Semrush", "DigitalOcean", "OtterlyAI", "DataImpulse", "Tanot Solutions", "Pollo AI"]} />
      </aside>
    </main>
  );
}
