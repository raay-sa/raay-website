export interface TeamMemberData {
  id: number;
  name: string;
  position: string;
  bio: string;
  expertise: string[];
  image?: string;
}

export const team: TeamMemberData[] = [
  {
    id: 1,
    name: 'د. عبدالله الشهري',
    position: 'المدير التنفيذي',
    bio: 'خبير في الأمن السيبراني والتحول الرقمي مع أكثر من 15 عاماً من الخبرة',
    expertise: [
      'الأمن السيبراني',
      'التحول الرقمي',
      'إدارة المخاطر',
      'القيادة الإستراتيجية'
    ],
    image: '/images/team/abdullah-alshehri.jpg'
  },
  {
    id: 2,
    name: 'أ. سارة العتيبي',
    position: 'مديرة التدريب',
    bio: 'خبيرة في تطوير البرامج التدريبية والتعليم الإلكتروني',
    expertise: [
      'التعليم الإلكتروني',
      'تطوير المناهج',
      'إدارة التدريب',
      'تقييم الأداء'
    ]
  },
  {
    id: 3,
    name: 'م. أحمد الحربي',
    position: 'خبير الذكاء الاصطناعي',
    bio: 'متخصص في تطبيقات الذكاء الاصطناعي والتعلم الآلي',
    expertise: [
      'الذكاء الاصطناعي',
      'التعلم الآلي',
      'معالجة البيانات',
      'البرمجة المتقدمة'
    ]
  }
];