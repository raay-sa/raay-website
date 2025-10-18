import React, { useEffect, useMemo, useState } from "react";
import { useI18nStore } from "@/lib/i18n";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import raayVideo from "../assets/videos/raay-center-video.mp4";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { useProgram, useProgramsByCategory } from "@/features/programs/queries";
import ProgramCard from "@/components/ui/program-card";
import type { Program } from "@/lib/api/types";
import { buildSsoLoginUrl } from "@/lib/api/sso";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

// ---- helpers ----
const getLevelName = (level: string | undefined, language: string) => {
  if (!level) return language === "ar" ? "غير محدد" : "N/A";
  if (["مبتدئ", "متوسط", "متقدم"].includes(level)) return level;
  const normalized = level.toLowerCase();
  switch (normalized) {
    case "beginner":
      return language === "ar" ? "مبتدئ" : "Beginner";
    case "intermediate":
      return language === "ar" ? "متوسط" : "Intermediate";
    case "advanced":
      return language === "ar" ? "متقدم" : "Advanced";
    default:
      return level;
  }
};

const buildDurationLabel = (p: Program, language: string): string => {
  if (p.durationHours != null) {
    return language === "ar"
      ? `${p.durationHours} ساعة`
      : `${p.durationHours}h`;
  }
  return language === "ar" ? "غير محدد" : "N/A";
};

const buildWhenLabel = (p: Program, language: string): string => {
  const parts: string[] = [];
  if (p.dateFrom && p.dateTo && p.dateFrom !== p.dateTo) {
    parts.push(
      language === "ar"
        ? `من ${p.dateFrom} إلى ${p.dateTo}`
        : `From ${p.dateFrom} to ${p.dateTo}`
    );
  } else if (p.dateFrom) {
    parts.push(p.dateFrom);
  } else if (p.dateTo) {
    parts.push(p.dateTo);
  }
  if (p.time) parts.push(p.time);
  if (parts.length === 0)
    return language === "ar" ? "موعد يحدد لاحقاً" : "Schedule TBA";
  return parts.join(" • ");
};

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Normalize backend field that may be array, string, or JSON string -> array<string> */
function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((v) => typeof v === "string")
      .map((v) => v.trim())
      .filter(Boolean);
  }
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
    } catch {
      /* not JSON */
    }
    const parts = raw
      .split(/\r?\n|,|•|·|-/g)
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.length ? parts : [raw];
  }
  return [];
}

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

export default function ProgramDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { language } = useI18nStore();
  const { toast } = useToast();

  // --- auth state (read from localStorage like your Header) ---
  const [token, setToken] = useState<string | null>(null);
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

  // Registration dialog state
  const [registrationOpen, setRegistrationOpen] = useState(false);

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

  const programId = Number(params?.id);
  const {
    data: program,
    isLoading,
    isError,
  } = useProgram(Number.isFinite(programId) ? programId : undefined);

  // Related by category
  const categoryId = program?.category?.id;
  const {
    data: categoryPrograms,
    isLoading: isRelatedLoading,
    isError: isRelatedError,
  } = useProgramsByCategory(
    typeof categoryId === "number" ? categoryId : undefined
  );

  // Normalize lists
  const learningList = useMemo(
    () => toStringArray(program?.learning),
    [program?.learning]
  );
  const requirementList = useMemo(
    () => toStringArray(program?.requirement),
    [program?.requirement]
  );

  // Randomly select up to 3 related (exclude current)
  const relatedPrograms = useMemo(() => {
    if (!categoryPrograms || !program) return [];
    const pool = categoryPrograms.filter((p) => p.id !== program.id);
    return shuffle(pool).slice(0, 3);
  }, [categoryPrograms, program]);

  useEffect(() => {
    if (isError) {
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description:
          language === "ar"
            ? "لم يتم العثور على البرنامج المطلوب"
            : "The requested program was not found",
        variant: "destructive",
      });
    }
  }, [isError, language, toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#2a2665] mb-4">
            {language === "ar"
              ? "جاري تحميل البرنامج..."
              : "Loading program..."}
          </h2>
        </div>
      </div>
    );
  }

  if (isError || !program) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-[#2a2665] mb-4">
            {language === "ar"
              ? "لم يتم العثور على البرنامج"
              : "Program Not Found"}
          </h2>
          <p className="text-gray-600 mb-8">
            {language === "ar"
              ? "عذراً، البرنامج التدريبي الذي تبحث عنه غير موجود أو تم حذفه."
              : "Sorry, the training program you are looking for does not exist or has been removed."}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              className="bg-[#2a2665] hover:bg-[#1a1545] text-white"
              onClick={() => (window.location.href = "/programs")}
            >
              {language === "ar" ? "عرض جميع البرامج" : "View All Programs"}
            </Button>
            <Button
              variant="outline"
              className="border-[#2a2665] text-[#2a2665] hover:bg-[#2a2665] hover:text-white"
              onClick={() => (window.location.href = "/")}
            >
              {language === "ar"
                ? "العودة للصفحة الرئيسية"
                : "Return to Homepage"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const levelName = getLevelName(program.level, language);
  const durationLabel = buildDurationLabel(program, language);
  const whenLabel = buildWhenLabel(program, language);
 
  const isRegistered = program.type === "registered";
  const isLive = program.type === "live" || program.isLive;

  // Auth-aware primary CTA
  const handlePrimaryCta = () => {
    if (!token) {
      window.location.href = "/auth";
      return;
    }
    const ssoUrl = buildSsoLoginUrl(token, `/student/courses/${program.id}`);
    window.location.href = ssoUrl;
  };

  // Registration form submit
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

  // Handle registration button click
  const handleRegistrationClick = () => {
    if (program) {
      form.setValue("programId", program.id);
      setRegistrationOpen(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {language === "ar"
            ? `${program.title} | مركز راي للتدريب والاستشارات`
            : `${program.title} | Ray Training & Consulting Center`}
        </title>
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
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {program.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full">
                {isRegistered
                  ? language === "ar"
                    ? "مسجل (حسب الطلب)"
                    : "Registered (On-demand)"
                  : language === "ar"
                  ? "مباشر"
                  : "Live"}
              </span>

              <span className="bg-white/20 text-white px-4 py-2 rounded-full">
                {language === "ar"
                  ? `المستوى: ${levelName}`
                  : `Level: ${levelName}`}
              </span>

              {isRegistered && (
                <span className="bg-white/20 text-white px-4 py-2 rounded-full">
                  {language === "ar"
                    ? `المدة: ${durationLabel}`
                    : `Duration: ${durationLabel}`}
                </span>
              )}

              {isLive && (
                <span className="bg-white/20 text-white px-4 py-2 rounded-full">
                  {language === "ar"
                    ? `الموعد: ${whenLabel}`
                    : `Schedule: ${whenLabel}`}
                </span>
              )}

              <span className="bg-white/20 text-white px-4 py-2 rounded-full">
                {language === "ar"
                  ? `السعر: ${program.price} ر.س`
                  : `Price: ${program.price} SAR`}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  {language === "ar" ? "الرئيسية" : "Home"}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/programs">
                  {language === "ar"
                    ? "البرامج التدريبية"
                    : "Training Programs"}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {program.category && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/programs/category/${program.category.id}`}
                    >
                      {program.category.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{program.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Program Details Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-[#2a2665] mb-4">
                  {language === "ar" ? "نبذة عن البرنامج" : "Program Overview"}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {program.description}
                </p>
              </div>

              {learningList.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-[#2a2665] mb-4">
                    {language === "ar" ? "مخرجات التعلم" : "Learning Outcomes"}
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {learningList.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {requirementList.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-[#2a2665] mb-4">
                    {language === "ar" ? "المتطلبات" : "Requirements"}
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {requirementList.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card className="bg-gray-50 shadow-lg sticky top-8">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#2a2665] mb-4">
                      {language === "ar"
                        ? "معلومات البرنامج"
                        : "Program Information"}
                    </h3>
                    <div className="space-y-4">
                      {/* Type */}
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {language === "ar" ? "النوع:" : "Type:"}
                        </span>
                        <span className="font-medium">
                          {isRegistered
                            ? language === "ar"
                              ? "مسجل"
                              : "Registered"
                            : language === "ar"
                            ? "مباشر"
                            : "Live"}
                        </span>
                      </div>

                      {/* Duration (registered) */}
                      {isRegistered && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {language === "ar" ? "المدة:" : "Duration:"}
                          </span>
                          <span className="font-medium">{durationLabel}</span>
                        </div>
                      )}

                      {/* Schedule (live) */}
                      {isLive && (
                        <>
                          {program.dateFrom && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                {language === "ar"
                                  ? "تاريخ البداية:"
                                  : "Start date:"}
                              </span>
                              <span className="font-medium">
                                {program.dateFrom}
                              </span>
                            </div>
                          )}
                          {program.dateTo && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                {language === "ar"
                                  ? "تاريخ النهاية:"
                                  : "End date:"}
                              </span>
                              <span className="font-medium">
                                {program.dateTo}
                              </span>
                            </div>
                          )}
                          {program.time && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                {language === "ar" ? "الوقت:" : "Time:"}
                              </span>
                              <span className="font-medium">
                                {program.time}
                              </span>
                            </div>
                          )}
                        </>
                      )}

                      {/* Level */}
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {language === "ar" ? "المستوى:" : "Level:"}
                        </span>
                        <span className="font-medium">
                          {getLevelName(program.level, language)}
                        </span>
                      </div>

                      {/* Category */}
                      {program.category && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {language === "ar" ? "الفئة:" : "Category:"}
                          </span>
                          <span className="font-medium">
                            {program.category.title}
                          </span>
                        </div>
                      )}

                      {/* Certificate */}
                      <div className="flex justify_between">
                        <span className="text-gray-600">
                          {language === "ar" ? "شهادة:" : "Certificate:"}
                        </span>
                        <span className="font-medium">
                          {program.haveCertificate
                            ? language === "ar"
                              ? "متوفرة"
                              : "Available"
                            : language === "ar"
                            ? "غير متوفرة"
                            : "Not available"}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {language === "ar" ? "السعر:" : "Price:"}
                        </span>
                        <span className="font-bold text-[#2a2665]">
                          {language === "ar"
                            ? `${program.price} ر.س`
                            : `${program.price} SAR`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      className="w-full bg-[#2a2665] hover:bg-[#1a1545] text-white"
                      onClick={handlePrimaryCta}
                    >
                      {language === "ar" ? "سجل الآن" : "Register Now"}
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-[#2a2665] text-[#2a2665] hover:bg-[#2a2665] hover:text-white"
                      onClick={() => (window.location.href = `/contact?programId=${program.id}&programTitle=${encodeURIComponent(program.title)}`)}
                    >
                      {language === "ar"
                        ? "استفسر عن البرنامج"
                        : "Inquire About the Program"}
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-[#b29567] text-[#b29567] hover:bg-[#b29567] hover:text-white"
                      onClick={handleRegistrationClick}
                    >
                      {language === "ar"
                        ? "طلب تسجيل مجموعه"
                        : "Group Registration Request"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2a2665] mb-10 text-center">
            {language === "ar" ? "برامج ذات صلة" : "Related Programs"}
          </h2>

          {isRelatedLoading && (
            <div className="grid md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-white rounded-lg shadow-sm border animate-pulse"
                />
              ))}
            </div>
          )}

          {isRelatedError && (
            <div className="text-center text-gray-500">
              {language === "ar"
                ? "تعذر تحميل البرامج ذات الصلة حالياً."
                : "Unable to load related programs at the moment."}
            </div>
          )}

          {!isRelatedLoading &&
            !isRelatedError &&
            relatedPrograms.length > 0 && (
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPrograms.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProgramCard program={p} />
                  </motion.div>
                ))}
              </div>
            )}

          {!isRelatedLoading &&
            !isRelatedError &&
            relatedPrograms.length === 0 && (
              <div className="text-center text-gray-500">
                {language === "ar"
                  ? "لا توجد برامج أخرى ضمن هذه الفئة حالياً."
                  : "No other programs in this category right now."}
              </div>
            )}
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-16 bg-[#2a2665] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {language === "ar" ? "جاهز للتسجيل؟" : "Ready to Register?"}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            {language === "ar"
              ? "سجل الآن واستفد من البرنامج التدريبي المتميز من مركز راي للتدريب والاستشارات."
              : "Register now and benefit from the excellent training program from Ray Training & Consulting Center."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="bg-white text-[#2a2665] hover:bg-gray-100 py-3 px-10 text-lg"
              onClick={handlePrimaryCta}
            >
              {language === "ar" ? "سجل الآن" : "Register Now"}
            </Button>
            <Button
              variant="outline"
              className="border-white hover:bg-white hover:text-[#2a2665] py-3 px-10 text-lg"
              onClick={() => (window.location.href = `/contact?programId=${program.id}&programTitle=${encodeURIComponent(program.title)}`)}
            >
              {language === "ar" ? "تواصل معنا" : "Contact Us"}
            </Button>
          </div>
        </div>
      </section>

      {/* Registration Dialog */}
      <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
        <DialogContent className="max-w-4xl w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#2a2665]">
              {language === "ar"
                ? `طلب تسجيل مجموعه: ${program?.title ?? ""}`
                : `Group Registration Request: ${program?.title ?? ""}`}
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
                                  program?.category?.title ?? "—"
                                }`
                              : `Choose from: ${
                                  program?.category?.title ?? "—"
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
