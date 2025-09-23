import TeamSection from "@/components/sections/TeamSection";
import { Helmet } from "react-helmet";
import { useI18nStore } from "@/lib/i18n";

export default function TeamPage() {
  const { language } = useI18nStore();
  
  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'فريق العمل | مركز راي للتدريب والاستشارات' : 'Our Team | Ray Training & Consulting Center'}</title>
      </Helmet>
      <TeamSection />
    </>
  );
}