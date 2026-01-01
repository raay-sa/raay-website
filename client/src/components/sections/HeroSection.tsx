import { Button } from "@/components/ui/button";
import StatsSection from "@/components/ui/stats-section";
import { TranslatedText } from "@/components/ui/translated-text";
import { useI18nStore } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft, Clock, User, Award } from "lucide-react";
import { Link } from "wouter";

// مكون بطاقة المزايا
interface FeatureCardProps {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
}

const FeatureCard = ({ icon, titleKey, descriptionKey }: FeatureCardProps) => {
  const { language } = useI18nStore();
  return (
    <div className="bg-white shadow-lg rounded-lg p-7 hover:shadow-xl transition-all duration-300 border-t-4 border-[#b29567] transform hover:-translate-y-1">
      <div className="flex items-start">
        <div className="bg-[#2a2665]/10 p-4 rounded-full mr-5 text-[#2a2665]">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-xl mb-3 text-[#2a2665]">
            <TranslatedText textKey={titleKey} />
          </h3>
          <p className="text-base text-gray-600">
            <TranslatedText textKey={descriptionKey} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default function HeroSection() {
  const { language } = useI18nStore();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Force component to re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language change event detected in HeroSection");
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  // Direction-aware arrow
  const DirectionArrow = () => (
    language === 'ar' ? <ArrowLeft className="w-4 h-4 mr-1" /> : <ArrowRight className="w-4 h-4 ml-1" />
  );
  
  return (
    <div className="relative">
      {/* الجزء العلوي من القسم - سلايدر/بانر رئيسي */}
      <section className="relative overflow-hidden bg-[#2a2665] text-white">
        {/* خلفية فيديو مركز راي */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* فيديو الخلفية */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover z-0 filter brightness-[0.7] contrast-[1.1]"
            src="/assets/videos/raay-center-bg.mp4"
          >
            يرجى استخدام متصفح يدعم تشغيل الفيديو
          </video>
          
          {/* طبقة لون أزرق للتحكم في شفافية الفيديو وتباين النص */}
          <div className="absolute inset-0 bg-[#2a2665]/60 z-[1]"></div>
          
          {/* طبقة إضافية لتحسين الشكل البصري والتباين */}
          <div className="absolute inset-0 z-[2] opacity-40">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2a2665]/0 to-[#2a2665]/80"></div>
          </div>
        </div>
        
        {/* زخارف ونقاط ضوئية إضافية */}
        <div className="absolute inset-0 z-[3] opacity-70">
          <div className="absolute top-[20%] left-[25%] w-1 h-1 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50 animate-ping"></div>
          <div className="absolute top-[30%] left-[60%] w-2 h-2 rounded-full bg-blue-300 shadow-lg shadow-blue-300/50 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
          <div className="absolute top-[70%] left-[40%] w-1.5 h-1.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 animate-ping" style={{ animationDuration: '2s' }}></div>
          <div className="absolute top-[60%] left-[80%] w-1 h-1 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute top-[15%] left-[75%] w-1 h-1 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.2s' }}></div>
        </div>
        
        {/* التراكب الخاص باللونين الذهبي والأزرق الداكن (هوية مركز راي) */}
        <div className="absolute inset-0 z-[4]">
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#2a2665] to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#2a2665] to-transparent"></div>
        </div>
        
        {/* المحتوى الرئيسي */}
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-[10]">
          <div className="text-center">
            {/* النص الرئيسي */}
            <h4 className="text-[#b29567] font-medium mb-2">
              <TranslatedText textKey="hero.welcome" defaultText="مرحباً بك في" />
            </h4>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block text-3xl md:text-5xl font-bold mb-6 px-6 py-2 text-[#b29567] rounded-lg"
            >
              <TranslatedText textKey="hero.title" />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-100 mb-4 max-w-2xl mx-auto"
            >
              <TranslatedText textKey="hero.subtitle" />
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-md text-[#b29567] font-medium mb-8"
            >
              <TranslatedText textKey="hero.tagline" />
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {/* زر استكشاف البرامج */}
              <a href="#programs" className="mb-2 md:mb-0">
                <Button className="bg-[#b29567] hover:bg-[#b29567]/90 text-white font-bold py-3 px-6 rounded-md transition duration-300">
                  <TranslatedText textKey="hero.explore" />
                </Button>
              </a>
              
              {/* زر الملف التعريفي */}
              {/* <a href="/assets/docs/profile.pdf" target="_blank" rel="noopener noreferrer" download> */}
              <Link to="/about-us#about-center">
                <Button variant="outline" className="bg-transparent/10 border-2 border-white text-white hover:bg-white hover:text-[#2a2665] font-bold hover:font-black py-3 px-6 rounded-md transition duration-300 ease-out">
                  <TranslatedText textKey="profile.title" />
                  <DirectionArrow />
                </Button>
              </Link>
              {/* </a> */}
              {/* تم إزالة زر فيديو تعريفي للمركز من هنا */}
            </motion.div>
          </div>
          {/* تم حذف الصورة التوضيحية */}
        </div>
      </section>
      
      {/* تم حذف بطاقات المزايا الثلاثية من هنا حسب طلب المستخدم */}
      
      {/* تم حذف بانر شركة بناء المعرفة بناء على طلب المستخدم */}
      
      {/* تم حذف قسم الإحصائيات بناء على طلب المستخدم */}
    </div>
  );
}