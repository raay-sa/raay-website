import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { TranslatedText } from "@/components/ui/translated-text";
import { useI18nStore } from "@/lib/i18n";

// قائمة منسدلة متعددة المستويات لخدمات مركز راي
interface ServiceSubmenu {
  titleKey: string;
  items: { href: string; labelKey: string }[];
}

interface ServicesDropdownProps {
  titleKey: string;
  submenus: Record<string, ServiceSubmenu>;
}

export default function ServicesDropdown({ titleKey, submenus }: ServicesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language } = useI18nStore();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Force update when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Direction-aware UI adjustments based on language
  const chevronClass = language === 'ar' 
    ? `h-4 w-4 mr-1 transition-transform ${isOpen ? 'rotate-180' : ''}` 
    : `h-4 w-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`;
    
  const dropdownClass = language === 'ar'
    ? "absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md py-1 z-50 border border-gray-100"
    : "absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md py-1 z-50 border border-gray-100";
    
  const submenuClass = language === 'ar'
    ? "absolute right-56 top-0 mt-0 w-56 bg-white shadow-lg rounded-md py-1 z-50 border border-gray-100"
    : "absolute left-56 top-0 mt-0 w-56 bg-white shadow-lg rounded-md py-1 z-50 border border-gray-100";
    
  const DirectionalChevron = () => {
    return language === 'ar' ? (
      <ChevronLeft className="w-4 h-4 ml-auto" />
    ) : (
      <ChevronRight className="w-4 h-4 ml-auto" />
    );
  };

  return (
    <div className="relative group" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center py-2 hover:text-[#b29567] font-medium focus:outline-none space-rtl-reverse"
      >
        <TranslatedText textKey={titleKey} />
        <ChevronDown className={chevronClass} />
      </button>

      {isOpen && (
        <div className={dropdownClass}>
          {/* عرض القوائم الرئيسية (التدريب والاستشارات) */}
          {Object.keys(submenus).map((key) => (
            <div 
              key={key}
              className="relative"
              onMouseEnter={() => setActiveSubmenu(key)}
              onMouseLeave={() => setActiveSubmenu(null)}
            >
              <button 
                className="flex w-full items-center justify-between px-4 py-2 text-sm text-[#2a2665]/80 hover:bg-[#f7f9fd] hover:text-[#b29567] text-alignment-dynamic transition-all"
              >
                <TranslatedText textKey={submenus[key].titleKey} />
                <DirectionalChevron />
              </button>
              
              {/* عرض العناصر الفرعية للقائمة النشطة */}
              {activeSubmenu === key && (
                <div className={submenuClass}>
                  {submenus[key].items.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-[#2a2665]/80 hover:bg-[#f7f9fd] hover:text-[#b29567] text-alignment-dynamic transition-all"
                      onClick={() => {
                        setIsOpen(false);
                        setActiveSubmenu(null);
                      }}
                    >
                      <TranslatedText textKey={item.labelKey} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}