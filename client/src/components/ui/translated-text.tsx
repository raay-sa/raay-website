import React, { useEffect, useState, useCallback, memo } from "react";
import { t, useI18nStore } from "@/lib/i18n";

export interface TranslatedTextProps {
  textKey: string;
  defaultText?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Using memo to prevent unnecessary re-renders
export const TranslatedText = memo(function TranslatedText({ 
  textKey, 
  defaultText,
  className = "", 
  as: Component = "span" 
}: TranslatedTextProps) {
  const { language } = useI18nStore();
  const [displayText, setDisplayText] = useState("");
  const [refreshCounter, setRefreshCounter] = useState(0);
  
  // Create a function to update the displayed text
  const updateDisplayText = useCallback(() => {
    const currentLanguage = useI18nStore.getState().language;
    const text = t(textKey, currentLanguage);
    setDisplayText(text === textKey && defaultText ? defaultText : text);
  }, [textKey, defaultText]);
  
  // Initialize on mount and update when textKey or language changes
  useEffect(() => {
    updateDisplayText();
  }, [language, textKey, defaultText, updateDisplayText]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      
      if (customEvent.detail && customEvent.detail.language) {
        const text = t(textKey, customEvent.detail.language);
        setDisplayText(text === textKey && defaultText ? defaultText : text);
      } else {
        updateDisplayText();
      }
      
      // Force component update
      setRefreshCounter(prev => prev + 1);
    };
    
    // Listen for the global force refresh event
    const handleForceRefresh = () => {
      updateDisplayText();
      setRefreshCounter(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    window.addEventListener('forceTranslationRefresh', handleForceRefresh);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      window.removeEventListener('forceTranslationRefresh', handleForceRefresh);
    };
  }, [textKey, defaultText, updateDisplayText]);
  
  // Ensure we're showing the latest translation
  useEffect(() => {
    if (window.__LANGUAGE_CHANGE_IN_PROGRESS) {
      const timeoutId = setTimeout(() => {
        updateDisplayText();
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [refreshCounter, updateDisplayText]);
  
  return (
    <Component className={className} data-i18n-key={textKey}>
      {displayText || (defaultText ?? textKey)}
    </Component>
  );
});