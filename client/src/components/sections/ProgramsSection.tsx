// src/components/sections/ProgramsSection.tsx
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useI18nStore } from "@/lib/i18n";
import { useRecentPrograms } from "@/features/programs/queries";
import ProgramCard from "@/components/ui/program-card";
import ProgramSkeleton from "@/components/ui/ProgramSkeleton";

export default function ProgramsSection() {
  const { language } = useI18nStore();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useRecentPrograms();

  const title = language === "ar" ? "برامجنا المميزة" : "Featured Programs";
  const subtitle =
    language === "ar"
      ? "نقدم لك أحدث البرامج التدريبية المتاحة لدينا"
      : "Browse our latest available training programs";

  return (
    <section
      id="programs"
      className="py-16 relative"
      style={{
        backgroundImage: "url('/images/backgrounds/programs-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#2a2665] section-heading mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          {isFetching && (
            <div className="mt-2 text-xs text-gray-400">
              {language === "ar" ? "يتم التحديث..." : "Refreshing..."}
            </div>
          )}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProgramSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="text-center">
            <p className="text-red-600">
              {language === "ar"
                ? "حدث خطأ أثناء تحميل البرامج."
                : "An error occurred while loading programs."}
            </p>
            <p className="text-gray-500 mt-1">
              {(error as Error)?.message ?? ""}
            </p>
            <Button onClick={() => refetch()} className="mt-4">
              {language === "ar" ? "إعادة المحاولة" : "Retry"}
            </Button>
          </div>
        )}

        {/* Data grid */}
        {!isLoading && !isError && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(data ?? []).map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>

            {/* View All Programs Button */}
            <div className="text-center mt-10">
              <Link href="/tracks">
                <Button
                  variant="outline"
                  className="bg-white border border-[#2a2665] text-[#2a2665] hover:bg-[#2a2665] hover:text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                >
                  {language === "ar"
                    ? "عرض جميع المسارات والبرامج"
                    : "View All Tracks & Programs"}
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
