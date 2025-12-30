// src/components/ui/partners-carousel.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type EmblaOptionsType = {
  loop?: boolean;
  dragFree?: boolean;
  align?: "start" | "center" | "end";
  direction?: "ltr" | "rtl";
  containScroll?: "trimSnaps" | "keepSnaps" | false;
  [key: string]: any;
};
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

type PartnersCarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  ariaLabel?: string;
  options?: EmblaOptionsType;
  className?: string;
  rtl?: boolean;
};


export default function PartnersCarousel<T>({
  items,
  renderItem,
  ariaLabel = "carousel",
  options,
  className,
  rtl = false,
}: PartnersCarouselProps<T>) {
  const baseOptions: EmblaOptionsType = useMemo(
    () => ({
      loop: true,
      dragFree: false,
      align: "start",
      direction: rtl ? "rtl" : "ltr",
      ...options,
    }),
    [rtl, options]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(baseOptions);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (idx: number) => emblaApi?.scrollTo(idx),
    [emblaApi]
  );

  // أماكن الأسهم تتبدل عند RTL
  const leftBtnClasses = clsx(
    "absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow p-2 hover:shadow-lg transition",
    rtl ? "-right-2 md:-right-4" : "-left-2 md:-left-4"
  );
  const rightBtnClasses = clsx(
    "absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow p-2 hover:shadow-lg transition",
    rtl ? "-left-2 md:-left-4" : "-right-2 md:-right-4"
  );

  return (
    <div className={clsx("relative", className)} dir={rtl ? "rtl" : "ltr"}>
      {/* Arrows */}
      <button
        type="button"
        aria-label="Previous"
        onClick={scrollPrev}
        className={leftBtnClasses}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={scrollNext}
        className={rightBtnClasses}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef} aria-label={ariaLabel}>
        <div className="flex">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={clsx(
                // مهم جداً: منع الانكماش + تحديد الـ basis لكل breakpoint
                "px-2 flex-none basis-1/2", // 2 per view (base)
                "sm:basis-1/3", // 3 per view
                "md:basis-1/4", // 4 per view
                "lg:basis-1/5" // 5 per view
              )}
            >
              {renderItem(item, idx)}
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {scrollSnaps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={clsx(
              "h-2.5 rounded-full transition-all",
              selectedIndex === idx ? "bg-[#2a2665] w-6" : "bg-gray-300 w-2.5"
            )}
          />
        ))}
      </div>
    </div>
  );
}
