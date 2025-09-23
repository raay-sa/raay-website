import HeroSection from "@/components/sections/HeroSection";
import ContactSection from "@/components/sections/ContactSection";
import CallToAction from "@/components/sections/CallToAction";
import PartnersSection from "@/components/sections/PartnersSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import TrainingCategoriesSection from "@/components/sections/TrainingCategoriesSection";
import FeaturesSection from "@/components/sections/FeaturesSection";

export default function Home() {
  return (
    <>
      {/* 1. اللوحة الزرقاء */}
      <HeroSection />
      
      {/* 2. صندوق المسارات التدريبية وورش العمل والاستشارات */}
      <TrainingCategoriesSection />
      
      {/* 3. برامجنا المميزة */}
      <ProgramsSection />
      
      {/* 4. بطاقة التدريب المرن - مدربون محترفون - شهادات معتمدة */}
      <FeaturesSection />
      
      <CallToAction />
      {/* <ContactSection /> */}
    </>
  );
}
