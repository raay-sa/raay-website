import { Helmet } from "react-helmet";
import { useI18nStore } from "@/lib/i18n";
import { FaBullseye } from "react-icons/fa";
import { TranslatedText } from "@/components/ui/translated-text";

export default function MissionPage() {
  const { language } = useI18nStore();
  
  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'الرسالة | مركز راي للتدريب والاستشارات' : 'Our Mission | Ray Training & Consulting Center'}</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#2a2665] mb-4">
              {language === 'ar' ? 'الرسالة' : 'Our Mission'}
            </h1>
            <div className="w-16 h-1 bg-[#b29567] mx-auto mb-6"></div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 text-center shadow-lg">
            <div className="bg-[#2a2665] inline-flex items-center justify-center w-20 h-20 rounded-full mb-6">
              <FaBullseye className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-[#2a2665]">
              <TranslatedText textKey="about.mission" />
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              <TranslatedText textKey="about.mission.text" />
            </p>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {language === 'ar' ? 'كيف نحقق رسالتنا' : 'How We Fulfill Our Mission'}
              </h3>
              <ul className="text-right list-disc list-inside text-gray-700 space-y-3">
                <li>تصميم برامج تدريبية نوعية تلبي احتياجات سوق العمل</li>
                <li>توظيف مدربين واستشاريين من ذوي الخبرة والكفاءة العالية</li>
                <li>تقديم حلول استشارية مبتكرة تساهم في تطوير المؤسسات</li>
                <li>تبني أحدث منهجيات التدريب والتطوير المعتمدة عالمياً</li>
                <li>المتابعة المستمرة لضمان تحقيق نتائج ملموسة</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}