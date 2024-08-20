import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";

export function createSession(payload: string) {
  cookies().set("session", payload, {
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
  const cookie = cookies().get("session")?.value;

  if (!cookie) {
    return { isAuth: false };
  }

  let user: { username?: string; userId?: number } = {};
  try {
    user = JSON.parse(cookie);
  } catch (e) {
    user = { username: cookie };
  }
  return { isAuth: true, ...user };
});
