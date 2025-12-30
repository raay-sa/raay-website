// src/lib/api/http.ts
// A small HTTP helper that preserves backend errors (so you can show them in toasts / field errors)
// and never triggers the Vite runtime overlay unless *you* rethrow at the top level.

export class HttpError<T = unknown> extends Error {
  status: number;
  data?: T;
  constructor(status: number, message: string, data?: T) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.data = data;
  }
}

const API_BASE_URL =
  (import.meta as any)?.env?.VITE_API_BASE_URL ??
  "https://backend.raay.sa/api/";

type HttpJsonOptions<B> = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: B;
  // optional query object -> /path?key=val
  query?: Record<string, string | number | boolean | undefined | null>;
};

function buildUrl(path: string, query?: HttpJsonOptions<any>["query"]) {
  // It removes trailing slashes from the base URL.
  const base = API_BASE_URL.replace(/\/+$/, "");
  // It removes leading slashes from the path.
  const clean = path.replace(/^\/+/, "");
  const url = new URL(`${base}/${clean}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

async function parseResponse(res: Response): Promise<any | undefined> {
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      return await res.json();
    } catch {
      return undefined;
    }
  }
  try {
    const txt = await res.text();
    return txt ? { message: txt } : undefined;
  } catch {
    return undefined;
  }
}

export async function httpJson<T, B = unknown>(
  path: string,
  options: HttpJsonOptions<B> = {}
): Promise<T> {
  const { method = "GET", headers, body, query } = options;

  const res = await fetch(buildUrl(path, query), {
    method,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(headers ?? {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const parsed = await parseResponse(res);

  if (!res.ok) {
    const backendMsg =
      (parsed && (parsed.message || parsed.error)) ||
      `Request failed with status ${res.status}`;
    throw new HttpError(res.status, backendMsg, parsed);
  }

  return (parsed as T) ?? ({} as T);
}

// --- multipart/form-data helper (for file uploads) ---
// Do NOT set "Content-Type" yourself; the browser will add the correct boundary.
type HttpFormOptions = {
  method?: "POST" | "PUT" | "PATCH";
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined | null>;
};

export async function httpFormData<T>(
  path: string,
  formData: FormData,
  options: HttpFormOptions = {}
): Promise<T> {
  const { method = "POST", headers, query } = options;

  const res = await fetch(buildUrl(path, query), {
    method,
    body: formData,
    headers: {
      Accept: "application/json",
      ...(headers ?? {}),
    },
  });

  const parsed = await parseResponse(res);

  if (!res.ok) {
    const backendMsg =
      (parsed && (parsed.message || parsed.error)) ||
      `Request failed with status ${res.status}`;
    throw new HttpError(res.status, backendMsg, parsed);
  }

  return (parsed as T) ?? ({} as T);
}
