export interface ProgramData {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  price: number;
  features: string[];
  objectives: string[];
  trackType?: string;
}

export const programs: ProgramData[] = [
  {
    id: 1,
    title: 'برنامج أساسيات الأمن السيبراني',
    description: 'برنامج شامل لتعلم أساسيات الأمن السيبراني وحماية الأنظمة',
    duration: '4 أسابيع',
    level: 'مبتدئ',
    category: 'cyber-security',
    price: 2500,
    features: [
      'محاضرات تفاعلية',
      'ورش عملية',
      'مشاريع تطبيقية',
      'شهادة معتمدة'
    ],
    objectives: [
      'فهم أساسيات الأمن السيبراني',
      'تطبيق تقنيات الحماية',
      'إدارة المخاطر الأمنية'
    ],
    trackType: 'cyber-security'
  },
  {
    id: 2,
    title: 'برنامج التحول الرقمي للمؤسسات',
    description: 'برنامج متخصص في قيادة التحول الرقمي في المؤسسات',
    duration: '6 أسابيع',
    level: 'متقدم',
    category: 'digital-transformation',
    price: 3500,
    features: [
      'استراتيجيات التحول',
      'حالات دراسية',
      'مشاريع عملية',
      'شهادة معتمدة'
    ],
    objectives: [
      'وضع استراتيجيات للتحول الرقمي',
      'قيادة فرق التغيير',
      'تطبيق التقنيات الحديثة'
    ],
    trackType: 'digital-transformation'
  },
  {
    id: 3,
    title: 'برنامج الذكاء الاصطناعي التطبيقي',
    description: 'برنامج متقدم في تطبيقات الذكاء الاصطناعي في الأعمال',
    duration: '8 أسابيع',
    level: 'متقدم',
    category: 'artificial-intelligence',
    price: 4500,
    features: [
      'التعلم الآلي',
      'معالجة اللغات',
      'مشاريع ذكية',
      'شهادة معتمدة'
    ],
    objectives: [
      'تطوير حلول ذكية',
      'تطبيق خوارزميات التعلم الآلي',
      'بناء أنظمة ذكية'
    ],
    trackType: 'artificial-intelligence'
  }
];