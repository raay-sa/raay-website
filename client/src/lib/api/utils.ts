// src/lib/api/utils.ts
import { ENV } from "../env";
import type { ApiCategory, ApiProgram, Category, Program, ApiCategoryTranslation, ApiProgramTranslation } from "./types";
import { useI18nStore } from "../i18n";

export function toAbsoluteAssetUrl(
  pathOrUrl: string | null | undefined
): string {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = ENV.ASSET_BASE_URL.replace(/\/+$/, "");
  const path = pathOrUrl.replace(/^\/+/, "");
  return `${base}/${path}`;
}

export function parseDurationToHours(
  value: number | string | null | undefined
): number | null {
  if (value == null) return null;
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    // "H:MM" or "HH:MM"
    const match = value.match(/^(\d+):([0-5]\d)$/);
    if (match) {
      const h = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      return h + m / 60;
    }
    const num = Number(value);
    if (!Number.isNaN(num)) return num;
  }
  return null;
}

// Helper function to get translation based on current language
export function getTranslationByLanguage<T extends { locale: string }>(
  translations: T[],
  language: string,
  fallbackField?: keyof T
): T | null {
  if (!translations || translations.length === 0) return null;
  
  // First try to find exact language match
  const exactMatch = translations.find(t => t.locale === language);
  if (exactMatch) return exactMatch;
  
  // Fallback to first available translation
  return translations[0] || null;
}

// Helper function to get category title from translations
export function getCategoryTitle(translations: ApiCategoryTranslation[], language: string): string {
  const translation = getTranslationByLanguage(translations, language);
  return translation?.title || "—";
}

// Helper function to get program data from translations
export function getProgramTranslation(translations: ApiProgramTranslation[], language: string) {
  const translation = getTranslationByLanguage(translations, language);
  return {
    title: translation?.title || "",
    description: translation?.description || "",
    learning: translation?.learning || [],
    requirement: translation?.requirement || [],
  };
}

export function mapApiCategory(c: ApiCategory, language: string = "ar"): Category {
  const title = getCategoryTitle(c.translations, language);
  // Get the appropriate image based on language, fallback to Arabic if English not available
  const imagePath = language === "en" ? (c.image_en || c.image_ar) : (c.image_ar || c.image_en);
  return {
    id: c.id,
    title,
    imageUrl: toAbsoluteAssetUrl(imagePath),
  };
}

export function mapApiProgram(p: ApiProgram, language: string = "ar"): Program {
  const translation = getProgramTranslation(p.translations, language);
  const categoryTitle = p.category 
    ? getCategoryTitle(p.category.translations, language)
    : "—";
    
  return {
    id: p.id,
    slug: p.slug,
    title: translation.title,
    imageUrl: toAbsoluteAssetUrl(p.image),
    price: p.price,
    type: p.type,
    level: p.level,
    haveCertificate: p.have_certificate === 1,
    dateFrom: p.date_from ?? null,
    dateTo: p.date_to ?? null,
    time: p.time ?? null,
    isLive: p.is_live === 1,
    description: translation.description,
    userType: p.user_type ?? null,
    learning: translation.learning,
    requirement: translation.requirement,
    durationHours: parseDurationToHours(p.program_duration),
    subscriptionsCount: p.subscriptions_count,
    category: p.category
      ? { id: p.category.id, title: categoryTitle }
      : p.category ?? null,
    teacher: p.teacher
      ? {
          id: p.teacher.id,
          name: p.teacher.name,
          imageUrl: toAbsoluteAssetUrl(p.teacher.image ?? null),
        }
      : null,
  };
}
