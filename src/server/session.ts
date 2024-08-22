import "server-only";

import { cache } from "react";
import { type JWTPayload } from "jose";
import { cookies } from "next/headers";

import { decrypt, encrypt } from "@/server/crypto";

export async function createSession(payload: JWTPayload) {
  const signed = await encrypt(payload);
  cookies().set("session", signed, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: "lax",
    path: "/",
  });
}

export function deleteSession() {
  cookies().delete("session");
}

export const verifySession = cache(async () => {
  const session = cookies().get("session")?.value;

  if (!session) {
    return { isAuth: false };
  }

  let user: { username?: string; userId?: number } = {};
  try {
    user = (await decrypt(session)) as unknown as { username: string; userId: number };
    return { isAuth: true, ...user };
  } catch (e) {
    console.error(e);
    return { isAuth: false };
  }
});
