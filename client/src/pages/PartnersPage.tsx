import PartnersSection from "@/components/sections/PartnersSection";
import { Helmet } from "react-helmet";
import { useI18nStore } from "@/lib/i18n";

export default function PartnersPage() {
  const { language } = useI18nStore();
  
  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'شركاؤنا | مركز راي للتدريب والاستشارات' : 'Our Partners | Ray Training & Consulting Center'}</title>
      </Helmet>
      <PartnersSection />
    </>
  );
}