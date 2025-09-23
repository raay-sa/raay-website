import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Language, useI18nStore } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18nStore();
  const { toast } = useToast();
  
  // Log current language on mount
  useEffect(() => {
    console.log("Current language:", language);
  }, [language]);

  const toggleLanguage = async () => {
    try {
      const newLanguage: Language = language === 'ar' ? 'en' : 'ar';
      console.log("Switching language from", language, "to", newLanguage);
      
      // Store the new language preference in localStorage first
      localStorage.setItem('raay-language', newLanguage);
      
      // Show toast message before reload
      toast({
        title: newLanguage === 'ar' ? "تم تغيير اللغة إلى العربية" : "Language changed to English",
        description: newLanguage === 'ar' ? "جاري تحديث الصفحة..." : "Refreshing page...",
      });
      
      // Set direction appropriately before reload
      document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLanguage;
      
      // Hard refresh the page to ensure complete language change
      // This is the most reliable way to ensure ALL text changes
      setTimeout(() => {
        window.location.reload();
      }, 500);
      
    } catch (error) {
      console.error("Error changing language:", error);
      toast({
        title: language === 'ar' ? "خطأ في تغيير اللغة" : "Error changing language",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1 bg-transparent border border-[#b29567] text-[#b29567] hover:bg-[#b29567] hover:text-white"
    >
      {language === 'ar' ? 'English' : 'العربية'}
    </Button>
  );
}

// Add type declaration for the global window object
declare global {
  interface Window {
    __LANGUAGE_CHANGE_IN_PROGRESS?: boolean;
    __FORCE_LANGUAGE_CHANGE?: 'ar' | 'en';
  }
}