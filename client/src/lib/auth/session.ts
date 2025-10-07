// src/lib/auth/session.ts
export type StoredAuth = { token: string; refreshToken?: string; user: any } | null;

const KEY = "raay-auth";

export function getStoredAuth(): StoredAuth {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredAuth) : null;
  } catch {
    return null;
  }
}

export function setStoredAuth(val: StoredAuth) {
  try {
    if (!val) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, JSON.stringify(val));
  } catch {
    // ignore storage errors
  }
}
