import { Helmet } from "react-helmet";
import { useI18nStore } from "@/lib/i18n";
import { FaEye } from "react-icons/fa";
import { TranslatedText } from "@/components/ui/translated-text";

export default function GoalsPage() {
  const { language } = useI18nStore();
  
  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'الهدف | مركز راي للتدريب والاستشارات' : 'Our Goals | Ray Training & Consulting Center'}</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#2a2665] mb-4">
              {language === 'ar' ? 'الهدف' : 'Our Goals'}
            </h1>
            <div className="w-16 h-1 bg-[#b29567] mx-auto mb-6"></div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 text-center shadow-lg">
            <div className="bg-[#2a2665] inline-flex items-center justify-center w-20 h-20 rounded-full mb-6">
              <FaEye className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-[#2a2665]">
              <TranslatedText textKey="about.vision" />
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              <TranslatedText textKey="about.vision.text" />
            </p>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {language === 'ar' ? 'أهدافنا الاستراتيجية' : 'Our Strategic Goals'}
              </h3>
              <ul className="text-right list-disc list-inside text-gray-700 space-y-3">
                <li>تعزيز مكانة مركز راي كمقدم رئيسي لخدمات التدريب والاستشارات في المملكة العربية السعودية والمنطقة</li>
                <li>تطوير قدرات الأفراد والمؤسسات بما يتوافق مع أحدث المعايير المهنية العالمية</li>
                <li>توفير حلول تدريبية مبتكرة وشاملة تلبي احتياجات السوق المتغيرة</li>
                <li>المساهمة في تحقيق رؤية المملكة 2030 من خلال تطوير الكوادر البشرية</li>
                <li>استخدام أحدث التقنيات والأساليب التعليمية في برامجنا التدريبية</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}