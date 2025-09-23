import React from "react";
import { Link } from "wouter";
import { useI18nStore } from "@/lib/i18n";

interface CategoryCardProps {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  href: string;
  color: string; // accent color (can be a hex like #2a2665 or even a CSS gradient)
  icon: React.ReactNode; // icon element passed from parent
  imagePath?: string;
}

export function CategoryCard({
  title,
  titleEn,
  description,
  descriptionEn,
  href,
  color,
  icon,
  imagePath,
}: CategoryCardProps) {
  const { language } = useI18nStore();
  const isArabic = language === "ar";

  // Light bubble background from the accent (works for 6-digit hex)
  // Fallback to a subtle gray if color isn't hex.
  const bubbleBg = /^#[0-9a-fA-F]{6}$/.test(color)
    ? `${color}1A` /* ~10% alpha */
    : "rgba(0,0,0,0.06)";

  // keep the icon as received, just ensure default size/stroke if not provided
  const renderIcon = () => {
    if (React.isValidElement(icon)) {
      const el = icon as React.ReactElement<any>;
      const mergedClass =
        ((el.props?.className as string) || "") + " w-12 h-12 md:w-14 md:h-14";
      return React.cloneElement(el, {
        className: mergedClass.trim(),
        strokeWidth: el.props?.strokeWidth ?? 2.6,
        "aria-hidden": true,
      });
    }
    return icon;
  };

  return (
    <Link href={href}>
      {/* OUTER RING: the full border around the card */}
      <div
        className="rounded-[28px] md:rounded-[36px] p-[3px] transition-transform duration-200 hover:scale-[1.01]"
        // Using background instead of border so we can support gradients too
        style={{ background: color }}
      >
        {/* INNER CARD */}
        <div
          dir={isArabic ? "rtl" : "ltr"}
          className="relative group cursor-pointer rounded-[24px] md:rounded-[32px] bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          style={{
            boxShadow:
              "0 1px 1px rgba(0,0,0,0.04), 0 10px 16px rgba(0,0,0,0.04)",
          }}
        >
          {/* optional decorative background image */}
          {imagePath && (
            <img
              src={imagePath}
              alt=""
              className={`pointer-events-none select-none absolute -top-6 ${
                isArabic ? "-left-10" : "-right-10"
              } opacity-10 w-40 h-40 object-contain`}
            />
          )}

          {/* content */}
          <div
            className={`flex items-center gap-4 md:gap-6 p-5 md:p-6 lg:p-7 ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            {/* texts (title only, like your screenshot) */}
            <div className={`flex-1 ${isArabic ? "text-right" : "text-left"}`}>
              <h3
                className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight"
                style={{ color: "#0F3C5C" }}
              >
                {isArabic ? title : titleEn}
              </h3>
            </div>

            {/* icon bubble */}
            <div
              className="shrink-0 rounded-2xl md:rounded-3xl p-3 md:p-4"
              style={{ backgroundColor: bubbleBg }}
            >
              {renderIcon()}
            </div>
          </div>

          {/* NOTE: removed the old top-only bar — the outer wrapper now draws a full ring */}
        </div>
      </div>
    </Link>
  );
}
