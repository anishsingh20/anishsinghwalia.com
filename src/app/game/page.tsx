import type { Metadata } from "next";
import { PaperMap } from "@/components/game/paper-map";
import { SerpSummit } from "@/components/game/serp-summit";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Game Room",
  description: "Climb the SERP, a short trek through Anish Singh Walia's work: calisthenics, SRE, writing, clients, and the summit.",
  alternates: { canonical: "/game" },
};

export default function GamePage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-14">
      <PageHeader
        kicker="Game Room"
        title="Climb the SERP."
        lede="A short Himalayan switchback that is also a search ranking. Pick up the pager from the SRE years, the kettlebell, a keyword, a client badge, and the flag at position #1."
      />
      <SerpSummit />
      <PaperMap />
    </main>
  );
}
