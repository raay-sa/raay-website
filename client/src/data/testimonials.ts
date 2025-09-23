export interface Testimonial {
  id: number;
  name: string;
  title: string;
  comment: string;
  rating: number;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "فهد العتيبي",
    title: "مهندس شبكات",
    comment: "تجربة تدريبية رائعة في برنامج أخصائي الأمن السيبراني. المحتوى العلمي قوي ومواكب لأحدث التطورات في المجال، والمدرب كان متمكن ومحترف. أنصح به بشدة لكل من يريد تطوير مهاراته في هذا المجال.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1552353617-3bfd679b3bdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 2,
    name: "سارة الشمري",
    title: "مديرة تقنية المعلومات",
    comment: "حضرت برنامج قيادة التحول الرقمي وكانت تجربة مثرية جداً. البرنامج غني بالمعلومات التطبيقية والأمثلة العملية، واستفدت منه كثيراً في قيادة مشاريع التحول الرقمي في مؤسستي.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1639267387154-a3d81bfc94e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 3,
    name: "عبدالله الغامدي",
    title: "مدير قسم التطوير",
    comment: "برنامج بناء الهوية المؤسسية كان مميز جداً وأضاف لي الكثير من المعرفة والمهارات. الأدوات والاستراتيجيات التي تعلمتها طبقتها في مؤسستي وكانت النتائج إيجابية للغاية.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 4,
    name: "خولة الدوسري",
    title: "محللة بيانات",
    comment: "استفدت كثيراً من برنامج تطبيقات الذكاء الاصطناعي في الأعمال. المدرب كان متميز والمحتوى عملي وقابل للتطبيق. تعلمت تقنيات جديدة ساعدتني في تحليل البيانات واتخاذ القرارات.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1639267387154-a3d81bfc94e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  }
];
