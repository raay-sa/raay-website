import { Button } from "@/components/ui/button";
import StatsSection from "@/components/ui/stats-section";
import { TranslatedText } from "@/components/ui/translated-text";
import { useI18nStore } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function MainHeroSection() {
  const { language } = useI18nStore();
  
  return (
    <section id="home" className="relative overflow-hidden bg-[#2a2665] text-white">
      {/* خلفية مستوحاة من موقع راي الرسمي - قاعة بيانات مع أضواء رقمية */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#2a2665]"></div>
        {/* خلفية من نقاط ضوئية متحركة */}
        <div className="absolute inset-0 opacity-30">
          {/* تأثيرات الضوء المتحركة */}
          <div className="absolute inset-0" 
            style={{
              background: 'radial-gradient(circle, rgba(42,38,101,0) 0%, rgba(42,38,101,1) 100%), url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'smallGrid\' width=\'8\' height=\'8\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 8 0 L 0 0 0 8\' fill=\'none\' stroke=\'rgba(100,150,255,0.3)\' stroke-width=\'0.5\'/%3E%3C/pattern%3E%3Cpattern id=\'grid\' width=\'80\' height=\'80\' patternUnits=\'userSpaceOnUse\'%3E%3Crect width=\'80\' height=\'80\' fill=\'url(%23smallGrid)\'/%3E%3Cpath d=\'M 80 0 L 0 0 0 80\' fill=\'none\' stroke=\'rgba(100,150,255,0.5)\' stroke-width=\'1\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23grid)\' /%3E%3C/svg%3E")',
              backgroundBlendMode: 'screen',
              animation: 'pulse 4s infinite alternate',
            }}
          >
          </div>

          {/* نقاط ضوئية متناثرة */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-full" 
              style={{
                background: 'radial-gradient(circle at center, rgba(100,200,255,0.2) 0%, rgba(42,38,101,0) 50%)',
                boxShadow: 'inset 0 0 100px rgba(100,200,255,0.2)',
              }}>
            </div>
          </div>

          {/* خطوط ضوئية أفقية */}
          <div className="absolute inset-x-0 top-1/3 h-px bg-blue-400/30 shadow-lg shadow-blue-400/30"></div>
          <div className="absolute inset-x-0 top-2/3 h-px bg-blue-400/20 shadow-lg shadow-blue-400/20"></div>
          <div className="absolute inset-y-0 left-1/3 w-px bg-blue-400/20 shadow-lg shadow-blue-400/20"></div>
          <div className="absolute inset-y-0 left-2/3 w-px bg-blue-400/20 shadow-lg shadow-blue-400/20"></div>
        </div>
      </div>

      {/* زخارف ونقاط ضوئية إضافية */}
      <div className="absolute inset-0 z-1 opacity-70">
        <div className="absolute top-[20%] left-[25%] w-1 h-1 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50 animate-ping"></div>
        <div className="absolute top-[30%] left-[60%] w-2 h-2 rounded-full bg-blue-300 shadow-lg shadow-blue-300/50 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
        <div className="absolute top-[70%] left-[40%] w-1.5 h-1.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 animate-ping" style={{ animationDuration: '2s' }}></div>
        <div className="absolute top-[60%] left-[80%] w-1 h-1 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-[15%] left-[75%] w-1 h-1 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.2s' }}></div>
      </div>
      
      {/* التراكب الخاص باللونين الذهبي والأزرق الداكن (هوية مركز راي) */}
      <div className="absolute inset-0 z-1">
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#2a2665] to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#2a2665] to-transparent"></div>
      </div>
      
      {/* المحتوى الرئيسي */}
      <div className="container mx-auto px-4 py-28 md:py-36 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              <TranslatedText textKey="hero.title" />
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-100 mb-4 max-w-3xl mx-auto"
            >
              <TranslatedText textKey="hero.subtitle" />
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-[#b29567] font-medium mb-8 max-w-3xl mx-auto"
            >
              مركز راي يعزز قدراتك المهنية والوظيفية باستخدام تطبيقات الذكاء الاصطناعي بما يتوافق مع المعايير المهنية العالمية
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a href="#contact">
              <Button className="bg-[#b29567] hover:bg-[#b29567]/90 text-white font-bold py-3 px-8 rounded transition duration-300 text-lg w-full sm:w-auto">
                <TranslatedText textKey="hero.cta" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* تم حذف بانر شركة بناء المعرفة بناء على طلب المستخدم */}

      <StatsSection />
    </section>
  );
}