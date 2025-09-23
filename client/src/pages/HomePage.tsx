import PartnersSection from "@/components/sections/PartnersSection";
import ContactSection from "@/components/sections/ContactSection";
import CallToAction from "@/components/sections/CallToAction";
import HeroSection from "@/components/sections/HeroSection";
import QuickMethodologySection from "@/components/sections/QuickMethodologySection";
import TrainingCategoriesSection from "@/components/sections/TrainingCategoriesSection";
import StatsSection from "@/components/sections/StatsSection";
import PartnerBanner from "@/components/sections/PartnerBanner";

export default function HomePage() {
  return (
    <>
      {/* Hero الرئيسي للموقع */}
      <HeroSection />
      
      {/* قسم البطاقات التعليمية */}
      <TrainingCategoriesSection />
      
      {/* قسم الشركاء */}
      <PartnersSection />
      
      {/* قسم الإحصائيات */}
      <StatsSection />
      
      {/* قسم "المنهجية" */}
      <QuickMethodologySection />
      
      <CallToAction />
      <ContactSection />
    </>
  );
}