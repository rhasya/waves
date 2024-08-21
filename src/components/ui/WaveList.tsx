"use client";

import { Suspense, use } from "react";
import Wave from "@/components/ui/Wave";

export default function WaveList({ auth, wavesPromise }: { auth: boolean; wavesPromise: Promise<any[]> }) {
  const waves = use(wavesPromise);
  return (
    <Suspense fallback={<div></div>}>
      <div className="flex flex-col gap-4">
        {waves.map((wave) => (
          <Wave key={wave.id} auth={auth} {...wave} />
        ))}
        {waves.length === 0 && <h2 className={"text-center text-2xl font-bold"}>There is no waves</h2>}
      </div>
    </Suspense>
  );
}
