"use client";

import { Suspense, use } from "react";
import Wave from "@/components/ui/Wave";

export default function WaveList({ wavesPromise }: { wavesPromise: Promise<any[]> }) {
  const waves = use(wavesPromise);
  return (
    <Suspense fallback={<></>}>
      <div className="flex flex-col gap-4">
        {waves.map((wave) => (
          <Wave key={wave.id} {...wave} />
        ))}
        {waves.length === 0 && <h2 className={"text-center text-2xl font-bold"}>There is no waves</h2>}
      </div>
    </Suspense>
  );
}
