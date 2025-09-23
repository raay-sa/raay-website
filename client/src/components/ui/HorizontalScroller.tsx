// src/components/ui/HorizontalScroller.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  children: React.ReactNode;
  /** "ltr" | "rtl" — pass from current language */
  dir?: "ltr" | "rtl";
  /** className for the outer wrapper (not the scroll area) */
  className?: string;
  /** className for the scrollable row */
  scrollClassName?: string;
  /** aria-label for accessibility */
  ariaLabel?: string;
};

function cx(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

/**
 * A polished horizontal scroller:
 * - visible, rounded, thin scrollbar (WebKit + Firefox)
 * - edge gradient fades
 * - scroll snap
 * - arrow buttons (auto-hide at ends)
 * - supports RTL
 * - drag to scroll (mouse) + Shift+Wheel horizontal scroll
 */
export default function HorizontalScroller({
  children,
  dir = "ltr",
  className,
  scrollClassName,
  ariaLabel = "Horizontal list",
}: Props) {
  const isRTL = dir === "rtl";
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(false);

  const updateShadows = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;

    const maxScroll = scrollWidth - clientWidth;
    // In RTL, scrollLeft can be negative or positive depending on engine. Normalize:
    const normalized = isRTL ? normalizeRTLScrollLeft(el) : scrollLeft;

    setCanLeft(normalized > 4);
    setCanRight(normalized < maxScroll - 4);
  }, [isRTL]);

  React.useEffect(() => {
    updateShadows();
  }, [children, dir, updateShadows]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => updateShadows();
    const onResize = () => updateShadows();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [updateShadows]);

  // Shift+wheel = horizontal scroll
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "smooth" });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Mouse drag to scroll
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    const onDown = (e: MouseEvent) => {
      // only primary button
      if (e.button !== 0) return;
      isDown = true;
      startX = e.clientX;
      scrollStart = el.scrollLeft;
      el.classList.add("dragging");
      // prevent selecting text while dragging
      (document.activeElement as HTMLElement | null)?.blur();
    };

    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const dx = e.clientX - startX;
      el.scrollLeft = scrollStart - dx;
    };

    const onUp = () => {
      isDown = false;
      el.classList.remove("dragging");
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const scrollStep = (dirSign: number) => {
    const el = ref.current;
    if (!el) return;
    // 80% of viewport width per step (nice feel)
    const step = Math.max(200, Math.floor(el.clientWidth * 0.8));
    // In RTL, invert direction
    const delta = dir === "rtl" ? -dirSign * step : dirSign * step;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className={cx("relative", className)} dir={dir} aria-label={ariaLabel}>
      {/* Left button */}
      <FadeEdge side={isRTL ? "right" : "left"} show={canLeft} />
      <button
        type="button"
        aria-label={isRTL ? "Scroll right" : "Scroll left"}
        onClick={() => scrollStep(-1)}
        className={cx(
          "scroller-arrow",
          isRTL ? "right-1" : "left-1",
          canLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {isRTL ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>

      {/* Scrollable row */}
      <div
        ref={ref}
        className={cx(
          "nice-scrollbar flex items-center gap-2 overflow-x-auto whitespace-nowrap snap-x snap-mandatory px-1 py-2",
          // prevent text selection while dragging
          "select-none",
          "scroll-smooth",
          "rounded-lg",
          "bg-transparent",
          "pr-6 pl-6", // space for arrows
          "will-change-scroll",
          "mask-fade-x", // gradient edge using CSS mask
          scrollClassName
        )}
        // role + keyboard navigation
        role="listbox"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollStep(isRTL ? -1 : 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollStep(isRTL ? 1 : -1);
          }
        }}
      >
        {children}
      </div>

      {/* Right button */}
      <FadeEdge side={isRTL ? "left" : "right"} show={canRight} />
      <button
        type="button"
        aria-label={isRTL ? "Scroll left" : "Scroll right"}
        onClick={() => scrollStep(1)}
        className={cx(
          "scroller-arrow",
          isRTL ? "left-1" : "right-1",
          canRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {isRTL ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
    </div>
  );
}

// Soft edge fade
function FadeEdge({ side, show }: { side: "left" | "right"; show: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute top-0 h-full w-10 transition-opacity duration-200",
        side === "left" ? "left-0 bg-gradient-to-r from-white to-transparent" : "",
        side === "right" ? "right-0 bg-gradient-to-l from-white to-transparent" : "",
        show ? "opacity-100" : "opacity-0"
      )}
    />
  );
}

// Normalize RTL scrollLeft across browsers (Chrome vs Firefox differences)
function normalizeRTLScrollLeft(el: HTMLElement) {
  const { scrollLeft, scrollWidth, clientWidth } = el;
  // Try detecting RTL behavior
  // If scrollLeft is negative -> Chrome-like: rightmost is 0, leftmost is -max
  if (scrollLeft < 0) {
    return -scrollLeft;
  }
  // Otherwise assume "increasing" model: leftmost is 0, rightmost is max
  return scrollLeft;
}
