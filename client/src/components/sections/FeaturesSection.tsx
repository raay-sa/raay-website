import React from "react";
import { useI18nStore } from "@/lib/i18n";
import { Clock, Award, Users } from "lucide-react";

export default function FeaturesSection() {
  const { language } = useI18nStore();
  
  // مزايا التدريب
  const features = [
    {
      id: 1,
      title: { ar: "شهادات معتمدة", en: "Certified Certificates" },
      description: { 
        ar: "احصل على شهادات تدريب معتمدة تعزز من فرصك المهنية وتطور مسارك الوظيفي", 
        en: "Get accredited training certificates that enhance your professional opportunities and develop your career path" 
      },
      icon: <Award className="w-14 h-14 text-[#2a2665]" />
    },
    {
      id: 2,
      title: { ar: "مدربون محترفون", en: "Professional Trainers" },
      description: { 
        ar: "نقدم التدريب من المدربين المتخصصين ذوي الخبرة العملية والأكاديمية", 
        en: "We provide training from specialized trainers with practical and academic experience" 
      },
      icon: <Users className="w-14 h-14 text-[#2a2665]" />
    },
    {
      id: 3,
      title: { ar: "تدريب مرن", en: "Flexible Training" },
      description: { 
        ar: "برامج تدريبية مرنة تناسب جدولك وتسمح لك بالتعلم بالسرعة التي تناسبك", 
        en: "Flexible training programs that suit your schedule and allow you to learn at your own pace" 
      },
      icon: <Clock className="w-14 h-14 text-[#2a2665]" />
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* مزايا التدريب */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(feature => (
            <div key={feature.id} className="bg-gray-50 rounded-lg p-6 transition-transform hover:shadow-md hover:-translate-y-1 duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white rounded-full p-4 mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2a2665] mb-3">
                  {language === 'ar' ? feature.title.ar : feature.title.en}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'ar' ? feature.description.ar : feature.description.en}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}