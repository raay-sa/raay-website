import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { Helmet } from "react-helmet";
import { useI18nStore } from "@/lib/i18n";

export default function TestimonialsPage() {
  const { language } = useI18nStore();
  
  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'آراء المتدربين | مركز راي للتدريب والاستشارات' : 'Testimonials | Ray Training & Consulting Center'}</title>
      </Helmet>
      <TestimonialsSection />
    </>
  );
}