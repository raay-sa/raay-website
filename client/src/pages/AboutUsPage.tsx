import AboutSection from "@/components/sections/AboutSection";
import { Helmet } from "react-helmet";
import { useI18nStore } from "@/lib/i18n";

export default function AboutUsPage() {
  const { language } = useI18nStore();
  
  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'من نحن | مركز راي للتدريب والاستشارات' : 'About Us | Ray Training & Consulting Center'}</title>
      </Helmet>
      <AboutSection />
    </>
  );
}