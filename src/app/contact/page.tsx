import type { Metadata } from "next";
import { site } from "@data/site";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { mailtoHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Work with me",
  description: "Start a project with Anish Singh Walia. Tutorials, docs, deep dives, thought leadership, and content strategy for SaaS, AI-native, and cloud companies.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-3xl gap-10 px-4 py-14">
      <PageHeader
        kicker="Work with me"
        title="Let's work together"
        lede="Tell me about your project and I'll get back to you."
      />
      <ContactForm mailto={mailtoHref()} />
      <p className="text-sm text-muted">
        Email me at <a className="text-ember hover:underline" href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </main>
  );
}
