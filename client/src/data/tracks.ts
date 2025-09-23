import { IconType } from 'react-icons';
import { 
  FaShieldAlt, 
  FaDigitalTachograph, 
  FaBrain, 
  FaChartPie, 
  FaBuilding, 
  FaExclamationTriangle 
} from 'react-icons/fa';
import { useI18nStore } from '@/lib/i18n';

export interface Track {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: IconType;
  trackType: 'cyber-security' | 'digital-transformation' | 'artificial-intelligence' | 'data-science' | 'institutional-transformation' | 'risk-avoidance';
}

// Arabic track data
export const arabicTracks: Track[] = [
  {
    id: 1,
    title: "الأمن السيبراني",
    description: "برامج متخصصة في مجال الأمن السيبراني تشمل الجوانب الدفاعية والحوكمة والمخاطر والامتثال",
    features: [
      "الأمن السيبراني الدفاعي",
      "الحوكمة السيبرانية",
      "المخاطر والامتثال"
    ],
    icon: FaShieldAlt,
    trackType: 'cyber-security'
  },
  {
    id: 2,
    title: "التحول الرقمي",
    description: "برامج تدريبية تعزز مهارات التحول الرقمي وتقنياته في المنظمات وتطوير استراتيجياته",
    features: [
      "ثقافة التحول الرقمي",
      "تقنيات التحول الرقمي",
      "قيادة التحول الرقمي"
    ],
    icon: FaDigitalTachograph,
    trackType: 'digital-transformation'
  },
  {
    id: 3,
    title: "الذكاء الاصطناعي",
    description: "برامج تدريبية متقدمة في مجال الذكاء الاصطناعي وتطبيقاته في مختلف القطاعات",
    features: [
      "أساسيات الذكاء الاصطناعي",
      "تطبيقات في بيئة الأعمال",
      "تطوير حلول الذكاء الاصطناعي"
    ],
    icon: FaBrain,
    trackType: 'artificial-intelligence'
  },
  {
    id: 4,
    title: "علم البيانات",
    description: "برامج تدريبية في تحليل البيانات واستخراج المعلومات القيمة لدعم اتخاذ القرارات",
    features: [
      "تحليل البيانات الضخمة",
      "إدارة وتنظيم البيانات",
      "الاستدلال الإحصائي"
    ],
    icon: FaChartPie,
    trackType: 'data-science'
  },
  {
    id: 5,
    title: "التحول المؤسسي",
    description: "برامج تدريبية لتطوير المؤسسات وتحسين أدائها وبناء ثقافة العمل المؤسسي",
    features: [
      "ثقافة العمل المؤسسي",
      "بناء الهوية المؤسسية",
      "تطوير القيادات"
    ],
    icon: FaBuilding,
    trackType: 'institutional-transformation'
  },
  {
    id: 6,
    title: "تجنب المخاطر",
    description: "برامج تدريبية تركز على تحديد وإدارة المخاطر المختلفة في المنظمات وكيفية تجنبها",
    features: [
      "بناء الوعي المؤسسي",
      "تجنب مخاطر التهكير الفكري",
      "إجراءات الأمن الشخصي"
    ],
    icon: FaExclamationTriangle,
    trackType: 'risk-avoidance'
  }
];

// English track data
export const englishTracks: Track[] = [
  {
    id: 1,
    title: "Cyber Security",
    description: "Specialized programs in cybersecurity covering defensive aspects, governance, risk, and compliance",
    features: [
      "Defensive Cybersecurity",
      "Cyber Governance",
      "Risk and Compliance"
    ],
    icon: FaShieldAlt,
    trackType: 'cyber-security'
  },
  {
    id: 2,
    title: "Digital Transformation",
    description: "Training programs that enhance digital transformation skills and technologies in organizations and develop strategies",
    features: [
      "Digital Transformation Culture",
      "Digital Transformation Technologies",
      "Digital Transformation Leadership"
    ],
    icon: FaDigitalTachograph,
    trackType: 'digital-transformation'
  },
  {
    id: 3,
    title: "Artificial Intelligence",
    description: "Advanced training programs in artificial intelligence and its applications across various sectors",
    features: [
      "Artificial Intelligence Fundamentals",
      "Business Environment Applications",
      "AI Solutions Development"
    ],
    icon: FaBrain,
    trackType: 'artificial-intelligence'
  },
  {
    id: 4,
    title: "Data Science",
    description: "Training programs in data analysis and extracting valuable information to support decision-making",
    features: [
      "Big Data Analysis",
      "Data Management and Organization",
      "Statistical Inference"
    ],
    icon: FaChartPie,
    trackType: 'data-science'
  },
  {
    id: 5,
    title: "Organizational Transformation",
    description: "Training programs to develop institutions, improve their performance, and build an institutional work culture",
    features: [
      "Institutional Work Culture",
      "Building Institutional Identity",
      "Leadership Development"
    ],
    icon: FaBuilding,
    trackType: 'institutional-transformation'
  },
  {
    id: 6,
    title: "Risk Avoidance",
    description: "Training programs focusing on identifying and managing various risks in organizations and how to avoid them",
    features: [
      "Building Institutional Awareness",
      "Avoiding Intellectual Hacking Risks",
      "Personal Security Procedures"
    ],
    icon: FaExclamationTriangle,
    trackType: 'risk-avoidance'
  }
];

// Function to get tracks based on current language
export function useTracks(): Track[] {
  const { language, refreshTimestamp } = useI18nStore();
  
  // Adding refreshTimestamp as a dependency to re-evaluate on language change
  console.log(`Getting tracks for language: ${language} (refresh: ${refreshTimestamp})`);
  return language === 'ar' ? arabicTracks : englishTracks;
}

// Function to get tracks based on language parameter (for static contexts)
export function getTracksByLanguage(language: 'ar' | 'en'): Track[] {
  return language === 'ar' ? arabicTracks : englishTracks;
}

// Export a function that always gets current language from store
export const tracks = () => {
  // First check localStorage directly to ensure freshness
  const savedLanguage = localStorage.getItem('raay-language');
  // If localStorage has a valid language, use that
  if (savedLanguage === 'ar' || savedLanguage === 'en') {
    return savedLanguage === 'ar' ? arabicTracks : englishTracks;
  }
  
  // Otherwise fall back to the store value
  const language = useI18nStore.getState().language;
  return language === 'ar' ? arabicTracks : englishTracks;
};
