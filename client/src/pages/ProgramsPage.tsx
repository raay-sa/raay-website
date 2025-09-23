// src/pages/ProgramsPage.tsx
import React from "react";
import { Link } from "wouter";
import { Clock } from "lucide-react";
import { useI18nStore } from "@/lib/i18n";
import { formatCurrency } from "@/lib/utils";
import type { Program } from "@/lib/api/types";
import { useProgramsInfinite, useProgramsByCategory } from "@/features/programs/queries";
import { useCategories as useCategoriesList } from "@/features/categories/queries";
import HorizontalScroller from "@/components/ui/HorizontalScroller";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

export default function ProgramsPage() {
  const { language } = useI18nStore();
  const dir: "rtl" | "ltr" = language === "ar" ? "rtl" : "ltr";

  // null => "All Programs", otherwise a category id
  const [activeCategory, setActiveCategory] = React.useState<number | null>(null);

  // ---- Fetch categories (for slider) ----
  const { data: categories, isLoading: catsLoading, isError: catsError } = useCategoriesList();

  // ---- Fetch programs (two modes) ----
  // Mode A: All programs from /public/programs (paginated)
  const {
    data: allData,
    isLoading: allLoading,
    isError: allError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useProgramsInfinite(activeCategory === null ? null : undefined); // only active when "All"

  // Mode B: By Category from /public/programs/category/:id (one-shot)
  const {
    data: catData,
    isLoading: catLoading,
    isError: catError,
  } = useProgramsByCategory(activeCategory ?? undefined); // enabled only when number

  // Flatten pages for "All"
  const allItems: Program[] = React.useMemo(
    () => (allData?.pages ?? []).flatMap((p) => p.items),
    [allData]
  );

  // Choose the source based on selection
  const items: Program[] = activeCategory === null ? allItems : (catData ?? []);

  // Loading & error state derived from current mode
  const isLoading = activeCategory === null ? allLoading : catLoading;
  const isError = activeCategory === null ? allError : catError;

  // Build slider list (All + API categories)
  const horizontalCategories = React.useMemo(() => {
    const base = [{ id: 0, title: language === "ar" ? "جميع البرامج" : "All Programs" }];
    if (!categories || catsError) return base;
    return base.concat(categories.map((c) => ({ id: c.id, title: c.title })));
  }, [categories, catsError, language]);

  return (
    <section className="py-16 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="inline-block bg-[#2a2665] h-1 w-16 mb-3 mx-auto rounded-full" />
            <h2 className="text-4xl font-bold text-[#2a2665] mb-3">
              {language === "ar" ? "البرامج التدريبية" : "Training Programs"}
            </h2>
            <span className="inline-block bg-[#b29567] h-1 w-16 mx-auto rounded-full" />
          </div>
          <p className="text-[#6b7280] max-w-3xl mx-auto text-lg">
            {language === "ar" ? (
              <>
                نقدم مجموعة من البرامج التدريبية عالية الجودة التي تلبي الاحتياجات المهنية والشخصية
                <br /> المصممة لتطوير المهارات وتعزيز المعرفة في مختلف المجالات
              </>
            ) : (
              <>
                We offer a range of high-quality training programs that meet professional and personal needs
                <br /> designed to develop skills and enhance knowledge in various fields
              </>
            )}
          </p>
        </div>

        {/* Horizontal category slider */}
        <HorizontalScroller
          dir={dir}
          ariaLabel={language === "ar" ? "تصنيفات البرامج" : "Program categories"}
          className="mb-10"
        >
          {horizontalCategories.map((c) => {
            const isActive = (activeCategory ?? 0) === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id === 0 ? null : c.id)}
                className={cn(
                  "snap-start inline-flex px-5 py-2 rounded-full text-sm font-medium transition-colors border",
                  isActive
                    ? "bg-[#2a2665] text-white border-[#2a2665]"
                    : "bg-white text-[#2a2665] border-gray-200 hover:bg-[#f1f1f7]"
                )}
                role="option"
                aria-selected={isActive}
              >
                {c.title}
              </button>
            );
          })}
          {catsLoading && (
            <span className="text-sm text-gray-500 px-2">
              {language === "ar" ? "جاري تحميل الفئات..." : "Loading categories..."}
            </span>
          )}
          {catsError && (
            <span className="text-sm text-red-600 px-2">
              {language === "ar" ? "تعذر تحميل الفئات" : "Failed to load categories"}
            </span>
          )}
        </HorizontalScroller>

        {/* Programs grid / states */}
        {isLoading ? (
          <ProgramsSkeleton />
        ) : isError ? (
          <div className="text-center text-red-600">
            {language === "ar" ? "حدث خطأ أثناء جلب البرامج." : "An error occurred while fetching programs."}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-600">
            {language === "ar" ? "لا توجد برامج متاحة حالياً." : "No programs available right now."}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((program) => (
                <ProgramCard key={program.id} program={program} language={language as "ar" | "en"} />
              ))}
            </div>

            {/* Show More only for "All Programs" mode */}
            {activeCategory === null && (
              <div className="text-center mt-8">
                {hasNextPage ? (
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="bg-white border border-gray-200 text-[#2a2665] px-6 py-1.5 rounded text-sm hover:bg-[#f8f8f8] disabled:opacity-60"
                  >
                    {isFetchingNextPage
                      ? language === "ar" ? "جاري التحميل..." : "Loading..."
                      : language === "ar" ? "عرض المزيد من البرامج" : "Show More Programs"}
                  </button>
                ) : (
                  <span className="text-sm text-gray-500">
                    {language === "ar" ? "لا مزيد من النتائج" : "No more results"}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ProgramCard({ program, language }: { program: Program; language: "ar" | "en" }) {
  const durationLabel = React.useMemo(() => {
    if (program.durationHours == null) return language === "ar" ? "غير محدد" : "Not specified";
    const hours = program.durationHours;
    const isInt = Math.abs(hours - Math.round(hours)) < 1e-6;
    return isInt ? `${Math.round(hours)}h` : `${hours.toFixed(1)}h`;
  }, [program.durationHours, language]);

  return (
    <div className="bg-white rounded overflow-hidden shadow-sm border border-gray-100">
      {/* Image/Header */}
      <div className="relative h-[140px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${program.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/35" />
        {program.category?.title && (
          <div className="absolute top-4 left-4 bg-[#2a2665] text-white text-xs px-2 py-1 rounded-sm">
            {program.category.title}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <h3 className="text-lg font-bold text-white line-clamp-2">{program.title}</h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-3">
        <p className="text-[#5c5c5c] text-sm mb-4 h-[60px] overflow-hidden line-clamp-3">
          {program.description}
        </p>

        <div className="flex items-center justify-between text-xs text-[#505050] mb-3">
          <div className="flex items-center">
            <Clock className="h-4 w-4 ml-1 text-[#777]" />
            <span className="text-[#777]">
              {language === "ar" ? `المدة: ${durationLabel}` : `Duration: ${durationLabel}`}
            </span>
          </div>
          <div className="font-bold text-[#2a2665]">
            {formatCurrency(program.price)} {language === "ar" ? "ريال" : "SAR"}
          </div>
        </div>

        <Link href={`/program/${program.id}`}>
          <button className="w-full py-1.5 bg-[#b29567] text-white text-xs font-bold rounded-full transition-colors hover:bg-[#a38457]">
            {language === "ar" ? "سجل الآن" : "Register Now"}
          </button>
        </Link>
      </div>
    </div>
  );
}

function ProgramsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded overflow-hidden shadow-sm border border-gray-100">
          <div className="h-[140px] bg-gray-200 animate-pulse" />
          <div className="p-3 space-y-3">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-3 bg-gray-200 animate-pulse rounded w-full" />
            <div className="h-3 bg-gray-200 animate-pulse rounded w-5/6" />
            <div className="h-8 bg-gray-200 animate-pulse rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
