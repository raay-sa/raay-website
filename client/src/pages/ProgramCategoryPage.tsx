// src/pages/ProgramCategoryPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useI18nStore } from "@/lib/i18n";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import raayVideo from "../assets/videos/raay-center-video.mp4";
import { useRoute } from "wouter";

/* ---------------- helpers ---------------- */
const t = (lang: string, ar: string, en: string) => (lang === "ar" ? ar : en);

type ApiCategory = { id: number; title: string };
type ApiProgram = {
  id: number;
  title: string;
  image?: string | null;
  description?: string | null;
  price?: number | null;
  level?: string | null; // may come Arabic already
  type?: string | null; // "live" | "registered" | "recorded" | ...
  date_from?: string | null; // "YYYY-MM-DD"
  date_to?: string | null; // "YYYY-MM-DD" | null
  time?: string | null; // "HH:mm:ss" | null
  duration?: string | null; // e.g. "0:09"
  program_duration?: string | null; // e.g. "0:09"
  category_id?: number;
  category?: ApiCategory | null;
};

const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE_URL ?? "https://backend.raay.sa/api";

const ASSET_BASE = API_BASE.replace(/\/api$/, "");

/** Map both AR/EN level text to a stable key for coloring */
function levelKey(level?: string | null) {
  if (!level) return "other";
  const l = level.toLowerCase();
  if (/(مبتد|begin)/.test(l)) return "beginner";
  if (/(متوسط|inter)/.test(l)) return "intermediate";
  if (/(متقدم|advance)/.test(l)) return "advanced";
  if (/(خبير|expert)/.test(l)) return "expert";
  return "other";
}

function levelBadgeClass(level?: string | null) {
  const k = levelKey(level);
  if (k === "beginner") return "bg-blue-100 text-blue-800";
  if (k === "intermediate") return "bg-yellow-100 text-yellow-800";
  if (k === "advanced") return "bg-green-100 text-green-800";
  if (k === "expert") return "bg-purple-100 text-purple-800";
  return "bg-gray-100 text-gray-800";
}

function typeBadgeText(type: string | null | undefined, lang: string) {
  if (!type) return t(lang, "غير محدد", "Unspecified");
  const v = type.toLowerCase();
  if (v === "live") return t(lang, "مباشر", "Live");
  if (v === "registered" || v === "recorded" || v === "self") {
    return t(lang, "مسجل", "Recorded");
  }
  return t(lang, "غير محدد", "Unspecified");
}

function typeBadgeClass(type?: string | null) {
  if ((type || "").toLowerCase() === "live") return "bg-red-100 text-red-800";
  if (
    (type || "").toLowerCase() === "registered" ||
    (type || "").toLowerCase() === "recorded"
  )
    return "bg-gray-100 text-gray-800";
  return "bg-slate-100 text-slate-800";
}

function fullImageUrl(img?: string | null) {
  if (!img) return "";
  if (/^https?:\/\//i.test(img)) return img;
  return `${ASSET_BASE}/${img.replace(/^\/+/, "")}`;
}

function fmtDate(d?: string | null, lang = "ar") {
  if (!d) return null;
  try {
    const [y, m, dd] = d.split("-").map(Number);
    if (!y || !m || !dd) return d;
    return lang === "ar"
      ? `${dd}-${String(m).padStart(2, "0")}-${y}`
      : `${String(m).padStart(2, "0")}/${dd}/${y}`;
  } catch {
    return d;
  }
}
function fmtTime(t?: string | null) {
  if (!t) return null;
  const [hh = "00", mm = "00"] = t.split(":");
  return `${hh}:${mm}`;
}

/* ---------------- page ---------------- */
export default function ProgramCategoryPage() {
  const { language } = useI18nStore();
  const [match, params] = useRoute("/programs/category/:category");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [programs, setPrograms] = useState<ApiProgram[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  const categoryId = match && params ? params.category : "";

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!categoryId) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_BASE}/public/programs/category/${categoryId}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data: ApiProgram[] = json?.data ?? [];
        if (!cancelled) {
          setPrograms(data);
          const name =
            data?.[0]?.category?.title ?? t(language, "الفئة", "Category");
          setCategoryName(name);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load programs");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [categoryId, language]);

  const pageTitle = useMemo(
    () =>
      language === "ar"
        ? `برامج ${categoryName || "الفئة"} | مركز راي للتدريب والاستشارات`
        : `${
            categoryName || "Category"
          } Programs | Ray Training & Consulting Center`,
    [categoryName, language]
  );

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      {/* Hero Section with Video Background */}
      <section className="relative py-24 text-white bg-[#2a2665]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-[#2a2665] opacity-80 z-10"></div>
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            src={raayVideo}
          ></video>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              {language === "ar"
                ? `برامج ${categoryName || "الفئة"}`
                : `${categoryName || "Category"} Programs`}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {t(
                language,
                `اكتشف برامجنا المتخصصة في مجال ${
                  categoryName || "هذه الفئة"
                } والتي تناسب مختلف المستويات والاحتياجات`,
                `Discover our specialized programs in ${
                  categoryName || "this category"
                } that suit different levels and needs`
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              {t(language, "جارِ تحميل البرامج...", "Loading programs...")}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              {t(
                language,
                "حدث خطأ أثناء جلب البيانات:",
                "Failed to fetch data:"
              )}{" "}
              {error}
            </div>
          ) : programs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program) => {
                const imgUrl = fullImageUrl(program.image || undefined);
                const isLive = (program.type || "").toLowerCase() === "live";
                const dateFrom = fmtDate(program.date_from, language);
                const dateTo = fmtDate(program.date_to, language);
                const time = fmtTime(program.time);

                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="h-full bg-indigo-50 hover:shadow-lg transition-all border-t-4 border-[#2a2665]">
                      <CardHeader>
                        <CardTitle className="text-[#2a2665] text-2xl">
                          {program.title}
                        </CardTitle>

                        {/* Level + Type + Meta */}
                        <CardDescription className="flex flex-wrap items-center gap-2 mt-1">
                          {/* Level pill */}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${levelBadgeClass(
                              program.level
                            )}`}
                          >
                            {t(language, "المستوى", "Level")}:{" "}
                            {program.level ||
                              t(language, "غير محدد", "Unspecified")}
                          </span>

                          {/* Type pill */}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${typeBadgeClass(
                              program.type
                            )}`}
                          >
                            {t(language, "النوع", "Type")}:{" "}
                            {typeBadgeText(program.type, language)}
                          </span>

                          {/* Registered duration OR live dates/time */}
                          {isLive ? (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {t(language, "من", "From")}: {dateFrom || "-"}
                              {dateTo
                                ? ` • ${t(language, "إلى", "To")}: ${dateTo}`
                                : ""}
                              {time && program.duration !== null
                                ? ` • ${t(language, "الوقت", "Time")}: ${time}`
                                : ""}
                            </span>
                          ) : (
                            program.duration && (
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                                {t(language, "المدة", "Duration")}:{" "}
                                {program.duration}
                              </span>
                            )
                          )}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        {imgUrl && (
                          <div className="mb-4">
                            <img
                              src={imgUrl}
                              alt={program.title}
                              className="w-full h-40 object-cover rounded-lg border"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <p className="text-gray-700 mb-4">
                          {program.description}
                        </p>

                        <div className="flex items-center justify-between mt-4">
                          <span className="text-[#2a2665] font-semibold">
                            {typeof program.price === "number"
                              ? language === "ar"
                                ? `السعر: ${program.price} ر.س`
                                : `Price: ${program.price} SAR`
                              : t(language, "السعر: غير محدد", "Price: N/A")}
                          </span>
                        </div>
                      </CardContent>

                      <CardFooter className="border-t pt-4">
                        {/* Old behavior: simple CTA (no course-details page) */}
                        <Button
                          className="w-full bg-[#2a2665] hover:bg-[#1a1545] text-white"
                          onClick={() => (window.location.href = `/contact`)}
                        >
                          {t(language, "تفاصيل البرنامج", "Program Details")}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                {t(language, "لا توجد برامج متاحة", "No programs available")}
              </h3>
              <p className="text-gray-500 mb-8">
                {t(
                  language,
                  "لم يتم العثور على برامج في هذه الفئة. يرجى تصفح الفئات الأخرى أو التواصل معنا.",
                  "No programs found in this category. Please browse other categories or contact us."
                )}
              </p>
              <Button
                onClick={() => (window.location.href = "/programs")}
                className="bg-[#2a2665] hover:bg-[#1a1545] text-white"
              >
                {t(language, "عرض جميع البرامج", "View All Programs")}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Registration CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-[#2a2665] mb-6">
              {t(
                language,
                "استفسر عن البرامج المتاحة",
                "Inquire About Available Programs"
              )}
            </h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              {t(
                language,
                "للاستفسار عن البرامج التدريبية المتاحة أو للتسجيل فيها، يرجى التواصل معنا عبر النموذج أدناه أو الاتصال بنا مباشرة.",
                "For inquiries about available training programs or to register, please contact us through the form below or call us directly."
              )}
            </p>
            <Button
              onClick={() => (window.location.href = "/contact")}
              className="bg-[#2a2665] hover:bg-[#1a1545] text-white py-3 px-10 text-lg"
            >
              {t(language, "تواصل معنا الآن", "Contact Us Now")}
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
