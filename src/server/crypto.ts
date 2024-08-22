import "server-only";

import { type JWTPayload, SignJWT, jwtVerify } from "jose";

const secret = process.env.SECRET;
const key = new TextEncoder().encode(secret);

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(session?: string) {
  try {
    const { payload } = await jwtVerify(session!, key, { algorithms: ["HS256"] });
    return payload;
  } catch (e) {
    console.error(e);
    return null;
  }
}
