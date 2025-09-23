import { useI18nStore } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import workValuesImg from "../../assets/image_1747131919824.png";

export default function QuickAboutSection() {
  const { language } = useI18nStore();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language change event detected in QuickAboutSection");
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  return (
    <section id="about">
      {/* القسم الرئيسي - من نحن */}
      <div className="bg-[#2a2665] text-white py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {language === 'ar' ? 'من نحن' : 'About Us'}
          </h2>
          <p className="max-w-4xl mx-auto text-center px-4 leading-relaxed">
            {language === 'ar' 
              ? 'شركة سعودية تستثمر النجاح في مواجهة التحديات المحلية والعالمية ببناء وتطوير مهارات العنصر البشري من خلال برامج التدريب والاستشارات التي تبني النجاح المعرفية في سوق العمل السعودي المتماشي مع برامج ومبادرات التحول وفق رؤية المملكة العربية السعودية 2030'
              : 'A Saudi company investing in success by facing local and global challenges through building and developing human capital skills via training programs and consultations that build knowledge success in the Saudi labor market in line with transformation programs and initiatives according to Saudi Vision 2030'
            }
          </p>
        </div>
      </div>
      
      {/* الرؤية والرسالة ومجالات العمل */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* الرؤية */}
          <div className={`mb-10 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold text-[#b29567] mb-3">
              {language === 'ar' ? 'الرؤية' : 'Vision'}
            </h3>
            <p className="text-[#2a2665] text-base max-w-5xl">
              {language === 'ar' 
                ? 'الريادة في بناء قدرات العنصر البشري وتقديم حلول مبتكرة لتطوير بيئة الأعمال'
                : 'Leadership in building human capital capabilities and providing innovative solutions to develop the business environment'
              }
            </p>
          </div>
          
          {/* الرسالة */}
          <div className={`mb-10 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold text-[#b29567] mb-3">
              {language === 'ar' ? 'الرسالة' : 'Mission'}
            </h3>
            <p className="text-[#2a2665] text-base max-w-5xl">
              {language === 'ar' 
                ? 'تقديــم حزمــة مــن الحلــول المتكاملــة الاستشارية والتدريبية للمنظمــات العامــة والخاصة لمواكبــة تطــورات بيئة الأعمال انسجاماً مع برامج التحول في رؤية المملكة العربية السعودية 2030'
                : 'Providing integrated consulting and training solutions for public and private organizations to keep pace with business environment developments in line with transformation programs in Saudi Vision 2030'
              }
            </p>
          </div>
          
          {/* خط فاصل */}
          <div className="border-t border-[#b29567]/30 mb-16"></div>
          
          {/* قيم العمل - صورة بحجم كامل */}
          <div className="mt-20 mb-20">
            <div className="relative w-full mx-auto">
              <div className="max-w-full overflow-visible">
                <img 
                  src={workValuesImg} 
                  alt={language === 'ar' ? 'قيم العمل' : 'Work Values'} 
                  style={{ 
                    width: "100%", 
                    maxWidth: "1500px", 
                    height: "auto", 
                    display: "block", 
                    margin: "0 auto",
                    transform: "scale(1.2)",
                    objectFit: "contain"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}