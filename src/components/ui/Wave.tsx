"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { actionLikeClick } from "@/server/actions";
import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";

export default function Wave({
  auth,
  id,
  contents,
  createdAt,
  name,
  like,
  likeCount,
}: {
  auth: boolean;
} & WaveData) {
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
      <p className="text-sm text-gray-700">
        {name} {formatDistance(createdAt, new Date(), { locale: ko })} 전
      </p>
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
