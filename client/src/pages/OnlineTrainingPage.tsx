// src/pages/OnlineTrainingPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useCategories as useCategoriesQuery,
  useOnlineProgramsInfinite,
} from "@/features/programs/queries";
import type { Program } from "@/lib/api/types";

import HorizontalScroller from "@/components/ui/HorizontalScroller";
import raayVideo from "../assets/videos/raay-center-video.mp4";
import { buildSsoLoginUrl, getValidTokenForSSO } from "@/lib/api/sso";

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

// -------- registration form schema --------
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "الاسم يجب أن يحتوي على حرفين على الأقل" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  phone: z
    .string()
    .min(10, { message: "رقم الهاتف يجب أن يحتوي على 10 أرقام على الأقل" }),
  organization: z
    .string()
    .min(2, { message: "اسم المنظمة يجب أن يحتوي على حرفين على الأقل" }),
  position: z
    .string()
    .min(2, { message: "المسمى الوظيفي يجب أن يحتوي على حرفين على الأقل" }),
  programId: z.number(),
  message: z.string().optional(),
  attendees: z.string().min(1, { message: "يرجى تحديد عدد المتدربين" }),
});

export default function OnlineTrainingPage() {
  const { language } = useI18nStore();
  const dir: "rtl" | "ltr" = language === "ar" ? "rtl" : "ltr";
  const { toast } = useToast();

  // NEW: auth state (read from marketing-site storage)
  const [isAuthed, setIsAuthed] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

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

  // registration dialog
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      position: "",
      programId: 0,
      message: "",
      attendees: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const API_BASE =
        (import.meta as any)?.env?.VITE_API_BASE_URL ??
        "https://backend.raay.sa/api";

      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        company: values.organization,
        job_title: values.position,
        trainers_count: Number.isNaN(parseInt(values.attendees, 10))
          ? undefined
          : parseInt(values.attendees, 10),
        notes: values.message || "",
      };

      const res = await fetch(`${API_BASE}/public/company_request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || `HTTP ${res.status}`);
      }

      toast({
        title:
          language === "ar"
            ? "تم إرسال طلب التسجيل بنجاح"
            : "Registration request sent successfully",
        description:
          language === "ar"
            ? "سيتم التواصل معك قريباً لتأكيد التسجيل وتفاصيل الدفع"
            : "We will contact you soon to confirm registration and payment details",
        variant: "default",
      });

      setRegistrationOpen(false);
      form.reset();
    } catch (e: any) {
      toast({
        title: language === "ar" ? "حدث خطأ" : "Error",
        description:
          (e?.message as string) ||
          (language === "ar" ? "تعذر إرسال الطلب" : "Failed to submit request"),
        variant: "destructive",
      });
    }
  };

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
    setSelectedProgram(program);
    form.setValue("programId", program.id);
    setRegistrationOpen(true);
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

                        <CardFooter className="border-t pt-4 grid grid-cols-2 gap-2">
                          <Button
                            className="bg-[#2a2665] hover:bg-[#1a1545] text-white"
                            onClick={() => handleRegisterClick(program)}
                          >
                            {t(language, "سجل الآن", "Register Now")}
                          </Button>
                          <Button
                            variant="outline"
                            className="border-[#2a2665] text-[#2a2665] hover:bg-[#2a2665] hover:text-white"
                            onClick={() =>
                              (window.location.href = `/program/${program.id}`)
                            }
                          >
                            {t(language, "تفاصيل البرنامج", "View Details")}
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

      {/* Registration Dialog */}
      <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
        <DialogContent className="max-w-4xl w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#2a2665]">
              {selectedProgram
                ? t(
                    language,
                    `التسجيل في برنامج: ${selectedProgram.title}`,
                    `Register for: ${selectedProgram.title}`
                  )
                : t(language, "التسجيل في البرنامج", "Program Registration")}
            </DialogTitle>
            <DialogDescription>
              {t(
                language,
                "يرجى تعبئة النموذج التالي للتسجيل. سنتواصل معك لتأكيد التسجيل وتفاصيل الدفع.",
                "Fill the form to register. We’ll contact you to confirm and share payment details."
              )}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t(language, "الاسم الكامل", "Full Name")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            language,
                            "أدخل الاسم الكامل",
                            "Enter full name"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t(language, "البريد الإلكتروني", "Email")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            language,
                            "أدخل البريد الإلكتروني",
                            "Enter email"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t(language, "رقم الهاتف", "Phone Number")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            language,
                            "أدخل رقم الهاتف",
                            "Enter phone number"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t(language, "المنظمة/الشركة", "Organization/Company")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            language,
                            "أدخل اسم المنظمة",
                            "Enter organization name"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t(language, "المسمى الوظيفي", "Job Title")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            language,
                            "أدخل المسمى الوظيفي",
                            "Enter job title"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="attendees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t(language, "عدد المتدربين", "Number of Attendees")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            language,
                            "أدخل عدد المتدربين",
                            "Enter number of attendees"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t(language, "ملاحظات إضافية", "Additional Notes")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t(
                          language,
                          "أدخل أي ملاحظات إضافية",
                          "Enter any additional notes"
                        )}
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setRegistrationOpen(false)}
                  className="border-[#2a2665] text-[#2a2665]"
                >
                  {t(language, "إلغاء", "Cancel")}
                </Button>
                <Button
                  type="submit"
                  className="bg-[#2a2665] hover:bg-[#1a1545] text-white"
                >
                  {t(
                    language,
                    "إرسال طلب التسجيل",
                    "Submit Registration Request"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
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
