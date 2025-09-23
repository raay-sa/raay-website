export type OtpSession = {
  email: string;
  method: "register" | "login";
};

const KEY = "raay-otp";

export function setOtpSession(s: OtpSession) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
}

export function getOtpSession(): OtpSession | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OtpSession;
  } catch {
    return null;
  }
}

export function clearOtpSession() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}
