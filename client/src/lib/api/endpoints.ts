// src/lib/api/endpoints.ts
import { httpJson } from "./http";
import type {
  ApiListResponse,
  ApiProgram,
  ApiItemResponse,
  Program,
  Category,
  ApiCategory,
  ContactUsPayload,
  ContactUsResponse,
  ApiPaginatedResponse,
} from "./types";
import { mapApiProgram, mapApiCategory } from "./utils";

// helper to get &page=N from a full URL
function pageFromUrl(url: string | null): number | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const p = u.searchParams.get("page");
    return p ? Number(p) : null;
  } catch {
    return null;
  }
}

// ========== NEW: unified programs list (GET /public/programs) ==========
export async function fetchProgramsPage(params: {
  page?: number;
  categoryId?: number | null;
  language?: string;
}): Promise<{ items: Program[]; nextPage: number | null }> {
  const res = await httpJson<ApiPaginatedResponse<ApiProgram>>(
    "public/programs",
    {
      query: { page: params.page ?? 1, category_id: params.categoryId ?? undefined },
    }
  );

  const pag = res?.data;
  const items = Array.isArray(pag?.data) ? pag.data.map(p => mapApiProgram(p, params.language)) : [];
  const nextPage = pageFromUrl(pag?.next_page_url);

  return { items, nextPage };
}

// ========== Existing (kept) ==========
export async function fetchRegisteredProgramsPage(
  page = 1,
  categoryId?: number,
  language?: string
) {
  const res = await httpJson<ApiPaginatedResponse<ApiProgram>>(
    "public/registered_programs",
    {
      query: {
        page,
        ...(categoryId ? { category_id: categoryId } : {}),
      },
    }
  );

  const payload = res?.data;
  const items = Array.isArray(payload?.data)
    ? payload.data
        .map(p => mapApiProgram(p, language))
        .map((p) => ({ ...p, type: "registered" as const }))
    : [];

  const hasMore = Boolean(payload?.next_page_url);
  const nextPage = hasMore ? (payload?.current_page ?? page) + 1 : undefined;

  return { items, hasMore, nextPage };
}

// --- GET /public/online_programs (supports ?page=&category_id=) ---
export async function fetchOnlinePrograms(params: {
  page?: number;
  categoryId?: number | null;
  language?: string;
}): Promise<{ items: Program[]; nextPage: number | null }> {
  const res = await httpJson<ApiPaginatedResponse<ApiProgram>>(
    "public/online_programs",
    {
      query: { page: params.page, category_id: params.categoryId ?? undefined },
    }
  );

  const pag = res?.data;
  const items = Array.isArray(pag?.data) ? pag.data.map(p => mapApiProgram(p, params.language)) : [];
  const nextPage = pageFromUrl(pag?.next_page_url);

  return { items, nextPage };
}

// --- Existing endpoints (unchanged) ---
export async function fetchRecentPrograms(language?: string): Promise<Program[]> {
  const res = await httpJson<ApiListResponse<ApiProgram>>(
    "public/recent_programs"
  );
  return (Array.isArray(res?.data) ? res.data : []).map(p => mapApiProgram(p, language));
}

export async function fetchCategories(language?: string): Promise<Category[]> {
  const res = await httpJson<ApiListResponse<ApiCategory>>("public/categories");
  return (Array.isArray(res?.data) ? res.data : []).map(c => mapApiCategory(c, language));
}

export async function fetchProgramsByCategory(
  categoryId: number,
  language?: string
): Promise<Program[]> {
  const res = await httpJson<ApiListResponse<ApiProgram>>(
    `public/programs/category/${categoryId}`
  );
  return (Array.isArray(res?.data) ? res.data : []).map(p => mapApiProgram(p, language));
}

export async function fetchProgramById(id: number, language?: string): Promise<Program> {
  const res = await httpJson<ApiItemResponse<ApiProgram>>(
    `public/programs/${id}`
  );
  return mapApiProgram(res.data, language);
}

export async function postContactUs(
  payload: ContactUsPayload
): Promise<ContactUsResponse> {
  const res = await httpJson<ContactUsResponse, ContactUsPayload>(
    "public/contact_us",
    {
      method: "POST",
      body: payload,
    }
  );
  return res;
}
