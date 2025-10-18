import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect } from "react";
import { useI18nStore } from "@/lib/i18n";
import { useAuthInit } from "@/lib/auth/useAuthInit";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProgramDetailPage from "@/pages/ProgramDetailPage";
import ProgramCategoryPage from "@/pages/ProgramCategoryPage";
import OnsiteTrainingPage from "@/pages/OnsiteTrainingPage";
import OnlineTrainingPage from "@/pages/OnlineTrainingPage";
import RegisteredTrainingPage from "@/pages/RegisteredTrainingPage";
import JoinUsPage from "@/pages/JoinUsPage";
import ConsultingPage from "@/pages/ConsultingPage";
import WorkshopsPage from "@/pages/WorkshopsPage";

// Import basic information pages
import AboutUsPage from "@/pages/AboutUsPage";
import MethodologyPage from "@/pages/MethodologyPage";
import MissionPage from "@/pages/MissionPage";
import GoalsPage from "@/pages/GoalsPage";
import TeamPage from "@/pages/TeamPage";
import PartnersPage from "@/pages/PartnersPage";
import TestimonialsPage from "@/pages/TestimonialsPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import AIPage from "@/pages/AIPage";

// Import Raay training platform pages
import TracksPage from "@/pages/TracksPage";
import ProgramsPage from "@/pages/ProgramsPage";
import TrainingPlatformPage from "@/pages/TrainingPlatformPage";
import OnlineLearningPage from "@/pages/OnlineLearningPage";
import StudentRegistrationPage from "@/pages/StudentRegistrationPage";
import ExpertRegistrationPage from "@/pages/ExpertRegistrationPage";
import SkillAssessmentPage from "@/pages/SkillAssessmentPage";
import TraineeDashboardPage from "@/pages/TraineeDashboardPage";

// Import Raay consulting platform pages
import ConsultingPlatformPage from "@/pages/ConsultingPlatformPage";
import ExpertDirectoryPage from "@/pages/ExpertDirectoryPage";

// Import login page
import AuthPage from "@/pages/AuthPage";

import PoliciesPage from "@/pages/PoliciesPage";
import OtpPage from "./pages/OtpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UnderDevelopmentPage from "./pages/UnderDevelopmentPage";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          {/* Home page */}
          <Route path="/" component={Home} />

          {/* Basic information pages */}
          <Route path="/about-us" component={AboutUsPage} />
          <Route path="/mission" component={MissionPage} />
          <Route path="/goals" component={GoalsPage} />
          <Route path="/methodology" component={MethodologyPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/partners" component={PartnersPage} />
          <Route path="/testimonials" component={TestimonialsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/privacy-policy" component={PrivacyPolicyPage} />
          <Route path="/policies" component={PoliciesPage} />

          {/* صفحات منصة راي للتدريب */}
          <Route path="/training-platform" component={TrainingPlatformPage} />

          {/* <Route path="/tracks" component={UnderDevelopmentPage} />
          <Route path="/programs" component={UnderDevelopmentPage} /> */}
          <Route path="/tracks" component={TracksPage} />
          <Route path="/programs" component={ProgramsPage} />

          <Route path="/artificial-intelligence" component={AIPage} />
          <Route path="/online-learning" component={OnlineLearningPage} />
          <Route
            path="/student-registration"
            component={StudentRegistrationPage}
          />
          <Route
            path="/expert-registration"
            component={ExpertRegistrationPage}
          />
          <Route path="/skill-assessment" component={SkillAssessmentPage} />
          <Route path="/trainee-dashboard" component={TraineeDashboardPage} />

          {/* صفحات منصة راي للاستشارات */}
          <Route
            path="/consulting-platform"
            component={ConsultingPlatformPage}
          />
          <Route path="/expert-directory" component={ExpertDirectoryPage} />

          {/* صفحة تفاصيل البرامج التدريبية */}
          <Route path="/program/:id">
            {(params) => <ProgramDetailPage params={params} />}
          </Route>

          {/* صفحات خدماتنا */}
          <Route path="/skill-assessment" component={SkillAssessmentPage} />
          <Route path="/onsite-training" component={OnsiteTrainingPage} />
          <Route path="/online-training" component={OnlineTrainingPage} />
          <Route path="/registered-training" component={RegisteredTrainingPage} />
          <Route path="/consulting" component={ConsultingPage} />
          <Route path="/workshops" component={WorkshopsPage} />
          <Route path="/join-us" component={JoinUsPage} />

          {/* صفحة فئات البرامج */}
          <Route path="/programs/category/:category">
            {(params) => <ProgramCategoryPage />}
          </Route>

          {/* صفحة تسجيل الدخول */}
          <Route path="/auth" component={AuthPage} />

          <Route path="/otp" component={OtpPage} />

          {/* Forgot Password Flow */}
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />

          {/* صفحة 404 */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const { language, setLanguage, forceRefresh } = useI18nStore();
  
  // Initialize authentication state and handle token refresh on app startup
  useAuthInit();

  // Check for forced language change
  useEffect(() => {
    const checkForcedLanguageChange = () => {
      // @ts-ignore
      if (
        window.__FORCE_LANGUAGE_CHANGE &&
        window.__FORCE_LANGUAGE_CHANGE !== language
      ) {
        // @ts-ignore
        const forcedLanguage = window.__FORCE_LANGUAGE_CHANGE;
        console.log("Detected forced language change to:", forcedLanguage);
        setLanguage(forcedLanguage);
        // Force re-render of all components
        forceRefresh();
        // @ts-ignore
        delete window.__FORCE_LANGUAGE_CHANGE;
      }
    };

    // Check initially and set up interval to check for changes
    checkForcedLanguageChange();
    const intervalId = setInterval(checkForcedLanguageChange, 500);

    return () => clearInterval(intervalId);
  }, [language, setLanguage, forceRefresh]);

  // On initial mount, check for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem("raay-language");
    if (savedLanguage && (savedLanguage === "ar" || savedLanguage === "en")) {
      console.log("Loading saved language preference:", savedLanguage);
      // Always set the language, even if it matches the current store value
      // This ensures consistency after page reloads
      setLanguage(savedLanguage);

      // Apply direction immediately
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  // Set the HTML dir attribute for RTL/LTR support when language changes
  useEffect(() => {
    console.log("App component detected language change to:", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;

    // Apply RTL/LTR specific styles - force application
    if (language === "ar") {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
      document.documentElement.classList.add("rtl");
      document.documentElement.classList.remove("ltr");
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
      document.documentElement.classList.add("ltr");
      document.documentElement.classList.remove("rtl");
      document.documentElement.setAttribute("dir", "ltr");
    }

    // Force reflow for RTL/LTR changes - more aggressive approach
    const htmlStyle = document.documentElement.style;
    htmlStyle.display = "none";

    // Trigger more aggressive refresh after delay
    setTimeout(() => {
      htmlStyle.display = "";
      // Force any components using the TranslatedText to refresh
      const refreshEvent = new CustomEvent("forceTranslationRefresh", {
        detail: { timestamp: Date.now(), language },
      });
      window.dispatchEvent(refreshEvent);
    }, 50);

    // Update document title based on language
    document.title =
      language === "ar"
        ? "مركز راي للتدريب والاستشارات"
        : "Ray Training & Consulting Center";

    // Force reflow after application is stable
    setTimeout(() => {
      forceRefresh();
    }, 200);
  }, [language, forceRefresh]);

  // Listen for manual language change events and force a re-render
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      console.log("App detected languageChanged event", event.detail);

      // Force any components using the TranslatedText to refresh
      const refreshEvent = new CustomEvent("forceTranslationRefresh", {
        detail: { timestamp: Date.now(), language: event.detail.language },
      });
      window.dispatchEvent(refreshEvent);

      // Force store refresh
      forceRefresh();

      // Force global reflow
      document.body.style.display = "none";
      setTimeout(() => (document.body.style.display = ""), 50);
    };

    window.addEventListener(
      "languageChanged",
      handleLanguageChange as EventListener
    );
    return () => {
      window.removeEventListener(
        "languageChanged",
        handleLanguageChange as EventListener
      );
    };
  }, [forceRefresh]);

  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
