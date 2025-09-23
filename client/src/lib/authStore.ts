// src/lib/authStore.ts
import { create } from "zustand";

export interface AuthUser {
  id: number;
  name?: string;
  email: string;
  [k: string]: unknown;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSession: (token: string | null, user: AuthUser | null) => void;
  logout: () => void;
  hydrate: () => void; // load from localStorage
}

const STORAGE_KEY = "raay-auth";

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  setSession: (token, user) => {
    if (token || user) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
      } catch {}
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
    set({ token: token ?? null, user: user ?? null, isAuthenticated: !!token });
  },
  logout: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    set({ token: null, user: null, isAuthenticated: false });
  },
  hydrate: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        set({
          token: parsed?.token ?? null,
          user: parsed?.user ?? null,
          isAuthenticated: !!parsed?.token,
        });
      }
    } catch {
      // ignore
    }
  },
}));
