// src/pages/JoinUsPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { useI18nStore } from "@/lib/i18n";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
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
import { PasswordStrengthIndicator, PasswordRequirementsChecklist } from "@/components/ui/password-strength-indicator";
import raayVideo from "../assets/videos/raay-center-video.mp4";
import {
  ChevronRight,
  ChevronLeft,
  Users,
  BookOpen,
  BriefcaseBusiness,
  Lightbulb,
  Medal,
  BadgeCheck,
  ChevronDown,
  X,
  Search,
} from "lucide-react";

const t = (lang: string, ar: string, en: string) => (lang === "ar" ? ar : en);

const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE_URL ?? "https://backend.raay.sa/api";

/* ---------------- small building blocks ---------------- */
function FilePicker({
  label,
  placeholder,
  accept,
  onChange,
  name,
}: {
  label: string;
  placeholder: string;
  accept?: string;
  onChange: (file: File | null) => void;
  name: string;
}) {
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <div className="mt-1">
        <Input
          type="file"
          name={name}
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
        <p className="text-xs text-gray-500 mt-1">{placeholder}</p>
      </div>
    </div>
  );
}

type Option = { value: string; label: string };
function MultiSelectDropdown({
  disabled,
  options,
  value,
  onChange,
  placeholder,
  noResultsText,
  labelText,
  loading,
  error,
}: {
  disabled?: boolean;
  options: Option[];
  value: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
  noResultsText: string;
  labelText?: string;
  loading?: boolean;
  error?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const selected = options.filter((o) => value.includes(o.value));
  const filtered = options.filter(
    (o) =>
      o.label
  );

  const toggle = (v: string) =>
    value.includes(v)
      ? onChange(value.filter((x) => x !== v))
      : onChange([...value, v]);

  const removeChip = (v: string) => onChange(value.filter((x) => x !== v));

  return (
    <div className="w-full" ref={wrapRef}>
      {labelText ? (
        <FormLabel className="text-base">{labelText}</FormLabel>
      ) : null}
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((s) => !s)}
        className={[
          "mt-2 w-full min-h-[44px] rounded-md border bg-white px-3 py-2 text-sm",
          "flex items-center gap-2 flex-wrap cursor-pointer",
          disabled
            ? "opacity-60 cursor-not-allowed"
            : "focus-within:ring-2 focus-within:ring-[#2a2665]",
        ].join(" ")}
      >
        {selected.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : (
          selected.map((o) => (
            <span
              key={o.value}
              className="inline-flex items-center gap-1 rounded-full bg-[#2a2665]/10 text-[#2a2665] px-2 py-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                removeChip(o.value);
              }}
            >
              {o.label}
              <X className="h-3 w-3" />
            </span>
          ))
        )}
        <ChevronDown className="ml-auto h-4 w-4 text-gray-500" />
      </div>

      {open && (
        <div className="relative">
          <div className="absolute z-50 mt-2 w-full rounded-md border bg-white shadow-lg">
            <div className="p-2 border-b">
              <div className="flex items-center gap-2 rounded-md border px-2">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  autoFocus
                  className="w-full py-2 text-sm outline-none"
                  placeholder="Search…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="p-3 text-sm text-gray-500">Loading…</div>
            ) : error ? (
              <div className="p-3 text-sm text-red-600">{error}</div>
            ) : filtered.length === 0 ? (
              <div className="p-3 text-sm text-gray-500">{noResultsText}</div>
            ) : (
              <ul className="max-h-56 overflow-auto py-1">
                {filtered.map((o) => {
                  const checked = value.includes(o.value);
                  return (
                    <li
                      key={o.value}
                      className={[
                        "flex items-center gap-2 px-3 py-2 cursor-pointer text-sm",
                        checked ? "bg-[#2a2665]/5" : "hover:bg-gray-50",
                      ].join(" ")}
                      onClick={() => toggle(o.value)}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        readOnly
                        className="h-4 w-4 accent-[#2a2665]"
                      />
                      <span className="text-gray-800">{o.label}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- schemas & helpers ---------------- */
type Category = { id: number; title: string };

// shared base for both
const baseFields = {
  name: z
    .string()
    .min(2, { message: "الاسم يجب أن يحتوي على حرفين على الأقل" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  phone: z
    .string()
    .min(9, { message: "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل" }),
  specialization: z.string().min(2, { message: "يرجى تحديد التخصص" }),
  yearsOfExperience: z.string().min(1, { message: "يرجى تحديد سنوات الخبرة" }),
  bio: z.string().min(9, { message: "يرجى كتابة نبذة مختصرة" }),
  cv: z.any().optional(),
  certificate: z.any().optional(),
  agreeToTerms: z.boolean().refine((v) => v === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
  categories: z.array(z.string()).min(1, {
    message: "يرجى اختيار تصنيف واحد على الأقل",
  }),
};

// trainer-only additions
const trainerOnly = {
  user_type: z.literal("teacher"),
  password: z
    .string()
    .min(8, { message: "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل" })
    .max(128, { message: "كلمة المرور يجب أن لا تتجاوز 128 حرف" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل (A-Z)",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل (a-z)",
    })
    .refine((password) => /\d/.test(password), {
      message: "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل (0-9)",
    })
    .refine((password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), {
      message: "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل (!@#$%^&*)",
    })
    .refine((password) => !/(.)\1{2,}/.test(password), {
      message: "لا يمكن أن تحتوي كلمة المرور على أكثر من حرفين متتاليين متطابقين",
    })
    .refine((password) => !/123|234|345|456|567|678|789|890/.test(password), {
      message: "لا يمكن أن تحتوي كلمة المرور على أرقام متتالية (123, 456, إلخ)",
    })
    .refine((password) => !/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password), {
      message: "لا يمكن أن تحتوي كلمة المرور على أحرف متتالية (abc, def, إلخ)",
    })
    .refine((password) => !/qwerty|asdfgh|zxcvbn/i.test(password), {
      message: "لا يمكن أن تحتوي كلمة المرور على أنماط لوحة المفاتيح الشائعة",
    }),
  password_confirmation: z
    .string()
    .min(1, { message: "يرجى تأكيد كلمة المرور" }),
};

// expert-only additions
const expertOnly = {
  user_type: z.literal("consultant"),
  work_hours: z.string().min(1, { message: "يرجى تحديد الساعات المتاحة" }),
  previous_clients: z
    .string()
    .min(2, { message: "يرجى إدخال العملاء السابقين" }),
};

// Build object schemas FIRST (must be ZodObject for discriminatedUnion)
const trainerSchema = z.object({ ...baseFields, ...trainerOnly });
const expertSchema = z.object({ ...baseFields, ...expertOnly });

// Discriminated union, then do password confirmation check at union level
const formSchema = z
  .discriminatedUnion("user_type", [trainerSchema, expertSchema])
  .superRefine((val, ctx) => {
    if (val.user_type === "teacher") {
      const v = val as z.infer<typeof trainerSchema>;
      if (v.password !== v.password_confirmation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password_confirmation"],
          message: "كلمتا المرور غير متطابقتين",
        });
      }
    }
  });

type FormValues = z.infer<typeof formSchema>;
type JoinOption = "teacher" | "consultant";
type ApiErrorBag = Record<string, string[]>;

function applyApiErrors<T extends Record<string, any>>(
  form: ReturnType<typeof useForm<T>>,
  errors: ApiErrorBag | undefined,
  language: string
) {
  if (!errors) return;

  const fieldMap: Record<string, keyof T> = {
    name: "name" as keyof T,
    email: "email" as keyof T,
    phone: "phone" as keyof T,
    bio: "bio" as keyof T,
    specialization: "specialization" as keyof T,
    experience_years: "yearsOfExperience" as keyof T,
    yearsOfExperience: "yearsOfExperience" as keyof T,
    work_hours: "work_hours" as keyof T,
    previous_clients: "previous_clients" as keyof T,
    categories: "categories" as keyof T,
    cv: "cv" as keyof T,
    certificate: "certificate" as keyof T,
    password: "password" as keyof T,
    password_confirmation: "password_confirmation" as keyof T,
  };

  const unknown: string[] = [];
  Object.entries(errors).forEach(([k, msgs]) => {
    const msg = msgs?.[0] ?? t(language, "خطأ غير معروف", "Unknown error");
    const mapped = fieldMap[k];
    if (mapped) {
      // @ts-expect-error dynamic name
      form.setError(mapped, { type: "server", message: msg });
    } else {
      unknown.push(msg);
    }
  });
  return unknown;
}

/* ---------------- page ---------------- */
export default function JoinUsPage() {
  const { language } = useI18nStore();
  const { toast } = useToast();

  // categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadCats() {
      try {
        setCatLoading(true);
        setCatError(null);
        const res = await fetch(`${API_BASE}/public/categories`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const items: Category[] = (json?.data || []).map((c: any) => {
          // Get translation for current language
          const translation = c.translations?.find((t: any) => t.locale === language) || c.translations?.[0];
          return {
            id: c.id,
            title: translation?.title || "—",
          };
        });
        if (!cancelled) setCategories(items);
      } catch (e: any) {
        if (!cancelled) setCatError(e?.message || "Failed to load categories");
      } finally {
        if (!cancelled) setCatLoading(false);
      }
    }
    loadCats();
    return () => {
      cancelled = true;
    };
  }, [language]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_type: "teacher",
      name: "",
      email: "",
      phone: "",
      specialization: "",
      yearsOfExperience: "",
      bio: "",
      cv: undefined as any,
      certificate: undefined as any,
      categories: [],
      // trainer defaults
      password: "",
      password_confirmation: "",
      // expert defaults (kept for shape)
      work_hours: "" as any,
      previous_clients: "" as any,
      agreeToTerms: false,
    } as unknown as FormValues,
    mode: "onSubmit",
  });

  const selectedType = form.watch("user_type");

  async function postFormData(fd: FormData) {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      body: fd,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json?.success === false) {
      const err: any = new Error(
        json?.message ||
          (res.status >= 400
            ? `HTTP ${res.status}`
            : t(language, "تعذر إكمال العملية", "Request failed"))
      );
      err.errors = json?.errors;
      throw err;
    }
    return json;
  }

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append("name", values.name);
      fd.append(
        "user_type",
        values.user_type === "teacher" ? "teacher" : "consultant"
      );
      fd.append("phone", values.phone);
      fd.append("email", values.email);
      fd.append("bio", values.bio);
      fd.append("experience_years", values.yearsOfExperience);
      fd.append("specialization", values.specialization);

      // type-specific fields
      if (values.user_type === "teacher") {
        fd.append("password", values.password);
        fd.append("password_confirmation", values.password_confirmation);
      } else {
        fd.append("work_hours", values.work_hours);
        fd.append("previous_clients", values.previous_clients);
      }

      values.categories.forEach((id) => fd.append("categories[]", id));
      if (values.cv instanceof File) fd.append("cv", values.cv);
      if (values.certificate instanceof File)
        fd.append("certificate", values.certificate);

      await postFormData(fd);

      toast({
        title: t(
          language,
          "تم إرسال طلب التسجيل بنجاح",
          "Registration request sent"
        ),
        description: t(
          language,
          "سنراجع طلبك ونتواصل معك قريباً",
          "We'll review your request and contact you soon."
        ),
      });
      // reset and keep current type selection
      const keepType = values.user_type;
      form.reset({
        ...(form.formState.defaultValues as any),
        user_type: keepType,
        name: "",
        email: "",
        phone: "",
        specialization: "",
        yearsOfExperience: "",
        bio: "",
        cv: undefined,
        certificate: undefined,
        categories: [],
        password: "",
        password_confirmation: "",
        work_hours: "",
        previous_clients: "",
        agreeToTerms: false,
      } as any);
    } catch (e: any) {
      const unknown = applyApiErrors(form, e?.errors, language) || [];
      toast({
        title: t(language, "حدث خطأ", "Error"),
        description:
          unknown.length > 0
            ? unknown.join(" • ")
            : e?.message ||
              t(
                language,
                "تعذر إرسال الطلب، يرجى المحاولة لاحقاً.",
                "Failed to submit, please try again later."
              ),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const Benefit = ({
    icon: Icon,
    title,
    description,
    color,
  }: {
    icon: any;
    title: string;
    description: string;
    color: string;
  }) => (
    <div className="flex p-6 bg-white rounded-lg shadow-md items-center gap-5">
      <div
        className={`flex items-center justify-center h-12 w-12 rounded-full ${color} text-white mr-4`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#2a2665] mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>
          {t(
            language,
            "التسجيل كخبير ومدرب لدى مركز راي",
            "Register as Trainer or Expert | Ray Center"
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
          ></video>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              {t(
                language,
                "التسجيل كخبير ومدرب لدى مركز راي",
                "Register as Trainer or Expert at Ray Center"
              )}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {t(
                language,
                "كن جزءاً من فريق مركز راي وساهم في بناء وتطوير المهارات المهنية.",
                "Be part of Raay's team and help build and develop professional skills."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {t(language, "لماذا تنضم إلينا؟", "Why Join Us?")}
            </h2>
            <p className="text-gray-700 mb-8">
              {t(
                language,
                "نوفر فرصاً مميزة للمدربين والخبراء لتقديم تجارب تدريبية واستشارية فريدة.",
                "We provide outstanding opportunities for trainers and consultants to deliver unique experiences."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Benefit
              icon={Users}
              title={t(language, "شبكة واسعة من العلاقات", "Extensive Network")}
              description={t(
                language,
                "الوصول إلى شبكة واسعة من العملاء والشركاء.",
                "Access a wide network of clients and partners."
              )}
              color="bg-[#2a2665]"
            />
            <Benefit
              icon={BookOpen}
              title={t(language, "تطوير مهني مستمر", "Continuous Development")}
              description={t(
                language,
                "ورش عمل وتدريبات مخصصة لتطويرك.",
                "Workshops and trainings to grow your skills."
              )}
              color="bg-[#b29567]"
            />
            <Benefit
              icon={BriefcaseBusiness}
              title={t(language, "مشاريع متنوعة", "Diverse Projects")}
              description={t(
                language,
                "العمل مع مؤسسات من مختلف القطاعات.",
                "Work with organizations across sectors."
              )}
              color="bg-[#3a84bc]"
            />
            <Benefit
              icon={Lightbulb}
              title={t(language, "بيئة محفزة للإبداع", "Creative Environment")}
              description={t(
                language,
                "أفكار مبتكرة وحلول عملية.",
                "Innovative ideas and practical solutions."
              )}
              color="bg-[#f59e0b]"
            />
            <Benefit
              icon={Medal}
              title={t(language, "مكافآت مجزية", "Rewarding Compensation")}
              description={t(
                language,
                "نظام مكافآت يعكس قيمة خبرتك.",
                "Compensation that reflects your expertise."
              )}
              color="bg-[#10b981]"
            />
            <Benefit
              icon={BadgeCheck}
              title={t(language, "سمعة مهنية مرموقة", "Strong Reputation")}
              description={t(
                language,
                "الانضمام إلى مركز تدريبي مرموق.",
                "Join a prestigious training & consulting center."
              )}
              color="bg-[#8b5cf6]"
            />
          </div>
        </div>
      </section>

      {/* Single Form (type dropdown) */}
      <section id="registration-forms" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-bold text-[#2a2665] mb-2">
                {t(
                  language,
                  "التسجيل كخبير ومدرب لدى مركز راي",
                  "Register as Trainer or Expert"
                )}
              </h3>
              <p className="text-gray-600">
                {t(
                  language,
                  "اختر نوع التسجيل من القائمة ثم أكمل البيانات المطلوبة.",
                  "Choose the registration type from the list, then complete the required fields."
                )}
              </p>
            </div>

            <div className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Type selector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="user_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t(language, "نوع التسجيل", "Registration Type")}
                          </FormLabel>
                          <FormControl>
                            <select
                              className="w-full rounded-md border bg-white px-3 py-2 text-sm"
                              value={field.value as JoinOption}
                              onChange={(e) =>
                                field.onChange(e.target.value as JoinOption)
                              }
                            >
                              <option value="teacher">
                                {t(language, "مدرب", "Trainer")}
                              </option>
                              <option value="consultant">
                                {t(
                                  language,
                                  "خبير / مستشار",
                                  "Expert / Consultant"
                                )}
                              </option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Full Name */}
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
                                "Enter your full name"
                              )}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
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
                                "Enter your email"
                              )}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone */}
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
                                "Enter your phone number"
                              )}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Specialization */}
                    <FormField
                      control={form.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t(language, "التخصص", "Specialization")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t(
                                language,
                                "أدخل تخصصك",
                                "Enter your specialization"
                              )}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Years of Experience */}
                    <FormField
                      control={form.control}
                      name="yearsOfExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t(language, "سنوات الخبرة", "Years of Experience")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t(
                                language,
                                "أدخل سنوات الخبرة",
                                "Enter years of experience"
                              )}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* CV + Certificate */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="cv"
                      render={({ field }) => (
                        <FormItem>
                          <FilePicker
                            label={t(
                              language,
                              "السيرة الذاتية (CV)",
                              "Curriculum Vitae (CV)"
                            )}
                            placeholder={t(
                              language,
                              "صيغة PDF/Doc مقبولة",
                              "PDF/Doc accepted"
                            )}
                            accept=".pdf,.doc,.docx"
                            name="cv"
                            onChange={(file) => field.onChange(file)}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="certificate"
                      render={({ field }) => (
                        <FormItem>
                          <FilePicker
                            label={t(
                              language,
                              "الشهادات (ملف واحد)",
                              "Certificates (single file)"
                            )}
                            placeholder={t(
                              language,
                              "أرفق ملف شهاداتك (اختياري)",
                              "Attach your certificates file (optional)"
                            )}
                            accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.png"
                            name="certificate"
                            onChange={(file) => field.onChange(file)}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Categories */}
                  <div>
                    <FormField
                      control={form.control}
                      name="categories"
                      render={({ field }) => (
                        <FormItem>
                          <MultiSelectDropdown
                            disabled={catLoading || !!catError}
                            options={categories.map((c) => ({
                              value: String(c.id),
                              label: c.title,
                            }))}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder={t(
                              language,
                              "اختر تصنيفات…",
                              "Pick categories…"
                            )}
                            noResultsText={t(
                              language,
                              "لا توجد نتائج",
                              "No results"
                            )}
                            labelText={t(
                              language,
                              "المجالات (من التصنيفات)",
                              "Areas (from categories)"
                            )}
                            loading={catLoading}
                            error={catError}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t(language, "نبذة / السيرة المختصرة", "Short Bio")}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t(
                                language,
                                "اكتب نبذة مختصرة عن خبراتك وإنجازاتك.",
                                "Write a short bio about your experience & achievements."
                              )}
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Conditional fields: by type */}
                  {selectedType === "teacher" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t(language, "كلمة المرور", "Password")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="******"
                                {...field}
                              />
                            </FormControl>
                            <PasswordStrengthIndicator password={field.value || ""} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password_confirmation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t(
                                language,
                                "تأكيد كلمة المرور",
                                "Confirm Password"
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="******"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="work_hours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t(
                                language,
                                "الساعات المتاحة أسبوعياً",
                                "Available Hours Weekly"
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t(
                                  language,
                                  "أدخل عدد الساعات المتاحة أسبوعياً",
                                  "Enter available hours per week"
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
                        name="previous_clients"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t(
                                language,
                                "العملاء السابقون",
                                "Previous Clients"
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t(
                                  language,
                                  "أدخل قائمة بالعملاء السابقين",
                                  "Enter a list of previous clients"
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Terms */}
                  <div>
                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rtl:space-x-reverse">
                          <FormControl>
                            <input
                              type="checkbox"
                              className="mt-1 h-4 w-4 accent-[#2a2665]"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                            />
                          </FormControl>
                          <div className="leading-none">
                            <FormLabel>
                              {t(
                                language,
                                "أوافق على الشروط والأحكام وسياسة الخصوصية",
                                "I agree to the terms and privacy policy"
                              )}
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-[#2a2665] hover:bg-[#1a1545] text-white py-2 px-6"
                      disabled={submitting}
                    >
                      {submitting
                        ? t(language, "جاري الإرسال...", "Submitting...")
                        : t(language, "إرسال الطلب", "Submit Application")}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {t(language, "عملية الانضمام", "Joining Process")}
            </h2>
            <p className="text-gray-700 mb-8">
              {t(
                language,
                "خطوات سهلة للانضمام إلى فريقنا.",
                "Simple steps to join our team."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md relative border">
              <div className="w-10 h-10 bg-[#2a2665] text-white rounded-full flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-lg text-[#2a2665] mb-2">
                {t(language, "تقديم الطلب", "Submit Application")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t(
                  language,
                  "املأ نموذج التسجيل وأرسل طلبك للانضمام إلينا.",
                  "Fill the form and submit your application."
                )}
              </p>
              <div className={`hidden md:block absolute top-10 text-gray-300 ${
                language === "ar" 
                  ? "left-4 transform -translate-x-1/2" 
                  : "right-4 transform translate-x-1/2"
              }`}>
                {language === "ar" ? (
                  <ChevronLeft className="h-8 w-8" />
                ) : (
                  <ChevronRight className="h-8 w-8" />
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-md relative border">
              <div className="w-10 h-10 bg-[#2a2665] text-white rounded-full flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-bold text-lg text-[#2a2665] mb-2">
                {t(language, "مراجعة الطلب", "Application Review")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t(
                  language,
                  "سنراجع مؤهلاتك وخبراتك.",
                  "We will review your qualifications and experience."
                )}
              </p>
              <div className={`hidden md:block absolute top-10 text-gray-300 ${
                language === "ar" 
                  ? "left-4 transform -translate-x-1/2" 
                  : "right-4 transform translate-x-1/2"
              }`}>
                {language === "ar" ? (
                  <ChevronLeft className="h-8 w-8" />
                ) : (
                  <ChevronRight className="h-8 w-8" />
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-md relative border">
              <div className="w-10 h-10 bg-[#2a2665] text-white rounded-full flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-bold text-lg text-[#2a2665] mb-2">
                {t(language, "المقابلة الشخصية", "Interview")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t(
                  language,
                  "إجراء مقابلة للتعرف عليك ومناقشة التفاصيل.",
                  "An interview to know you and discuss details."
                )}
              </p>
              <div className={`hidden md:block absolute top-10 text-gray-300 ${
                language === "ar" 
                  ? "left-4 transform -translate-x-1/2" 
                  : "right-4 transform translate-x-1/2"
              }`}>  
                {language === "ar" ? (
                  <ChevronLeft className="h-8 w-8" />
                ) : (
                  <ChevronRight className="h-8 w-8" />
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-md border">
              <div className="w-10 h-10 bg-[#2a2665] text-white rounded-full flex items-center justify-center font-bold mb-4">
                4
              </div>
              <h3 className="font-bold text-lg text-[#2a2665] mb-2">
                {t(language, "بدء التعاون", "Start Collaboration")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t(
                  language,
                  "توقيع العقد والبدء معنا كمدرب أو خبير.",
                  "Sign the contract and start as a trainer or consultant."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#2a2665] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t(
              language,
              "كن جزءًا من فريقنا اليوم",
              "Be Part of Our Team Today"
            )}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            {t(
              language,
              "انضم إلينا وشارك في رحلة التطوير المهني.",
              "Join us and take part in the professional growth journey."
            )}
          </p>
          <Button
            className="bg-white text-[#2a2665] hover:bg-gray-100 py-3 px-10 text-lg"
            onClick={() => (window.location.href = "#registration-forms")}
          >
            {t(language, "قدم طلبك الآن", "Apply Now")}
          </Button>
        </div>
      </section>
    </>
  );
}
