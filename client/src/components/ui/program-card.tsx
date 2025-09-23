import { formatCurrency } from "@/lib/utils";
import { useI18nStore } from "@/lib/i18n";
import { Clock } from "lucide-react";
import type { Program } from "@/lib/api/types";

interface ProgramCardProps {
  program: Program;
}

/**
 * Utility: translate a few known seeded IDs (kept from your original code).
 * For API-provided titles, we simply show the server title by default.
 */
function translateProgramTitleFallback(
  title: string,
  id: number,
  lang: "ar" | "en"
) {
  if (lang === "ar") return title; // if Arabic UI, show title as-is (server likely returns Arabic already)
  switch (id) {
    case 101:
      return "Strategy and Execution Leadership";
    case 102:
      return "Building Institutional Work Culture";
    case 103:
      return "Decision Making";
    case 104:
      return "Public Relations and Media";
    case 105:
      return "Development and Building of Leaders";
    case 106:
      return "Crisis Management and Negotiation";
    case 107:
      return "Positive Communication Skills";
    case 108:
      return "Enhancing Job Loyalty and Work Ethics";
    case 201:
      return "Big Data Analysis and its Role in Decision Making";
    case 301:
      return "Awareness of the Classified Documents Penalties System";
    case 401:
      return "Certified Cybersecurity Manager";
    case 501:
      return "Artificial Intelligence for Business Leaders";
    default:
      return title;
  }
}

/**
 * Map category to label.
 * API gives: program.category?.title (human-readable).
 * We keep your localized mapping for common slugs but fall back to the title.
 */
function getCategoryText(
  lang: "ar" | "en",
  categoryTitle?: string | null,
  categorySlug?: string
) {
  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);

  // If you still have legacy slugs somewhere, you can map them here:
  if (categorySlug) {
    switch (categorySlug) {
      case "cyber-security":
        return t("الأمن السيبراني", "Cyber Security");
      case "digital-transformation":
        return t("التحول الرقمي", "Digital Transformation");
      case "artificial-intelligence":
        return t("الذكاء الاصطناعي", "Artificial Intelligence");
      case "data-science":
        return t("علم البيانات", "Data Science");
      case "organizational-transformation":
        return t("التحول المؤسسي", "Organizational Transformation");
      case "risk-avoidance":
        return t("تجنب المخاطر", "Risk Avoidance");
      case "leadership-development":
        return t("تطوير القيادات", "Leadership Development");
    }
  }

  // Otherwise, use the category title from the API if present
  if (categoryTitle && categoryTitle.trim().length > 0) return categoryTitle;

  // Default
  return t("برنامج تدريبي", "Training Program");
}

/** Single color for all cards (your original behavior) */
function getCategoryColor() {
  return "#2a2665";
}

/** Build a readable duration based on API fields */
function buildDurationLabel(p: Program, lang: "ar" | "en"): string {
  // If registered course with duration in hours
  if (p.type === "registered" && p.durationHours) {
    const hours = Number(p.durationHours);
    if (lang === "ar") {
      return `${hours} ساعة`;
    }
    return `${hours}h`;
  }

  // If live program with date/time
  if (p.type === "live") {
    const date = p.dateFrom ?? p.dateTo ?? null;
    const time = p.time ?? null;

    const hasDate = !!date;
    const hasTime = !!time;

    if (hasDate && hasTime) {
      return lang === "ar" ? `${date} - ${time}` : `${date} - ${time}`;
    }
    if (hasDate) {
      return lang === "ar" ? `${date}` : `${date}`;
    }
    if (hasTime) {
      return lang === "ar" ? `${time}` : `${time}`;
    }

    // fallback
    return lang === "ar" ? "مباشر" : "Live";
  }

  // Generic fallback
  return lang === "ar" ? "غير محدد" : "N/A";
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const { language } = useI18nStore();
  const lang = (language === "ar" ? "ar" : "en") as "ar" | "en";

  const textAlign = lang === "ar" ? "text-right" : "text-left";
  const dirClass = lang === "ar" ? "rtl" : "ltr";

  // Choose a title: English UI may use fallback translations for a few known IDs
  const title =
    lang === "ar"
      ? program.title
      : translateProgramTitleFallback(program.title, program.id, lang);

  const categoryLabel = getCategoryText(
    lang,
    program.category?.title ?? null,
    // if you still pass any slug somewhere else, put it here:
    undefined
  );

  const durationLabel = buildDurationLabel(program, lang);

  return (
    <div className="group h-full flex flex-col overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
      {/* صورة البرنامج */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={program.imageUrl}
          alt={program.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* طبقة تدرج شفافة لتوحيد مظهر البطاقة */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(42, 38, 101, 0.1) 0%, rgba(42, 38, 101, 0.7) 100%)`,
          }}
        />

        {/* شريط تصنيف البرنامج */}
        <div
          className="absolute top-0 right-0 py-1 px-3 text-white text-xs font-semibold"
          style={{
            backgroundColor: getCategoryColor(),
            borderRadius: "0 0 0 8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        >
          {categoryLabel}
        </div>

        {/* عنوان البرنامج */}
        <div className="absolute bottom-0 right-0 left-0 p-3 text-right">
          <h3
            className="text-base font-bold text-white"
            style={{
              textShadow: "0px 1px 2px rgba(0, 0, 0, 0.7)",
            }}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* محتوى البرنامج */}
      <div
        className={`flex-grow flex flex-col p-5 ${textAlign}`}
        dir={dirClass}
      >
        {/* وصف البرنامج */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {program.description}
        </p>

        {/* معلومات البرنامج */}
        <div className="mt-auto space-y-2">
          {/* المدة */}
          <div className="flex items-center text-xs text-gray-500">
            {/* For RTL spacing, switch margin side via dir */}
            <Clock className={`w-4 h-4 ${lang === "ar" ? "ml-2" : "mr-2"}`} />
            <span>
              {lang === "ar" ? "المدة: " : "Duration: "}
              <span className="font-medium text-[#2a2665]">
                {durationLabel}
              </span>
            </span>
          </div>

          {/* السعر + زر التسجيل */}
          <div className="flex justify-between items-center text-sm">
            <div className="font-bold text-[#2a2665]">
              {formatCurrency(program.price)}
            </div>

            <a
              href={`/program/${program.id}`}
              className="px-4 py-1.5 bg-[#b29567] text-white rounded-full hover:bg-[#2a2665] transition-colors text-xs font-semibold"
            >
              {lang === "ar" ? "سجل الآن" : "Register Now"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
