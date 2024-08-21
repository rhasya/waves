"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { actionLikeClick } from "@/server/actions";

export default function Wave({
  auth,
  id,
  contents,
  name,
  like,
  likeCount,
}: {
  auth: boolean;
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
      <p className="text-sm text-gray-700">{name}</p>
      <p className="break-all">{contents}</p>
      <div className="flex flex-row items-center justify-end gap-1">
        <button onClick={handleClick} disabled={pending || !auth}>
          <Heart className="h-4 w-4" fill={like ? "black" : "transparent"} />
        </button>
        <span>{likeCount}</span>
      </div>
    </div>
  );
}
