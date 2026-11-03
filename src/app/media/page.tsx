import type { Metadata } from "next";
import { MediaGrid } from "@/components/media-grid";
import { PageHeader } from "@/components/page-header";
import { ScopeCta } from "@/components/work-ctas";

export const metadata: Metadata = {
  title: "Media",
  description: "Podcasts, press, features and awards: AI For Thought, AllAboutAI, ActiveCampaign, DataForSEO, and Document360 Global Writers Awards.",
  alternates: { canonical: "/media" },
};

export default function MediaPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <PageHeader
          kicker="Media"
          title="Talks, podcasts and press."
          lede="Grounded in work I have actually shipped."
        />
        <div className="mt-10">
          <MediaGrid />
        </div>
      </div>
      <ScopeCta />
    </main>
  );
}
