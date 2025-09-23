export interface TestimonialData {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

export const testimonials: TestimonialData[] = [
  {
    id: 1,
    name: 'محمد العبدالله',
    position: 'مدير تقنية المعلومات',
    company: 'شركة الرياض للتقنية',
    content: 'برامج مركز راي ساعدتني في تطوير مهاراتي في الأمن السيبراني بشكل كبير. المدربون محترفون والمحتوى عالي الجودة.',
    rating: 5,
    image: '/images/testimonials/mohammed.jpg'
  },
  {
    id: 2,
    name: 'فاطمة الزهراني',
    position: 'مديرة المشاريع',
    company: 'مجموعة سابك',
    content: 'كان برنامج التحول الرقمي ممتازاً ومفيداً جداً لعملي. تعلمت الكثير من الاستراتيجيات العملية.',
    rating: 5
  },
  {
    id: 3,
    name: 'خالد الأحمد',
    position: 'محلل بيانات',
    company: 'البنك الأهلي السعودي',
    content: 'برنامج علم البيانات كان شاملاً ومنظماً بشكل ممتاز. استفدت كثيراً من الجانب العملي.',
    rating: 4
  }
];