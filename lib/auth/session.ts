import "server-only";

import { SignJWT, jwtVerify } from "jose";

const secret = process.env.SESSION_SECRET;

if (!secret) {
  throw new Error("SESSION_SECRET is not defined in the environment variables.");
}

const key = new TextEncoder().encode(secret);

export async function createSessionToken() {
  return new SignJWT({
    authorized: true,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key);

    return payload.authorized === true;
  } catch {
    return false;
  }
}