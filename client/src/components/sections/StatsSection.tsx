import React from "react";
import { useI18nStore } from "@/lib/i18n";

// مكون لعرض إحصائية واحدة
interface StatProps {
  number: string;
  label: string;
}

const StatItem = ({ number, label }: StatProps) => (
  <div className="text-center">
    <div className="text-[#2a2665] font-bold text-3xl md:text-4xl mb-2">{number}</div>
    <div className="text-[#7a7a9d] text-xs md:text-sm">{label}</div>
  </div>
);

export default function StatsSection() {
  const { language } = useI18nStore();
  
  // بيانات الإحصائيات (تم تنسيقها كما في الصورة المرجعية)
  const stats = [
    { number: "+50", label: "برنامج تدريبي" },
    { number: "+1000", label: "متدرب" },
    { number: "+25", label: "مدرب متميز" },
    { number: "6", label: "مسارات تخصصية" },
  ];

  return (
    <section className="py-8 border-y border-gray-200 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-4">
          {stats.map((stat, index) => (
            <StatItem key={index} number={stat.number} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}