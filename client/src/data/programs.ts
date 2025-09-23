export type ProgramCategory = 
  | 'cyber-security'
  | 'digital-transformation'
  | 'artificial-intelligence'
  | 'data-science'
  | 'risk-avoidance'
  | 'leadership-development';

export interface Program {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: number;
  category: ProgramCategory;
  image: string;
  modules?: string[]; // محاور البرنامج التدريبي
}

export const programs: Program[] = [
  // تطوير القيادات لتحقيق التميز المؤسسي
  {
    id: 101,
    title: "الاستراتيجية وقيادة التنفيذ",
    description: "تعزيز فهم مهارات بناء الاستراتيجيات وتحويلها لمبادرات وخطط تنفيذية",
    duration: "5 أيام (20 ساعة)",
    price: 2800,
    category: "leadership-development",
    image: "/images/programs/strategy-leadership.svg"
  },
  {
    id: 102,
    title: "بناء ثقافة العمل المؤسسي",
    description: "تزويد المشاركين بأسس بناء ثقافة عمل مؤسسية فعالة",
    duration: "5 أيام (20 ساعة)",
    price: 2800,
    category: "leadership-development",
    image: "/images/programs/saudi-professional.jpeg"
  },
  {
    id: 103,
    title: "إدارة المخاطر في المنظمات",
    description: "التعرف على أدوات تقييم وإدارة المخاطر التنظيمية",
    duration: "5 أيام (20 ساعة)",
    price: 2800,
    category: "leadership-development",
    image: "/assets/leadership-vector.svg"
  },
  {
    id: 104,
    title: "إدارة التغيير",
    description: "تطوير مهارات قيادة التغيير ومواجهة تحدياته",
    duration: "5 أيام (20 ساعة)",
    price: 2800,
    category: "leadership-development",
    image: "/images/programs/saudi-traditional2.jpg"
  },
  {
    id: 105,
    title: "مهارات التأثير القيادي",
    description: "بناء فرق فعالة ومؤثرة من خلال المهارات القيادية",
    duration: "5 أيام (20 ساعة)",
    price: 2800,
    category: "leadership-development",
    image: "/images/leadership-bg.svg"
  },
  {
    id: 106,
    title: "مهارات التواصل الفعال لقيادة فرق العمل",
    description: "ضمان تواصل فعال داخل الفرق والمجتمع المهني",
    duration: "5 أيام (20 ساعة)",
    price: 2800,
    category: "leadership-development",
    image: "/images/leadership-bg.svg"
  },
  {
    id: 107,
    title: "استمرارية الأعمال",
    description: "تطوير خطط لاستمرارية العمل وتقليل الأزمات",
    duration: "5 أيام (20 ساعة)",
    price: 2800,
    category: "leadership-development",
    image: "/images/leadership-bg.svg"
  },
  {
    id: 108,
    title: "تعزيز الولاء الوظيفي وأخلاقيات العمل",
    description: "خلق بيئة ولاء مهني عالية القيمة",
    duration: "5 أيام (20 ساعة)",
    price: 2800,
    category: "leadership-development",
    image: "/images/programs/job-loyalty.svg"
  },
  
  // التحول الرقمي
  {
    id: 201,
    title: "تحليل البيانات الضخمة ودورها في اتخاذ القرار",
    description: "تطوير أساليب تحليل البيانات لتعزيز قرارات الأعمال",
    duration: "5 أيام (20 ساعة)",
    price: 2700,
    category: "digital-transformation",
    image: "/images/programs/big-data-analysis.svg"
  },
  {
    id: 202,
    title: "البلوك تشين وتطبيقاته في بيئة الأعمال",
    description: "فهم تقنية البلوك تشين وكيفية تطبيقها في بيئات الأعمال المختلفة",
    duration: "5 أيام (20 ساعة)",
    price: 2700,
    category: "digital-transformation",
    image: "/images/digital-transform-bg.svg"
  },
  {
    id: 203,
    title: "ثقافة التغيير والتحول الرقمي",
    description: "بناء وتعزيز ثقافة التغيير والتحول الرقمي في المؤسسات",
    duration: "5 أيام (20 ساعة)",
    price: 2700,
    category: "digital-transformation",
    image: "/images/digital-transform-bg.svg"
  },
  {
    id: 204,
    title: "تقنيات التحول الرقمي",
    description: "استعراض أحدث التقنيات المستخدمة في التحول الرقمي وكيفية تطبيقها",
    duration: "5 أيام (20 ساعة)",
    price: 2700,
    category: "digital-transformation",
    image: "/images/digital-transform-bg.svg"
  },
  {
    id: 205,
    title: "الحوكمة المستدامة في عصر التحول الرقمي",
    description: "تطبيق معايير الحوكمة المستدامة في عصر التحول الرقمي",
    duration: "5 أيام (20 ساعة)",
    price: 2700,
    category: "digital-transformation",
    image: "/images/digital-transform-bg.svg"
  },
  {
    id: 206,
    title: "التخطيط الاستراتيجي للتحول الرقمي",
    description: "وضع خطط استراتيجية فعالة للتحول الرقمي في المؤسسات",
    duration: "5 أيام (20 ساعة)",
    price: 2700,
    category: "digital-transformation",
    image: "/images/digital-transform-bg.svg"
  },
  
  // تجنب المخاطر للأفراد والمنظمات
  {
    id: 301,
    title: "الوعي بنظام عقوبات نشر الوثائق السرية",
    description: "التعريف بأنظمة وعقوبات نشر الوثائق السرية وطرق المحافظة عليها",
    duration: "3 أيام (15 ساعة)",
    price: 2500,
    category: "risk-avoidance",
    image: "/images/programs/document-security.svg"
  },
  {
    id: 302,
    title: "الوعي الأمني",
    description: "تعزيز الوعي الأمني لدى الأفراد والمؤسسات للوقاية من المخاطر",
    duration: "3 أيام (15 ساعة)",
    price: 2500,
    category: "risk-avoidance",
    image: "/images/risk-analysis-bg.svg"
  },
  {
    id: 303,
    title: "مهارات تجنب مخاطر وسائل التواصل الاجتماعي",
    description: "تطوير مهارات تجنب المخاطر المرتبطة باستخدام وسائل التواصل الاجتماعي",
    duration: "3 أيام (15 ساعة)",
    price: 2500,
    category: "risk-avoidance",
    image: "/images/risk-analysis-bg.svg"
  },
  {
    id: 304,
    title: "مهارات مقاومة الاستدراج",
    description: "تنمية مهارات مقاومة الاستدراج وتجنب الوقوع في المخاطر",
    duration: "3 أيام (15 ساعة)",
    price: 2500,
    category: "risk-avoidance",
    image: "/images/risk-analysis-bg.svg"
  },
  {
    id: 305,
    title: "تنمية الوعي بالمخاطر السيبرانية والأمن السيبراني",
    description: "تعزيز الوعي بالمخاطر السيبرانية وطرق الحماية منها",
    duration: "3 أيام (15 ساعة)",
    price: 2500,
    category: "risk-avoidance",
    image: "/images/risk-analysis-bg.svg"
  },
  
  // القدرات السيبرانية
  {
    id: 401,
    title: "مدير الأمن السيبراني المعتمد (ISO 27032)",
    description: "تأهيل المشاركين ليصبحوا مدراء أمن سيبراني معتمدين وفق معيار ISO 27032",
    duration: "5 أيام (30 ساعة)",
    price: 3200,
    category: "cyber-security",
    image: "/images/programs/cyber-security.svg"
  },
  {
    id: 402,
    title: "شهادة الأمن السيبراني الأساسية (CompTIA Security+)",
    description: "تأهيل المشاركين للحصول على شهادة CompTIA Security+ في مجال الأمن السيبراني",
    duration: "5 أيام (30 ساعة)",
    price: 3200,
    category: "cyber-security",
    image: "/images/cyber-security-bg.svg"
  },
  {
    id: 403,
    title: "الأساسيات في حوكمة تقنية المعلومات (COBIT)",
    description: "تعريف المشاركين بإطار COBIT لحوكمة تقنية المعلومات",
    duration: "5 أيام (30 ساعة)",
    price: 3200,
    category: "cyber-security",
    image: "/images/cyber-security-bg.svg"
  },
  {
    id: 404,
    title: "الهاكر الأخلاقي المعتمد (CEH)",
    description: "تدريب المشاركين على مهارات الاختراق الأخلاقي للكشف عن نقاط الضعف وتحسين الأمن",
    duration: "5 أيام (30 ساعة)",
    price: 3200,
    category: "cyber-security",
    image: "/images/cyber-security-bg.svg"
  },
  {
    id: 405,
    title: "شهادة محترف التعافي من الكوارث (EDRP)",
    description: "تأهيل المشاركين للحصول على شهادة محترف التعافي من الكوارث (EDRP)",
    duration: "5 أيام (30 ساعة)",
    price: 3200,
    category: "cyber-security",
    image: "/images/cyber-security-bg.svg"
  },
  
  // الذكاء الاصطناعي
  {
    id: 501,
    title: "الذكاء الاصطناعي لقادة الأعمال",
    description: "تعريف قادة الأعمال بأساسيات الذكاء الاصطناعي وتطبيقاته في مجال الأعمال",
    duration: "5 أيام (30 ساعة)",
    price: 2900,
    category: "artificial-intelligence",
    image: "/images/programs/ai-business.svg"
  },
  {
    id: 502,
    title: "الذكاء الاصطناعي التوليدي للجميع",
    description: "تعريف المشاركين بتقنيات الذكاء الاصطناعي التوليدي وتطبيقاته المختلفة",
    duration: "5 أيام (30 ساعة)",
    price: 2900,
    category: "artificial-intelligence",
    image: "/images/ai-program-bg.svg"
  },
  {
    id: 503,
    title: "مهندس الذكاء الاصطناعي",
    description: "تأهيل المشاركين ليصبحوا مهندسين في مجال الذكاء الاصطناعي",
    duration: "5 أيام (30 ساعة)",
    price: 2900,
    category: "artificial-intelligence",
    image: "/images/ai-program-bg.svg"
  },
  {
    id: 504,
    title: "أساسيات الذكاء الاصطناعي باستخدام البايثون",
    description: "تعليم المشاركين أساسيات الذكاء الاصطناعي باستخدام لغة البرمجة بايثون",
    duration: "5 أيام (30 ساعة)",
    price: 2900,
    category: "artificial-intelligence",
    image: "/images/ai-program-bg.svg"
  },
  {
    id: 505,
    title: "عالم بيانات (مساعد متخصص)",
    description: "تأهيل المشاركين ليصبحوا مساعدين متخصصين في مجال علم البيانات",
    duration: "5 أيام (30 ساعة)",
    price: 2900,
    category: "artificial-intelligence",
    image: "/images/ai-program-bg.svg"
  },
  // برامج علم البيانات
  {
    id: 601,
    title: "مقدمة في علم البيانات",
    description: "تعريف المشاركين بمفاهيم وأساسيات علم البيانات وتطبيقاته المختلفة",
    duration: "3 أيام (18 ساعة)",
    price: 2200,
    category: "data-science",
    image: "/images/data-science-bg.svg",
    modules: [
      "مفاهيم وأساسيات علم البيانات",
      "أنواع البيانات وطرق جمعها",
      "تحليل البيانات وتفسيرها",
      "مقدمة في التعلم الآلي"
    ]
  },
  {
    id: 602,
    title: "تحليل البيانات الضخمة",
    description: "تدريب على تقنيات وأدوات تحليل البيانات الضخمة لدعم اتخاذ القرارات",
    duration: "5 أيام (30 ساعة)",
    price: 3500,
    category: "data-science",
    image: "/images/data-science-bg.svg",
    modules: [
      "مفهوم البيانات الضخمة وخصائصها",
      "تقنيات معالجة البيانات الضخمة",
      "تطبيقات البيانات الضخمة في المؤسسات",
      "استخدام أدوات تحليل البيانات الضخمة"
    ]
  },
  {
    id: 603,
    title: "الإحصاء التطبيقي لتحليل البيانات",
    description: "تعلم المفاهيم الإحصائية وتطبيقاتها في تحليل البيانات واستخلاص النتائج",
    duration: "4 أيام (24 ساعة)",
    price: 2800,
    category: "data-science",
    image: "/images/data-science-bg.svg",
    modules: [
      "مفاهيم الإحصاء الأساسية",
      "الإحصاء الوصفي والاستدلالي",
      "تطبيقات الإحصاء في تحليل البيانات",
      "نمذجة البيانات واختبار الفرضيات"
    ]
  },
  {
    id: 604,
    title: "تصور البيانات وعرضها",
    description: "تعلم مهارات إنشاء التصورات المرئية للبيانات لنقل المعلومات بفاعلية",
    duration: "3 أيام (18 ساعة)",
    price: 2400,
    category: "data-science",
    image: "/images/data-science-bg.svg",
    modules: [
      "مبادئ تصور البيانات",
      "تقنيات عرض البيانات المختلفة",
      "اختيار التصور المناسب للبيانات",
      "إنشاء لوحات المعلومات التفاعلية"
    ]
  },
  {
    id: 605,
    title: "التنقيب في البيانات",
    description: "تعلم تقنيات استخراج المعرفة والأنماط المفيدة من مجموعات البيانات الكبيرة",
    duration: "5 أيام (30 ساعة)",
    price: 3200,
    category: "data-science",
    image: "/images/data-science-bg.svg",
    modules: [
      "مفاهيم التنقيب في البيانات",
      "خوارزميات استخراج الأنماط والعلاقات",
      "تصنيف البيانات والتنبؤ",
      "تطبيقات عملية في التنقيب عن البيانات"
    ]
  }
];
