"use client";

import dynamic from "next/dynamic";

const VoxelCabin = dynamic(() => import("./voxel-cabin").then((module) => module.VoxelCabin), {
  ssr: false,
  loading: () => (
    <div className="grid aspect-[4/3] w-full place-items-center rounded-2xl border border-line bg-panel text-sm text-muted sm:aspect-[16/9]">
      Loading the cabin…
    </div>
  ),
});

export function CabinLoader() {
  return <VoxelCabin />;
}
