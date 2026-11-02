import type { Metadata } from "next";
import { faqs } from "@data/faq";
import { AmaChat } from "@/components/ama-chat";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ask",
  description: "Ask about Anish Singh Walia's work, clients, career, numbers, and hobbies. The bot reads his notes plus live Medium, GitHub, and DigitalOcean data, and links what it cites.",
  alternates: { canonical: "/ask" },
};

export default function AskPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-14">
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHeader
        kicker="Ask"
        title="Ask the bot what you'd ask me."
        lede="It knows my work, clients, career, numbers, and hobbies. It reads live from Medium, GitHub, and my DigitalOcean author page, searches the web when it needs to, and links its sources. It won't share private details, and it says so when it can't find something."
      />
      <AmaChat />
      <section>
        <h2 className="font-display text-2xl">The short answers</h2>
        <dl className="mt-4 grid gap-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-line p-4">
              <dt className="font-medium">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
