import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "stt_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.GITHUB_TOKEN || null;
}

function getConfiguredCredentials(): { username: string; password: string } | null {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return null;
  return { username, password };
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function isAuthConfigured(): boolean {
  return getConfiguredCredentials() !== null && getSessionSecret() !== null;
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const creds = getConfiguredCredentials();
  if (!creds) return false;
  return safeEqual(username, creds.username) && safeEqual(password, creds.password);
}

export function createSessionToken(username: string): string {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET sozlanmagan.");
  }

  const payload = JSON.stringify({
    u: username,
    exp: Date.now() + SESSION_TTL_MS,
  });
  const encodedPayload = Buffer.from(payload, "utf-8").toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): { valid: boolean; username?: string } {
  if (!token) return { valid: false };
  const secret = getSessionSecret();
  if (!secret) return { valid: false };

  const parts = token.split(".");
  if (parts.length !== 2) return { valid: false };

  const [encodedPayload, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");

  if (!safeEqual(signature, expectedSig)) {
    return { valid: false };
  }

  try {
    const parsed = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf-8")) as {
      u?: string;
      exp?: number;
    };
    if (!parsed.u || !parsed.exp || Date.now() > parsed.exp) {
      return { valid: false };
    }
    return { valid: true, username: parsed.u };
  } catch {
    return { valid: false };
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token).valid;
}
