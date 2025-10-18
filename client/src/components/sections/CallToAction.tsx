import { Button } from "@/components/ui/button";
import { useI18nStore } from "@/lib/i18n";
import { TranslatedText } from "@/components/ui/translated-text";
import { useEffect, useState } from "react";

export default function CallToAction() {
  const { language } = useI18nStore();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Force component to re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language change detected in CallToAction");
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  // Direction-specific classes
  const flexDirection = language === 'ar' 
    ? "flex-col sm:flex-row" 
    : "flex-col sm:flex-row";
  
  return (
    <section className="py-12 bg-[#2a2665] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          <TranslatedText 
            textKey="callToAction.title" 
            defaultText="هل أنت مستعد لتطوير مهاراتك؟" 
          />
        </h2>
        <p className="text-white opacity-90 mb-8 max-w-2xl mx-auto">
          <TranslatedText 
            textKey="callToAction.description" 
            defaultText="انضم إلى برامجنا التدريبية المتميزة واكتسب المهارات والمعرفة التي تحتاجها للنجاح في عالم اليوم سريع التغير" 
          />
        </p>
        <div className={`flex ${flexDirection} justify-center gap-4`}>
          <a href="/skill-assessment">
            <Button className="bg-white text-[#2a2665] hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 text-lg w-full sm:w-auto">
              <TranslatedText 
                textKey="callToAction.explorePrograms" 
                defaultText="قيم مهاراتك مجانا" 
              />
            </Button>
          </a>
          <a href="contact">
            <Button variant="outline" className="bg-transparent hover:bg-white hover:text-[#2a2665] text-white border border-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg w-full sm:w-auto">
              <TranslatedText 
                textKey="callToAction.contactUs" 
                defaultText="تواصل معنا" 
              />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
