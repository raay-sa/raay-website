import { useEffect, useMemo, useRef, useState } from "react";
import { useI18nStore } from "@/lib/i18n";
import { Helmet } from "react-helmet";
import { policySections, policyGroups } from "@/data/policies-translations";

/**
 * سياسة وشروط منصة راي — إصدار بواجهتين:
 *  - تبويب علوي ثابت يضم تبويبين فقط:
 *      1) "الشروط و الاحكام" (يجمع الأقسام 1 → 5)
 *      2) "السياسات"        (يجمع الأقسام 6 → 16)
 *  - تمرير سلس وتحديد التبويب الفعال أثناء التمرير
 *  - يدعم RTL بشكل كامل
 */

type Section = {
  id: string;
  index: number;
  title: string;
  content: JSX.Element;
};

type Group = {
  id: string; // slug for the group (e.g., "الشروط-والاحكام")
  title: string; // displayed title (Arabic)
  range: [number, number]; // inclusive [startIndex, endIndex]
  sections: Section[]; // injected at runtime based on range
};

function slugify(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^\u0600-\u06FF\w\s-]/g, "") // keep arabic, latin, digits
    .replace(/\s+/g, "-");
}

// Translation helper function
const t = (lang: string, ar: string | JSX.Element, en: string | JSX.Element) => (lang === "ar" ? ar : en);

export default function PoliciesPage() {
  const { language } = useI18nStore();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState<string>("");

  // --------------- All Sections Content ---------------
  const allSections: Section[] = useMemo(() => {
    return policySections.map((section) => ({
      id: `${section.id}-${slugify(section.titleAr)}`,
      index: section.id,
      title: language === "ar" ? section.titleAr : section.titleEn,
      content: language === "ar" ? section.contentAr : section.contentEn,
    }));
  }, [language]);

  // --------------- Build two merged groups ---------------
  const groups: Group[] = useMemo(() => {
    const filled = policyGroups.map((g) => ({
      id: g.id,
      title: language === "ar" ? g.titleAr : g.titleEn,
      range: g.range,
      sections: allSections.filter(
        (s) => s.index >= g.range[0] && s.index <= g.range[1]
      ),
    }));

    return filled;
  }, [allSections, language]);

  // ---- Smooth scroll helper ----
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - (80 + 24);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // --------------- Observe group containers & highlight current ---------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -70% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    groups.forEach((g) => {
      const el = document.getElementById(g.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [groups]);

  // --------------- Handle initial hash AND future hash changes ---------------
  useEffect(() => {
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
        <title>
          {language === "ar"
            ? "سياسات وشروط وأحكام منصة راي التدريبية والتعليمية"
            : "Ray Training and Educational Platform Terms, Conditions, and Policies"}
        </title>
        <meta
          name="description"
          content={
            language === "ar"
              ? "هذه الوثيقة تُعد اتفاقية قانونية بين المستخدم ومنصة راي للتدريب والتعليم الإلكتروني"
              : "This document constitutes a legal agreement between the user and the Ray e-learning and training platform"
          }
        />
      </Helmet>
      <div dir={language === "ar" ? "rtl" : "ltr"} className="bg-[#f7f7fb] min-h-screen">
        {/* Sticky Top Tabs (2 only) */}
        <div className="sticky top-0 z-30 border-b border-gray-200/70 bg-white/95 backdrop-blur">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    window.history.replaceState({}, "", `#${g.id}`);
                    scrollToId(g.id);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition
                    ${
                      activeId === g.id
                        ? "bg-[#2a2665] text-white"
                        : "bg-white text-[#2a2665] hover:bg-[#f0efe9] border border-[#e8e6df]"
                    }`}
                  aria-label={`${language === "ar" ? "اذهب إلى" : "Go to"} ${g.title}`}
                >
                  {g.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#2a2665]">
              {language === "ar"
                ? "سياسات وشروط وأحكام منصة راي التدريبية والتعليمية"
                : "Ray Training and Educational Platform Terms, Conditions, and Policies"}
            </h1>
            <p className="mt-2 text-[#5b587d]">
              {language === "ar"
                ? "هذه الوثيقة تُعد اتفاقية قانونية بين المستخدم ومنصة راي."
                : "This document constitutes a legal agreement between the user and the Ray platform."}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Side TOC (desktop) */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-2">
                <h3 className="text-[#2a2665] font-bold mb-2">
                  {language === "ar" ? "محتويات الصفحة" : "Page Contents"}
                </h3>
                <nav className="space-y-1">
                  {groups.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => {
                        window.history.replaceState({}, "", `#${g.id}`);
                        scrollToId(g.id);
                      }}
                      className={`block w-full ${language === "ar" ? "text-right" : "text-left"} px-3 py-2 rounded-md text-sm transition
                        ${
                          activeId === g.id
                            ? "bg-[#2a2665] text-white"
                            : "hover:bg-gray-100 text-[#2a2665]"
                        }`}
                    >
                      {g.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main */}
            <main
              ref={containerRef}
              className="lg:col-span-9 space-y-10 leading-relaxed"
            >
              {groups.map((g) => (
                <section
                  key={g.id}
                  id={g.id}
                  className="scroll-mt-28 bg-white border border-gray-100 rounded-2xl shadow-sm p-6"
                >
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#2a2665] mb-4">
                    {g.title}
                  </h2>

                  {/* Render the grouped sub-sections within the group */}
                  <div className="space-y-8">
                    {g.sections.map((s) => (
                      <article key={s.id}>
                        <h3 className="text-lg md:text-xl font-bold text-[#2a2665] mb-3">
                          {s.index}. {s.title}
                        </h3>
                        <div className="prose prose-neutral max-w-none rtl:prose-p:text-right rtl:prose-li:text-right">
                          {s.content}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </main>
          </div>
        </div>

        {/* Back to Top */}
        <button
          className="fixed bottom-6 left-6 bg-[#2a2665] text-white rounded-full h-11 w-11 shadow-lg hover:bg-[#3b377a] transition"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={language === "ar" ? "العودة للأعلى" : "Back to top"}
          title={language === "ar" ? "العودة للأعلى" : "Back to top"}
        >
          ↑
        </button>
      </div>
    </>
  );
}