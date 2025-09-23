import React from 'react';

// صورة المسارات التدريبية (صناعة الصورة كمكون SVG) - اللون الأزرق الداكن
export const TrainingCoursesImage = () => (
  <svg 
    viewBox="0 0 800 400" 
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 w-full h-full"
  >
    <rect width="100%" height="100%" fill="#2a2665" />
    
    {/* نمط خلفية سداسي خفيف */}
    <g opacity="0.1">
      <path d="M400,150 L450,180 L450,240 L400,270 L350,240 L350,180 Z" 
        stroke="#ffffff" 
        strokeWidth="1" 
        fill="none" 
      />
      <path d="M400,160 L440,185 L440,235 L400,260 L360,235 L360,185 Z" 
        stroke="#ffffff" 
        strokeWidth="0.5" 
        fill="none" 
      />
    </g>
    
    {/* أيقونة المستند/الكتاب */}
    <g transform="translate(400, 200)">
      <rect x="-25" y="-30" width="50" height="60" fill="none" stroke="#b29567" strokeWidth="2" />
      <line x1="-15" y1="-15" x2="15" y2="-15" stroke="#b29567" strokeWidth="2" />
      <line x1="-15" y1="-5" x2="15" y2="-5" stroke="#b29567" strokeWidth="2" />
      <line x1="-15" y1="5" x2="15" y2="5" stroke="#b29567" strokeWidth="2" />
      <line x1="-15" y1="15" x2="5" y2="15" stroke="#b29567" strokeWidth="2" />
    </g>
    
    {/* خطوط خفيفة للزخرفة */}
    <g opacity="0.05">
      <line x1="0" y1="50" x2="800" y2="50" stroke="#ffffff" strokeWidth="0.5" />
      <line x1="0" y1="350" x2="800" y2="350" stroke="#ffffff" strokeWidth="0.5" />
    </g>
  </svg>
);

// صورة ورش العمل - اللون الأزرق المتوسط بنفس تصميم المسارات التدريبية
export const WorkshopsImage = () => (
  <svg 
    viewBox="0 0 800 400" 
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 w-full h-full"
  >
    <rect width="100%" height="100%" fill="#446591" />
    
    {/* نمط خلفية سداسي خفيف */}
    <g opacity="0.1">
      <path d="M400,150 L450,180 L450,240 L400,270 L350,240 L350,180 Z" 
        stroke="#ffffff" 
        strokeWidth="1" 
        fill="none" 
      />
      <path d="M400,160 L440,185 L440,235 L400,260 L360,235 L360,185 Z" 
        stroke="#ffffff" 
        strokeWidth="0.5" 
        fill="none" 
      />
    </g>
    
    {/* أيقونة حقيبة العمل */}
    <g transform="translate(400, 200)">
      <rect x="-25" y="-20" width="50" height="40" fill="none" stroke="#ffffff" strokeWidth="2" />
      <path d="M-10,-20 L-10,-30 L10,-30 L10,-20" fill="none" stroke="#ffffff" strokeWidth="2" />
    </g>
    
    {/* خطوط خفيفة للزخرفة */}
    <g opacity="0.05">
      <line x1="0" y1="50" x2="800" y2="50" stroke="#ffffff" strokeWidth="0.5" />
      <line x1="0" y1="350" x2="800" y2="350" stroke="#ffffff" strokeWidth="0.5" />
    </g>
  </svg>
);

// صورة الاستشارات - اللون البنفسجي بنفس تصميم المسارات التدريبية
export const ConsultationsImage = () => (
  <svg 
    viewBox="0 0 800 400" 
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 w-full h-full"
  >
    <rect width="100%" height="100%" fill="#9e78a9" />
    
    {/* نمط خلفية سداسي خفيف */}
    <g opacity="0.1">
      <path d="M400,150 L450,180 L450,240 L400,270 L350,240 L350,180 Z" 
        stroke="#ffffff" 
        strokeWidth="1" 
        fill="none" 
      />
      <path d="M400,160 L440,185 L440,235 L400,260 L360,235 L360,185 Z" 
        stroke="#ffffff" 
        strokeWidth="0.5" 
        fill="none" 
      />
    </g>
    
    {/* أيقونة علامة استفهام */}
    <g transform="translate(400, 200)">
      <circle cx="0" cy="0" r="25" fill="none" stroke="#ffffff" strokeWidth="2" />
      <path d="M-8,-5 C-8,-15 8,-15 8,-5 C8,0 0,5 0,5 L0,12" fill="none" stroke="#ffffff" strokeWidth="2" />
      <circle cx="0" cy="20" r="2" fill="#ffffff" />
    </g>
    
    {/* خطوط خفيفة للزخرفة */}
    <g opacity="0.05">
      <line x1="0" y1="50" x2="800" y2="50" stroke="#ffffff" strokeWidth="0.5" />
      <line x1="0" y1="350" x2="800" y2="350" stroke="#ffffff" strokeWidth="0.5" />
    </g>
  </svg>
);