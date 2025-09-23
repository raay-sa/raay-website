// src/pages/TracksPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useI18nStore } from "@/lib/i18n";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ProgramCard from "@/components/ui/program-card";
import { TranslatedText } from "@/components/ui/translated-text";
import { useCategories } from "@/features/categories/queries";
import { useProgramsByCategory } from "@/features/programs/queries";
import type { Category } from "@/lib/api/types";
import ProgramSkeleton from "@/components/ui/ProgramSkeleton";

export default function TracksPage() {
  const { language, refreshTimestamp } = useI18nStore();

  // selectedTrack holds the numeric category id from API
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);
  const [forceRender, setForceRender] = useState(0);

  // re-render on language change
  useEffect(() => {
    setForceRender((prev) => prev + 1);
  }, [language, refreshTimestamp]);

  // fetch categories
  const {
    data: categories,
    isLoading: isCatLoading,
    isError: isCatError,
    error: catError,
    refetch: refetchCats,
  } = useCategories();

  // fetch programs for selected category
  const {
    data: programs,
    isLoading: isProgLoading,
    isError: isProgError,
    error: progError,
    refetch: refetchProgs,
    isFetching: isProgFetching,
  } = useProgramsByCategory(selectedTrackId ?? undefined);

  // Title helpers
  const pageTitle =
    language === "ar"
      ? "المسارات التدريبية | مركز راي للتدريب والاستشارات"
      : "Training Tracks | Ray Training & Consulting Center";

  const heading = <TranslatedText textKey="tracks.title" />;
  const description = <TranslatedText textKey="tracks.description" />;

  // Selected track title
  const selectedTrackTitle = useMemo(() => {
    if (!selectedTrackId || !categories) return "";
    const found = categories.find((c) => c.id === selectedTrackId);
    return found?.title ?? "";
  }, [selectedTrackId, categories]);

  const handleBackToTracks = () => {
    setSelectedTrackId(null);
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {selectedTrackId == null ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-[#2a2665] mb-4">
                  {heading}
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
              </div>

              {/* Categories grid */}
              {isCatLoading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-60 bg-white rounded-lg shadow-md border border-gray-100 animate-pulse"
                    />
                  ))}
                </div>
              )}

              {isCatError && (
                <div className="text-center">
                  <p className="text-red-600">
                    {language === "ar"
                      ? "تعذر تحميل المسارات."
                      : "Failed to load tracks."}
                  </p>
                  <p className="text-gray-500 mt-1">
                    {(catError as Error)?.message ?? ""}
                  </p>
                  <Button onClick={() => refetchCats()} className="mt-4">
                    {language === "ar" ? "إعادة المحاولة" : "Retry"}
                  </Button>
                </div>
              )}

              {!isCatLoading && !isCatError && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {(categories ?? []).map((track: Category) => (
                    <div
                      key={track.id}
                      onClick={() => setSelectedTrackId(track.id)}
                      className="relative aspect-square bg-white rounded-lg  overflow-hidden border-gray-100 transition-all duration-300 hover:scale-105 h-80 flex flex-col justify-center items-center text-center cursor-pointer"
                    >
                      {/* <div className="absolute top-0 right-0 w-16 h-16 bg-[#b29567] opacity-20 rounded-bl-full"></div> */}
                      {/* <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#2a2665] opacity-10 rounded-tr-full"></div> */}

                      {/* Optional category image */}
                      {track.imageUrl && (
                        <img
                          src={track.imageUrl}
                          alt={track.title}
                          className="absolute inset-0 w-full h-full object-cover "
                        />
                      )}

                      <div className="p-6 z-10">
                        {/* <h2 className="text-2xl font-bold text-[#2a2665] mb-4">
                          {track.title}
                        </h2> */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleBackToTracks}
                className="mb-8 bg-white border border-[#2a2665] text-[#2a2665] hover:bg-[#2a2665] hover:text-white transition duration-300"
              >
                <TranslatedText
                  textKey="tracks.back_to_tracks"
                  defaultText={
                    language === "ar"
                      ? "العودة إلى المسارات التدريبية"
                      : "Back to Tracks"
                  }
                />
              </Button>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-[#2a2665] mb-3">
                  {selectedTrackTitle}
                </h2>
                <div className="h-1 w-32 bg-[#b29567] mx-auto mb-4"></div>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  <TranslatedText
                    textKey="tracks.specialized_programs"
                    defaultText={
                      language === "ar"
                        ? "البرامج التدريبية المتخصصة ضمن هذا المسار لتطوير المهارات والمعارف المهنية"
                        : "Specialized training programs within this track to develop professional skills and knowledge"
                    }
                  />
                </p>

                {isProgFetching && (
                  <div className="mt-2 text-xs text-gray-400">
                    {language === "ar" ? "يتم التحديث..." : "Refreshing..."}
                  </div>
                )}
              </div>

              {/* Programs grid */}
              {isProgLoading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ProgramSkeleton key={i} />
                  ))}
                </div>
              )}

              {isProgError && (
                <div className="text-center">
                  <p className="text-red-600">
                    {language === "ar"
                      ? "تعذر تحميل البرامج."
                      : "Failed to load programs."}
                  </p>
                  <p className="text-gray-500 mt-1">
                    {(progError as Error)?.message ?? ""}
                  </p>
                  <Button onClick={() => refetchProgs()} className="mt-4">
                    {language === "ar" ? "إعادة المحاولة" : "Retry"}
                  </Button>
                </div>
              )}

              {!isProgLoading && !isProgError && (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {(programs ?? []).map((program) => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                  </div>

                  {(programs ?? []).length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        <TranslatedText
                          textKey="tracks.no_programs"
                          defaultText={
                            language === "ar"
                              ? "لا توجد برامج متاحة حالياً في هذا المسار"
                              : "No programs available in this track at the moment"
                          }
                        />
                      </p>
                    </div>
                  )}
                </>
              )}

              <div className="text-center mt-12">
                <Link href="/">
                  <Button variant="link" className="text-[#2a2665]">
                    <TranslatedText
                      textKey="common.back_to_home"
                      defaultText={
                        language === "ar"
                          ? "العودة للصفحة الرئيسية"
                          : "Back to Home Page"
                      }
                    />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
