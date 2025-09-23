import React from "react";
import { useI18nStore } from "@/lib/i18n";
import { CategoryCard } from "@/components/ui/category-card";
import { BookOpen, UsersRound, MessageSquareText } from "lucide-react";

// item model for inside-card lists (kept for future use)
interface TrainingItem {
  id: number;
  title: string;
  titleEn?: string;
  category?: string;
}

interface TrainingCategory {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  imagePath: string;
  href: string;
  backgroundColor: string;
  items: TrainingItem[];
}

export default function TrainingCategoriesSection() {
  const { language } = useI18nStore();

  const trainingTracks = [
    {
      id: 1,
      title: "تطوير القيادات لتحقيق التميز المؤسسي",
      titleEn: "Leadership Development",
      category: "leadership-development",
    },
    {
      id: 2,
      title: "التحول الرقمي",
      titleEn: "Digital Transformation",
      category: "digital-transformation",
    },
    {
      id: 3,
      title: "تجنب المخاطر للأفراد والمنظمات",
      titleEn: "Risk Avoidance",
      category: "risk-avoidance",
    },
    {
      id: 4,
      title: "القدرات السيبرانية",
      titleEn: "Cybersecurity",
      category: "cyber-security",
    },
    {
      id: 5,
      title: "الذكاء الاصطناعي",
      titleEn: "Artificial Intelligence",
      category: "artificial-intelligence",
    },
    {
      id: 6,
      title: "علم البيانات",
      titleEn: "Data Science",
      category: "data-science",
    },
  ];

  const workshops = [
    {
      id: 1,
      title: "ورشة تطبيقات الذكاء الاصطناعي في الأعمال",
      titleEn: "AI Applications in Business",
    },
    {
      id: 2,
      title: "ورشة تحليل وإدارة المخاطر السيبرانية",
      titleEn: "Cybersecurity Risk Management",
    },
    {
      id: 3,
      title: "ورشة تطوير استراتيجيات التحول الرقمي",
      titleEn: "Digital Transformation Strategies",
    },
    {
      id: 4,
      title: "ورشة تطبيقات البيانات الضخمة في اتخاذ القرارات",
      titleEn: "Big Data in Decision Making",
    },
    {
      id: 5,
      title: "ورشة أساسيات الأمن السيبراني للمؤسسات",
      titleEn: "Cybersecurity Fundamentals",
    },
  ];

  const consultations = [
    {
      id: 1,
      title: "استشارات الأمن السيبراني",
      titleEn: "Cybersecurity Consulting",
    },
    {
      id: 2,
      title: "استشارات التحول الرقمي",
      titleEn: "Digital Transformation Consulting",
    },
    {
      id: 3,
      title: "استشارات إدارة المخاطر",
      titleEn: "Risk Management Consulting",
    },
    {
      id: 4,
      title: "استشارات بناء الهوية المؤسسية",
      titleEn: "Corporate Identity Consulting",
    },
    {
      id: 5,
      title: "استشارات التحول المؤسسي",
      titleEn: "Organizational Transformation",
    },
  ];

  const trainingCategories: TrainingCategory[] = [
    {
      id: "training-courses",
      title: "المسارات التدريبية",
      titleEn: "Training Tracks",
      description:
        "مسارات تدريبية متخصصة في مجالات تطوير القيادات والتحول الرقمي والأمن السيبراني والذكاء الاصطناعي وتجنب المخاطر، مصممة لبناء وتطوير المهارات الاحترافية",
      descriptionEn:
        "Specialized training tracks in leadership development, digital transformation, cybersecurity, artificial intelligence, and risk avoidance, designed to build and develop professional skills",
      imagePath: "/images/categories/training-paths-bg.svg",
      href: "/tracks",
      backgroundColor: "#2a2665",
      items: [],
    },
    {
      id: "workshops",
      title: "ورش العمل",
      titleEn: "Workshops",
      description:
        "ورش عمل تفاعلية يقدمها خبراء متخصصون من القطاعين الحكومي والخاص، تركز على حلول عملية للتحديات المهنية والتقنية المعاصرة",
      descriptionEn:
        "Interactive workshops delivered by specialized experts from both government and private sectors, focusing on practical solutions for contemporary professional and technical challenges",
      imagePath: "/images/categories/workshops-bg.svg",
      href: "/workshops",
      backgroundColor: "#446591",
      items: workshops,
    },
    {
      id: "consultations",
      title: "الاستشارات",
      titleEn: "Consultations",
      description:
        "خدمات استشارية متخصصة تقدم حلولاً مبتكرة للتحديات المؤسسية وتطوير الأداء وفق أفضل الممارسات العالمية",
      descriptionEn:
        "Specialized consulting services providing innovative solutions for institutional challenges and performance development according to global best practices",
      imagePath: "/images/categories/consultations-bg.svg",
      href: "/consulting",
      backgroundColor: "#9e78a9",
      items: consultations,
    },
  ];

  const getCategoryColor = (id: string) => {
    switch (id) {
      case "training-courses":
        return "#2a2665";
      case "workshops":
        return "#446591";
      case "consultations":
        return "#9e78a9";
      default:
        return "#2a2665";
    }
  };

  // icon appearance (thicker + navy tint like your screenshot)
  const ICON_CLASS = "w-12 h-12 md:w-14 md:h-14";
  const ICON_STROKE = 2.6;
  const ICON_TINT_CLASS = "text-[#0F3C5C]";

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "training-courses":
        return (
          <BookOpen
            className={`${ICON_CLASS} ${ICON_TINT_CLASS}`}
            strokeWidth={ICON_STROKE}
            aria-hidden
          />
        );
      case "workshops":
        return (
          <UsersRound
            className={`${ICON_CLASS} ${ICON_TINT_CLASS}`}
            strokeWidth={ICON_STROKE}
            aria-hidden
          />
        );
      case "consultations":
        return (
          <MessageSquareText
            className={`${ICON_CLASS} ${ICON_TINT_CLASS}`}
            strokeWidth={ICON_STROKE}
            aria-hidden
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {trainingCategories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              titleEn={category.titleEn}
              description={category.description}
              descriptionEn={category.descriptionEn}
              href={category.href}
              color={getCategoryColor(category.id)}
              icon={getCategoryIcon(category.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
