"use client";

import { Heart } from "lucide-react";
import { actionLikeClick } from "@/server/actions";
import { useState } from "react";

export default function Wave({
  id,
  contents,
  name,
  like,
  likeCount,
}: {
  id: number;
  contents: string;
  name: string;
  like: boolean;
  likeCount: number;
}) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    try {
      await actionLikeClick(id);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col rounded border p-4">
      <p className="text-sm">{name}</p>
      <p className="break-all">{contents}</p>
      <div className="flex flex-row items-center justify-end gap-1">
        <button onClick={handleClick} disabled={pending}>
          <Heart className="h-4 w-4" fill={like ? "black" : "transparent"} />
        </button>
        <span>{likeCount}</span>
      </div>
    </div>
  );
}
