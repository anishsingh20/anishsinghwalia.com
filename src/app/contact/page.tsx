import type { Metadata } from "next";
import { site } from "@data/site";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { mailtoHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Work with me",
  description: "Start a project with me. Videos, deep dives, LinkedIn posts, ghostwriting, docs, tutorials, newsletters, and content strategy for B2B, SaaS, AI-native, and developer-tool companies.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-3xl gap-10 px-4 py-14">
      <PageHeader
        kicker="Work with me"
        title="Let's make something."
        lede="Tell me the company, the format, and what it's for. I read every note myself and I'll write back."
      />
      <ContactForm mailto={mailtoHref()} />
      <p className="text-sm text-muted">
        Email me at <a className="text-ember hover:underline" href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </main>
  );
}
