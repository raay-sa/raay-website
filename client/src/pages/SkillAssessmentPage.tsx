// src/pages/SkillAssessmentPage.tsx
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
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  BarChart4,
  LineChart,
  Shield,
  Users,
  AlertTriangle,
  Brain,
} from "lucide-react";
import raayVideo from "../assets/videos/raay-center-video.mp4";

/* ---------------- helpers ---------------- */
const t = (lang: string, ar: string, en: string) => (lang === "ar" ? ar : en);

type ApiQuestion = {
  id: number;
  question: string;
  category_id: number;
  category?: { id: number; title: string };
};

type ApiRecommendation =
  | {
      id: number;
      title: string;
      level: string;
      category_id: number;
      category?: { id: number; title: string };
      teacher?: unknown;
      message?: string;
    }
  | {
      category_id: number;
      level: string;
      message: string;
      id?: undefined;
      title?: undefined;
      category?: { id: number; title: string };
    };

const OPTIONS = [
  { value: 1, ar: "مبتدئ", en: "Beginner" },
  { value: 2, ar: "متوسط", en: "Intermediate" },
  { value: 3, ar: "متقدم", en: "Advanced" },
  { value: 4, ar: "خبير", en: "Expert" },
] as const;

function levelFromAvg(avg: number, lang: string) {
  if (avg >= 3.5) return t(lang, "خبير", "Expert");
  if (avg >= 2.5) return t(lang, "متوسط", "Intermediate");
  return t(lang, "مبتدئ", "Beginner");
}
function colorFromAvg(avg: number) {
  if (avg >= 3.5) return "bg-green-500";
  if (avg >= 2.5) return "bg-yellow-500";
  return "bg-red-500";
}

export default function SkillAssessmentPage() {
  const { language } = useI18nStore();
  const { toast } = useToast();

  const [loadingQs, setLoadingQs] = useState(true);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ApiQuestion[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState<{
    programs: ApiRecommendation[];
  } | null>(null);
  const [showResults, setShowResults] = useState(false);

  const API_BASE =
    (import.meta as any)?.env?.VITE_API_BASE_URL ??
    "https://backend.raay.sa/api";

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoadingQs(true);
      setLoadErr(null);
      try {
        const res = await fetch(`${API_BASE}/public/skills`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const items: ApiQuestion[] = json?.data ?? [];
        if (!cancelled) setQuestions(items);
      } catch (e: any) {
        if (!cancelled) setLoadErr(e?.message || "Failed to load questions");
      } finally {
        if (!cancelled) setLoadingQs(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalSteps = useMemo(
    () => (questions.length || 0) + 2,
    [questions.length]
  );
  const getProgressPercentage = () =>
    ((currentStep - 1) / (totalSteps - 1)) * 100;

  const renderIntroduction = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-[#2a2665] mb-6 text-center">
        {t(language, "تقييم المهارات", "Skills Assessment")}
      </h2>
      <p className="text-gray-700 mb-6">
        {t(
          language,
          "مرحبًا بك في تقييم المهارات. سيساعدنا هذا التقييم على فهم مستواك الحالي وتقديم توصيات مخصصة.",
          "Welcome to the skills assessment. This helps us understand your current level and suggest tailored programs."
        )}
      </p>
      <p className="text-gray-700 mb-6">
        {t(
          language,
          "اختر أحد الخيارات الأربعة لكل سؤال: مبتدئ، متوسط، متقدم، خبير.",
          "Choose one of four options for each question: Beginner, Intermediate, Advanced, Expert."
        )}
      </p>
      <div className="flex justify-center mt-8">
        <Button
          onClick={() => setCurrentStep(2)}
          className="bg-[#2a2665] hover:bg-[#1a1545] text-white py-2 px-8 rounded-md text-lg"
          disabled={loadingQs || !!loadErr || questions.length === 0}
        >
          {loadingQs
            ? t(language, "جار التحميل…", "Loading…")
            : t(language, "ابدأ التقييم", "Start Assessment")}
        </Button>
      </div>
      {loadErr && (
        <p className="text-center text-red-600 mt-4">
          {t(language, "تعذر تحميل الأسئلة.", "Failed to load questions.")}{" "}
          {loadErr}
        </p>
      )}
      {!loadErr && !loadingQs && questions.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          {t(
            language,
            "لا توجد أسئلة متاحة حالياً.",
            "No questions available right now."
          )}
        </p>
      )}
    </motion.div>
  );

  const renderQuestion = () => {
    const q = questions[currentStep - 2];
    if (!q) return null;

    return (
      <motion.div
        key={q.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-[#2a2665] mb-2 text-center">
          {q.question}
        </h2>
        {q.category?.title && (
          <p className="text-center text-sm text-gray-500 mb-8">
            {t(language, "الفئة:", "Category:")} {q.category.title}
          </p>
        )}
        <div className="space-y-4 mb-10">
          {OPTIONS.map((opt) => (
            <label
              key={opt.value}
              htmlFor={`q${q.id}-o${opt.value}`}
              className={`flex items-center gap-3 p-4 rounded-md border cursor-pointer transition-colors ${
                answers[q.id] === opt.value
                  ? "border-[#2a2665] bg-[#2a2665]/5"
                  : "border-gray-200 hover:border-[#2a2665]/60"
              }`}
            >
              <input
                id={`q${q.id}-o${opt.value}`}
                type="radio"
                name={`q-${q.id}`}
                className="w-4 h-4 text-[#2a2665] border-gray-300"
                checked={answers[q.id] === opt.value}
                onChange={() => setAnswers({ ...answers, [q.id]: opt.value })}
              />
              <span className="text-lg text-gray-800">
                {t(language, opt.ar, opt.en)}
              </span>
            </label>
          ))}
        </div>
        <div className="flex justify-between mt-10">
          <Button
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            variant="outline"
            className="border-[#2a2665] text-[#2a2665] hover:bg-[#2a2665] hover:text-white"
          >
            {t(language, "السابق", "Previous")}
          </Button>
          <Button
            onClick={() =>
              setCurrentStep((s) => Math.min(totalSteps - 1, s + 1))
            }
            className="bg-[#2a2665] hover:bg-[#1a1545] text-white"
            disabled={!answers[q.id]}
          >
            {t(language, "التالي", "Next")}
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <Helmet>
        <title>
          {t(
            language,
            "تقييم المهارات | مركز راي للتدريب والاستشارات",
            "Skills Assessment | Ray Training & Consulting Center"
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
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t(language, "تقييم المهارات", "Skills Assessment")}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t(
              language,
              "اكتشف مستواك الحالي واحصل على توصيات تدريبية مناسبة.",
              "Discover your current level and get tailored training recommendations."
            )}
          </p>
        </div>
      </section>

      {/* مجالات التقييم + Assessment Form (side by side) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {t(language, "مجالات التقييم", "Evaluation Areas")}
            </h2>
            <p className="text-gray-700 mb-8">
              {t(
                language,
                "نغطي مجموعة من المجالات لتقييم المهارات وتحديد مستوى الخبرة بدقة",
                "We cover a range of areas to assess skills and determine expertise accurately"
              )}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: Evaluation Areas */}
            <div className="lg:col-span-4">
              <div className="bg-gray-50 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-bold text-[#2a2665] mb-4 border-b pb-2">
                  {t(language, "مجالات التقييم", "Evaluation Areas")}
                </h3>
                <ul className="space-y-2">
                  {[
                    {
                      icon: BarChart4,
                      text: t(
                        language,
                        "الاستراتيجية وإدارة الأداء",
                        "Strategy & Performance"
                      ),
                      color: "bg-blue-600",
                    },
                    {
                      icon: LineChart,
                      text: t(
                        language,
                        "التحول الرقمي",
                        "Digital Transformation"
                      ),
                      color: "bg-orange-600",
                    },
                    {
                      icon: Shield,
                      text: t(language, "الأمن السيبراني", "Cybersecurity"),
                      color: "bg-green-600",
                    },
                    {
                      icon: Users,
                      text: t(
                        language,
                        "التطوير المؤسسي",
                        "Organizational Development"
                      ),
                      color: "bg-purple-600",
                    },
                    {
                      icon: AlertTriangle,
                      text: t(language, "إدارة المخاطر", "Risk Management"),
                      color: "bg-red-600",
                    },
                    {
                      icon: Brain,
                      text: t(
                        language,
                        "تطبيقات الذكاء الاصطناعي",
                        "AI Applications"
                      ),
                      color: "bg-cyan-600",
                    },
                  ].map((area, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-md bg-white hover:bg-gray-100 transition-colors"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${area.color}`}
                      >
                        <area.icon className="h-4 w-4 text-white" />
                      </div>
                      <span>{area.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Assessment Form */}
            <div className="lg:col-span-8">
              {/* Progress */}
              {!showResults && (
                <div className="mb-6">
                  <div className="flex justify-between mb-2 text-sm font-medium text-gray-500">
                    <span>{t(language, "البداية", "Start")}</span>
                    <span>{t(language, "النتائج", "Results")}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#2a2665] rounded-full"
                      style={{ width: `${getProgressPercentage()}%` }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-center text-gray-500">
                    {t(language, "الخطوة", "Step")} {currentStep}{" "}
                    {t(language, "من", "of")} {totalSteps - 1}
                  </div>
                </div>
              )}

              {/* Content */}
              {currentStep === 1 && (
                <div className="max-w-3xl mx-auto">{renderIntroduction()}</div>
              )}
              {currentStep > 1 && currentStep < totalSteps && (
                <div className="max-w-3xl mx-auto">{renderQuestion()}</div>
              )}
              {/* Results could go here if you add renderResults() */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
