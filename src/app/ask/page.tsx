import type { Metadata } from "next";
import { faqs } from "@data/faq";
import { AmaChat } from "@/components/ama-chat";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ask",
  description: "Ask about Anish Singh Walia's experience, clients, services, hobbies, and how to start a project. Answers come from his notes, with a model when one is configured.",
  alternates: { canonical: "/ask" },
};

export default function AskPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-14">
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHeader
        kicker="Ask me anything"
        title="Questions a brand or a hiring manager actually asks."
        lede="The bot answers from a folder of notes about Anish. With an API key it can call DigitalOcean Serverless Inference. Without one, it still answers from the same notes."
      />
      <AmaChat />
      <section>
        <h2 className="font-display text-2xl">Straight answers</h2>
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
