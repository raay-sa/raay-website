import AboutSection from "@/components/sections/AboutSection";
import { Helmet } from "react-helmet";
import { useI18nStore } from "@/lib/i18n";
import { useEffect } from "react";

export default function AboutUsPage() {
  const { language } = useI18nStore();
  
  useEffect(() => {
    const scrollToId = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 100; // Offset to scroll a little above the section
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    const getHashId = () =>
      decodeURIComponent((window.location.hash || "").replace("#", ""));

    const jumpToHash = () => {
      const hash = getHashId();
      if (!hash) return;
      // Ensure DOM is painted before scrolling
      requestAnimationFrame(() => scrollToId(hash));
    };

    // initial (after first paint)
    requestAnimationFrame(jumpToHash);

    // react to hash changes (e.g., when clicking items in header)
    window.addEventListener("hashchange", jumpToHash);
    window.addEventListener("popstate", jumpToHash);

    return () => {
      window.removeEventListener("hashchange", jumpToHash);
      window.removeEventListener("popstate", jumpToHash);
    };
  }, []);
  
  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'من نحن | مركز راي للتدريب والاستشارات' : 'About Us | Ray Training & Consulting Center'}</title>
      </Helmet>
      <AboutSection />
    </>
  );
}