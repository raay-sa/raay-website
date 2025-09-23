import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Users, Briefcase, BrainCircuit, Shield, LineChart, Database, BarChart } from "lucide-react";
import { useI18nStore } from "@/lib/i18n";

const consultingServices = [
  {
    id: 1,
    title: "الاستشارات الرقمية",
    description: "خدمات استشارية لتطوير استراتيجيات التحول الرقمي وتطبيق أحدث التقنيات لتحسين أداء المؤسسات",
    icon: <Database className="w-10 h-10 text-[#2a2665]" />,
    category: "individual",
    features: [
      "تحليل البنية التحتية الرقمية",
      "تطوير استراتيجيات التحول الرقمي",
      "تقديم حلول تقنية متكاملة",
      "دعم عمليات الأتمتة والرقمنة"
    ]
  },
  {
    id: 2,
    title: "استشارات الذكاء الاصطناعي",
    description: "استشارات متخصصة في تطبيقات الذكاء الاصطناعي وتوظيفها في تطوير الأعمال وزيادة الكفاءة",
    icon: <BrainCircuit className="w-10 h-10 text-[#2a2665]" />,
    category: "individual",
    features: [
      "تطوير حلول ذكاء اصطناعي مخصصة",
      "أتمتة العمليات باستخدام التعلم الآلي",
      "تحليل البيانات الضخمة",
      "تصميم نماذج تنبؤية"
    ]
  },
  {
    id: 3,
    title: "استشارات الأمن السيبراني",
    description: "خدمات استشارية لتعزيز أمن المعلومات وحماية البيانات وتطوير استراتيجيات الأمن السيبراني",
    icon: <Shield className="w-10 h-10 text-[#2a2665]" />,
    category: "organization",
    features: [
      "تقييم المخاطر الأمنية",
      "تطوير استراتيجيات أمنية",
      "إدارة أزمات الأمن السيبراني",
      "تدريب الفرق على مواجهة التهديدات"
    ]
  },
  {
    id: 4,
    title: "استشارات إدارة المشاريع",
    description: "استشارات متخصصة في إدارة المشاريع وتطبيق أفضل الممارسات لضمان نجاح المشاريع",
    icon: <Briefcase className="w-10 h-10 text-[#2a2665]" />,
    category: "organization",
    features: [
      "تخطيط وإدارة المشاريع",
      "تحليل المخاطر",
      "تطوير منهجيات إدارة المشاريع",
      "قياس وتحسين أداء المشاريع"
    ]
  },
  {
    id: 5,
    title: "استشارات تطوير الأعمال",
    description: "خدمات استشارية لتطوير استراتيجيات الأعمال وتحسين الأداء وزيادة الكفاءة وتحقيق النمو",
    icon: <LineChart className="w-10 h-10 text-[#2a2665]" />,
    category: "organization",
    features: [
      "تحليل نماذج الأعمال",
      "تطوير استراتيجيات النمو",
      "تحسين العمليات التشغيلية",
      "دراسات الجدوى والتحليل المالي"
    ]
  },
  {
    id: 6,
    title: "استشارات الموارد البشرية",
    description: "استشارات متخصصة في تطوير الموارد البشرية وبناء القدرات وتحسين أداء الفرق",
    icon: <Users className="w-10 h-10 text-[#2a2665]" />,
    category: "individual",
    features: [
      "تطوير استراتيجيات إدارة المواهب",
      "تحسين أنظمة التعويضات والمزايا",
      "تقييم الأداء وتطوير الكفاءات",
      "تصميم برامج التدريب والتطوير"
    ]
  },
  {
    id: 7,
    title: "استشارات تحليل البيانات",
    description: "خدمات استشارية في مجال تحليل البيانات واستخراج الرؤى واتخاذ القرارات المستندة إلى البيانات",
    icon: <BarChart className="w-10 h-10 text-[#2a2665]" />,
    category: "organization",
    features: [
      "تطوير استراتيجيات البيانات",
      "إنشاء لوحات معلومات تحليلية",
      "تحليل اتجاهات السوق",
      "نمذجة البيانات التنبؤية"
    ]
  },
  {
    id: 8,
    title: "استشارات التقويم المهني",
    description: "استشارات فردية للتوجيه المهني وتطوير المسار الوظيفي وتحديد المهارات المطلوبة",
    icon: <CalendarDays className="w-10 h-10 text-[#2a2665]" />,
    category: "individual",
    features: [
      "تقييم المهارات والقدرات",
      "تطوير المسار المهني",
      "التوجيه المهني المتخصص",
      "خطط التطوير الشخصي"
    ]
  }
];

export default function ConsultingPlatformPage() {
  const [activeTab, setActiveTab] = useState<string>("individual");
  const [, navigate] = useLocation();
  const { language } = useI18nStore();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Force component to re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language change event detected in ConsultingPlatformPage");
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const filteredServices = consultingServices.filter(service => service.category === activeTab);

  return (
    <div className="bg-[#f8f8fa] min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#2a2665] mb-4"
          >
            {language === 'ar' ? 'منصة راي الاستشارية' : 'Raay Consulting Platform'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#2a2665]/70 max-w-3xl mx-auto text-lg"
          >
            {language === 'ar' 
              ? 'نقدم خدمات استشارية متخصصة للأفراد والمؤسسات في مختلف المجالات لتحقيق النمو والتطور وتحسين الأداء'
              : 'We provide specialized consulting services for individuals and organizations in various fields to achieve growth, development, and performance improvement'
            }
          </motion.p>
        </div>

        {/* Tabs Section */}
        <div className="mb-12">
          <Tabs defaultValue="individual" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-[#f5f5fa]">
                <TabsTrigger value="individual" className="text-base px-6 py-2 data-[state=active]:bg-[#2a2665] data-[state=active]:text-white">
                  {language === 'ar' ? 'استشارات للأفراد' : 'Individual Consulting'}
                </TabsTrigger>
                <TabsTrigger value="organization" className="text-base px-6 py-2 data-[state=active]:bg-[#2a2665] data-[state=active]:text-white">
                  {language === 'ar' ? 'استشارات للمؤسسات' : 'Organization Consulting'}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="individual">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ConsultingServiceCard key={service.id} service={service} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="organization">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ConsultingServiceCard key={service.id} service={service} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Consultation Request Form */}
        <div className="bg-white p-8 rounded-lg shadow-md mt-16 border border-[#b29567]/20">
          <h2 className="text-2xl font-bold text-[#2a2665] mb-6 text-center">
            {language === 'ar' ? 'طلب استشارة' : 'Request a Consultation'}
          </h2>
          <p className="text-[#2a2665]/70 text-center mb-8">
            {language === 'ar'
              ? 'يمكنك الآن طلب استشارة متخصصة من فريق الخبراء لدينا، وسيتم التواصل معك في أقرب وقت ممكن'
              : 'You can now request a specialized consultation from our team of experts, and we will contact you as soon as possible'
            }
          </p>
          <div className="text-center">
            <Button
              className="bg-[#b29567] hover:bg-[#b29567]/90 text-white px-8 py-6 text-lg shadow-md"
              onClick={() => navigate('/contact')}
            >
              {language === 'ar' 
                ? 'تواصل معنا لطلب استشارة' 
                : 'Contact Us for Consultation'
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  category: string;
  features: string[];
}

function ConsultingServiceCard({ service }: { service: Service }) {
  const [, navigate] = useLocation();
  const { language } = useI18nStore();
  
  // English translations for consulting services
  const getEnglishTitle = (arabicTitle: string) => {
    const translations: Record<string, string> = {
      "الاستشارات الرقمية": "Digital Consulting",
      "استشارات الذكاء الاصطناعي": "AI Consulting",
      "استشارات الأمن السيبراني": "Cybersecurity Consulting",
      "استشارات إدارة المشاريع": "Project Management Consulting",
      "استشارات تطوير الأعمال": "Business Development Consulting",
      "استشارات الموارد البشرية": "HR Consulting",
      "استشارات تحليل البيانات": "Data Analysis Consulting",
      "استشارات التقويم المهني": "Professional Assessment Consulting"
    };
    return translations[arabicTitle] || arabicTitle;
  };
  
  const getEnglishDescription = (arabicDescription: string) => {
    if (service.title === "الاستشارات الرقمية") {
      return "Consulting services to develop digital transformation strategies and apply the latest technologies to improve organizational performance";
    }
    if (service.title === "استشارات الذكاء الاصطناعي") {
      return "Specialized consulting in AI applications and their use in business development and efficiency improvement";
    }
    if (service.title === "استشارات الأمن السيبراني") {
      return "Consulting services to enhance information security, protect data, and develop cybersecurity strategies";
    }
    if (service.title === "استشارات إدارة المشاريع") {
      return "Specialized consulting in project management and applying best practices to ensure project success";
    }
    if (service.title === "استشارات تطوير الأعمال") {
      return "Consulting services to develop business strategies, improve performance, increase efficiency, and achieve growth";
    }
    if (service.title === "استشارات الموارد البشرية") {
      return "Specialized consulting in human resources development, capacity building, and team performance improvement";
    }
    if (service.title === "استشارات تحليل البيانات") {
      return "Consulting services in data analysis, insight extraction, and data-driven decision making";
    }
    if (service.title === "استشارات التقويم المهني") {
      return "Individual consulting for career guidance, career path development, and identifying required skills";
    }
    return arabicDescription;
  };
  
  const getEnglishFeatures = (arabicFeatures: string[]) => {
    // This is a simplified approach - in a real implementation you'd have a more robust translation system
    if (language === 'en') {
      // Create English counterparts for the features based on service type
      const featuresMap: Record<string, string[]> = {
        "الاستشارات الرقمية": [
          "Digital infrastructure analysis",
          "Digital transformation strategy development",
          "Integrated technical solutions",
          "Automation and digitization support"
        ],
        "استشارات الذكاء الاصطناعي": [
          "Customized AI solution development",
          "Process automation using machine learning",
          "Big data analysis",
          "Predictive modeling design"
        ],
        "استشارات الأمن السيبراني": [
          "Security risk assessment",
          "Security strategy development",
          "Cybersecurity crisis management",
          "Threat response team training"
        ],
        "استشارات إدارة المشاريع": [
          "Project planning and management",
          "Risk analysis",
          "Project management methodology development",
          "Project performance measurement and improvement"
        ],
        "استشارات تطوير الأعمال": [
          "Business model analysis",
          "Growth strategy development",
          "Operational process improvement",
          "Feasibility studies and financial analysis"
        ],
        "استشارات الموارد البشرية": [
          "Talent management strategy development",
          "Compensation and benefits system improvement",
          "Performance evaluation and competency development",
          "Training and development program design"
        ],
        "استشارات تحليل البيانات": [
          "Data strategy development",
          "Analytical dashboard creation",
          "Market trend analysis",
          "Predictive data modeling"
        ],
        "استشارات التقويم المهني": [
          "Skills and abilities assessment",
          "Career path development",
          "Specialized career guidance",
          "Personal development plans"
        ]
      };
      
      return featuresMap[service.title] || arabicFeatures;
    }
    return arabicFeatures;
  };
  
  const title = language === 'ar' ? service.title : getEnglishTitle(service.title);
  const description = language === 'ar' ? service.description : getEnglishDescription(service.description);
  const features = getEnglishFeatures(service.features);
  
  return (
    <Card className="h-full transition-all hover:shadow-lg hover:border-[#b29567]/50 border border-[#b29567]/20">
      <CardHeader className="pb-2 bg-[#f5f5fa]">
        <div className="flex justify-center mb-4 bg-white p-4 rounded-full border border-[#b29567]/30 w-16 h-16 mx-auto">{service.icon}</div>
        <CardTitle className="text-center text-[#2a2665]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center mb-4 text-[#2a2665]/70">{description}</CardDescription>
        <div className="mt-4">
          <h4 className="font-semibold text-[#b29567] mb-2">
            {language === 'ar' ? 'ما نقدمه:' : 'What We Offer:'}
          </h4>
          <ul className={`list-disc list-inside space-y-1 text-[#2a2665]/70 ${language === 'en' ? 'text-left' : ''}`}>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="text-center mt-6">
          <Button 
            className="bg-[#2a2665] hover:bg-[#2a2665]/90 text-white w-full shadow-sm"
            onClick={() => navigate('/contact')}
          >
            {language === 'ar' ? 'طلب استشارة' : 'Request Consultation'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}