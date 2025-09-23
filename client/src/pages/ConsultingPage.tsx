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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BriefcaseBusiness,
  BarChart4,
  Shield,
  Users,
  Brain,
  BarChartHorizontal,
  LucideIcon,
  CalendarClock,
  FileCheck,
  LineChart,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  MessageSquarePlus,
  Loader2, // NEW: spinner
} from "lucide-react";
import raayVideo from "../assets/videos/raay-center-video.mp4";

// Define the consulting service type
interface ConsultingService {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  icon: LucideIcon;
  color: string;
  benefits: { ar: string[]; en: string[] };
  deliverables: { ar: string[]; en: string[] };
}

// Define the FAQ item type
interface FaqItem {
  question: { ar: string; en: string };
  answer: { ar: string; en: string };
}

// Define the consulting request form schema
const consultingRequestSchema = z.object({
  name: z.string().min(2, {
    message: "الاسم يجب أن يحتوي على حرفين على الأقل",
  }),
  email: z.string().email({
    message: "البريد الإلكتروني غير صحيح",
  }),
  phone: z.string().min(9, {
    message: "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل",
  }),
  organization: z.string().min(2, {
    message: "اسم المنظمة يجب أن يحتوي على حرفين على الأقل",
  }),
  position: z.string().min(2, {
    message: "المسمى الوظيفي يجب أن يحتوي على حرفين على الأقل",
  }),
  service: z.string().min(1, {
    message: "يرجى اختيار نوع الخدمة الاستشارية",
  }),
  projectScope: z.string().min(10, {
    message: "يرجى وصف نطاق المشروع بشكل مختصر",
  }),
  startDate: z.string().optional(),
  additionalInfo: z.string().optional(),
  contactMethod: z.enum(["email", "phone", "both"], {
    message: "يرجى اختيار طريقة التواصل المفضلة",
  }),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
});

// Consulting services data
const consultingServices: ConsultingService[] = [
  {
    id: "strategy",
    title: {
      ar: "الاستراتيجية وإدارة الأداء",
      en: "Strategy & Performance Management",
    },
    description: {
      ar: "نقدم خدمات استشارية في مجال بناء وتطوير الاستراتيجيات وأنظمة إدارة الأداء المؤسسي، مع التركيز على مؤشرات الأداء الرئيسية وآليات المتابعة وتحقيق الأهداف الاستراتيجية.",
      en: "We provide consulting services in the field of building and developing strategies and institutional performance management systems, focusing on key performance indicators, follow-up mechanisms, and achieving strategic goals.",
    },
    icon: BarChart4,
    color: "bg-blue-600",
    benefits: {
      ar: [
        "تطوير رؤية ورسالة وأهداف استراتيجية واضحة",
        "إنشاء أنظمة إدارة أداء فعالة",
        "تحسين اتخاذ القرارات المبنية على البيانات",
        "زيادة الكفاءة التشغيلية وتحقيق الأهداف",
      ],
      en: [
        "Develop clear vision, mission, and strategic goals",
        "Create effective performance management systems",
        "Improve data-driven decision-making",
        "Increase operational efficiency and achieve goals",
      ],
    },
    deliverables: {
      ar: [
        "تقرير تحليل الوضع الحالي",
        "وثيقة الخطة الاستراتيجية",
        "إطار عمل مؤشرات الأداء الرئيسية",
        "لوحات متابعة الأداء",
      ],
      en: [
        "Current situation analysis report",
        "Strategic plan document",
        "KPI framework",
        "Performance dashboards",
      ],
    },
  },
  {
    id: "digital-transformation",
    title: {
      ar: "التحول الرقمي",
      en: "Digital Transformation",
    },
    description: {
      ar: "نساعد المؤسسات في رحلة التحول الرقمي من خلال تقديم استشارات متخصصة في أتمتة العمليات ورقمنة الخدمات وتطوير استراتيجيات التحول الرقمي الشاملة.",
      en: "We help organizations in their digital transformation journey by providing specialized consulting in process automation, service digitization, and developing comprehensive digital transformation strategies.",
    },
    icon: LineChart,
    color: "bg-orange-600",
    benefits: {
      ar: [
        "تحسين كفاءة العمليات من خلال الأتمتة",
        "تعزيز تجربة العملاء من خلال الخدمات الرقمية",
        "تقليل التكاليف التشغيلية",
        "زيادة المرونة والقدرة على التكيف مع المتغيرات",
      ],
      en: [
        "Improve process efficiency through automation",
        "Enhance customer experience through digital services",
        "Reduce operational costs",
        "Increase flexibility and adaptability to changes",
      ],
    },
    deliverables: {
      ar: [
        "تقرير تقييم النضج الرقمي",
        "خارطة طريق التحول الرقمي",
        "نماذج العمليات الرقمية",
        "توصيات التقنيات والأدوات",
      ],
      en: [
        "Digital maturity assessment report",
        "Digital transformation roadmap",
        "Digital process models",
        "Technology and tools recommendations",
      ],
    },
  },
  {
    id: "cybersecurity",
    title: {
      ar: "الأمن السيبراني",
      en: "Cybersecurity",
    },
    description: {
      ar: "نقدم استشارات متخصصة في مجال الأمن السيبراني لحماية البيانات والأنظمة والشبكات من التهديدات الإلكترونية، مع التركيز على تقييم المخاطر وتطوير استراتيجيات الحماية.",
      en: "We provide specialized consulting in the field of cybersecurity to protect data, systems, and networks from cyber threats, focusing on risk assessment and developing protection strategies.",
    },
    icon: Shield,
    color: "bg-green-600",
    benefits: {
      ar: [
        "حماية البيانات والمعلومات الحساسة",
        "تقليل مخاطر الاختراقات والهجمات الإلكترونية",
        "الامتثال للمعايير والتشريعات الأمنية",
        "تعزيز ثقة العملاء والشركاء",
      ],
      en: [
        "Protect sensitive data and information",
        "Reduce risks of breaches and cyber attacks",
        "Comply with security standards and regulations",
        "Enhance customer and partner trust",
      ],
    },
    deliverables: {
      ar: [
        "تقرير تقييم المخاطر السيبرانية",
        "سياسات وإجراءات الأمن السيبراني",
        "خطة الاستجابة للحوادث الأمنية",
        "برنامج التوعية الأمنية",
      ],
      en: [
        "Cybersecurity risk assessment report",
        "Cybersecurity policies and procedures",
        "Security incident response plan",
        "Security awareness program",
      ],
    },
  },
  {
    id: "organizational-development",
    title: {
      ar: "التطوير المؤسسي",
      en: "Organizational Development",
    },
    description: {
      ar: "نساعد المؤسسات في تطوير هياكلها التنظيمية وعملياتها الداخلية وثقافتها المؤسسية لتحقيق الكفاءة والفعالية وتحسين الأداء المؤسسي.",
      en: "We help organizations develop their organizational structures, internal processes, and institutional culture to achieve efficiency, effectiveness, and improve institutional performance.",
    },
    icon: Users,
    color: "bg-purple-600",
    benefits: {
      ar: [
        "تحسين الكفاءة التنظيمية والإنتاجية",
        "تعزيز رضا الموظفين والاحتفاظ بالمواهب",
        "تطوير بيئة عمل إيجابية ومحفزة",
        "دعم التغيير المؤسسي والتكيف مع المتغيرات",
      ],
      en: [
        "Improve organizational efficiency and productivity",
        "Enhance employee satisfaction and talent retention",
        "Develop a positive and motivating work environment",
        "Support organizational change and adaptation to variables",
      ],
    },
    deliverables: {
      ar: [
        "تقييم الهيكل التنظيمي الحالي",
        "تصميم هيكل تنظيمي محسن",
        "إعادة هندسة العمليات",
        "خطة تطوير الثقافة المؤسسية",
      ],
      en: [
        "Current organizational structure assessment",
        "Improved organizational structure design",
        "Process reengineering",
        "Organizational culture development plan",
      ],
    },
  },
  {
    id: "risk-management",
    title: {
      ar: "إدارة المخاطر",
      en: "Risk Management",
    },
    description: {
      ar: "نقدم استشارات متخصصة في تحديد وتقييم وإدارة المخاطر في مختلف المجالات، مع التركيز على تطوير استراتيجيات فعالة للتعامل مع المخاطر وتقليل آثارها.",
      en: "We provide specialized consulting in identifying, assessing, and managing risks in various fields, focusing on developing effective strategies for handling risks and reducing their impacts.",
    },
    icon: AlertTriangle,
    color: "bg-red-600",
    benefits: {
      ar: [
        "تقليل احتمالية وتأثير المخاطر المحتملة",
        "تحسين عملية اتخاذ القرارات المبنية على المخاطر",
        "زيادة المرونة والقدرة على التكيف",
        "تعزيز حماية أصول المؤسسة",
      ],
      en: [
        "Reduce the probability and impact of potential risks",
        "Improve risk-based decision-making process",
        "Increase resilience and adaptability",
        "Enhance protection of organizational assets",
      ],
    },
    deliverables: {
      ar: [
        "تقرير تقييم المخاطر الشامل",
        "سجل المخاطر وخطط الاستجابة",
        "إطار عمل إدارة المخاطر",
        "إجراءات الرقابة والمتابعة",
      ],
      en: [
        "Comprehensive risk assessment report",
        "Risk register and response plans",
        "Risk management framework",
        "Control and monitoring procedures",
      ],
    },
  },
  {
    id: "ai-implementation",
    title: {
      ar: "تطبيقات الذكاء الاصطناعي",
      en: "AI Implementation",
    },
    description: {
      ar: "نقدم استشارات متخصصة في مجال تطبيقات الذكاء الاصطناعي وتعلم الآلة لمساعدة المؤسسات على الاستفادة من هذه التقنيات في تحسين عملياتها وخدماتها.",
      en: "We provide specialized consulting in the field of artificial intelligence applications and machine learning to help organizations benefit from these technologies in improving their operations and services.",
    },
    icon: Brain,
    color: "bg-cyan-600",
    benefits: {
      ar: [
        "تحسين العمليات وزيادة الكفاءة",
        "استخراج رؤى قيمة من البيانات",
        "أتمتة المهام المتكررة والروتينية",
        "تعزيز تجربة العملاء وتقديم خدمات مخصصة",
      ],
      en: [
        "Improve processes and increase efficiency",
        "Extract valuable insights from data",
        "Automate repetitive and routine tasks",
        "Enhance customer experience and provide personalized services",
      ],
    },
    deliverables: {
      ar: [
        "تقييم الجاهزية للذكاء الاصطناعي",
        "خارطة طريق تطبيق الذكاء الاصطناعي",
        "نماذج تطبيقية للمشاريع",
        "توصيات الأدوات والتقنيات",
      ],
      en: [
        "AI readiness assessment",
        "AI implementation roadmap",
        "Pilot project models",
        "Tools and technologies recommendations",
      ],
    },
  },
];

// FAQ items
const faqItems: FaqItem[] = [
  {
    question: {
      ar: "ما هي خطوات عملية الاستشارات؟",
      en: "What are the steps of the consulting process?",
    },
    answer: {
      ar: "تتضمن عملية الاستشارات عدة خطوات رئيسية: الاجتماع الأولي وتحديد الاحتياجات، جمع وتحليل البيانات، تطوير الحلول والتوصيات، تقديم التقرير الاستشاري، دعم التنفيذ إذا كان مطلوباً،  المتابعة والتقييم.",
      en: "The consulting process includes several key steps: Initial meeting and needs assessment, Data collection and analysis, Development of solutions and recommendations, Presentation of the consulting report, Implementation support if required,  Follow-up and evaluation.",
    },
  },
  {
    question: {
      ar: "كم تستغرق مدة المشروع الاستشاري عادة؟",
      en: "How long does a consulting project usually take?",
    },
    answer: {
      ar: "تختلف مدة المشروع الاستشاري حسب نطاق وتعقيد المشروع. قد تستغرق المشاريع البسيطة أسابيع قليلة، بينما قد تستمر المشاريع المعقدة لعدة أشهر. سيتم تحديد الإطار الزمني التقديري بعد تقييم احتياجاتكم ونطاق العمل.",
      en: "The duration of a consulting project varies depending on the scope and complexity of the project. Simple projects may take a few weeks, while complex projects may continue for several months. The estimated timeframe will be determined after assessing your needs and scope of work.",
    },
  },
  {
    question: {
      ar: "هل يمكن تقديم الخدمات الاستشارية عن بعد؟",
      en: "Can consulting services be provided remotely?",
    },
    answer: {
      ar: "نعم، نقدم خدماتنا الاستشارية بشكل حضوري أو عن بعد حسب احتياجاتكم وظروفكم. يمكننا استخدام منصات الاتصال المرئي والأدوات التعاونية عبر الإنترنت لتقديم خدمات استشارية فعالة عن بعد.",
      en: "Yes, we provide our consulting services in-person or remotely according to your needs and circumstances. We can use video communication platforms and online collaborative tools to provide effective remote consulting services.",
    },
  },
  {
    question: {
      ar: "ما هي تكلفة الخدمات الاستشارية؟",
      en: "What is the cost of consulting services?",
    },
    answer: {
      ar: "تعتمد تكلفة الخدمات الاستشارية على نطاق المشروع ومدته وتعقيده. نقدم اقتراحاً مالياً مفصلاً بعد فهم احتياجاتكم وتحديد نطاق العمل. يمكنكم التواصل معنا للحصول على تقدير مبدئي للتكلفة.",
      en: "The cost of consulting services depends on the project scope, duration, and complexity. We provide a detailed financial proposal after understanding your needs and determining the scope of work. You can contact us to get an initial cost estimate.",
    },
  },
  {
    question: {
      ar: "هل يمكن تخصيص الخدمات الاستشارية حسب احتياجاتنا الخاصة؟",
      en: "Can consulting services be customized according to our specific needs?",
    },
    answer: {
      ar: "نعم، نحن نقدم خدمات استشارية مخصصة تماماً حسب احتياجاتكم الفريدة. نعمل معكم لفهم تحدياتكم وأهدافكم بشكل دقيق، ثم نصمم نهجاً استشارياً يلبي هذه الاحتياجات بشكل مثالي.",
      en: "Yes, we provide fully customized consulting services according to your unique needs. We work with you to accurately understand your challenges and goals, and then design a consulting approach that optimally meets these needs.",
    },
  },
];

// Consulting process steps
const consultingProcessSteps = [
  {
    id: 1,
    title: { ar: "الاجتماع الأولي", en: "Initial Meeting" },
    description: {
      ar: "اجتماع لفهم احتياجاتكم وتحدياتكم وتحديد نطاق العمل",
      en: "A meeting to understand your needs, challenges, and define the scope of work",
    },
    icon: MessageSquarePlus,
  },
  {
    id: 2,
    title: { ar: "جمع وتحليل البيانات", en: "Data Collection & Analysis" },
    description: {
      ar: "جمع المعلومات اللازمة وتحليلها لفهم الوضع الحالي",
      en: "Gathering necessary information and analyzing it to understand the current situation",
    },
    icon: BarChartHorizontal,
  },
  {
    id: 3,
    title: { ar: "تطوير الحلول", en: "Solution Development" },
    description: {
      ar: "تطوير وتصميم الحلول والتوصيات المناسبة لتحدياتكم",
      en: "Developing and designing appropriate solutions and recommendations for your challenges",
    },
    icon: Lightbulb,
  },
  {
    id: 4,
    title: { ar: "تقديم التقرير النهائي", en: "Final Report Presentation" },
    description: {
      ar: "تقديم تقرير شامل يتضمن النتائج والتوصيات وخطة التنفيذ",
      en: "Providing a comprehensive report including findings, recommendations, and implementation plan",
    },
    icon: FileCheck,
  },
  {
    id: 5,
    title: { ar: "دعم التنفيذ", en: "Implementation Support" },
    description: {
      ar: "مساعدتكم في تنفيذ التوصيات وتحقيق النتائج المرجوة",
      en: "Helping you implement recommendations and achieve desired results",
    },
    icon: BriefcaseBusiness,
  },
];

// Helper: format to DD-MM-YYYY for API
function toDMY(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (!Number.isNaN(d.getTime())) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : dateStr;
}

export default function ConsultingPage() {
  const { language } = useI18nStore();
  const { toast } = useToast();
  const [activeService, setActiveService] = useState<string>("strategy");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof consultingRequestSchema>>({
    resolver: zodResolver(consultingRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      position: "",
      service: "",
      projectScope: "",
      startDate: "",
      additionalInfo: "",
      contactMethod: "both",
      agreeToTerms: false,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  // Handle form submission -> POST /public/consulting
  const onSubmit = async (values: z.infer<typeof consultingRequestSchema>) => {
    try {
      const API_BASE =
        (import.meta as any)?.env?.VITE_API_BASE_URL ??
        "https://backend.raay.sa/api";

      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        company: values.organization,
        type: values.service,
        job_title: values.position,
        date: toDMY(values.startDate),
        contact_way: values.contactMethod,
        description: values.projectScope,
        additional_info: values.additionalInfo ?? "",
      };

      const res = await fetch(`${API_BASE}/public/consulting`, {
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
            ? "تم إرسال طلب الاستشارة بنجاح"
            : "Consulting request sent successfully",
        description:
          language === "ar"
            ? "سيتواصل معك أحد مستشارينا قريبًا."
            : "One of our consultants will contact you soon.",
        variant: "default",
      });

      setIsDialogOpen(false);
      form.reset();
    } catch (e: any) {
      toast({
        title: language === "ar" ? "حدث خطأ" : "Error",
        description:
          e?.message ||
          (language === "ar"
            ? "تعذر إرسال الطلب. حاول مرة أخرى."
            : "Failed to submit request. Please try again."),
        variant: "destructive",
      });
    }
  };

  // Get the active service data
  const getActiveServiceData = () => {
    return (
      consultingServices.find((service) => service.id === activeService) ||
      consultingServices[0]
    );
  };

  // Show the consulting request dialog
  const showRequestDialog = (serviceId: string) => {
    form.setValue("service", serviceId);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>
          {language === "ar"
            ? "الاستشارات | مركز راي للتدريب والاستشارات"
            : "Consulting | Ray Training & Consulting Center"}
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
            playsInline
            loop
            src={raayVideo}
          ></video>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              {language === "ar" ? "الاستشارات" : "Consulting Services"}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === "ar"
                ? "خدمات استشارية متخصصة تقدم حلولاً مبتكرة للتحديات المؤسسية وتطوير الأداء وفق أفضل الممارسات العالمية"
                : "Specialized consulting services providing innovative solutions for institutional challenges and performance development according to global best practices"}
            </p>
            <div className="mt-8">
              <Button
                className="bg-white text-[#2a2665] hover:bg-gray-100 px-6 py-2 text-lg"
                onClick={() => setIsDialogOpen(true)}
              >
                {language === "ar" ? "طلب استشارة" : "Request a Consultation"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Consulting Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {language === "ar"
                ? "خدماتنا الاستشارية"
                : "Our Consulting Services"}
            </h2>
            <p className="text-gray-700 mb-8">
              {language === "ar"
                ? "نقدم مجموعة متنوعة من الخدمات الاستشارية المتخصصة لمساعدة المؤسسات على مواجهة التحديات وتحقيق النجاح"
                : "We offer a diverse range of specialized consulting services to help organizations face challenges and achieve success"}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Services Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-gray-50 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-bold text-[#2a2665] mb-4 border-b pb-2">
                  {language === "ar" ? "مجالات الاستشارات" : "Consulting Areas"}
                </h3>
                <ul className="space-y-2">
                  {consultingServices.map((service) => (
                    <li key={service.id}>
                      <button
                        className={`w-full text-start p-3 rounded-md transition-colors flex items-center gap-3 ${
                          activeService === service.id
                            ? "bg-[#2a2665] text-white"
                            : "hover:bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setActiveService(service.id)}
                      >
                        <div
                          className={`w-8 h-8 rounded-full ${service.color} flex items-center justify-center`}
                        >
                          <service.icon className="h-4 w-4 text-white" />
                        </div>
                        <span>
                          {language === "ar"
                            ? service.title.ar
                            : service.title.en}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Service Details */}
            <div className="lg:col-span-8">
              {(() => {
                const service = getActiveServiceData();
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className={`h-2 ${service.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <service.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#2a2665]">
                          {language === "ar"
                            ? service.title.ar
                            : service.title.en}
                        </h3>
                      </div>

                      <p className="text-gray-700 mb-6">
                        {language === "ar"
                          ? service.description.ar
                          : service.description.en}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-lg font-semibold text-[#2a2665] mb-3 flex items-center">
                            <BookOpen className="h-5 w-5 mr-2" />
                            {language === "ar" ? "الفوائد" : "Benefits"}
                          </h4>
                          <ul className="space-y-2">
                            {(language === "ar"
                              ? service.benefits.ar
                              : service.benefits.en
                            ).map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-[#b29567] flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-[#2a2665] mb-3 flex items-center">
                            <FileCheck className="h-5 w-5 mr-2" />
                            {language === "ar" ? "المخرجات" : "Deliverables"}
                          </h4>
                          <ul className="space-y-2">
                            {(language === "ar"
                              ? service.deliverables.ar
                              : service.deliverables.en
                            ).map((deliverable, index) => (
                              <li key={index} className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-[#b29567] flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">
                                  {deliverable}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button
                          className="bg-[#2a2665] hover:bg-[#1a1545] text-white px-6 py-2"
                          onClick={() => showRequestDialog(service.id)}
                        >
                          {language === "ar"
                            ? "طلب هذه الاستشارة"
                            : "Request This Consultation"}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {language === "ar" ? "عملية الاستشارات" : "Consulting Process"}
            </h2>
            <p className="text-gray-700 mb-8">
              {language === "ar"
                ? "منهجية منظمة وشاملة لتقديم الخدمات الاستشارية بكفاءة وفعالية"
                : "An organized and comprehensive methodology for efficiently and effectively providing consulting services"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {consultingProcessSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 relative"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-[#2a2665] text-white flex items-center justify-center font-bold">
                    {step.id}
                  </div>
                </div>

                <div className="text-center pt-4">
                  <div className="flex justify-center mb-4">
                    <step.icon className="h-8 w-8 text-[#b29567]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2a2665] mb-2">
                    {language === "ar" ? step.title.ar : step.title.en}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === "ar"
                      ? step.description.ar
                      : step.description.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {language === "ar" ? "لماذا تختارنا" : "Why Choose Us"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-[#f3f4ff] border-[#2a2665]/20">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-[#2a2665]/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#2a2665]" />
                </div>
                <CardTitle className="text-[#2a2665]">
                  {language === "ar" ? "فريق من الخبراء" : "Expert Team"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {language === "ar"
                    ? "نعمل مع نخبة من الاستشاريين والخبراء المتخصصين في مختلف المجالات بخبرات عملية واسعة"
                    : "We work with an elite group of consultants and experts specialized in various fields with extensive practical experience"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#fdf6f0] border-[#b29567]/20">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-[#b29567]/10 rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-[#b29567]" />
                </div>
                <CardTitle className="text-[#2a2665]">
                  {language === "ar" ? "حلول مبتكرة" : "Innovative Solutions"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {language === "ar"
                    ? "نقدم حلولاً مبتكرة ومخصصة لتلبية الاحتياجات الفريدة لكل عميل مع مراعاة أحدث التوجهات والممارسات العالمية"
                    : "We provide innovative and customized solutions to meet the unique needs of each client, taking into account the latest global trends and practices"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#f3f9f5] border-[#2a8452]/20">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-[#2a8452]/10 rounded-full flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-[#2a8452]" />
                </div>
                <CardTitle className="text-[#2a2665]">
                  {language === "ar" ? "نتائج ملموسة" : "Tangible Results"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {language === "ar"
                    ? "نركز على تحقيق نتائج ملموسة وقابلة للقياس من خلال توصيات عملية وخطط تنفيذية واضحة"
                    : "We focus on achieving tangible and measurable results through practical recommendations and clear implementation plans"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {language === "ar"
                ? "الأسئلة الشائعة"
                : "Frequently Asked Questions"}
            </h2>
            <p className="text-gray-700 mb-8">
              {language === "ar"
                ? "إجابات على الأسئلة الشائعة حول خدماتنا الاستشارية"
                : "Answers to common questions about our consulting services"}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion
              type="single"
              collapsible
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-gray-200 last:border-0"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-[#2a2665] font-medium text-start">
                    {language === "ar" ? item.question.ar : item.question.en}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-700">
                    {language === "ar" ? item.answer.ar : item.answer.en}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2a2665] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {language === "ar"
              ? "هل أنت جاهز للبدء؟"
              : "Are You Ready to Start?"}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            {language === "ar"
              ? "تواصل معنا اليوم واحصل على استشارة أولية مجانية لمناقشة احتياجاتك ومساعدتك في تحقيق أهدافك"
              : "Contact us today and get a free initial consultation to discuss your needs and help you achieve your goals"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="bg-white text-[#2a2665] hover:bg-gray-100 py-3 px-10 text-lg"
              onClick={() => setIsDialogOpen(true)}
            >
              {language === "ar" ? "طلب استشارة" : "Request a Consultation"}
            </Button>
            <Button
              variant="outline"
              className="border-white hover:bg-white hover:text-[#2a2665] py-3 px-10 text-lg"
              onClick={() => (window.location.href = "/contact")}
            >
              {language === "ar" ? "تواصل معنا" : "Contact Us"}
            </Button>
          </div>
        </div>
      </section>

      {/* Consulting Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-w-4xl w-[90%]"
          style={{ maxHeight: "95%", overflow: "scroll" }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#2a2665]">
              {language === "ar" ? "طلب استشارة" : "Request a Consultation"}
            </DialogTitle>
            <DialogDescription>
              {language === "ar"
                ? "يرجى تعبئة النموذج التالي وسنقوم بالتواصل معك في أقرب وقت ممكن"
                : "Please fill out the following form and we will contact you as soon as possible"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Section: Contact info */}
              <div>
                <h4 className="text-sm font-semibold text-[#2a2665] mb-3">
                  {language === "ar"
                    ? "معلومات التواصل"
                    : "Contact Information"}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === "ar" ? "الاسم الكامل" : "Full Name"}{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              language === "ar"
                                ? "أدخل الاسم الكامل"
                                : "Enter full name"
                            }
                            {...field}
                            disabled={isSubmitting}
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
                          {language === "ar" ? "البريد الإلكتروني" : "Email"}{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              language === "ar"
                                ? "أدخل البريد الإلكتروني"
                                : "Enter email"
                            }
                            {...field}
                            disabled={isSubmitting}
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
                          {language === "ar" ? "رقم الهاتف" : "Phone Number"}{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              language === "ar"
                                ? "أدخل رقم الهاتف"
                                : "Enter phone number"
                            }
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          {language === "ar"
                            ? "مثال: 5XXXXXXXX"
                            : "Example: 5XXXXXXXX"}
                        </FormDescription>
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
                            : "Organization/Company"}{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              language === "ar"
                                ? "أدخل اسم المنظمة"
                                : "Enter organization name"
                            }
                            {...field}
                            disabled={isSubmitting}
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
                          {language === "ar" ? "المسمى الوظيفي" : "Job Title"}{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              language === "ar"
                                ? "أدخل المسمى الوظيفي"
                                : "Enter job title"
                            }
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === "ar"
                            ? "التاريخ المفضل للبدء"
                            : "Preferred Start Date"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          {language === "ar"
                            ? "سنراعي التاريخ المحدد قدر الإمكان"
                            : "We’ll try to accommodate your preferred date"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Section: Service */}
              <div>
                <h4 className="text-sm font-semibold text-[#2a2665] mb-3">
                  {language === "ar"
                    ? "نوع الخدمة الاستشارية"
                    : "Consulting Service"}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === "ar" ? "نوع الخدمة" : "Service Type"}{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isSubmitting}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  language === "ar"
                                    ? "اختر نوع الخدمة"
                                    : "Select service type"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {consultingServices.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {language === "ar"
                                  ? service.title.ar
                                  : service.title.en}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Section: Project details */}
              <div>
                <h4 className="text-sm font-semibold text-[#2a2665] mb-3">
                  {language === "ar" ? "تفاصيل المشروع" : "Project Details"}
                </h4>

                <FormField
                  control={form.control}
                  name="projectScope"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === "ar" ? "نطاق المشروع" : "Project Scope"}{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            language === "ar"
                              ? "يرجى وصف نطاق المشروع واحتياجاتك بشكل مختصر"
                              : "Describe the project scope and your needs briefly"
                          }
                          className="min-h-[120px]"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>
                        {language === "ar"
                          ? "معلومات إضافية"
                          : "Additional Information"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            language === "ar"
                              ? "أي معلومات إضافية ترغب في مشاركتها"
                              : "Any additional info you'd like to share"
                          }
                          className="min-h-[80px]"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Section: Preferences */}
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="contactMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        {language === "ar"
                          ? "طريقة التواصل المفضلة"
                          : "Preferred Contact Method"}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                          disabled={isSubmitting}
                        >
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <RadioGroupItem value="email" id="email" />
                            <Label htmlFor="email">
                              {language === "ar"
                                ? "البريد الإلكتروني"
                                : "Email"}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <RadioGroupItem value="phone" id="phone" />
                            <Label htmlFor="phone">
                              {language === "ar" ? "الهاتف" : "Phone"}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <RadioGroupItem value="both" id="both" />
                            <Label htmlFor="both">
                              {language === "ar" ? "كلاهما" : "Both"}
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription className="text-xs">
                        {language === "ar"
                          ? "سنستخدم الطريقة الأنسب لك للتواصل الأولي"
                          : "We’ll use your preferred method for the first contact"}
                      </FormDescription>
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
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          {language === "ar"
                            ? "أوافق على شروط الخدمة وسياسة الخصوصية"
                            : "I agree to the terms of service and privacy policy"}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-[#2a2665] text-[#2a2665] mx-5"
                  disabled={isSubmitting}
                >
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </Button>
                <Button
                  type="submit"
                  className="bg-[#2a2665] hover:bg-[#1a1545] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {language === "ar"
                    ? isSubmitting
                      ? "جاري الإرسال..."
                      : "إرسال الطلب"
                    : isSubmitting
                    ? "Submitting..."
                    : "Submit Request"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
