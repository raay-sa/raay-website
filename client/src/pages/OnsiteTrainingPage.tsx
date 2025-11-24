// src/pages/OnsiteTrainingPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import raayVideo from "../assets/videos/raay-center-video.mp4";
import { buildSsoLoginUrl, getValidTokenForSSO } from "@/lib/api/sso";
import { useI18nStore } from "@/lib/i18n";
import HorizontalScroller from "@/components/ui/HorizontalScroller";
import { useCategories as useCategoriesQuery } from "@/features/categories/queries";
import { useOnsiteProgramsInfinite } from "@/features/programs/queries";
import { postRegisterProgramInterest, deleteRemoveProgramInterest } from "@/lib/api/auth";
import { HttpError } from "@/lib/api/http";
import type { Program } from "@/lib/api/types";

/* ---------- API Types ---------- */
type ApiProgram = {
  id: number;
  image: string | null;
  price: number | null;
  category_id: number | null;
  address: string | null;
  url: string | null;
  duration: string | null;
  program_duration: string | null;
  date_from: string | null;
  date_to: string | null;
  is_interested: boolean;
  category?: {
    id: number;
    translations: Array<{
      locale: string;
      title: string;
      parent_id: number;
      created_at: string;
      updated_at: string;
    }>;
  };
  teacher?: unknown;
  translations: Array<{
    locale: string;
    title: string;
    description: string;
    learning: string[];
    requirement: string[];
    parent_id: number;
    created_at: string;
    updated_at: string;
  }>;
};


/* ---------- Helpers ---------- */
function formatDate(d?: string | null) {
  if (!d) return "—";
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return d;
    return dt.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch {
    return d;
  }
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value))
    return value
      .filter((v) => typeof v === "string")
      .map((v) => v.trim())
      .filter(Boolean);
  if (typeof value === "string") {
    const raw = value.trim();
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((v) => typeof v === "string")
          .map((v) => v.trim())
          .filter(Boolean);
      }
    } catch {}
    return raw
      .split(/\r?\n|,|•|·|-/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

const getCategoryColor = (id?: number | null) => {
  return "border-indigo-500";
};


export default function OnsiteTrainingPage() {
  const { language } = useI18nStore();
  const dir: "rtl" | "ltr" = language === "ar" ? "rtl" : "ltr";
  const { toast } = useToast();

  const [token, setToken] = useState<string | null>(null);
  const [interestedPrograms, setInterestedPrograms] = useState<Set<number>>(new Set());
  const [loadingInterest, setLoadingInterest] = useState<Set<number>>(new Set());

  // Selected category id (null = All)
  const [selectedCat, setSelectedCat] = useState<number | null>(null);

  // Read auth token
  useEffect(() => {
    const readAuth = () => {
      try {
        const raw = localStorage.getItem("raay-auth");
        const parsed = raw ? JSON.parse(raw) : null;
        setToken(parsed?.token ?? null);
      } catch {
        setToken(null);
      }
    };
    readAuth();
    window.addEventListener("storage", readAuth);
    return () => window.removeEventListener("storage", readAuth);
  }, []);

  // Use the new authenticated API hook
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useOnsiteProgramsInfinite(selectedCat);

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

  // Fetch categories from API for the slider
  const {
    data: apiCategories,
    isLoading: catsLoading,
    isError: catsError,
  } = useCategoriesQuery();

  // (Optional) local memo (not required for correctness anymore)
  const filteredPrograms = useMemo(() => programs, [programs]);


  // If logged in → SSO to dashboard course page; else redirect to program details
  const handleRegisterClick = async (program: Program) => {
    const freshToken = await getValidTokenForSSO();
    if (freshToken) {
      const url = buildSsoLoginUrl(
        freshToken,
        `/student/courses/${program.id}`
      );
      window.location.href = url;
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

  // helper
  const joinList = (arr: string[]) =>
    (arr || []).join(language === "ar" ? "، " : ", ") || "—";

  return (
    <>
      <Helmet>
        <title>
          {language === "ar"
            ? "التدريب الحضوري | مركز راي للتدريب والاستشارات"
            : "Onsite Training | Ray Training & Consulting Center"}
        </title>
      </Helmet>

      {/* Hero */}
      <section className="relative py-24 text-white bg-[#2a2665]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-[#2a2665] opacity-80 z-10"></div>
        </div>
        <div className="absolute inset-0 -z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            src={raayVideo}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              {language === "ar" ? "التدريب الحضوري" : "Onsite Training"}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === "ar"
                ? "مسارات تدريبية متخصصة في مجالات تطوير القيادات والتحول الرقمي والأمن السيبراني والذكاء الاصطناعي وتجنب المخاطر"
                : "Specialized training tracks in leadership development, digital transformation, cybersecurity, artificial intelligence, and risk avoidance"}
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {language === "ar" ? "المسارات التدريبية" : "Training Tracks"}
            </h2>
            <p className="text-gray-700">
              {language === "ar"
                ? "يقدم مركز راي مسارات تدريبية حضورية مصممة لبناء وتطوير المهارات الاحترافية، يقدمها نخبة من المدربين المعتمدين."
                : "Raay Center offers in-person training programs designed to build professional skills, delivered by certified expert trainers."}
            </p>
          </div>

          {/* Enhanced categories slider (from API) */}
          <HorizontalScroller
            dir={dir}
            className="mb-8"
            ariaLabel={
              language === "ar" ? "تصنيفات البرامج" : "Program categories"
            }
          >
            <CategoryChip
              label={language === "ar" ? "كل البرامج" : "All Programs"}
              active={selectedCat == null}
              onClick={() => setSelectedCat(null)}
            />
            {!catsLoading &&
              !catsError &&
              (apiCategories ?? []).map((c) => (
                <CategoryChip
                  key={c.id}
                  label={c.title}
                  active={selectedCat === c.id}
                  onClick={() => setSelectedCat(c.id)}
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

          {/* Loading / Error */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-white shadow-sm animate-pulse"
                >
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
              ))}
            </div>
          )}
          {!isLoading && isError && (
            <div className="text-center py-8 text-red-600">
              {language === "ar"
                ? "تعذر تحميل البرامج."
                : "Failed to load programs."}
            </div>
          )}

          {/* Programs Grid */}
          {!isLoading && !isError && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPrograms.map((program) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card
                      className={`h-full border-t-4 bg-indigo-50 ${getCategoryColor(
                        program.category?.id
                      )} hover:shadow-lg transition-all`}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-[#2a2665]">
                              {program.title}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              <span className="inline-block bg-[#2a2665]/10 text-[#2a2665] px-2 py-1 rounded text-xs">
                                {program.category?.title || "—"}
                              </span>
  
                            </CardDescription>
                          </div>
                          <span className="font-bold text-[#b29567]">
                            {program.price != null
                              ? language === "ar"
                                ? `${program.price} ر.س`
                                : `${program.price} SAR`
                              : "—"}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {program.description}
                        </p>

                        <div className="space-y-3 text-sm">
                          {program.dateFrom && (
                            <div className="flex items-start">
                              <span className="text-[#2a2665] font-medium min-w-[120px]">
                                {language === "ar" ? "تاريخ البداية:" : "Start Date:"}
                              </span>
                              <span className="text-gray-700">
                                {formatDate(program.dateFrom)}
                              </span>
                            </div>
                          )}

                          {program.dateTo && (
                            <div className="flex items-start">
                              <span className="text-[#2a2665] font-medium min-w-[120px]">
                                {language === "ar" ? "تاريخ النهاية:" : "End Date:"}
                              </span>
                              <span className="text-gray-700">
                                {formatDate(program.dateTo)}
                              </span>
                            </div>
                          )}

                          <div className="flex items-start">
                            <span className="text-[#2a2665] font-medium min-w-[120px]">
                              {language === "ar"
                                ? "المتطلبات:"
                                : "Requirements:"}
                            </span>
                            <span className="text-gray-700 line-clamp-2">
                              {joinList(program.requirement || [])}
                            </span>
                          </div>

                          <div className="flex items-start">
                            <span className="text-[#2a2665] font-medium min-w-[120px]">
                              {language === "ar"
                                ? "مخرجات التعلم:"
                                : "Learning Outcomes:"}
                            </span>
                            <span className="text-gray-700">
                              {joinList(program.learning || [])}
                            </span>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className={`border-t pt-4 grid gap-2 ${token ? "grid-cols-3" : "grid-cols-2"}`}>
                        {token && (
                          <Button
                            className="bg-[#2a2665] hover:bg-[#1a1545] text-white"
                            onClick={() => handleRegisterClick(program)}
                          >
                            {language === "ar" ? "سجل الآن" : "Register Now"}
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          className="border-[#2a2665] text-[#2a2665] hover:bg-[#2a2665] hover:text-white"
                          onClick={() =>
                            (window.location.href = `/program/${program.id}`)
                          }
                        >
                          {language === "ar"
                            ? "تفاصيل البرنامج"
                            : "View Details"}
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
                ))}
              </div>

              {filteredPrograms.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    {language === "ar"
                      ? "لا توجد برامج متاحة"
                      : "No programs available"}
                  </h3>
                  <p className="text-gray-500 mb-8">
                    {language === "ar"
                      ? "لم يتم العثور على برامج في هذه الفئة. يرجى تصفح الفئات الأخرى أو التواصل معنا."
                      : "No programs found in this category. Please browse other categories or contact us."}
                  </p>
                  <Button
                    onClick={() => setSelectedCat(null)}
                    className="bg-[#2a2665] hover:bg-[#1a1545] text-white"
                  >
                    {language === "ar"
                      ? "عرض جميع البرامج"
                      : "View All Programs"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Custom Training Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#f8f5f0] rounded-lg shadow-lg p-8 border border-[#b29567]/30">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-[#2a2665] mb-4">
                    {language === "ar"
                      ? "برامج تدريبية مخصصة"
                      : "Customized Training Programs"}
                  </h2>
                  <p className="text-gray-700 mb-6">
                    {language === "ar"
                      ? "نقدم برامج تدريبية مخصصة تلبي احتياجات مؤسستك وتحدياتها الفريدة. يمكن تصميم هذه البرامج وتقديمها في مقر مؤسستك أو في أحد مراكزنا التدريبية."
                      : "We offer customized training programs that meet the needs and unique challenges of your organization. These programs can be designed and delivered at your organization's premises or at one of our training centers."}
                  </p>
                  <Button
                    className="bg-[#b29567] hover:bg-[#9a8057] text-white"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    {language === "ar"
                      ? "تواصل معنا للحصول على عرض"
                      : "Contact Us for a Quote"}
                  </Button>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-32 h-32 bg-[#2a2665]/10 rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 bg-[#2a2665] rounded-full flex items-center justify-center text-white text-5xl font-bold">
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

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
