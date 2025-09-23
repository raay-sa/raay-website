import React, { useState } from "react";
import { useI18nStore } from "@/lib/i18n";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Users,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Target,
  List,
  ChevronRight,
  Check,
  User,
  Globe,
  LucideIcon,
  PencilRuler,
} from "lucide-react";
import raayVideo from "../assets/videos/raay-center-video.mp4";

// Type definitions
interface Workshop {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  duration: { ar: string; en: string };
  date: { ar: string; en: string };
  location: { ar: string; en: string };
  price: number;
  category: { ar: string; en: string };
  image: string;
  instructor: {
    name: { ar: string; en: string };
    title: { ar: string; en: string };
    image: string;
  };
  objectives: { ar: string[]; en: string[] };
  audience: { ar: string[]; en: string[] };
  agenda: {
    ar: { title: string; items: string[] }[];
    en: { title: string; items: string[] }[];
  };
}

// Workshop registration form schema
const workshopRegistrationSchema = z.object({
  name: z.string().min(2, {
    message: "الاسم يجب أن يحتوي على حرفين على الأقل",
  }),
  email: z.string().email({
    message: "البريد الإلكتروني غير صحيح",
  }),
  phone: z.string().min(10, {
    message: "رقم الهاتف يجب أن يحتوي على 10 أرقام على الأقل",
  }),
  organization: z.string().min(2, {
    message: "اسم المنظمة يجب أن يحتوي على حرفين على الأقل",
  }),
  position: z.string().min(2, {
    message: "المسمى الوظيفي يجب أن يحتوي على حرفين على الأقل",
  }),
  workshopId: z.string().min(1, {
    message: "يرجى اختيار ورشة العمل",
  }),
  attendees: z.string().min(1, {
    message: "يرجى تحديد عدد المشاركين",
  }),
  specialRequests: z.string().optional(),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
});

// Categories
const workshopCategories = [
  {
    id: "leadership",
    label: { ar: "تطوير القيادات", en: "Leadership Development" },
    icon: Users,
    color: "bg-blue-600",
  },
  {
    id: "digital",
    label: { ar: "التحول الرقمي", en: "Digital Transformation" },
    icon: Globe,
    color: "bg-purple-600",
  },
  {
    id: "cybersecurity",
    label: { ar: "الأمن السيبراني", en: "Cybersecurity" },
    icon: PencilRuler,
    color: "bg-green-600",
  },
  {
    id: "ai",
    label: { ar: "الذكاء الاصطناعي", en: "Artificial Intelligence" },
    icon: PencilRuler,
    color: "bg-yellow-600",
  },
  {
    id: "all",
    label: { ar: "جميع الورش", en: "All Workshops" },
    icon: List,
    color: "bg-[#2a2665]",
  },
];

// Sample workshops data
const workshops: Workshop[] = [
  {
    id: "ws-001",
    title: {
      ar: "إدارة وقيادة فرق العمل عن بعد",
      en: "Managing and Leading Remote Teams",
    },
    description: {
      ar: "ورشة عمل تفاعلية تركز على تطوير مهارات قيادة الفرق عن بعد وتحسين الإنتاجية والتواصل الفعال في بيئة العمل الافتراضية. تتضمن الورشة تمارين عملية وحالات دراسية واقعية.",
      en: "An interactive workshop focusing on developing remote team leadership skills and improving productivity and effective communication in a virtual work environment. The workshop includes practical exercises and real case studies.",
    },
    duration: {
      ar: "يومين (16 ساعة)",
      en: "Two days (16 hours)",
    },
    date: {
      ar: "10-11 يونيو 2025",
      en: "June 10-11, 2025",
    },
    location: {
      ar: "مركز راي للتدريب - الرياض",
      en: "Raay Training Center - Riyadh",
    },
    price: 3500,
    category: {
      ar: "تطوير القيادات",
      en: "Leadership Development",
    },
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    instructor: {
      name: {
        ar: "د. محمد العمري",
        en: "Dr. Mohammed Al-Amri",
      },
      title: {
        ar: "مستشار تطوير قيادات",
        en: "Leadership Development Consultant",
      },
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    objectives: {
      ar: [
        "فهم تحديات وفرص إدارة الفرق عن بعد",
        "تطوير مهارات التواصل الفعال في البيئة الافتراضية",
        "تعلم استراتيجيات تحفيز وتمكين أعضاء الفريق عن بعد",
        "بناء ثقافة تنظيمية إيجابية في بيئة العمل عن بعد",
        "تطبيق أدوات وتقنيات لقياس وتحسين إنتاجية الفريق",
      ],
      en: [
        "Understanding challenges and opportunities of remote team management",
        "Developing effective communication skills in virtual environments",
        "Learning strategies to motivate and empower team members remotely",
        "Building a positive organizational culture in remote work environments",
        "Applying tools and techniques to measure and improve team productivity",
      ],
    },
    audience: {
      ar: [
        "المدراء وقادة الفرق",
        "مدراء الموارد البشرية",
        "المشرفون ورؤساء الأقسام",
        "المسؤولون التنفيذيون",
        "المهنيون الذين يقودون فرقًا افتراضية",
      ],
      en: [
        "Managers and team leaders",
        "HR managers",
        "Supervisors and department heads",
        "Executives",
        "Professionals leading virtual teams",
      ],
    },
    agenda: {
      ar: [
        {
          title: "اليوم الأول",
          items: [
            "تحديات وفرص العمل عن بعد",
            "أساسيات القيادة الفعالة عن بعد",
            "استراتيجيات التواصل في البيئة الافتراضية",
            "بناء الثقة والعلاقات في الفرق الافتراضية",
            "تمارين وحالات دراسية",
          ],
        },
        {
          title: "اليوم الثاني",
          items: [
            "إدارة الأداء والإنتاجية عن بعد",
            "أدوات وتقنيات التعاون الفعال",
            "حل المشكلات وإدارة النزاعات افتراضيًا",
            "بناء ثقافة تنظيمية إيجابية عن بعد",
            "خطة عمل شخصية للتطبيق",
          ],
        },
      ],
      en: [
        {
          title: "Day 1",
          items: [
            "Remote work challenges and opportunities",
            "Foundations of effective remote leadership",
            "Communication strategies in virtual environments",
            "Building trust and relationships in virtual teams",
            "Exercises and case studies",
          ],
        },
        {
          title: "Day 2",
          items: [
            "Managing performance and productivity remotely",
            "Effective collaboration tools and techniques",
            "Problem-solving and conflict management virtually",
            "Building positive organizational culture remotely",
            "Personal action plan for implementation",
          ],
        },
      ],
    },
  },
  {
    id: "ws-002",
    title: {
      ar: "استراتيجيات التحول الرقمي للمؤسسات",
      en: "Digital Transformation Strategies for Organizations",
    },
    description: {
      ar: "ورشة عمل متخصصة تناقش استراتيجيات وتقنيات التحول الرقمي للمؤسسات وآليات تطبيق التقنيات الحديثة لتحسين الكفاءة التشغيلية وتعزيز تجربة العملاء وتحقيق ميزة تنافسية.",
      en: "A specialized workshop discussing digital transformation strategies and techniques for organizations and mechanisms for applying modern technologies to improve operational efficiency, enhance customer experience, and achieve competitive advantage.",
    },
    duration: {
      ar: "ثلاثة أيام (24 ساعة)",
      en: "Three days (24 hours)",
    },
    date: {
      ar: "18-20 يوليو 2025",
      en: "July 18-20, 2025",
    },
    location: {
      ar: "مركز راي للتدريب - جدة",
      en: "Raay Training Center - Jeddah",
    },
    price: 4500,
    category: {
      ar: "التحول الرقمي",
      en: "Digital Transformation",
    },
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    instructor: {
      name: {
        ar: "م. فيصل الحربي",
        en: "Eng. Faisal Al-Harbi",
      },
      title: {
        ar: "خبير التحول الرقمي",
        en: "Digital Transformation Expert",
      },
      image:
        "https://images.unsplash.com/photo-1542178243-bc20204b769f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    },
    objectives: {
      ar: [
        "فهم مفهوم وأبعاد التحول الرقمي وتأثيره على المؤسسات",
        "تطوير استراتيجية تحول رقمي فعالة ومتكاملة",
        "التعرف على التقنيات الحديثة المستخدمة في التحول الرقمي",
        "دراسة حالات ناجحة في التحول الرقمي",
        "تحديد خطوات تنفيذ مشاريع التحول الرقمي وإدارة التغيير",
      ],
      en: [
        "Understanding the concept and dimensions of digital transformation and its impact on organizations",
        "Developing an effective and integrated digital transformation strategy",
        "Learning about modern technologies used in digital transformation",
        "Studying successful cases in digital transformation",
        "Identifying steps for implementing digital transformation projects and managing change",
      ],
    },
    audience: {
      ar: [
        "مدراء تقنية المعلومات",
        "مدراء التطوير والاستراتيجية",
        "مدراء المشاريع",
        "المسؤولون التنفيذيون",
        "المهتمون بمجال التحول الرقمي",
      ],
      en: [
        "IT managers",
        "Development and strategy managers",
        "Project managers",
        "Executives",
        "Those interested in digital transformation",
      ],
    },
    agenda: {
      ar: [
        {
          title: "اليوم الأول",
          items: [
            "مقدمة في التحول الرقمي وأهميته",
            "الاتجاهات العالمية في التحول الرقمي",
            "التقنيات الحديثة المستخدمة في التحول الرقمي",
            "دراسة حالات ناجحة في التحول الرقمي",
            "تمارين وأنشطة تطبيقية",
          ],
        },
        {
          title: "اليوم الثاني",
          items: [
            "بناء استراتيجية التحول الرقمي",
            "تقييم جاهزية المؤسسة للتحول الرقمي",
            "خارطة طريق التحول الرقمي",
            "تحديد المبادرات والمشاريع الرقمية",
            "ورشة عمل تطبيقية",
          ],
        },
        {
          title: "اليوم الثالث",
          items: [
            "إدارة مشاريع التحول الرقمي",
            "إدارة التغيير في مبادرات التحول الرقمي",
            "قياس نجاح مبادرات التحول الرقمي",
            "التحديات والمخاطر وسبل مواجهتها",
            "بناء خطة عمل شخصية",
          ],
        },
      ],
      en: [
        {
          title: "Day 1",
          items: [
            "Introduction to digital transformation and its importance",
            "Global trends in digital transformation",
            "Modern technologies used in digital transformation",
            "Case studies of successful digital transformation",
            "Exercises and practical activities",
          ],
        },
        {
          title: "Day 2",
          items: [
            "Building a digital transformation strategy",
            "Assessing organizational readiness for digital transformation",
            "Digital transformation roadmap",
            "Identifying digital initiatives and projects",
            "Practical workshop",
          ],
        },
        {
          title: "Day 3",
          items: [
            "Managing digital transformation projects",
            "Change management in digital transformation initiatives",
            "Measuring the success of digital transformation initiatives",
            "Challenges, risks, and ways to address them",
            "Building a personal action plan",
          ],
        },
      ],
    },
  },
  {
    id: "ws-003",
    title: {
      ar: "الأمن السيبراني وحماية البيانات",
      en: "Cybersecurity and Data Protection",
    },
    description: {
      ar: "ورشة عمل متقدمة تركز على أحدث تقنيات واستراتيجيات الأمن السيبراني لحماية البيانات والأنظمة المعلوماتية من التهديدات المتزايدة. تتضمن الورشة جلسات عملية وتدريبات على اكتشاف الثغرات الأمنية وطرق معالجتها.",
      en: "An advanced workshop focusing on the latest cybersecurity techniques and strategies to protect data and information systems from growing threats. The workshop includes practical sessions and training on discovering security vulnerabilities and methods to address them.",
    },
    duration: {
      ar: "يومين (16 ساعة)",
      en: "Two days (16 hours)",
    },
    date: {
      ar: "5-6 أغسطس 2025",
      en: "August 5-6, 2025",
    },
    location: {
      ar: "مركز راي للتدريب - الرياض",
      en: "Raay Training Center - Riyadh",
    },
    price: 4000,
    category: {
      ar: "الأمن السيبراني",
      en: "Cybersecurity",
    },
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    instructor: {
      name: {
        ar: "م. أحمد القحطاني",
        en: "Eng. Ahmed Al-Qahtani",
      },
      title: {
        ar: "خبير الأمن السيبراني",
        en: "Cybersecurity Expert",
      },
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    objectives: {
      ar: [
        "فهم المخاطر والتهديدات السيبرانية المعاصرة",
        "تعلم أساليب حماية البيانات والمعلومات الحساسة",
        "التعرف على أفضل الممارسات لتأمين البنية التحتية المعلوماتية",
        "فهم إطار عمل الاستجابة للحوادث الأمنية",
        "تطوير استراتيجية أمنية متكاملة للمؤسسات",
      ],
      en: [
        "Understanding contemporary cyber risks and threats",
        "Learning methods to protect sensitive data and information",
        "Learning best practices for securing information infrastructure",
        "Understanding the security incident response framework",
        "Developing an integrated security strategy for organizations",
      ],
    },
    audience: {
      ar: [
        "مدراء أمن المعلومات",
        "متخصصو تقنية المعلومات",
        "مسؤولو حماية البيانات",
        "مدراء المخاطر",
        "المهتمون بمجال الأمن السيبراني",
      ],
      en: [
        "Information security managers",
        "IT specialists",
        "Data protection officers",
        "Risk managers",
        "Those interested in cybersecurity",
      ],
    },
    agenda: {
      ar: [
        {
          title: "اليوم الأول",
          items: [
            "مقدمة في الأمن السيبراني والمفاهيم الأساسية",
            "المخاطر والتهديدات السيبرانية المعاصرة",
            "حماية البيانات والخصوصية",
            "أمن البنية التحتية والشبكات",
            "تدريب عملي: تقييم المخاطر الأمنية",
          ],
        },
        {
          title: "اليوم الثاني",
          items: [
            "استراتيجيات الأمن السيبراني",
            "الاستجابة للحوادث الأمنية",
            "أمن التطبيقات والأنظمة",
            "الامتثال للمعايير والتشريعات الأمنية",
            "تدريب عملي: إنشاء خطة أمنية متكاملة",
          ],
        },
      ],
      en: [
        {
          title: "Day 1",
          items: [
            "Introduction to cybersecurity and basic concepts",
            "Contemporary cyber risks and threats",
            "Data protection and privacy",
            "Infrastructure and network security",
            "Practical training: Security risk assessment",
          ],
        },
        {
          title: "Day 2",
          items: [
            "Cybersecurity strategies",
            "Security incident response",
            "Application and system security",
            "Compliance with security standards and regulations",
            "Practical training: Creating an integrated security plan",
          ],
        },
      ],
    },
  },
  {
    id: "ws-004",
    title: {
      ar: "الذكاء الاصطناعي وتطبيقاته في الأعمال",
      en: "Artificial Intelligence and its Business Applications",
    },
    description: {
      ar: "ورشة عمل تفاعلية تستكشف تطبيقات الذكاء الاصطناعي في مجال الأعمال وكيفية الاستفادة منه لتحسين العمليات واتخاذ القرارات وتعزيز الميزة التنافسية. تتضمن الورشة جلسات عملية ودراسات حالة واقعية.",
      en: "An interactive workshop exploring artificial intelligence applications in business and how to leverage it to improve operations, decision-making, and enhance competitive advantage. The workshop includes practical sessions and real case studies.",
    },
    duration: {
      ar: "يومين (16 ساعة)",
      en: "Two days (16 hours)",
    },
    date: {
      ar: "22-23 سبتمبر 2025",
      en: "September 22-23, 2025",
    },
    location: {
      ar: "مركز راي للتدريب - الدمام",
      en: "Raay Training Center - Dammam",
    },
    price: 3800,
    category: {
      ar: "الذكاء الاصطناعي",
      en: "Artificial Intelligence",
    },
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    instructor: {
      name: {
        ar: "د. سارة الشمري",
        en: "Dr. Sarah Al-Shammari",
      },
      title: {
        ar: "خبيرة الذكاء الاصطناعي",
        en: "Artificial Intelligence Expert",
      },
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    },
    objectives: {
      ar: [
        "فهم مفاهيم الذكاء الاصطناعي وتعلم الآلة",
        "استكشاف تطبيقات الذكاء الاصطناعي في مختلف قطاعات الأعمال",
        "التعرف على كيفية استخدام الذكاء الاصطناعي لتحسين اتخاذ القرار",
        "فهم التحديات والفرص المرتبطة بتطبيق الذكاء الاصطناعي",
        "تطوير استراتيجية لتبني الذكاء الاصطناعي في المؤسسة",
      ],
      en: [
        "Understanding concepts of artificial intelligence and machine learning",
        "Exploring AI applications across various business sectors",
        "Learning how to use AI to improve decision-making",
        "Understanding challenges and opportunities associated with AI implementation",
        "Developing a strategy for adopting AI in the organization",
      ],
    },
    audience: {
      ar: [
        "المدراء التنفيذيون",
        "مدراء التطوير والاستراتيجية",
        "مدراء تقنية المعلومات",
        "متخذو القرار",
        "المهتمون بمجال الذكاء الاصطناعي",
      ],
      en: [
        "Executives",
        "Development and strategy managers",
        "IT managers",
        "Decision-makers",
        "Those interested in artificial intelligence",
      ],
    },
    agenda: {
      ar: [
        {
          title: "اليوم الأول",
          items: [
            "مقدمة في الذكاء الاصطناعي وتعلم الآلة",
            "الاتجاهات الحالية في تطبيقات الذكاء الاصطناعي",
            "تطبيقات الذكاء الاصطناعي في التسويق وخدمة العملاء",
            "تطبيقات الذكاء الاصطناعي في العمليات والإنتاج",
            "دراسات حالة: قصص نجاح في تطبيق الذكاء الاصطناعي",
          ],
        },
        {
          title: "اليوم الثاني",
          items: [
            "استراتيجيات تبني الذكاء الاصطناعي في المؤسسات",
            "إدارة التغيير عند تنفيذ مشاريع الذكاء الاصطناعي",
            "الاعتبارات الأخلاقية والقانونية للذكاء الاصطناعي",
            "قياس عائد الاستثمار في مشاريع الذكاء الاصطناعي",
            "ورشة عمل: تطوير خطة لتبني الذكاء الاصطناعي",
          ],
        },
      ],
      en: [
        {
          title: "Day 1",
          items: [
            "Introduction to artificial intelligence and machine learning",
            "Current trends in AI applications",
            "AI applications in marketing and customer service",
            "AI applications in operations and production",
            "Case studies: Success stories in AI implementation",
          ],
        },
        {
          title: "Day 2",
          items: [
            "Strategies for adopting AI in organizations",
            "Change management when implementing AI projects",
            "Ethical and legal considerations for AI",
            "Measuring return on investment in AI projects",
            "Workshop: Developing a plan for AI adoption",
          ],
        },
      ],
    },
  },
];

// Component for workshop card
interface WorkshopCardProps {
  workshop: Workshop;
  onClick: () => void;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop, onClick }) => {
  const { language } = useI18nStore();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={workshop.image}
          alt={language === "ar" ? workshop.title.ar : workshop.title.en}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-xs font-medium bg-[#2a2665]/10 text-[#2a2665] px-3 py-1 rounded-full">
            {language === "ar" ? workshop.category.ar : workshop.category.en}
          </div>
          <div className="text-xs font-medium bg-[#b29567]/10 text-[#b29567] px-3 py-1 rounded-full">
            {language === "ar" ? workshop.duration.ar : workshop.duration.en}
          </div>
        </div>
        <h3 className="text-lg font-bold text-[#2a2665] mb-2">
          {language === "ar" ? workshop.title.ar : workshop.title.en}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {language === "ar"
            ? workshop.description.ar
            : workshop.description.en}
        </p>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Calendar className="h-4 w-4 text-[#b29567]" />
            <span>
              {language === "ar" ? workshop.date.ar : workshop.date.en}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="h-4 w-4 text-[#b29567]" />
            <span>
              {language === "ar" ? workshop.location.ar : workshop.location.en}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <User className="h-4 w-4 text-[#b29567]" />
            <span>
              {language === "ar"
                ? workshop.instructor.name.ar
                : workshop.instructor.name.en}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-[#2a2665] font-bold text-lg">
            {workshop.price} ريال
          </div>
          <Button
            variant="default"
            className="bg-[#2a2665] hover:bg-[#1a1545] text-white"
            onClick={onClick}
          >
            {language === "ar" ? "التفاصيل والتسجيل" : "Details & Registration"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function WorkshopsPage() {
  const { language } = useI18nStore();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] =
    useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof workshopRegistrationSchema>>({
    resolver: zodResolver(workshopRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      position: "",
      workshopId: selectedWorkshop?.id || "",
      attendees: "1",
      specialRequests: "",
      agreeToTerms: false,
    },
  });

  // Update form when selected workshop changes
  React.useEffect(() => {
    if (selectedWorkshop) {
      form.setValue("workshopId", selectedWorkshop.id);
    }
  }, [selectedWorkshop, form]);

  // Handle form submission
  const onSubmit = (values: z.infer<typeof workshopRegistrationSchema>) => {
    console.log("Workshop registration submitted:", values);

    // Simulating API request delay
    setTimeout(() => {
      // Show success message
      toast({
        title:
          language === "ar"
            ? "تم إرسال طلب التسجيل بنجاح"
            : "Registration request sent successfully",
        description:
          language === "ar"
            ? "سيتم التواصل معك قريباً لتأكيد التسجيل"
            : "We will contact you soon to confirm your registration",
        variant: "default",
      });

      // Close dialog
      setIsRegistrationDialogOpen(false);

      // Reset form
      form.reset();
    }, 1000);
  };

  // Filter workshops by category
  const filteredWorkshops =
    selectedCategory === "all"
      ? workshops
      : workshops.filter((workshop) =>
          (language === "ar" ? workshop.category.ar : workshop.category.en)
            .toLowerCase()
            .includes(
              (language === "ar"
                ? workshopCategories.find((c) => c.id === selectedCategory)
                    ?.label.ar
                : workshopCategories.find((c) => c.id === selectedCategory)
                    ?.label.en
              )?.toLowerCase() || ""
            )
        );

  // View workshop details
  const viewWorkshopDetails = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsDialogOpen(true);
  };

  // Open registration dialog
  const openRegistrationDialog = () => {
    setIsDialogOpen(false);
    setIsRegistrationDialogOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>
          {language === "ar"
            ? "ورش العمل | مركز راي للتدريب والاستشارات"
            : "Workshops | Ray Training & Consulting Center"}
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
            playsInline
            src={raayVideo}
          ></video>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              {language === "ar" ? "ورش العمل" : "Workshops"}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === "ar"
                ? "ورش عمل تفاعلية وعملية تقدم خبرات تعليمية فريدة على يد نخبة من المدربين والخبراء المتخصصين"
                : "Interactive and practical workshops providing unique educational experiences led by elite trainers and specialized experts"}
            </p>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {language === "ar" ? "استكشف ورش العمل" : "Explore Workshops"}
            </h2>
            <p className="text-gray-700 mb-8">
              {language === "ar"
                ? "اختر من بين مجموعة متنوعة من ورش العمل المصممة لتطوير مهاراتك وتعزيز قدراتك المهنية"
                : "Choose from a variety of workshops designed to develop your skills and enhance your professional capabilities"}
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {workshopCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  className={`flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? "bg-[#2a2665] text-white"
                      : "border-[#2a2665] text-[#2a2665] hover:bg-[#2a2665] hover:text-white"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <category.icon className="h-4 w-4" />
                  <span>
                    {language === "ar" ? category.label.ar : category.label.en}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Workshops Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkshops.map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                onClick={() => viewWorkshopDetails(workshop)}
              />
            ))}
          </div>

          {filteredWorkshops.length === 0 && (
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <p className="text-lg text-gray-600">
                {language === "ar"
                  ? "لا توجد ورش عمل متاحة في هذه الفئة حالياً"
                  : "No workshops available in this category at the moment"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {language === "ar" ? "مميزات ورش العمل" : "Workshop Benefits"}
            </h2>
            <p className="text-gray-700 mb-8">
              {language === "ar"
                ? "توفر ورش العمل لدينا تجربة تعليمية فريدة وعملية لتعزيز مهاراتك وتطوير قدراتك المهنية"
                : "Our workshops provide a unique and practical learning experience to enhance your skills and develop your professional capabilities"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-[#f8f9fa]">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-[#2a2665]/10 rounded-full flex items-center justify-center mb-4">
                  <PencilRuler className="h-6 w-6 text-[#2a2665]" />
                </div>
                <CardTitle className="text-[#2a2665]">
                  {language === "ar" ? "تعلم عملي" : "Practical Learning"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  {language === "ar"
                    ? "تركز ورش العمل على التطبيق العملي والتدريبات التفاعلية لضمان اكتساب المهارات وتطبيقها في بيئة العمل"
                    : "Workshops focus on practical application and interactive exercises to ensure skills acquisition and application in the work environment"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#f8f9fa]">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-[#b29567]/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#b29567]" />
                </div>
                <CardTitle className="text-[#2a2665]">
                  {language === "ar"
                    ? "مدربون متخصصون"
                    : "Specialized Trainers"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  {language === "ar"
                    ? "يقدم ورش العمل نخبة من المدربين المتخصصين ذوي الخبرة العملية والأكاديمية في مجالاتهم"
                    : "Workshops are delivered by an elite group of specialized trainers with practical and academic experience in their fields"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#f8f9fa]">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-[#2a2665]/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-[#2a2665]" />
                </div>
                <CardTitle className="text-[#2a2665]">
                  {language === "ar" ? "محتوى مخصص" : "Customized Content"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  {language === "ar"
                    ? "يتم تصميم محتوى ورش العمل لتلبية احتياجات المتدربين المحددة وتقديم حلول عملية للتحديات التي يواجهونها"
                    : "Workshop content is designed to meet specific trainee needs and provide practical solutions to the challenges they face"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#f8f9fa]">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-[#b29567]/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-[#b29567]" />
                </div>
                <CardTitle className="text-[#2a2665]">
                  {language === "ar"
                    ? "مواد تدريبية شاملة"
                    : "Comprehensive Training Materials"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  {language === "ar"
                    ? "يحصل المتدربون على مواد تدريبية شاملة ومحدثة تشمل الأدلة والتمارين والأدوات العملية لتطبيق ما تعلموه"
                    : "Trainees receive comprehensive and updated training materials including guides, exercises, and practical tools to apply what they have learned"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#f8f9fa]">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-[#2a2665]/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-[#2a2665]" />
                </div>
                <CardTitle className="text-[#2a2665]">
                  {language === "ar" ? "جدول مرن" : "Flexible Schedule"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  {language === "ar"
                    ? "نقدم جداول زمنية مرنة تناسب مختلف الاحتياجات، مع إمكانية تنفيذ ورش عمل مخصصة حسب الطلب"
                    : "We offer flexible time schedules to suit various needs, with the possibility of implementing customized workshops on demand"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#f8f9fa]">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-[#b29567]/10 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-[#b29567]" />
                </div>
                <CardTitle className="text-[#2a2665]">
                  {language === "ar"
                    ? "شهادات معتمدة"
                    : "Accredited Certificates"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  {language === "ar"
                    ? "يحصل المشاركون على شهادات حضور معتمدة تعزز من سيرتهم الذاتية وفرصهم المهنية"
                    : "Participants receive accredited attendance certificates that enhance their resumes and professional opportunities"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customized Workshops Section */}
      <section className="py-16 bg-[#2a2665] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {language === "ar" ? "ورش عمل مخصصة" : "Customized Workshops"}
            </h2>
            <p className="text-white/90 mb-8">
              {language === "ar"
                ? "نقدم ورش عمل مخصصة حسب احتياجات المؤسسات والفرق، يتم تصميمها وتنفيذها وفق المتطلبات المحددة"
                : "We offer customized workshops according to the needs of organizations and teams, designed and implemented according to specific requirements"}
            </p>

            <div className="mt-8">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#2a2665] px-6 py-2"
                onClick={() => setIsRegistrationDialogOpen(true)}
              >
                {language === "ar"
                  ? "طلب ورشة عمل مخصصة"
                  : "Request a Customized Workshop"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Details Dialog */}
      {selectedWorkshop && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl w-[90%]">
            <DialogHeader>
              <DialogTitle className="text-2xl text-[#2a2665]">
                {language === "ar"
                  ? selectedWorkshop.title.ar
                  : selectedWorkshop.title.en}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="mb-4">
                  <img
                    src={selectedWorkshop.image}
                    alt={
                      language === "ar"
                        ? selectedWorkshop.title.ar
                        : selectedWorkshop.title.en
                    }
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#2a2665] mb-2">
                    {language === "ar" ? "نبذة عن الورشة" : "Workshop Overview"}
                  </h3>
                  <p className="text-gray-700">
                    {language === "ar"
                      ? selectedWorkshop.description.ar
                      : selectedWorkshop.description.en}
                  </p>
                </div>

                {/* Workshop Objectives */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#2a2665] mb-2 flex items-center gap-2">
                    <Target className="h-5 w-5 text-[#b29567]" />
                    {language === "ar" ? "أهداف الورشة" : "Workshop Objectives"}
                  </h3>
                  <ul className="space-y-2">
                    {(language === "ar"
                      ? selectedWorkshop.objectives.ar
                      : selectedWorkshop.objectives.en
                    ).map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-[#b29567] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Target Audience */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#2a2665] mb-2 flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#b29567]" />
                    {language === "ar" ? "الفئة المستهدفة" : "Target Audience"}
                  </h3>
                  <ul className="space-y-2">
                    {(language === "ar"
                      ? selectedWorkshop.audience.ar
                      : selectedWorkshop.audience.en
                    ).map((audience, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-[#b29567] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{audience}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Workshop Agenda */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#2a2665] mb-2 flex items-center gap-2">
                    <List className="h-5 w-5 text-[#b29567]" />
                    {language === "ar" ? "جدول الورشة" : "Workshop Agenda"}
                  </h3>

                  <Tabs defaultValue="day1" className="w-full">
                    <TabsList className="w-full">
                      {(language === "ar"
                        ? selectedWorkshop.agenda.ar
                        : selectedWorkshop.agenda.en
                      ).map((day, index) => (
                        <TabsTrigger
                          key={index}
                          value={`day${index + 1}`}
                          className="flex-1"
                        >
                          {day.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {(language === "ar"
                      ? selectedWorkshop.agenda.ar
                      : selectedWorkshop.agenda.en
                    ).map((day, index) => (
                      <TabsContent
                        key={index}
                        value={`day${index + 1}`}
                        className="p-4 border rounded-md"
                      >
                        <ul className="space-y-2">
                          {day.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <ChevronRight className="h-5 w-5 text-[#b29567] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </div>

              <div className="md:col-span-1">
                <Card className="bg-gray-50 border-t-4 border-[#2a2665]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-[#2a2665]">
                      {language === "ar" ? "تفاصيل الورشة" : "Workshop Details"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#b29567]" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">
                          {language === "ar" ? "التاريخ" : "Date"}
                        </div>
                        <div className="text-gray-700">
                          {language === "ar"
                            ? selectedWorkshop.date.ar
                            : selectedWorkshop.date.en}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[#b29567]" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">
                          {language === "ar" ? "المدة" : "Duration"}
                        </div>
                        <div className="text-gray-700">
                          {language === "ar"
                            ? selectedWorkshop.duration.ar
                            : selectedWorkshop.duration.en}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-[#b29567]" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">
                          {language === "ar" ? "المكان" : "Location"}
                        </div>
                        <div className="text-gray-700">
                          {language === "ar"
                            ? selectedWorkshop.location.ar
                            : selectedWorkshop.location.en}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-[#b29567]" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">
                          {language === "ar" ? "التكلفة" : "Price"}
                        </div>
                        <div className="text-[#2a2665] font-bold">
                          {selectedWorkshop.price}{" "}
                          {language === "ar" ? "ريال" : "SAR"}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Instructor Info */}
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-2">
                        {language === "ar" ? "المدرب" : "Instructor"}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <img
                            src={selectedWorkshop.instructor.image}
                            alt={
                              language === "ar"
                                ? selectedWorkshop.instructor.name.ar
                                : selectedWorkshop.instructor.name.en
                            }
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-[#2a2665]">
                            {language === "ar"
                              ? selectedWorkshop.instructor.name.ar
                              : selectedWorkshop.instructor.name.en}
                          </div>
                          <div className="text-sm text-gray-600">
                            {language === "ar"
                              ? selectedWorkshop.instructor.title.ar
                              : selectedWorkshop.instructor.title.en}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        className="w-full bg-[#2a2665] hover:bg-[#1a1545] text-white py-2"
                        onClick={openRegistrationDialog}
                      >
                        {language === "ar"
                          ? "التسجيل في الورشة"
                          : "Register for Workshop"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-[#2a2665] text-[#2a2665]"
              >
                {language === "ar" ? "إغلاق" : "Close"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Workshop Registration Dialog */}
      <Dialog
        open={isRegistrationDialogOpen}
        onOpenChange={setIsRegistrationDialogOpen}
      >
        <DialogContent className="max-w-3xl w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#2a2665]">
              {language === "ar"
                ? "التسجيل في ورشة العمل"
                : "Workshop Registration"}
            </DialogTitle>
            <DialogDescription>
              {language === "ar"
                ? "يرجى تعبئة النموذج التالي للتسجيل في ورشة العمل. سيتم التواصل معك لتأكيد التسجيل ومعلومات الدفع."
                : "Please fill out the following form to register for the workshop. We will contact you to confirm registration and payment information."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  name="workshopId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === "ar" ? "ورشة العمل" : "Workshop"}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                language === "ar"
                                  ? "اختر ورشة العمل"
                                  : "Select workshop"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {workshops.map((workshop) => (
                            <SelectItem key={workshop.id} value={workshop.id}>
                              {language === "ar"
                                ? workshop.title.ar
                                : workshop.title.en}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        {language === "ar"
                          ? "عدد المشاركين"
                          : "Number of Attendees"}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                language === "ar"
                                  ? "اختر عدد المشاركين"
                                  : "Select number of attendees"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                          <SelectItem value="more">
                            {language === "ar" ? "أكثر من 10" : "More than 10"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "ar" ? "طلبات خاصة" : "Special Requests"}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={
                          language === "ar"
                            ? "أي طلبات أو متطلبات خاصة (اختياري)"
                            : "Any special requests or requirements (optional)"
                        }
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rtl:space-x-reverse">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {language === "ar"
                          ? "أوافق على شروط وأحكام التسجيل في ورش العمل"
                          : "I agree to the workshop registration terms and conditions"}
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRegistrationDialogOpen(false)}
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
