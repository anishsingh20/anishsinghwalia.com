import type { Metadata } from "next";
import { CabinLoader } from "@/components/game/cabin-loader";
import { PaperMap } from "@/components/game/paper-map";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Game Room",
  description: "Walk around a voxel cabin in the Himalayan foothills. My desk, the pager from the SRE years, the kettlebell, and the wall of companies I've worked with. Each one opens a page.",
  alternates: { canonical: "/game" },
};

export default function GamePage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-14">
      <PageHeader
        kicker="Game Room"
        title="My cabin, block by block."
        lede="A voxel cabin in the foothills. Open the desk, the pager, the kettlebell. Each one is a page."
      />
      <CabinLoader />
      <PaperMap />
    </main>
  );
}
