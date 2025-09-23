import React from "react";
import { useI18nStore } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

export default function AIPage() {
  const { language } = useI18nStore();
  
  // بيانات البرامج
  const aiPrograms = [
    {
      id: 1,
      title: "مقدمة في الذكاء الاصطناعي",
      titleEn: "Introduction to Artificial Intelligence",
      description: "برنامج تأسيسي يعرفك على مفاهيم وأساسيات الذكاء الاصطناعي وتطبيقاته في مختلف المجالات",
      descriptionEn: "A foundational program that introduces you to the concepts and fundamentals of artificial intelligence and its applications in various fields",
      duration: "3 أيام",
      durationEn: "3 days",
      category: "أساسي"
    },
    {
      id: 2,
      title: "تعلم الآلة التطبيقي",
      titleEn: "Applied Machine Learning",
      description: "تعلم كيفية بناء وتدريب نماذج تعلم الآلة لحل المشكلات العملية في مجال الأعمال والتقنية",
      descriptionEn: "Learn how to build and train machine learning models to solve practical problems in business and technology",
      duration: "5 أيام",
      durationEn: "5 days",
      category: "متقدم"
    },
    {
      id: 3,
      title: "تطوير تطبيقات مدعومة بالذكاء الاصطناعي",
      titleEn: "AI-Powered Application Development",
      description: "كيفية دمج تقنيات الذكاء الاصطناعي في التطبيقات وتطوير حلول ذكية للمؤسسات والشركات",
      descriptionEn: "How to integrate AI technologies into applications and develop intelligent solutions for enterprises and companies",
      duration: "4 أيام",
      durationEn: "4 days",
      category: "متقدم"
    },
    {
      id: 4,
      title: "التعامل مع البيانات الضخمة في الذكاء الاصطناعي",
      titleEn: "Big Data in AI",
      description: "تقنيات وأدوات معالجة وتحليل البيانات الضخمة لاستخدامها في تطبيقات الذكاء الاصطناعي والتعلم العميق",
      descriptionEn: "Techniques and tools for processing and analyzing big data for use in AI and deep learning applications",
      duration: "4 أيام",
      durationEn: "4 days",
      category: "متخصص"
    },
    {
      id: 5,
      title: "الذكاء الاصطناعي في إدارة الأعمال",
      titleEn: "AI in Business Management",
      description: "كيفية الاستفادة من تقنيات الذكاء الاصطناعي لتحسين عمليات اتخاذ القرار وزيادة الكفاءة التشغيلية في المؤسسات",
      descriptionEn: "How to leverage AI technologies to improve decision-making processes and increase operational efficiency in organizations",
      duration: "3 أيام",
      durationEn: "3 days",
      category: "تخصصي"
    },
    {
      id: 6,
      title: "تقنيات معالجة اللغات الطبيعية",
      titleEn: "Natural Language Processing Techniques",
      description: "فهم وتطبيق تقنيات معالجة اللغات الطبيعية لبناء تطبيقات ذكية قادرة على فهم وتحليل النصوص واللغات البشرية",
      descriptionEn: "Understanding and applying natural language processing techniques to build intelligent applications capable of understanding and analyzing human texts and languages",
      duration: "4 أيام",
      durationEn: "4 days",
      category: "متخصص"
    }
  ];

  // خصائص برامج الذكاء الاصطناعي
  const aiFeatures = [
    {
      id: 1,
      title: "منهج عملي",
      titleEn: "Practical Approach",
      description: "تركز برامجنا على التطبيق العملي لتقنيات الذكاء الاصطناعي في حل المشكلات الحقيقية",
      descriptionEn: "Our programs focus on practical application of AI technologies in solving real-world problems"
    },
    {
      id: 2,
      title: "مدربون متخصصون",
      titleEn: "Specialized Instructors",
      description: "يقدم البرامج خبراء متخصصون في مجال الذكاء الاصطناعي مع خبرة عملية واسعة",
      descriptionEn: "Programs are delivered by specialized experts in the field of AI with extensive practical experience"
    },
    {
      id: 3,
      title: "مشاريع تطبيقية",
      titleEn: "Applied Projects",
      description: "تتضمن البرامج مشاريع تطبيقية تساعد المتدربين على تعزيز مهاراتهم وتطبيق ما تعلموه",
      descriptionEn: "Programs include applied projects that help trainees enhance their skills and apply what they've learned"
    },
    {
      id: 4,
      title: "شهادات معتمدة",
      titleEn: "Certified Certificates",
      description: "يحصل المتدربون على شهادات معتمدة تعزز من فرصهم المهنية في مجال الذكاء الاصطناعي",
      descriptionEn: "Trainees receive certified certificates that enhance their professional opportunities in the field of AI"
    }
  ];

  return (
    <div className="relative">
      {/* خلفية الصفحة */}
      <div 
        className="absolute inset-0 h-[400px] bg-gradient-to-b from-[#2a2665] to-[#446591] z-0" 
        style={{
          backgroundImage: `url(/images/ai-background.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.9
        }}
      >
        {/* طبقة شفافة للتباين */}
        <div className="absolute inset-0 bg-[#2a2665] opacity-70"></div>
      </div>
      
      {/* محتوى الصفحة */}
      <div className="container mx-auto relative z-10">
        <div className="py-10 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'ar' ? "برامج الذكاء الاصطناعي" : "Artificial Intelligence Programs"}
          </h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            {language === 'ar' 
              ? "برامج تدريبية متخصصة في مجال الذكاء الاصطناعي لتطوير مهاراتك وتعزيز قدراتك في هذا المجال المستقبلي" 
              : "Specialized training programs in the field of artificial intelligence to develop your skills and enhance your capabilities in this future field"
            }
          </p>
        </div>
        
        {/* قسم مميزات البرامج */}
        <section className="py-10 mt-[180px] bg-white rounded-lg shadow-md mb-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-[#2a2665] text-center">
              {language === 'ar' ? "مميزات برامج الذكاء الاصطناعي" : "Features of AI Programs"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {aiFeatures.map((feature) => (
                <Card key={feature.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <Check className="h-5 w-5 text-[#b29567]" />
                      <h3 className="font-bold text-[#2a2665]">
                        {language === 'ar' ? feature.title : feature.titleEn}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {language === 'ar' ? feature.description : feature.descriptionEn}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* قائمة البرامج */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-[#2a2665]">
              {language === 'ar' ? "البرامج المتاحة" : "Available Programs"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiPrograms.map((program) => (
                <Card key={program.id} className="bg-white overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-2 bg-[#2a2665]"></div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-[#2a2665] mb-2">
                      {language === 'ar' ? program.title : program.titleEn}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {language === 'ar' ? program.description : program.descriptionEn}
                    </p>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium text-[#b29567]">
                        {language === 'ar' ? program.category : program.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {language === 'ar' ? program.duration : program.durationEn}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}