// src/lib/env.ts
export const ENV = {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL ?? "https://backend.raay.sa/api/",

  ASSET_BASE_URL:
    import.meta.env.VITE_ASSET_BASE_URL ?? "https://backend.raay.sa",

  RECAPTCHA_SITE_KEY:
    import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "",
};
