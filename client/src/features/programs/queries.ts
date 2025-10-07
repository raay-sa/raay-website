// src/features/programs/queries.ts
import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  fetchRecentPrograms,
  fetchProgramsByCategory,
  fetchRegisteredProgramsPage,
  fetchProgramById,
  fetchOnlinePrograms,
  fetchOnsitePrograms,
  fetchCategories,
  fetchProgramsPage, // NEW
} from "@/lib/api/endpoints";
import type { Program, Category } from "@/lib/api/types";
import { useI18nStore } from "@/lib/i18n";

export const QUERY_KEYS = {
  recentPrograms: (language: string) => ["programs", "recent", language] as const,
  byCategory: (categoryId: number, language: string) =>
    ["programs", "category", categoryId, language] as const,
  byId: (id: number, language: string) => ["programs", "detail", id, language] as const,
  categories: (language: string) => ["categories", language] as const,
  online: (categoryId: number | null | undefined, language: string) =>
    ["programs", "online", categoryId ?? "all", language] as const,
  onsite: (categoryId: number | null | undefined, language: string) =>
    ["programs", "onsite", categoryId ?? "all", language] as const,
  all: (categoryId: number | null | undefined, language: string) =>
    ["programs", "all", categoryId ?? "all", language] as const, // NEW
};

export function useRecentPrograms() {
  const { language } = useI18nStore();
  return useQuery<Program[], Error>({
    queryKey: QUERY_KEYS.recentPrograms(language),
    queryFn: () => fetchRecentPrograms(language),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
}

export function useProgramsByCategory(categoryId?: number) {
  const { language } = useI18nStore();
  return useQuery<Program[], Error>({
    queryKey: QUERY_KEYS.byCategory(categoryId ?? -1, language),
    queryFn: () => fetchProgramsByCategory(categoryId as number, language),
    enabled: typeof categoryId === "number" && categoryId > 0,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
}

export function useProgram(id?: number) {
  const { language } = useI18nStore();
  return useQuery<Program, Error>({
    queryKey: QUERY_KEYS.byId(id ?? -1, language),
    queryFn: () => fetchProgramById(id as number, language),
    enabled: typeof id === "number" && id > 0,
    staleTime: 1000 * 60,
  });
}

// Keep if used elsewhere; otherwise you can remove to avoid duplicate names with categories/queries.ts
export function useCategories() {
  const { language } = useI18nStore();
  return useQuery<Category[], Error>({
    queryKey: QUERY_KEYS.categories(language),
    queryFn: () => fetchCategories(language),
    staleTime: 1000 * 60 * 5,
  });
}

// NEW: unified programs (GET /public/programs) with infinite pagination + category filter
export function useProgramsInfinite(categoryId?: number | null) {
  const { language } = useI18nStore();
  return useInfiniteQuery<{ items: Program[]; nextPage: number | null }, Error>(
    {
      queryKey: QUERY_KEYS.all(categoryId ?? null, language),
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        fetchProgramsPage({
          page: Number(pageParam ?? 1),
          categoryId: categoryId ?? null,
          language,
        }),
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      staleTime: 1000 * 60,
    }
  );
}

// Existing: infinite online programs
export function useOnlineProgramsInfinite(categoryId?: number | null) {
  const { language } = useI18nStore();
  return useInfiniteQuery<{ items: Program[]; nextPage: number | null }, Error>(
    {
      queryKey: QUERY_KEYS.online(categoryId ?? null, language),
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        fetchOnlinePrograms({
          page: Number(pageParam ?? 1),
          categoryId: categoryId ?? null,
          language,
        }),
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      staleTime: 1000 * 60,
    }
  );
}

// New: infinite onsite programs
export function useOnsiteProgramsInfinite(categoryId?: number | null) {
  const { language } = useI18nStore();
  return useInfiniteQuery<{ items: Program[]; nextPage: number | null }, Error>(
    {
      queryKey: QUERY_KEYS.onsite(categoryId ?? null, language),
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        fetchOnsitePrograms({
          page: Number(pageParam ?? 1),
          categoryId: categoryId ?? null,
          language,
        }),
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      staleTime: 1000 * 60,
    }
  );
}

export function useRegisteredProgramsInfinite(categoryId: number | null) {
  const { language } = useI18nStore();
  return useInfiniteQuery<
    { items: Program[]; hasMore: boolean; nextPage?: number },
    Error,
    { items: Program[]; hasMore: boolean; nextPage?: number }
  >({
    queryKey: ["programs", "registered", "infinite", categoryId ?? "all", language],
    queryFn: ({ pageParam = 1 }) =>
      fetchRegisteredProgramsPage(pageParam as number, categoryId ?? undefined, language),
    getNextPageParam: (last) => (last.hasMore ? last.nextPage : undefined),
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
}
