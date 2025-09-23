import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, Search } from "lucide-react";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { useI18nStore } from "@/lib/i18n";
import rayLogo from "@/assets/images/rayLogo.webp";
import maarifaLogo from "@/assets/maarifa-logo.png";
import { useToast } from "@/hooks/use-toast";
import { buildSsoLoginUrl, getValidTokenForSSO } from "@/lib/api/sso";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { language } = useI18nStore();

  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const { toast } = useToast();

  // ------- Outside click handlers -------
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAboutDropdownOpen(false);
      }
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);
  const toggleSearchBar = () => setShowSearchBar((v) => !v);

  // Read auth token from localStorage
  useEffect(() => {
    const readAuth = () => {
      try {
        const raw = localStorage.getItem("raay-auth");
        const parsed = raw ? JSON.parse(raw) : null;
        const t = parsed?.token ?? null;
        setIsAuthed(Boolean(t));
        setToken(t);
      } catch {
        setIsAuthed(false);
        setToken(null);
      }
    };
    readAuth();

    // react to auth changes across tabs
    window.addEventListener("storage", readAuth);
    return () => window.removeEventListener("storage", readAuth);
  }, []);

  // Menu data
  const aboutSubmenu = [
    { href: "/about-us", labelAr: "عن مركز راي", labelEn: "About Us" },
    { href: "/methodology", labelAr: "المنهجية", labelEn: "Methodology" },
    { href: "/partners", labelAr: "شركاؤنا", labelEn: "Our Partners" },
    // NEW: Terms & Policies inside About
    {
      href: "/policies#الشروط-والاحكام",
      labelAr: "الشروط والاحكام",
      labelEn: "Terms & Policies",
    },
  ];

  const ourServicesSubmenu = [
    {
      href: "/skill-assessment",
      labelAr: "قيم مهاراتك",
      labelEn: "Skills Assessment",
    },
    {
      href: "/onsite-training",
      labelAr: "التدريب الحضوري",
      labelEn: "On-site Training",
    },
    {
      href: "/online-training",
      labelAr: "التدريب عن بعد",
      labelEn: "Online Training",
    },
    { href: "/consulting", labelAr: "الاستشارات", labelEn: "Consulting" },
    { href: "/join-us", labelAr: "انضم إلينا", labelEn: "Join Us" },
  ];

  // Open Student Dashboard via SSO /token-login
  const handleOpenDashboard = async () => {
    const freshToken = await getValidTokenForSSO();
    if (!freshToken) {
      toast({
        title: language === "ar" ? "الرجاء تسجيل الدخول" : "Please log in",
        description:
          language === "ar"
            ? "لتتمكن من فتح لوحة المتدرب"
            : "You need to sign in to open the dashboard.",
        variant: "destructive",
      });
      window.location.href = "/auth";
      return;
    }
    const ssoUrl = buildSsoLoginUrl(freshToken, "/student");
    window.location.href = ssoUrl;
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Logos Container */}
            <div className="flex justify-between items-center py-3 px-4">
              {/* Ray Logo */}
              <Link to="/">
                <img
                  src={rayLogo}
                  alt={language === "ar" ? "شعار مركز راي" : "Raay Center Logo"}
                  className="h-16"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center justify-center gap-12 flex-grow">
              {/* Home */}
              <a
                href="/"
                className="font-bold text-[#2a2665] hover:text-[#b29567] transition-colors text-base"
              >
                {language === "ar" ? "الرئيسية" : "Home"}
              </a>

              {/* About Us Dropdown */}
              <div className="relative" ref={aboutDropdownRef}>
                <button
                  className="flex items-center font-bold text-[#2a2665] hover:text-[#b29567] transition-colors text-base"
                  onClick={() => {
                    setIsAboutDropdownOpen((v) => !v);
                    setIsServicesDropdownOpen(false);
                  }}
                >
                  {language === "ar" ? "من نحن" : "About Us"}
                  <ChevronDown
                    className={`h-4 w-4 ${
                      language === "ar" ? "mr-1" : "ml-1"
                    } transition-transform`}
                  />
                </button>

                {isAboutDropdownOpen && (
                  <div
                    className={`absolute ${
                      language === "ar" ? "right-0" : "left-0"
                    } mt-2 w-64 bg-white shadow-xl z-50 border border-gray-100`}
                  >
                    <div className="py-2 bg-[#2a2665] text-white w-full">
                      <h3 className="px-4 font-bold">
                        {language === "ar" ? "من نحن" : "About Us"}
                      </h3>
                    </div>
                    <div className="py-1">
                      <div className="grid gap-1">
                        {aboutSubmenu.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            className="block px-4 py-2 text-[#2a2665] hover:bg-gray-100 hover:text-[#b29567] transition-colors"
                            onClick={() => setIsAboutDropdownOpen(false)}
                          >
                            {language === "ar" ? item.labelAr : item.labelEn}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Our Services Dropdown */}
              <div className="relative" ref={servicesDropdownRef}>
                <button
                  className="flex items-center font-bold text-[#2a2665] hover:text-[#b29567] transition-colors text-base"
                  onClick={() => {
                    setIsServicesDropdownOpen((v) => !v);
                    setIsAboutDropdownOpen(false);
                  }}
                >
                  {language === "ar" ? "خدماتنا" : "Our Services"}
                  <ChevronDown
                    className={`h-4 w-4 ${
                      language === "ar" ? "mr-1" : "ml-1"
                    } transition-transform`}
                  />
                </button>

                {isServicesDropdownOpen && (
                  <div
                    className={`absolute ${
                      language === "ar" ? "right-0" : "left-0"
                    } mt-2 w-64 bg-white shadow-xl z-50 border border-gray-100`}
                  >
                    <div className="py-2 bg-[#2a2665] text-white w-full">
                      <h3 className="px-4 font-bold">
                        {language === "ar" ? "خدماتنا" : "Our Services"}
                      </h3>
                    </div>

                    <div className="py-1">
                      <div className="grid gap-1">
                        {ourServicesSubmenu.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            className="block px-4 py-2 text-[#2a2665] hover:bg-gray-100 hover:text-[#b29567] transition-colors"
                            onClick={() => setIsServicesDropdownOpen(false)}
                          >
                            {language === "ar" ? item.labelAr : item.labelEn}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Link */}
              <a
                href="/contact"
                className="font-bold text-[#2a2665] hover:text-[#b29567] transition-colors text-base"
              >
                {language === "ar" ? "تواصل معنا" : "Contact Us"}
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden px-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="text-[#2a2665] hover:text-[#b29567] focus:outline-none"
                aria-label="فتح القائمة"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>

            {/* Header Actions (Right) */}
            <div className="hidden md:flex items-center space-x-4 px-4">
              {/* Maarifa Business Solutions Logo */}
              <div className={`${language === "ar" ? "ml-4" : "mr-4"}`}>
                <img
                  src={maarifaLogo}
                  alt="شعار المعرفة حلول الأعمال"
                  className="h-20"
                />
              </div>

              {/* Language Switcher */}
              <div className="mr-4">
                <LanguageSwitcher />
              </div>

              {/* Auth-aware button */}
              {!isAuthed ? (
                <a href="/auth">
                  <Button
                    variant="outline"
                    className="border-[#2a2665] text-[#2a2665] hover:bg-[#f5f5fa]"
                  >
                    {language === "ar" ? "تسجيل الدخول" : "Login"}
                  </Button>
                </a>
              ) : (
                <Button
                  variant="outline"
                  className="border-[#2a2665] text-[#2a2665] hover:bg-[#f5f5fa]"
                  onClick={handleOpenDashboard}
                >
                  {language === "ar" ? "لوحة المتدرب" : "Dashboard"}
                </Button>
              )}

              {/* Book Consultation */}
              <a href="/consulting">
                <Button className="bg-[#b29567] hover:bg-[#2a2665] transition-colors text-white font-bold px-5 py-2 rounded-md">
                  {language === "ar" ? "احجز استشارة" : "Book a Consultation"}
                </Button>
              </a>
            </div>
          </div>

          {/* Search Bar */}
          {showSearchBar && (
            <div className="border-t border-gray-200 py-3 bg-white">
              <div className="container mx-auto px-4">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder={
                      language === "ar"
                        ? "ابحث عن الدورات والبرامج..."
                        : "Search for courses and programs..."
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b29567] text-alignment-dynamic"
                  />
                  <button
                    className="bg-[#2a2665] text-white p-2 rounded-md mx-2 hover:bg-[#b29567] transition-colors"
                    aria-label="بحث"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col">
              {/* Home */}
              <Link
                href="/"
                className="py-3 border-b border-gray-100 font-bold text-[#2a2665] hover:text-[#b29567]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {language === "ar" ? "الرئيسية" : "Home"}
              </Link>

              {/* About Us */}
              <div className="py-3 border-b border-gray-100">
                <div className="font-bold text-white mb-3 bg-[#2a2665] px-3 py-2 rounded-md">
                  {language === "ar" ? "من نحن" : "About Us"}
                </div>
                <div className="px-4 flex flex-col space-y-2">
                  {aboutSubmenu.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-[#2a2665]/80 hover:text-[#b29567] border-r-2 border-[#b29567] pr-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {language === "ar" ? item.labelAr : item.labelEn}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="py-3 border-b border-gray-100">
                <div className="font-bold text-white mb-3 bg-[#2a2665] px-3 py-2 rounded-md">
                  {language === "ar" ? "خدماتنا" : "Our Services"}
                </div>
                <div className="px-4 flex flex-col space-y-2">
                  {ourServicesSubmenu.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="text-[#2a2665]/80 hover:text-[#b29567] border-r-2 border-[#b29567] pr-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {language === "ar" ? item.labelAr : item.labelEn}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <Link
                href="/contact"
                className="py-3 font-bold text-[#2a2665] hover:text-[#b29567]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {language === "ar" ? "تواصل معنا" : "Contact Us"}
              </Link>

              {/* Auth-aware (mobile) */}
              {!isAuthed ? (
                <Link
                  href="/auth"
                  className="py-3 font-bold text-[#2a2665] hover:text-[#b29567]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === "ar" ? "تسجيل الدخول" : "Login"}
                </Link>
              ) : (
                <button
                  className="py-3 text-right font-bold text-[#2a2665] hover:text-[#b29567]"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenDashboard();
                  }}
                >
                  {language === "ar" ? "لوحة المتدرب" : "Dashboard"}
                </button>
              )}

              {/* Language Switch */}
              <div className="py-3 flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
