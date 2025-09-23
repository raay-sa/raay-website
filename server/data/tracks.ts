export interface TrackData {
  id: number;
  title: string;
  description: string;
  features: string[];
  trackType: 'cyber-security' | 'digital-transformation' | 'artificial-intelligence' | 'data-science' | 'institutional-transformation' | 'risk-avoidance';
}

export const tracks: TrackData[] = [
  {
    id: 1,
    title: 'الأمن السيبراني',
    description: 'مسار شامل لتعلم أساسيات وتقنيات الأمن السيبراني',
    features: [
      'أساسيات الأمن السيبراني',
      'الحماية من التهديدات',
      'إدارة المخاطر الأمنية',
      'التحقق من الهوية والوصول'
    ],
    trackType: 'cyber-security'
  },
  {
    id: 2,
    title: 'التحول الرقمي',
    description: 'مسار متخصص في قيادة التحول الرقمي في المؤسسات',
    features: [
      'استراتيجيات التحول الرقمي',
      'تقنيات التطوير الحديثة',
      'إدارة التغيير التقني',
      'الابتكار والتكنولوجيا'
    ],
    trackType: 'digital-transformation'
  },
  {
    id: 3,
    title: 'الذكاء الاصطناعي',
    description: 'مسار متقدم في تطبيقات الذكاء الاصطناعي والتعلم الآلي',
    features: [
      'أساسيات الذكاء الاصطناعي',
      'التعلم الآلي والعميق',
      'معالجة اللغات الطبيعية',
      'تطبيقات الذكاء الاصطناعي'
    ],
    trackType: 'artificial-intelligence'
  },
  {
    id: 4,
    title: 'علم البيانات',
    description: 'مسار شامل في تحليل البيانات والإحصاء التطبيقي',
    features: [
      'تحليل البيانات الإحصائي',
      'التصور والرسوم البيانية',
      'البيانات الضخمة',
      'التنبؤ والنمذجة'
    ],
    trackType: 'data-science'
  },
  {
    id: 5,
    title: 'التحول المؤسسي',
    description: 'مسار متخصص في إدارة التغيير والتطوير المؤسسي',
    features: [
      'إدارة التغيير الاستراتيجي',
      'تطوير الهياكل التنظيمية',
      'القيادة والإدارة',
      'التميز التشغيلي'
    ],
    trackType: 'institutional-transformation'
  },
  {
    id: 6,
    title: 'تجنب المخاطر',
    description: 'مسار متقدم في إدارة وتحليل المخاطر المؤسسية',
    features: [
      'تحليل وتقييم المخاطر',
      'استراتيجيات الوقاية',
      'إدارة الأزمات',
      'التخطيط الاستراتيجي للمخاطر'
    ],
    trackType: 'risk-avoidance'
  }
];