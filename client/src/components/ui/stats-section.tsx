import { useEffect, useState } from "react";
import { useI18nStore } from "@/lib/i18n";
import { TranslatedText } from "./translated-text";

export default function StatsSection() {
  const { language } = useI18nStore();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Force component to re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language change detected in StatsSection");
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  return (
    <div className="bg-white py-8 shadow-md relative z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold text-[#2a2665] mb-2">+50</div>
            <div className="text-gray-600">
              <TranslatedText textKey="stats.programs" defaultText="برنامج تدريبي" />
            </div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-[#2a2665] mb-2">+1000</div>
            <div className="text-gray-600">
              <TranslatedText textKey="stats.trainees" defaultText="متدرب" />
            </div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-[#2a2665] mb-2">+25</div>
            <div className="text-gray-600">
              <TranslatedText textKey="stats.trainers" defaultText="مدرب محترف" />
            </div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-[#2a2665] mb-2">6</div>
            <div className="text-gray-600">
              <TranslatedText textKey="stats.tracks" defaultText="مسارات تخصصية" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
