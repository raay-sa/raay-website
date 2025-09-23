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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
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
import raayVideo from "../assets/videos/raay-center-video.mp4";
import { buildSsoLoginUrl, getValidTokenForSSO } from "@/lib/api/sso";
import { useI18nStore } from "@/lib/i18n";
import HorizontalScroller from "@/components/ui/HorizontalScroller";
import { useCategories as useCategoriesQuery } from "@/features/categories/queries";

/* ---------- API Types ---------- */
type ApiProgram = {
  id: number;
  title: string;
  image: string | null;
  description: string | null;
  price: number | null;
  category_id: number | null;
  program_duration: string | null;
  requirement?: unknown;
  learning?: unknown;
  category?: { id: number; title: string };
  teacher?: unknown;
};

type UiProgram = {
  id: number;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  categoryId: number | null;
  categoryTitle: string;
  duration: string;
  price: number | null;
  requirement: string[];
  learning: string[];
  image: string | null;
};

/* ---------- Helpers ---------- */
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
  const palette = [
    "border-blue-500 bg-blue-50",
    "border-purple-500 bg-purple-50",
    "border-green-500 bg-green-50",
    "border-orange-500 bg-orange-50",
    "border-red-500 bg-red-50",
    "border-amber-500 bg-amber-50",
    "border-emerald-500 bg-emerald-50",
    "border-sky-500 bg-sky-50",
    "border-rose-500 bg-rose-50",
    "border-teal-500 bg-teal-50",
    "border-indigo-500 bg-indigo-50",
  ];
  if (id == null || id < 0) return palette[0];
  return palette[id % palette.length];
};

/* ---------- Form schema ---------- */
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
  location: z.string().min(1, { message: "يرجى اختيار موقع التدريب" }),
  attendees: z.string().min(1, { message: "يرجى تحديد عدد المتدربين" }),
});

export default function OnsiteTrainingPage() {
  const { language } = useI18nStore();
  const dir: "rtl" | "ltr" = language === "ar" ? "rtl" : "ltr";
  const { toast } = useToast();

  const [token, setToken] = useState<string | null>(null);
  const [programs, setPrograms] = useState<UiProgram[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadErr, setLoadErr] = useState<string | null>(null);

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

  /**
   * Fetch REGISTERED programs from server.
   * IMPORTANT: we call the API again whenever selectedCat changes,
   * passing ?category_id=<id> when a category is selected.
   * This fixes the previous behavior where we only filtered client-side.
   */
  useEffect(() => {
    let cancelled = false;

    async function load(categoryId: number | null) {
      setLoading(true);
      setLoadErr(null);
      try {
        const API_BASE =
          (import.meta as any)?.env?.VITE_API_BASE_URL ??
          "https://backend.raay.sa/api";

        const url = new URL(
          `${API_BASE.replace(/\/$/, "")}/public/registered_programs`
        );
        // first page is enough for this page (no infinite scrolling here)
        url.searchParams.set("page", "1");
        if (categoryId != null)
          url.searchParams.set("category_id", String(categoryId));

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const items: ApiProgram[] = json?.data?.data ?? [];

        const uiPrograms: UiProgram[] = items.map((p) => {
          // Get translation for current language
          const translation = p.translations?.find(t => t.locale === language) || p.translations?.[0];
          const categoryTranslation = p.category?.translations?.find(t => t.locale === language) || p.category?.translations?.[0];
          
          return {
            id: p.id,
            name: { ar: translation?.title ?? "", en: translation?.title ?? "" },
            description: { ar: translation?.description ?? "", en: translation?.description ?? "" },
            categoryId: p.category?.id ?? p.category_id ?? null,
            categoryTitle: categoryTranslation?.title ?? "—",
            duration: p.program_duration || "",
            price: p.price ?? null,
            requirement: toStringArray(translation?.requirement),
            learning: toStringArray(translation?.learning),
            image: p.image ?? null,
          };
        });

        if (!cancelled) {
          setPrograms(uiPrograms);
          setLoading(false);
        }
      } catch (e: any) {
        if (!cancelled) {
          setLoadErr(e?.message || "Failed to load");
          setLoading(false);
        }
      }
    }

    load(selectedCat);
    return () => {
      cancelled = true;
    };
  }, [selectedCat, language]);

  // Fetch categories from API for the slider
  const {
    data: apiCategories,
    isLoading: catsLoading,
    isError: catsError,
  } = useCategoriesQuery();

  // (Optional) local memo (not required for correctness anymore)
  const filteredPrograms = useMemo(() => programs, [programs]);

  // Registration form
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<UiProgram | null>(
    null
  );

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
      location: "",
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
        notes:
          (language === "ar"
            ? "موقع التدريب المفضل: "
            : "Preferred location: ") +
          (values.location || (language === "ar" ? "غير محدد" : "N/A")) +
          (values.message ? `\n${values.message}` : ""),
        program: values.location || null,
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

  // If logged in → SSO to dashboard course page; else open form
  const handleRegisterClick = async (program: UiProgram) => {
    const freshToken = await getValidTokenForSSO();
    if (freshToken) {
      const url = buildSsoLoginUrl(
        freshToken,
        `/student/courses/${program.id}`
      );
      window.location.href = url;
      return;
    }
    setSelectedProgram(program);
    form.setValue("programId", program.id);
    setRegistrationOpen(true);
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
          {loading && (
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
          {!loading && loadErr && (
            <div className="text-center py-8 text-red-600">
              {language === "ar"
                ? "تعذر تحميل البرامج."
                : "Failed to load programs."}
            </div>
          )}

          {/* Programs Grid */}
          {!loading && !loadErr && (
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
                      className={`h-full border-t-4 ${getCategoryColor(
                        program.categoryId
                      )} hover:shadow-lg transition-all`}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-[#2a2665]">
                              {language === "ar"
                                ? program.name.ar
                                : program.name.en}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              <span className="inline-block bg-[#2a2665]/10 text-[#2a2665] px-2 py-1 rounded text-xs">
                                {program.categoryTitle}
                              </span>
                              <span className="mx-2">•</span>
                              <span>
                                {language === "ar"
                                  ? `المدة: ${program.duration || "—"}`
                                  : `Duration: ${program.duration || "—"}`}
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
                          {language === "ar"
                            ? program.description.ar
                            : program.description.en}
                        </p>

                        <div className="space-y-3 text-sm">
                          <div className="flex items-start">
                            <span className="text-[#2a2665] font-medium min-w-[120px]">
                              {language === "ar"
                                ? "المتطلبات:"
                                : "Requirements:"}
                            </span>
                            <span className="text-gray-700 line-clamp-2">
                              {joinList(program.requirement)}
                            </span>
                          </div>

                          <div className="flex items-start">
                            <span className="text-[#2a2665] font-medium min-w-[120px]">
                              {language === "ar"
                                ? "مخرجات التعلم:"
                                : "Learning Outcomes:"}
                            </span>
                            <span className="text-gray-700">
                              {joinList(program.learning)}
                            </span>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="border-t pt-4 grid grid-cols-2 gap-2">
                        <Button
                          className="bg-[#2a2665] hover:bg-[#1a1545] text-white"
                          onClick={() => handleRegisterClick(program)}
                        >
                          {language === "ar" ? "سجل الآن" : "Register Now"}
                        </Button>
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

      {/* Registration Dialog */}
      <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
        <DialogContent className="max-w-4xl w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#2a2665]">
              {language === "ar"
                ? `التسجيل في برنامج: ${selectedProgram?.name?.ar ?? ""}`
                : `Register for: ${selectedProgram?.name?.en ?? ""}`}
            </DialogTitle>
            <DialogDescription>
              {language === "ar"
                ? "يرجى تعبئة النموذج التالي للتسجيل في البرنامج. سيتم التواصل معك قريباً لتأكيد التسجيل وتفاصيل الدفع."
                : "Please fill out the following form to register for the program. We will contact you soon to confirm registration and payment details."}
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
                        {language === "ar" ? "الاسم الكامل" : "Full Name"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            language === "ar"
                              ? "أدخل الاسم الكامل"
                              : "Enter full name"
                          }
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
                        {language === "ar" ? "البريد الإلكتروني" : "Email"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            language === "ar"
                              ? "أدخل البريد الإلكتروني"
                              : "Enter email"
                          }
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
                        {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            language === "ar"
                              ? "أدخل رقم الهاتف"
                              : "Enter phone number"
                          }
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
                        {language === "ar"
                          ? "المنظمة/الشركة"
                          : "Organization/Company"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            language === "ar"
                              ? "أدخل اسم المنظمة"
                              : "Enter organization name"
                          }
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
                        {language === "ar" ? "المسمى الوظيفي" : "Job Title"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            language === "ar"
                              ? "أدخل المسمى الوظيفي"
                              : "Enter job title"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === "ar"
                          ? "موقع التدريب المفضل"
                          : "Preferred Training Location"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            language === "ar"
                              ? `اختر من: ${
                                  selectedProgram?.categoryTitle ?? "—"
                                }`
                              : `Choose from: ${
                                  selectedProgram?.categoryTitle ?? "—"
                                }`
                          }
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
                name="attendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "ar"
                        ? "عدد المتدربين"
                        : "Number of Attendees"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          language === "ar"
                            ? "أدخل عدد المتدربين"
                            : "Enter number of attendees"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "ar"
                        ? "ملاحظات إضافية"
                        : "Additional Notes"}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={
                          language === "ar"
                            ? "أدخل أي ملاحظات إضافية"
                            : "Enter any additional notes"
                        }
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
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </Button>
                <Button
                  type="submit"
                  className="bg-[#2a2665] hover:bg-[#1a1545] text-white"
                >
                  {language === "ar"
                    ? "إرسال طلب التسجيل"
                    : "Submit Registration Request"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
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
