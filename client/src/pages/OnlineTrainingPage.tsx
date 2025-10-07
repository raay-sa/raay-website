// src/pages/OnlineTrainingPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useI18nStore } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  useCategories as useCategoriesQuery,
  useOnlineProgramsInfinite,
} from "@/features/programs/queries";
import type { Program } from "@/lib/api/types";

import HorizontalScroller from "@/components/ui/HorizontalScroller";
import raayVideo from "../assets/videos/raay-center-video.mp4";
import { buildSsoLoginUrl, getValidTokenForSSO } from "@/lib/api/sso";
import { postRegisterProgramInterest, deleteRemoveProgramInterest } from "@/lib/api/auth";
import { HttpError } from "@/lib/api/http";

// -------- helpers --------
const t = (lang: string, ar: string, en: string) => (lang === "ar" ? ar : en);

function formatDate(d?: string | null) {
  if (!d) return "—";
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return d;
    return dt.toLocaleDateString();
  } catch {
    return d;
  }
}

function formatTime(time?: string | null) {
  if (!time) return "—";
  try {
    const [h, m] = time.split(":");
    const dt = new Date();
    dt.setHours(Number(h), Number(m), 0, 0);
    return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return time;
  }
}

function formatDurationHours(lang: string, hours?: number | null) {
  if (hours == null) return lang === "ar" ? "غير محدد" : "N/A";
  if (lang === "ar") return `${hours} ساعة`;
  return `${hours} hrs`;
}

// deterministic tailwind color set
const BORDER_BG_CLASSES = [
  { border: "border-blue-500", bg: "bg-blue-50" },
  { border: "border-purple-500", bg: "bg-purple-50" },
  { border: "border-green-500", bg: "bg-green-50" },
  { border: "border-orange-500", bg: "bg-orange-50" },
  { border: "border-red-500", bg: "bg-red-50" },
  { border: "border-amber-500", bg: "bg-amber-50" },
  { border: "border-emerald-500", bg: "bg-emerald-50" },
  { border: "border-sky-500", bg: "bg-sky-50" },
  { border: "border-rose-500", bg: "bg-rose-50" },
  { border: "border-teal-500", bg: "bg-teal-50" },
  { border: "border-indigo-500", bg: "bg-indigo-50" },
];
function getColorByCategoryId(id?: number) {
  if (!id || id < 0) return BORDER_BG_CLASSES[0];
  return BORDER_BG_CLASSES[id % BORDER_BG_CLASSES.length];
}


export default function OnlineTrainingPage() {
  const { language } = useI18nStore();
  const dir: "rtl" | "ltr" = language === "ar" ? "rtl" : "ltr";
  const { toast } = useToast();

  // NEW: auth state (read from marketing-site storage)
  const [isAuthed, setIsAuthed] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  
  // Interest state
  const [interestedPrograms, setInterestedPrograms] = useState<Set<number>>(new Set());
  const [loadingInterest, setLoadingInterest] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem("raay-auth");
      const parsed = raw ? JSON.parse(raw) : null;
      const tkn = parsed?.token ?? null;
      const user = parsed?.user ?? null;
      const r =
        (
          user?.role ??
          user?.user_type ??
          user?.type ??
          user?.account_type ??
          ""
        )
          ?.toString?.()
          .toLowerCase?.() ?? null;

      setIsAuthed(Boolean(tkn));
      setToken(tkn);
      setRole(r);
    } catch {
      setIsAuthed(false);
      setToken(null);
      setRole(null);
    }
  }, []);

  // category filter: null => all
  const [selectedCat, setSelectedCat] = useState<number | null>(null);

  // data: categories strip (from API)
  const {
    data: categories,
    isLoading: catsLoading,
    isError: catsError,
  } = useCategoriesQuery();

  // data: online programs (infinite; filters by selectedCat)
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useOnlineProgramsInfinite(selectedCat);

  const programs: Program[] = useMemo(
    () => (data?.pages ?? []).flatMap((p) => p.items),
    [data]
  );

  // Initialize interested programs from API data
  useEffect(() => {
    const interestedIds = new Set<number>();
    programs.forEach(program => {
      if (program.isInterested) {
        interestedIds.add(program.id);
      }
    });
    setInterestedPrograms(interestedIds);
  }, [programs]);

  // infinite scroll sentinel
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "240px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, selectedCat]);



  // SSO redirect builder
  const SSO_BASE =
    (import.meta as any)?.env?.VITE_SSO_BASE_URL ?? "https://sso.raay.sa";
  const goToDashboardCourse = async (courseId: number) => {
    const redirectPath = `/student/courses/${courseId}`;
    const freshToken = await getValidTokenForSSO();
    if (freshToken) {
      window.location.href = buildSsoLoginUrl(freshToken, redirectPath);
    } else {
      window.location.href = `${SSO_BASE}/login?redirect=${encodeURIComponent(
        redirectPath
      )}`;
    }
  };

  const handleRegisterClick = async (program: Program) => {
    const isStudent = role === "student" || role === "trainee";
    if (isAuthed && isStudent) {
      await goToDashboardCourse(program.id); 
      return;
    }
    // Redirect to program details page for group registration
    window.location.href = `/program/${program.id}`;
  };

  // Handle program interest registration/removal
  const handleInterestClick = async (program: Program) => {
    // Get token directly from localStorage without auto-refresh
    let currentToken: string | null = null;
    try {
      const raw = localStorage.getItem("raay-auth");
      const parsed = raw ? JSON.parse(raw) : null;
      currentToken = parsed?.token ?? null;
    } catch {}

    if (!currentToken) {
      toast({
        title: language === "ar" ? "الرجاء تسجيل الدخول" : "Please log in",
        description: language === "ar" 
          ? "يجب تسجيل الدخول لتسجيل اهتمامك بالبرنامج"
          : "You need to log in to register interest in this program",
        variant: "destructive",
      });
      window.location.href = "/auth";
      return;
    }

    const isInterested = interestedPrograms.has(program.id);
    setLoadingInterest(prev => new Set(prev).add(program.id));

    try {
      if (isInterested) {
        await deleteRemoveProgramInterest(program.id, currentToken);
        setInterestedPrograms(prev => {
          const newSet = new Set(prev);
          newSet.delete(program.id);
          return newSet;
        });
        toast({
          title: language === "ar" ? "تم إلغاء الاهتمام" : "Interest Removed",
          description: language === "ar" 
            ? "تم إلغاء تسجيل اهتمامك بالبرنامج"
            : "Your interest in this program has been removed",
        });
      } else {
        await postRegisterProgramInterest(program.id, currentToken);
        setInterestedPrograms(prev => new Set(prev).add(program.id));
        toast({
          title: language === "ar" ? "تم تسجيل الاهتمام" : "Interest Registered",
          description: language === "ar" 
            ? "تم تسجيل اهتمامك بالبرنامج بنجاح"
            : "Your interest in this program has been registered successfully",
        });
      }
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.status === 403) {
          toast({
            title: language === "ar" ? "خطأ في الصلاحيات" : "Access Denied",
            description: language === "ar" 
              ? "يجب أن تكون طالباً لتسجيل الاهتمام"
              : "You must be a student to register interest",
            variant: "destructive",
          });
        } else {
          toast({
            title: language === "ar" ? "حدث خطأ" : "Error",
            description: error.data?.message || (language === "ar" ? "تعذر تسجيل الاهتمام" : "Failed to register interest"),
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: language === "ar" ? "حدث خطأ" : "Error",
          description: language === "ar" ? "تعذر تسجيل الاهتمام" : "Failed to register interest",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingInterest(prev => {
        const newSet = new Set(prev);
        newSet.delete(program.id);
        return newSet;
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {t(
            language,
            "التدريب عن بعد | مركز راي للتدريب والاستشارات",
            "Online Training | Ray Training & Consulting Center"
          )}
        </title>
      </Helmet>

      {/* Hero */}
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
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              {t(language, "التدريب عن بعد", "Online Training")}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {t(
                language,
                "مسارات تدريبية متخصصة في مجالات تطوير القيادات والتحول الرقمي والأمن السيبراني والذكاء الاصطناعي وتجنب المخاطر",
                "Specialized training tracks in leadership development, digital transformation, cybersecurity, artificial intelligence, and risk avoidance"
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {t(language, "المسارات التدريبية", "Training Tracks")}
            </h2>
            <p className="text-gray-700">
              {t(
                language,
                "يقدم مركز راي برامج تدريبية عن بعد مصممة لبناء وتطوير المهارات الاحترافية، يقدمها نخبة من المدربين المعتمدين.",
                "Raay Center offers online training programs designed to build professional skills, delivered by certified expert trainers."
              )}
            </p>
          </div>

          {/* Enhanced categories slider (API) */}
          <HorizontalScroller
            dir={dir}
            className="mb-8"
            ariaLabel={
              language === "ar" ? "تصنيفات البرامج" : "Program categories"
            }
          >
            <CategoryChip
              active={selectedCat === null}
              onClick={() => setSelectedCat(null)}
              label={t(language, "الكل", "All")}
            />
            {!catsLoading &&
              !catsError &&
              (categories ?? []).map((c) => (
                <CategoryChip
                  key={c.id}
                  active={selectedCat === c.id}
                  onClick={() => setSelectedCat(c.id)}
                  label={c.title}
                />
              ))}
            {catsLoading && (
              <span className="text-sm text-gray-500 px-2">
                {language === "ar"
                  ? "جاري تحميل الفئات..."
                  : "Loading categories..."}
              </span>
            )}
            {catsError && (
              <span className="text-sm text-red-600 px-2">
                {language === "ar"
                  ? "تعذر تحميل الفئات"
                  : "Failed to load categories"}
              </span>
            )}
          </HorizontalScroller>

          {/* States */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center">
              <p className="text-red-600">
                {t(
                  language,
                  "حدث خطأ أثناء تحميل البرامج.",
                  "An error occurred while loading programs."
                )}
              </p>
              <p className="text-gray-500 mt-1">
                {(error as Error)?.message ?? ""}
              </p>
              <Button onClick={() => refetch()} className="mt-4">
                {t(language, "إعادة المحاولة", "Retry")}
              </Button>
            </div>
          )}

          {/* Grid */}
          {!isLoading && !isError && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.map((program) => {
                  const color = getColorByCategoryId(program.category?.id);
                  return (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card
                        className={`h-full border-t-4 ${color.border} ${color.bg} hover:shadow-lg transition-all`}
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-[#2a2665]">
                                {program.title}
                              </CardTitle>
                              <CardDescription className="mt-2">
                                <span className="inline-block bg-[#2a2665]/10 text-[#2a2665] px-2 py-1 rounded text-xs">
                                  {program.category?.title ??
                                    t(language, "عام", "General")}
                                </span>
                                <span className="mx-2">•</span>
                              </CardDescription>
                            </div>
                            <span className="font-bold text-[#b29567]">
                              {language === "ar"
                                ? `${program.price} ر.س`
                                : `${program.price} SAR`}
                            </span>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <p className="text-gray-700 mb-4 line-clamp-3">
                            {program.description}
                          </p>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-start">
                              <span className="text-[#2a2665] font-medium min-w-[120px]">
                                {t(language, "تاريخ البداية:", "Starts:")}
                              </span>
                              <span className="text-gray-700">
                                {formatDate(program.dateFrom)}
                              </span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-[#2a2665] font-medium min-w-[120px]">
                                {t(language, "تاريخ النهاية:", "Ends:")}
                              </span>
                              <span className="text-gray-700">
                                {formatDate(program.dateTo)}
                              </span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-[#2a2665] font-medium min-w-[120px]">
                                {t(language, "الوقت:", "Time:")}
                              </span>
                              <span className="text-gray-700">
                                {formatTime(program.time ?? null)}
                              </span>
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter className={`border-t pt-4 grid gap-2 ${isAuthed ? "grid-cols-3" : "grid-cols-2"}`}>
                          {isAuthed && (
                            <Button
                              className="bg-[#2a2665] hover:bg-[#1a1545] text-white"
                              onClick={() => handleRegisterClick(program)}
                            >
                              {t(language, "سجل الآن", "Register Now")}
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            className="border-[#2a2665] text-[#2a2665] hover:bg-[#2a2665] hover:text-white"
                            onClick={() =>
                              (window.location.href = `/program/${program.id}`)
                            }
                          >
                            {t(language, "تفاصيل البرنامج", "View Details")}
                          </Button>
                          <Button
                            variant="outline"
                            className={`border-[#b29567] text-[#b29567] hover:bg-[#b29567] hover:text-white ${
                              interestedPrograms.has(program.id) ? "bg-[#b29567] text-white" : ""
                            }`}
                            onClick={() => handleInterestClick(program)}
                            disabled={loadingInterest.has(program.id)}
                          >
                            {loadingInterest.has(program.id) 
                              ? (language === "ar" ? "جاري..." : "Loading...")
                              : interestedPrograms.has(program.id)
                              ? (language === "ar" ? "إلغاء الاهتمام" : "Remove Interest")
                              : (language === "ar" ? "سجل اهتمامك" : "Register Interest")
                            }
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Load-more sentinel */}
              <div
                ref={loadMoreRef}
                className="h-12 w-full mt-8 flex items-center justify-center"
              >
                {hasNextPage ? (
                  <span className="text-sm text-gray-500">
                    {t(
                      language,
                      "تحميل المزيد عند التمرير…",
                      "Scroll to load more…"
                    )}
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">
                    {t(
                      language,
                      "تم عرض جميع النتائج.",
                      "You’ve reached the end."
                    )}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Benefits (unchanged) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {t(
                language,
                "مزايا التدريب عن بعد",
                "Benefits of Online Training"
              )}
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              {t(
                language,
                "يوفر التدريب عن بعد مرونة في التعلم وتوفيرًا في الوقت والتكلفة مع الحفاظ على نفس جودة وكفاءة البرامج التدريبية.",
                "Online training provides flexibility and saves time and cost while keeping program quality high."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="w-12 h-12 bg-[#2a2665]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#2a2665] text-xl font-bold">{n}</span>
                </div>
                <h3 className="text-xl font-bold text-[#2a2665] mb-2">
                  {n === 1
                    ? t(
                        language,
                        "مرونة في الوقت والمكان",
                        "Flexibility in Time and Location"
                      )
                    : n === 2
                    ? t(language, "توفير التكلفة", "Cost Savings")
                    : t(
                        language,
                        "إمكانية الوصول للمحتوى",
                        "Content Accessibility"
                      )}
                </h3>
                <p className="text-gray-700">
                  {n === 1
                    ? t(
                        language,
                        "المشاركة من أي مكان وفي الوقت المناسب دون الحاجة للتنقل.",
                        "Join from anywhere at convenient times—no commute."
                      )
                    : n === 2
                    ? t(
                        language,
                        "تكلفة أقل مقارنة بالحضوري مع توفير مصاريف السفر والإقامة.",
                        "Lower cost vs. in-person; save travel and lodging."
                      )
                    : t(
                        language,
                        "الوصول للمحتوى وإعادة مشاهدة المواد المسجلة في أي وقت.",
                        "Access content and rewatch recorded materials anytime."
                      )}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

// ---------- small components ----------
function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "snap-start inline-flex px-4 py-2 rounded-full border text-sm transition-colors shrink-0",
        active
          ? "bg-[#2a2665] text-white border-[#2a2665]"
          : "bg-white text-[#2a2665] border-[#2a2665]/30 hover:border-[#2a2665]",
      ].join(" ")}
      role="option"
      aria-selected={!!active}
    >
      {label}
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-lg border bg-white shadow-sm animate-pulse">
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
      <div className="p-6 pt-0 grid grid-cols-2 gap-2">
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
