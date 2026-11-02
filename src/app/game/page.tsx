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
        lede="A small voxel cabin in the foothills. Walk around as me, open the things on the desk and the walls, and each one takes you to a real page. It runs in the browser, no download."
      />
      <CabinLoader />
      <PaperMap />
    </main>
  );
}
