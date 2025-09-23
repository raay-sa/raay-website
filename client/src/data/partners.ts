// src/data/partners.ts

// Logos (if you add files later, set the correct paths; otherwise the card will show a fallback icon)
const khwarizmiLogo = "/assets/partners/الخوارزمي.png";
const efLogo = "/assets/partners/EF+logo+transparent.png";
const digitalSafetyLogo = "/assets/partners/digitalsafety.png";
const birkmanLogo = "/assets/partners/birkman.png";
const arabAdminDevLogo = "/assets/partners/جامعة الدول.png";
const itSecurityLogo = "/assets/partners/itsecurity.png";
const defenseLogo = "/assets/partners/modefense.png";
const saqoorLogo = "/assets/partners/falcon.png";
const arabAcademyLogo = "/assets/partners/arabacadmy.png";
const masterLegacyLogo = "/assets/partners/masterlegacy.png";
const cdpaLogo = "/assets/partners/academy.png";
const ipsaLogo = "/assets/partners/Consultation-logo.png";
const sarLogo = "/assets/partners/sar.png";
const thomasLogo = "/assets/partners/R.png";
const sabicLogo = "/assets/partners/SABIC-Emblem.png";
const esolLogo = "/assets/partners/esol.png";
const jhorLogo = "/assets/partners/jhor.png";
const tvtcLogo = "/assets/partners/tvtc.png";
const dimaLogo = "/assets/partners/dima.png";

// Optional: placeholders for new clients if you later add actual logos
const stateSecurityLogo = "/assets/partners/state-security.png";
const nazahaLogo = "/assets/partners/nzaha.png";
const rcjyLogo = "/assets/partners/rcjy.png";
const pnuLogo = "/assets/partners/pnu.png";
const civilDefenseLogo = "/assets/partners/civildefense.png";
const mngLogo = "/assets/partners/mng.png";
const mng2Logo = "/assets/partners/mng2.png";

export type PartnerType = "partner" | "client";

export interface Partner {
  id: number;
  type: PartnerType; // NEW: "partner" section or "client" section
  name: string;
  description: string;
  logo?: string;
  icon?: string;
}

export const partners: Partner[] = [
  // ---- شركاء (Partners) ----
  {
    id: 1,
    type: "partner",
    name: "شركة خوارزمي للحاسبات عالية الأداء",
    description:
      "شراكة في مجال الذكاء الاصطناعي والحوسبة العالية الأداء والحوسبة الكمية بالتعاون مع شركة برايت سكايس (Brightskies)",
    logo: khwarizmiLogo,
    icon: "cpu",
  },
  {
    id: 2,
    type: "partner",
    name: "Educational First (EF)",
    description:
      "شراكة تدريبية واستشارية مع الشركة العالمية لتعليم اللغة الإنجليزية في مجال الاستشارات والتدريب",
    logo: efLogo,
    icon: "languages",
  },
  {
    id: 3,
    type: "partner",
    name: "Digital Safety",
    description:
      "شراكة دولية مع شركة متخصصة في المجال الأمني، لتقديم برامج تدريبية متخصصة في الأمن السيبراني وإدارة المخاطر",
    logo: digitalSafetyLogo,
    icon: "shield",
  },
  {
    id: 4,
    type: "partner",
    name: "BIRKMAN",
    description:
      "تعاون مع وكيل مقياس بيركمان العالمي، الذي يساعد في ربط المهارات الشخصية بالمهارات المهنية",
    logo: birkmanLogo,
    icon: "users",
  },
  {
    id: 5,
    type: "partner",
    name: "المنظمة العربية للتنمية الإدارية",
    description: "شراكة استراتيجية مع المنظمة التابعة لجامعة الدول العربية",
    logo: arabAdminDevLogo,
    icon: "landmark",
  },
  {
    id: 6,
    type: "partner",
    name: "IT Security",
    description: "شراكة في مجال الشهادات الاحترافية في مجال الأمن السيبراني",
    logo: itSecurityLogo,
    icon: "lock",
  },
  {
    id: 8,
    type: "partner",
    name: "مركز الصقور",
    description:
      "شراكة استراتيجية مع مركز يمتلك خبرة تزيد عن 25 عامًا في مجال التدريب",
    logo: saqoorLogo,
    icon: "award",
  },
  {
    id: 9,
    type: "partner",
    name: "الأكاديمية العربية لأنشطة التدريب",
    description:
      "تعاون مع الأكاديمية التي تمتد خبراتها لأكثر من 60 عامًا في الوطن العربي",
    logo: arabAcademyLogo,
    icon: "award",
  },
  {
    id: 10,
    type: "partner",
    name: "Master Legacy",
    description: "شراكة استراتيجية في مجال التدريب والتطوير المهني والإداري",
    logo: masterLegacyLogo,
    icon: "award",
  },
  {
    id: 11,
    type: "partner",
    name: "Creative,Digital & Performing Arts Academy",
    description: "",
    logo: cdpaLogo,
    icon: "award",
  },
  {
    id: 12,
    type: "partner",
    name: "IPSA Consultation",
    description: "",
    logo: ipsaLogo,
    icon: "award",
  },
  {
    id: 14,
    type: "partner",
    name: "University of ST.Thomas",
    description: "",
    logo: thomasLogo,
    icon: "award",
  },
  {
    id: 16,
    type: "partner",
    name: "ESOL",
    description: "",
    logo: esolLogo,
    icon: "award",
  },
  {
    id: 17,
    type: "partner",
    name: "جهور",
    description: "",
    logo: jhorLogo,
    icon: "award",
  },
  {
    id: 18,
    type: "partner",
    name: "المؤسسه العامه للتدريب التقني و المهني",
    description: "",
    logo: tvtcLogo,
    icon: "award",
  },
  {
    id: 19,
    type: "partner",
    name: "الجمعيه السعوديه ديما",
    description: "",
    logo: dimaLogo,
    icon: "award",
  },

  // ---- عملاء مركز راي (Clients) ----
  {
    id: 20,
    type: "client",
    name: "وزاره الدفاع",
    description:
      "شراكة في مجال إدارة البيانات واتخاذ القرار في برامج علم البيانات",
    logo: defenseLogo,
    icon: "database",
  },
  {
    id: 21,
    type: "client",
    name: "سابك",
    description: "",
    logo: sabicLogo,
    icon: "award",
  },
  {
    id: 22,
    type: "client",
    name: "الخطوط الحديدية السعودية",
    description: "",
    logo: sarLogo,
    icon: "award",
  },
  // {
  //   id: 23,
  //   type: "client",
  //   name: "رئاسة أمن الدولة",
  //   description: "",
  //   logo: stateSecurityLogo,
  //   icon: "shield",
  // },
  // {
  //   id: 24,
  //   type: "client",
  //   name: "هيئة مكافحة الفساد (نزاهة)",
  //   description: "",
  //   logo: nazahaLogo,
  //   icon: "award",
  // },
  {
    id: 25,
    type: "client",
    name: "الهيئة الملكية للجبيل وينبع",
    description: "",
    logo: rcjyLogo,
    icon: "landmark",
  },
  {
    id: 26,
    type: "client",
    name: "جامعة الأميرة نورة بنت عبدالرحمن",
    description: "",
    logo: pnuLogo,
    icon: "award",
  },
  {
    id: 27,
    type: "client",
    name: "الدفاع المدني بوزارة الداخلية",
    description: "",
    logo: civilDefenseLogo,
    icon: "shield",
  },
  {
    id: 28,
    type: "client",
    name: "وزارة الحرس الوطني",
    description: "",
    logo: mngLogo,
    icon: "shield",
  },
  // {
  //   id: 29,
  //   type: "client",
  //   name: "وزارة الحرس الملكي",
  //   description: "",
  //   logo: mng2Logo,
  //   icon: "shield",
  // },
];
