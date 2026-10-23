export const ADMIN_COOKIE_NAME = "admin_session";
export const DEFAULT_SESSION_SECRET = "life-spoken-english-admin-secret-2026";

export interface Env {
  ADMIN_PASSCODE?: string;
  ADMIN_SESSION_SECRET?: string;
  CONTENTFUL_SPACE_ID?: string;
  CONTENTFUL_MANAGEMENT_TOKEN?: string;
  CONTENTFUL_ENVIRONMENT?: string;
  CLOUDFLARE_DEPLOY_HOOK_URL?: string;
}

export function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  const cookies: Record<string, string> = {};
  for (const pair of cookieHeader.split(";")) {
    const [k, ...v] = pair.trim().split("=");
    if (k) cookies[k] = decodeURIComponent(v.join("="));
  }
  return cookies;
}

export async function signSession(secret: string): Promise<string> {
  const timestamp = Date.now().toString();
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(timestamp));
  const hex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${timestamp}.${hex}`;
}

export async function verifySession(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [timestamp, signature] = parts;
  const time = parseInt(timestamp, 10);
  if (isNaN(time) || Date.now() - time > 7 * 24 * 60 * 60 * 1000 || Date.now() < time - 60_000) {
    return false;
  }
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const expected = await crypto.subtle.sign("HMAC", key, enc.encode(timestamp));
  const expectedHex = Array.from(new Uint8Array(expected))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return signature === expectedHex;
}

export function cleanText(text: unknown): string {
  return String(text ?? "")
    .replace(/\s*[\u2013\u2014]\s*/g, " - ")
    .replace(/Mani\s+Sir/g, "Mani\u00A0Sir")
    .trim();
}

export function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}
