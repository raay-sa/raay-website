// src/features/categories/queries.ts
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api/endpoints";
import type { Category } from "@/lib/api/types";
import { useI18nStore } from "@/lib/i18n";

export const CATEGORY_QUERY_KEYS = {
  list: (language: string) => ["categories", "list", language] as const,
};

export function useCategories() {
  const { language } = useI18nStore();
  return useQuery<Category[], Error>({
    queryKey: CATEGORY_QUERY_KEYS.list(language),
    queryFn: () => fetchCategories(language),
    staleTime: 1000 * 60, // 1 minute
  });
}
