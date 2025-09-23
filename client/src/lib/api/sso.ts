// src/lib/api/sso.ts
import { postRefreshToken } from "@/lib/api/auth";

const SSO_BASE =
  (import.meta as any)?.env?.VITE_SSO_BASE_URL ?? "https://sso.raay.sa";

export function buildSsoLoginUrl(token: string, redirectPath = "/student") {
  const url = new URL("/token-login", SSO_BASE);
  url.searchParams.set("token", token);
  url.searchParams.set("redirect", redirectPath);
  return url.toString();
}

// Read current token + refresh_token from localStorage, refresh if possible.
export async function getValidTokenForSSO(): Promise<string | null> {
  const raw = localStorage.getItem("raay-auth");
  let token: string | null = null;
  let refreshToken: string | null = null;
  let user: unknown = null;

  try {
    const parsed = raw ? JSON.parse(raw) : {};
    token = parsed?.token ?? null;
    refreshToken = parsed?.refreshToken ?? parsed?.refresh_token ?? null;
    user = parsed?.user ?? null;
  } catch {}

  if (!refreshToken) return token;

  try {
    const res = await postRefreshToken(refreshToken);
    const newToken = res?.access_token;
    if (newToken) {
      localStorage.setItem(
        "raay-auth",
        JSON.stringify({ token: newToken, refreshToken, user })
      );
      return newToken;
    }
  } catch {
    // optional: keep old token or clear session
  }
  return token;
}
