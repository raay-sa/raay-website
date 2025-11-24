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
  category?: {
    id: number;
    translations?: Array<{
      locale: string;
      title: string;
      created_at: string;
      updated_at: string;
      parent_id: number;
    }>;
  };
};

type ApiRecommendation = {
  id?: number;
  level: string;
  category_id: number;
  message?: string; // For "no program available" responses
  category?: {
    id: number;
    translations?: Array<{
      locale: string;
      title: string;
      created_at: string;
      updated_at: string;
      parent_id: number;
    }>;
  };
  teacher?: unknown;
  translations?: Array<{
    locale: string;
    title: string;
    description: string;
    learning: string[];
    requirement: string[];
    created_at: string;
    updated_at: string;
    parent_id: number;
  }>;
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
        const items: ApiQuestion[] = Array.isArray(json?.data) ? json.data : [];
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
      className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-[#2a2665] mb-6 text-center">
        {t(language, "تقييم المهارات", "Skills Assessment")}
      </h2>
      <p className="text-gray-700 mb-6">
        {t(
          language,
          "مرحبًا بك في تقييم المهارات الخاص بمركز راي للتدريب والاستشارات. هذا التقييم سيساعدنا على فهم مستوى مهاراتك الحالية وتقديم توصيات مخصصة للبرامج التدريبية المناسبة لتطوير قدراتك.",
          "Welcome to the Raay Training & Consulting Center Skills Assessment. This assessment will help us understand your current skill level and provide personalized recommendations for training programs to develop your capabilities."
        )}
      </p>
      <p className="text-gray-700 mb-6">
        {t(
          language,
          `سيتضمن التقييم ${questions.length} أسئلة حول مهاراتك في مجالات مختلفة. بناءً على إجاباتك، سنقدم لك تحليلاً للمهارات وتوصيات بالبرامج التدريبية المناسبة.`,
          `The assessment will include ${questions.length} questions about your skills in various areas. Based on your answers, we will provide you with a skill analysis and recommendations for appropriate training programs.`
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

  // Submit assessment function
  const submitAssessment = async () => {
    // Validate that all questions are answered
    const unansweredQuestions = questions.filter((q) => !answers[q.id]);
    if (unansweredQuestions.length > 0) {
      toast({
        title: t(language, "أسئلة غير مكتملة", "Incomplete Questions"),
        description: t(
          language,
          `يرجى الإجابة على جميع الأسئلة قبل الإرسال. ${unansweredQuestions.length} سؤال غير مكتمل.`,
          `Please answer all questions before submitting. ${unansweredQuestions.length} questions incomplete.`
        ),
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Transform answers to match API format
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, option]) => ({
          question_id: parseInt(questionId),
          option: option,
        })
      );

      const response = await fetch(`${API_BASE}/public/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: formattedAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = await response.json();
      setResults(json);
      setShowResults(true);
      setCurrentStep(totalSteps);

      toast({
        title: t(language, "تم إرسال التقييم", "Assessment Submitted"),
        description: t(
          language,
          "تم تحليل إجاباتك بنجاح",
          "Your answers have been analyzed successfully"
        ),
      });
    } catch (error: any) {
      console.error("Assessment submission error:", error);
      toast({
        title: t(language, "خطأ في الإرسال", "Submission Error"),
        description: t(
          language,
          "حدث خطأ أثناء إرسال التقييم",
          "An error occurred while submitting the assessment"
        ),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = () => {
    const q = questions[currentStep - 2];
    if (!q) return null;

    const isLastQuestion = currentStep === totalSteps - 1;

    return (
      <motion.div
        key={q.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-[#2a2665] mb-8 text-center">
          {q.question}
        </h2>

        <div className="space-y-6 mb-10">
          {OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <input
                type="radio"
                id={`q${q.id}-o${opt.value}`}
                name={`q-${q.id}`}
                checked={answers[q.id] === opt.value}
                onChange={() => setAnswers({ ...answers, [q.id]: opt.value })}
                className="w-4 h-4 text-[#2a2665] border-gray-300 focus:ring-[#2a2665]"
              />
              <label
                htmlFor={`q${q.id}-o${opt.value}`}
                className="text-lg text-gray-700 cursor-pointer hover:text-[#2a2665]"
              >
                {t(language, opt.ar, opt.en)}
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-10">
          <Button
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            variant="outline"
            className="border-[#2a2665] text-[#2a2665] hover:bg-[#2a2665] hover:text-white"
            disabled={submitting}
          >
            {t(language, "السابق", "Previous")}
          </Button>

          <Button
            onClick={() => {
              if (isLastQuestion) {
                submitAssessment();
              } else {
                setCurrentStep((s) => Math.min(totalSteps - 1, s + 1));
              }
            }}
            className="bg-[#2a2665] hover:bg-[#1a1545] text-white"
            disabled={!answers[q.id] || submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t(language, "جاري الإرسال...", "Submitting...")}
              </>
            ) : isLastQuestion ? (
              t(language, "عرض النتائج", "View Results")
            ) : (
              t(language, "التالي", "Next")
            )}
          </Button>
        </div>
      </motion.div>
    );
  };

  // Helper function to get translated text
  const getTranslatedText = (
    translations: any[] | undefined,
    field: string,
    fallback: string = ""
  ) => {
    if (!translations || !Array.isArray(translations)) {
      return fallback;
    }

    const currentLang = language === "ar" ? "ar" : "en";
    const translation = translations.find((t) => t.locale === currentLang);

    return translation?.[field] || fallback;
  };

  const renderResults = () => {
    if (!results || !results.programs) return null;

    // Calculate skill scores from answers
    const calculateSkillScores = () => {
      const categoryScores: {
        [key: string]: { total: number; count: number };
      } = {};

      questions.forEach((question) => {
        if (answers[question.id]) {
          // Get the translated category title
          const categoryTitle = getTranslatedText(
            question.category?.translations,
            "title",
            "General"
          );
          if (!categoryScores[categoryTitle]) {
            categoryScores[categoryTitle] = { total: 0, count: 0 };
          }
          categoryScores[categoryTitle].total += answers[question.id];
          categoryScores[categoryTitle].count += 1;
        }
      });

      const finalScores: { [key: string]: { score: number; level: string } } =
        {};

      Object.keys(categoryScores).forEach((category) => {
        const averageScore =
          categoryScores[category].total / categoryScores[category].count;
        let level = "beginner";

        if (averageScore >= 3.5) {
          level = "advanced";
        } else if (averageScore >= 2.5) {
          level = "intermediate";
        }

        finalScores[category] = {
          score: averageScore,
          level: level,
        };
      });

      return finalScores;
    };

    const skillScores = calculateSkillScores();

    const getSkillLevelText = (level: string) => {
      switch (level) {
        case "beginner":
          return t(language, "مبتدئ", "Beginner");
        case "intermediate":
          return t(language, "متوسط", "Intermediate");
        case "advanced":
          return t(language, "متقدم", "Advanced");
        default:
          return "";
      }
    };

    const getScoreColor = (score: number) => {
      if (score >= 3.5) return "bg-green-500";
      if (score >= 2.5) return "bg-yellow-500";
      return "bg-red-500";
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#2a2665] mb-8 text-center">
            {t(language, "نتائج التقييم", "Assessment Results")}
          </h2>

          <div className="mb-10">
            <h3 className="text-xl font-semibold text-[#2a2665] mb-6">
              {t(language, "تحليل المهارات", "Skills Analysis")}
            </h3>

            <div className="space-y-6">
              {Object.keys(skillScores).map((category) => (
                <div key={category} className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">
                      {category}
                    </span>
                    <span className="font-medium text-gray-700">
                      {Math.round(skillScores[category].score * 10) / 10}/4 -{" "}
                      {getSkillLevelText(skillScores[category].level)}
                    </span>
                  </div>
                  <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getScoreColor(
                        skillScores[category].score
                      )}`}
                      style={{
                        width: `${(skillScores[category].score / 4) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-semibold text-[#2a2665] mb-6">
              {t(
                language,
                "البرامج التدريبية الموصى بها",
                "Recommended Training Programs"
              )}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {results.programs.length > 0 ? (
                results.programs.map((program, index) => {
                  // Check if this is a "no program available" response
                  if (program.message) {
                    return (
                      <Card
                        key={index}
                        className="border-2 border-[#2a2665]/10 hover:border-[#2a2665]/30 transition-all"
                      >
                        <CardHeader className="bg-[#f3f4ff] border-b">
                          <CardTitle className="text-[#2a2665]">
                            {t(
                              language,
                              "لا توجد برامج متاحة",
                              "No Programs Available"
                            )}
                          </CardTitle>
                          <CardDescription>
                            {t(
                              language,
                              `المستوى: ${t(
                                language,
                                program.level === "خبير" ||
                                  program.level === "Expert"
                                  ? "خبير"
                                  : program.level === "متقدم" ||
                                    program.level === "Advanced"
                                  ? "متقدم"
                                  : program.level === "متوسط" ||
                                    program.level === "Intermediate"
                                  ? "متوسط"
                                  : "مبتدئ",
                                program.level
                              )}`,
                              `Level: ${program.level}`
                            )}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="text-gray-700">
                            {t(
                              language,
                              program.message,
                              "No programs available for this category at this level currently."
                            )}
                          </p>
                        </CardContent>
                        <CardFooter className="border-t pt-4">
                          <Button
                            className="w-full bg-[#2a2665] hover:bg-[#1a1545] text-white"
                            onClick={() => (window.location.href = "/programs")}
                          >
                            {t(
                              language,
                              "استعرض جميع البرامج",
                              "Browse All Programs"
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  }

                  // Regular program with data
                  const programTitle = getTranslatedText(
                    program.translations,
                    "title",
                    `Program ${program.id}`
                  );
                  const programDescription = getTranslatedText(
                    program.translations,
                    "description",
                    ""
                  );
                  const categoryTitle = getTranslatedText(
                    program.category?.translations,
                    "title",
                    ""
                  );

                  return (
                    <Card
                      key={index}
                      className="border-2 border-[#2a2665]/10 hover:border-[#2a2665]/30 transition-all"
                    >
                      <CardHeader className="bg-[#f3f4ff] border-b">
                        <CardTitle className="text-[#2a2665]">
                          {programTitle}
                        </CardTitle>
                        <CardDescription>
                          {t(
                            language,
                            `المستوى: ${t(
                              language,
                              program.level === "خبير" ||
                                program.level === "Expert"
                                ? "خبير"
                                : program.level === "متقدم" ||
                                  program.level === "Advanced"
                                ? "متقدم"
                                : program.level === "متوسط" ||
                                  program.level === "Intermediate"
                                ? "متوسط"
                                : "مبتدئ",
                              program.level
                            )}`,
                            `Level: ${program.level}`
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        {programDescription && (
                          <p className="text-gray-700 mb-4">
                            {programDescription}
                          </p>
                        )}
                        {program.translations &&
                          program.translations[0]?.learning && (
                            <ul className="space-y-2 list-disc list-inside text-gray-700">
                              {program.translations[0].learning
                                .slice(0, 3)
                                .map((item: string, idx: number) => (
                                  <li key={idx}>{item}</li>
                                ))}
                            </ul>
                          )}
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button
                          className="w-full bg-[#2a2665] hover:bg-[#1a1545] text-white"
                          onClick={() => (window.location.href = "/programs")}
                        >
                          {t(language, "استعرض البرامج", "Browse Programs")}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-2 text-center text-gray-500 py-10">
                  {t(
                    language,
                    "لم يتم العثور على توصيات. يرجى إكمال التقييم للحصول على توصيات مخصصة.",
                    "No recommendations found. Please complete the assessment to get personalized recommendations."
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button
              onClick={() => {
                setCurrentStep(1);
                setAnswers({});
                setResults(null);
                setShowResults(false);
              }}
              className="bg-[#b29567] hover:bg-[#927754] text-white"
            >
              {t(language, "إعادة التقييم", "Retake Assessment")}
            </Button>
          </div>
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

      {/* Hero Section with Video Background */}
      <section className="relative py-24 text-white bg-[#2a2665]">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-[#2a2665] opacity-80 z-10"></div>
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            src={raayVideo}
          ></video>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              {t(language, "تقييم المهارات", "Skills Assessment")}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {t(
                language,
                "اكتشف مستوى مهاراتك الحالي، والبرامج التدريبية المناسبة لتطوير قدراتك المهنية",
                "Discover your current skill level and suitable training programs to develop your professional capabilities"
              )}
            </p>
          </div>
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
                <div className="max-w-3xl mx-auto mb-10">
                  <div className="flex justify-between mb-2 text-sm font-medium text-gray-500">
                    <span>{t(language, "البداية", "Start")}</span>
                    <span>{t(language, "النتائج", "Results")}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#2a2665] rounded-full"
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-sm text-center text-gray-500">
                    {t(
                      language,
                      `الخطوة ${currentStep} من ${totalSteps - 1}`,
                      `Step ${currentStep} of ${totalSteps - 1}`
                    )}
                  </div>
                </div>
              )}

              {/* Content */}
              {currentStep === 1 && renderIntroduction()}
              {currentStep > 1 && currentStep < totalSteps && renderQuestion()}
              {showResults && renderResults()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
