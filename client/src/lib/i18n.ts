import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "ar" | "en";
const currentYear = new Date().getFullYear();

interface I18nStore {
  language: Language;
  setLanguage: (language: Language) => void;
  refreshTimestamp: number;
  forceRefresh: () => void;
}

// Use persist middleware to store language preference
export const useI18nStore = create<I18nStore>()(
  persist(
    (set) => ({
      language: "ar",
      refreshTimestamp: Date.now(),
      setLanguage: (language) =>
        set({
          language,
          refreshTimestamp: Date.now(),
        }),
      forceRefresh: () =>
        set((state) => ({
          refreshTimestamp: Date.now(),
        })),
    }),
    {
      name: "raay-language-storage",
      partialize: (state) => ({ language: state.language }),
    }
  )
);

// Dictionary type
type Dictionary = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Translations dictionary
export const dictionary: Dictionary = {
  ar: {
    // Header
    home: "الرئيسية",
    about: "من نحن",
    our_services: "خدماتنا",
    contact: "تواصل معنا",
    book_consultation: "احجز استشارة",

    // Home submenu
    "home.banner": "الصفحة الرئيسية",
    "home.latest_programs": "أحدث البرامج",
    "home.methodology": "المنهجية",
    "home.partners": "الشركاء",

    // About us submenu
    "about.why_rai": "لماذا مركز راي",
    "about.vision": "الرؤية",
    "about.mission": "الرسالة",
    "about.knowledge_building": "مجالات وأنشطة بناء المعرفة",
    "about.core_values": "قيمنا الأساسية",

    // Our services submenu titles
    "services.training": "التدريب",
    "services.consultations": "الاستشارات",

    // About submenu
    "about.main": "عن مركز راي",
    "about.mission_page": "الرسالة والرؤية",
    "about.goals": "أهدافنا",
    "about.methodology": "منهجيتنا",
    "about.team": "فريق العمل",
    "about.partners": "شركاؤنا",
    "about.testimonials": "آراء المتدربين",

    // Training submenu
    "header.training.platform": "منصة التدريب",
    "header.training.tracks": "المسارات التدريبية",
    "header.training.programs": "البرامج التدريبية",
    "header.training.online": "التدريب الأونلاين",
    "header.training.assessment": "تقييم المهارات",
    "header.training.student": "التسجيل كطالب",
    "header.training.expert": "التسجيل كخبير",

    // Consulting submenu
    "header.consulting.platform": "منصة الاستشارات",
    "header.consulting.experts": "دليل الخبراء",
    "header.consulting.fields": "مجالات الاستشارات",
    "header.consulting.request": "اطلب استشارة",

    // Home page sections
    "hero.welcome": "مرحباً بك في",
    "hero.title": "مركز راي للتدريب والاستشارات",
    "hero.subtitle":
      "حلول تدريبية واستشارية متكاملة لتطوير مهاراتك وتحقيق أهدافك",
    "hero.tagline":
      "نعزز قدراتك المهنية والوظيفية باستخدام تطبيقات الذكاء الاصطناعي بما يتوافق مع المعايير المهنية العالمية",
    "hero.cta": "تواصل معنا",
    "hero.explore": "استكشف برامجنا",

    // Hero Features
    "hero.features.flexible.title": "تدريب مرن",
    "hero.features.flexible.description":
      "برامج تدريبية مرنة تناسب جدولك وتسمح لك بالتعلم بالسرعة التي تناسبك",
    "hero.features.expert.title": "مدربون محترفون",
    "hero.features.expert.description":
      "يقدم التدريب نخبة من المدربين المتخصصين ذوي الخبرة العملية والأكاديمية",
    "hero.features.certified.title": "شهادات معتمدة",
    "hero.features.certified.description":
      "احصل على شهادات تدريب معتمدة تعزز من فرصك المهنية وتطور مسارك الوظيفي",

    // About section
    "about.title": "من نحن",
    "about.description":
      "مركز راي للتدريب والاستشارات هو مؤسسة رائدة في المملكة العربية السعودية تقدم برامج تدريبية واستشارات متخصصة في مجالات متنوعة لمساعدة المؤسسات والأفراد على تحقيق أهدافهم وتطوير قدراتهم.",

    "about.our_vision": "رؤيتنا",
    "about.vision.text":
      "أن نكون الخيار الأول محلياً وإقليمياً للتدريب والاستشارات.",
    "about.our_mission": "رسالتنا",
    "about.mission.text":
      "تقديم خدمات تدريب واستشارات احترافية لتطوير قدرات وكفاءات الأفراد والمؤسسات وفق أفضل المعايير المهنية.",
    "about.values": "قيمنا",
    "about.values.text":
      "الاحترافية - الجودة - الإبداع - الأمانة - الشفافية - العمل بروح الفريق.",

    // Methodology section
    "methodology.title": "منهجية راي",
    "methodology.description":
      "نقدم منهجية شاملة ومتكاملة لتنفيذ الخدمات التدريبية والاستشارية تتميز بالتركيز على تلبية احتياجات العملاء وضمان جودة التدريب والاستشارات",
    "methodology.planning": "التخطيط للتدريب",
    "methodology.execution": "تنفيذ التدريب",
    "methodology.evaluation": "التقييم والمتابعة",
    "methodology.improvement": "التحسين المستمر",

    // Methodology Planning Tab
    "methodology.planning.needs": "تحديد الاحتياجات التدريبية",
    "methodology.planning.needs.desc":
      "يتم تحليل متطلبات المتدربين وأهداف الجهة الطالبة للتدريب بدقة لتحديد الاحتياجات الفعلية.",
    "methodology.planning.design": "تصميم البرامج التدريبية",
    "methodology.planning.design.desc":
      "يتم تصميم البرامج لتتناسب مع الاحتياجات المحددة، مع مراعاة الجوانب النظرية والعملية.",
    "methodology.planning.trainers": "اختيار المدربين والاستشاريين",
    "methodology.planning.trainers.desc":
      "يتم اختيار مدربين واستشاريين مؤهلين ومعتمدين ذوي خبرة واسعة في المجالات المطلوبة لضمان جودة التدريب والاستشارات.",

    // Methodology Execution Tab
    "methodology.execution.environment": "توفير بيئة تدريبية مناسبة",
    "methodology.execution.environment.desc":
      "نحرص على توفير بيئة تدريبية محفزة ومجهزة بأحدث التقنيات والوسائل التعليمية لتعزيز تجربة المتدربين.",
    "methodology.execution.methods": "استخدام أساليب تدريبية متنوعة",
    "methodology.execution.methods.desc":
      "نستخدم مزيجاً من الأساليب التدريبية كالمحاضرات وورش العمل والتمارين العملية وحالات الدراسة والمناقشات الجماعية.",
    "methodology.execution.materials": "توفير المواد التدريبية",
    "methodology.execution.materials.desc":
      "نقدم مواد تدريبية شاملة ومحدثة تشمل الأدلة والكتيبات والعروض التقديمية والتمارين العملية التي تساعد المتدربين على فهم المحتوى بشكل أفضل.",

    // Methodology Evaluation Tab
    "methodology.evaluation.performance": "تقييم أداء المتدربين",
    "methodology.evaluation.performance.desc":
      "يتم تقييم أداء المتدربين خلال وبعد البرنامج التدريبي من خلال الاختبارات والتمارين العملية والمشاريع لقياس مدى استفادتهم وتطور مهاراتهم.",
    "methodology.evaluation.programs": "تقييم البرامج التدريبية",
    "methodology.evaluation.programs.desc":
      "نقوم بتقييم البرامج التدريبية من خلال استطلاعات رأي المتدربين والجهات المستفيدة للتأكد من تحقيق الأهداف وقياس مستوى الرضا.",
    "methodology.evaluation.impact": "قياس أثر التدريب",
    "methodology.evaluation.impact.desc":
      "نقوم بمتابعة وقياس أثر التدريب على أداء المتدربين والمؤسسات بعد فترة من انتهاء البرنامج التدريبي لتقييم فعالية التدريب في تحقيق النتائج المرجوة.",

    // Methodology Improvement Tab
    "methodology.improvement.analysis": "تحليل نتائج التقييم",
    "methodology.improvement.analysis.desc":
      "نقوم بتحليل نتائج التقييم وملاحظات المتدربين لتحديد نقاط القوة ومجالات التحسين في البرامج التدريبية والمواد التعليمية.",
    "methodology.improvement.content": "تطوير المحتوى التدريبي",
    "methodology.improvement.content.desc":
      "نقوم بتحديث وتطوير المحتوى التدريبي بشكل مستمر ليواكب أحدث المستجدات والممارسات في المجالات المختلفة ويلبي احتياجات المتدربين بشكل أفضل.",
    "methodology.improvement.methods": "تطوير أساليب التدريب",
    "methodology.improvement.methods.desc":
      "نسعى باستمرار لتطوير أساليب التدريب وتبني أحدث التقنيات والأدوات التعليمية لضمان تقديم تجربة تدريبية فعالة وممتعة تلبي توقعات المتدربين وتحقق أهدافهم.",

    // Training Tracks section
    "tracks.title": "المسارات التدريبية",
    "tracks.description":
      "نقدم مجموعة متنوعة من المسارات التدريبية المتخصصة لتلبية احتياجات مختلف القطاعات والمجالات",

    // Programs section
    "programs.title": "البرامج التدريبية",
    "programs.description":
      "مجموعة متميزة من البرامج التدريبية المصممة لتطوير المهارات وتعزيز القدرات في مختلف المجالات",
    "programs.all": "جميع البرامج",
    "programs.filter": "تصنيف البرامج",
    "programs.details": "تفاصيل البرنامج",
    "programs.duration": "المدة:",
    "programs.price": "السعر:",
    "programs.register": "سجل الآن",

    // Team section
    "team.title": "فريق العمل",
    "team.description":
      "يضم مركز راي نخبة من الاستشاريين والمدربين ذوي الخبرات العالية في مجالات متنوعة",
    "team.joinUs": "انضم إلينا",
    "team.applyNow": "تقدم الآن",

    // Partners section
    "partners.title": "شركاؤنا الاستراتيجيون",
    "partners.description":
      "نفتخر بشراكاتنا الاستراتيجية مع مؤسسات وشركات رائدة في مختلف المجالات",
    "partners.clientsTitle": "عملاء مركز راي",
    "partners.clientsDescription":
      "شركات وجهات حكومية وخاصة وثقت بنا لتقديم التدريب والاستشارات",

    // Testimonials section
    "testimonials.title": "آراء المتدربين",
    "testimonials.description":
      "ماذا يقول عملاؤنا عن تجربتهم مع مركز راي للتدريب والاستشارات",

    // Contact section
    "contact.title": "تواصل معنا",
    "contact.description":
      "نحن هنا للإجابة على استفساراتك وتقديم المزيد من المعلومات حول برامجنا التدريبية وخدماتنا الاستشارية",
    "contact.form.send": "ارسل رسالة",
    "contact.form.name": "الاسم",
    "contact.form.phone": "رقم الجوال",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.subject": "الموضوع",
    "contact.form.message": "الرسالة",
    "contact.form.submit": "إرسال",
    "contact.form.sending": "جاري الإرسال...",
    "contact.info.title": "معلومات التواصل",

    // Profile section
    "profile.title": "الملف التعريفي",
    "profile.download": "تحميل الملف",
    "profile.view": "عرض الملف",
    "contact.info.address": "العنوان",
    "contact.info.address.text":
      "طريق الإمام عبدالله بن سعود بن عبدالعزيز الفرعي رقم المبني 2085 الدور الثالث مكتب47",
    "contact.info.phone": "رقم الهاتف",
    "contact.info.email": "البريد الإلكتروني",
    "contact.info.whatsapp": "واتساب",
    "contact.info.hours": "ساعات العمل",
    "contact.info.hours.text": "الأحد - الخميس: 8:00 صباحًا - 5:00 مساءً",
    "contact.social": "تابعنا",
    "contact.section.form": "ارسل رسالة",
    "contact.section.info": "معلومات التواصل",

    // Footer
    "footer.rights": ` جميع الحقوق محفوظ © ${currentYear}  مركز راي للتدريب والاستشارات `,
    "footer.title": " تطوير شركه تقنيات الفضاء ESOL ",
    "footer.links": "روابط سريعة",
    "footer.connect": "تواصل معنا",
    "footer.address": "المملكة العربية السعودية، الرياض",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الاستخدام",
    "footer.description":
      "شركة سعودية تستلهم الحاجة إلى مواكبة التطورات والتقنية لبناء وتطوير مهارات العنصر البشري من خلال برامج التدريب والاستشارات.",
    "footer.about": "من نحن",
    "footer.programs": "البرامج التدريبية",
    "footer.policies": "الشروط والاحكام",
    "footer.consultations": "الاستشارات",
    "footer.team": "فريق العمل",
    "footer.contact": "تواصل معنا",
    "footer.tracks": "المسارات",

    // Track categories
    "tracks.cyber-security": "الأمن السيبراني",
    "tracks.digital-transformation": "التحول الرقمي",
    "tracks.artificial-intelligence": "الذكاء الاصطناعي",
    "tracks.data-science": "تحليل المخاطر ",
    "tracks.organizational-transformation": "التميز المؤسسي",
    "tracks.risk-avoidance": "تجنب المخاطر",
    "tracks.leadership-development": "تطوير القيادات لتحقيق التميز المؤسسي",

    // Tracks page additional translations
    "tracks.specialized_track_description":
      "مسار تدريبي متخصص وفق أحدث المنهجيات والممارسات العالمية",
    "tracks.browse_programs":
      "استعرض البرامج المتوفرة في هذا المسار واختر البرنامج المناسب لاحتياجاتك",
    "tracks.back_to_tracks": "العودة إلى المسارات",
    "tracks.no_programs": "لا توجد برامج متاحة حالياً في هذا المسار",
    "common.back_to_home": "العودة للصفحة الرئيسية",

    // Stats section
    "stats.programs": "برنامج تدريبي",
    "stats.trainees": "متدرب",
    "stats.trainers": "مدرب محترف",
    "stats.tracks": "مسارات تخصصية",

    // Call to action section
    "callToAction.title": "هل أنت مستعد لتطوير مهاراتك؟",
    "callToAction.description":
      "انضم إلى برامجنا التدريبية المتميزة واكتسب المهارات والمعرفة التي تحتاجها للنجاح في عالم اليوم سريع التغير",
    "callToAction.explorePrograms": "قيم مهاراتك مجانا",
    "callToAction.contactUs": "تواصل معنا",
  },

  en: {
    // Header
    home: "Home",
    about: "About Us",
    our_services: "Our Services",
    contact: "Contact Us",
    book_consultation: "Book a Consultation",

    // Common elements used throughout the site
    "common.back_to_home": "Back to Home Page",

    // Home submenu
    "home.banner": "Main Banner",
    "home.latest_programs": "Latest Programs",
    "home.methodology": "Methodology",
    "home.partners": "Partners",

    // About us submenu
    "about.main": "About Raay Center",
    "about.why_rai": "Why Raay Center",
    "about.vision": "Vision",
    "about.mission": "Mission",
    "about.mission_page": "Mission & Vision",
    "about.goals": "Our Goals",
    "about.methodology": "Our Methodology",
    "about.team": "Our Team",
    "about.partners": "Our Partners",
    "about.testimonials": "Testimonials",
    "about.knowledge_building": "Knowledge Building Fields and Activities",
    "about.core_values": "Core Values",

    // Our services submenu titles
    "services.training": "Training",
    "services.consultations": "Consultations",

    // Training submenu
    "header.training.platform": "Training Platform",
    "header.training.tracks": "Training Tracks",
    "header.training.programs": "Training Programs",
    "header.training.online": "Online Training",
    "header.training.assessment": "Skills Assessment",
    "header.training.student": "Register as Student",
    "header.training.expert": "Register as Expert",

    // Consulting submenu
    "header.consulting.platform": "Consulting Platform",
    "header.consulting.experts": "Expert Directory",
    "header.consulting.fields": "Consulting Fields",
    "header.consulting.request": "Request Consultation",

    // Home page sections
    "hero.welcome": "Welcome to",
    "hero.title": "Ray Training & Consulting Center",
    "hero.subtitle":
      "Integrated training and consulting solutions to develop your skills and achieve your goals",
    "hero.tagline":
      "We enhance your professional capabilities using AI applications in line with global professional standards",
    "hero.banner": "Knowledge Building Company for Business Solutions",
    "hero.cta": "Contact Us",
    "hero.explore": "Explore Our Programs",

    // Hero Features
    "hero.features.flexible.title": "Flexible Training",
    "hero.features.flexible.description":
      "Flexible training programs that fit your schedule and allow you to learn at your own pace",
    "hero.features.expert.title": "Professional Trainers",
    "hero.features.expert.description":
      "Training is delivered by a group of specialized trainers with practical and academic experience",
    "hero.features.certified.title": "Certified Certificates",
    "hero.features.certified.description":
      "Get accredited training certificates that enhance your professional opportunities and develop your career path",

    // About section
    "about.title": "About Us",
    "about.description":
      "Ray Training & Consulting Center is a leading institution in Saudi Arabia that provides specialized training programs and consultations in various fields to help organizations and individuals achieve their goals and develop their capabilities.",
    "about.our_vision": "Our Vision",
    "about.vision.text":
      "To be the first choice locally and regionally for training and consulting.",
    "about.our_mission": "Our Mission",
    "about.mission.text":
      "To provide professional training and consulting services to develop the abilities and competencies of individuals and institutions according to the best professional standards.",
    "about.values": "Our Values",
    "about.values.text":
      "Professionalism - Quality - Creativity - Honesty - Transparency - Teamwork.",

    // Methodology section
    "methodology.title": "Raay Methodology",
    "methodology.description":
      "We provide a comprehensive and integrated methodology for implementing training and consulting services characterized by a focus on meeting customer needs and ensuring quality training and consulting",
    "methodology.planning": "Training Planning",
    "methodology.execution": "Training Execution",
    "methodology.evaluation": "Evaluation & Follow-up",
    "methodology.improvement": "Continuous Improvement",

    // Methodology Planning Tab
    "methodology.planning.needs": "Identifying Training Needs",
    "methodology.planning.needs.desc":
      "Trainee requirements and client organization objectives are carefully analyzed to determine actual needs.",
    "methodology.planning.design": "Designing Training Programs",
    "methodology.planning.design.desc":
      "Programs are designed to match identified needs, considering both theoretical and practical aspects.",
    "methodology.planning.trainers": "Selecting Trainers and Consultants",
    "methodology.planning.trainers.desc":
      "Qualified and certified trainers and consultants with extensive experience in required fields are selected to ensure quality training and consulting.",

    // Methodology Execution Tab
    "methodology.execution.environment":
      "Providing Suitable Training Environment",
    "methodology.execution.environment.desc":
      "We ensure a motivating training environment equipped with the latest technologies and educational tools to enhance the trainee experience.",
    "methodology.execution.methods": "Using Diverse Training Methods",
    "methodology.execution.methods.desc":
      "We use a mix of training methods such as lectures, workshops, practical exercises, case studies, and group discussions.",
    "methodology.execution.materials": "Providing Training Materials",
    "methodology.execution.materials.desc":
      "We provide comprehensive and updated training materials including guides, booklets, presentations, and practical exercises that help trainees better understand the content.",

    // Methodology Evaluation Tab
    "methodology.evaluation.performance": "Evaluating Trainee Performance",
    "methodology.evaluation.performance.desc":
      "Trainee performance is evaluated during and after the training program through tests, practical exercises, and projects to measure their benefit and skill development.",
    "methodology.evaluation.programs": "Evaluating Training Programs",
    "methodology.evaluation.programs.desc":
      "We evaluate training programs through trainee and beneficiary surveys to ensure objectives are achieved and measure satisfaction levels.",
    "methodology.evaluation.impact": "Measuring Training Impact",
    "methodology.evaluation.impact.desc":
      "We follow up and measure the impact of training on trainee and organization performance after a period of program completion to evaluate training effectiveness in achieving desired results.",

    // Methodology Improvement Tab
    "methodology.improvement.analysis": "Analyzing Evaluation Results",
    "methodology.improvement.analysis.desc":
      "We analyze evaluation results and trainee feedback to identify strengths and areas for improvement in training programs and educational materials.",
    "methodology.improvement.content": "Developing Training Content",
    "methodology.improvement.content.desc":
      "We continuously update and develop training content to keep pace with the latest developments and practices in various fields and better meet the needs of trainees.",
    "methodology.improvement.methods": "Improving Training Methods",
    "methodology.improvement.methods.desc":
      "We continuously strive to develop training methods and adopt the latest technologies and educational tools to ensure an effective and enjoyable training experience that meets trainee expectations and achieves their goals.",

    // Training Tracks section
    "tracks.title": "Training Tracks",
    "tracks.description":
      "We offer a variety of specialized training tracks to meet the needs of different sectors and fields",

    // Programs section
    "programs.title": "Training Programs",
    "programs.description":
      "A distinguished collection of training programs designed to develop skills and enhance capabilities in various fields",
    "programs.all": "All Programs",
    "programs.filter": "Filter Programs",
    "programs.details": "Program Details",
    "programs.duration": "Duration:",
    "programs.price": "Price:",
    "programs.register": "Register Now",

    // Team section
    "team.title": "Our Team",
    "team.description":
      "Raay Center includes a selection of consultants and trainers with high expertise in various fields",
    "team.joinUs": "Join Our Team",
    "team.applyNow": "Apply Now",

    // Partners section
    "partners.title": "Strategic Partners",
    "partners.description":
      "We are proud of our strategic partnerships with leading institutions and companies in various fields",
    "partners.clientsTitle": "Our Clients",
    "partners.clientsDescription":
      "Governmental and private institutions and companies that trust us to provide training and consulting services",

    // Testimonials section
    "testimonials.title": "Testimonials",
    "testimonials.description":
      "What our clients say about their experience with Ray Training & Consulting Center",

    // Contact section
    "contact.title": "Contact Us",
    "contact.description":
      "We are here to answer your inquiries and provide more information about our training programs and consulting services",
    "contact.form.send": "Send a Message",
    "contact.form.name": "Name",
    "contact.form.phone": "Phone Number",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.submit": "Send",
    "contact.form.sending": "Sending...",
    "contact.info.title": "Contact Information",
    "contact.info.address": "Address",
    "contact.info.address.text":
      "Imam Abdullah bin Saud bin Abdulaziz Branch Road, Building No. 2085, Third Floor, Office 47",
    "contact.info.phone": "Phone Number",
    "contact.info.email": "Email",
    "contact.info.whatsapp": "WhatsApp",
    "contact.info.hours": "Working Hours",
    "contact.info.hours.text": "Sunday - Thursday: 8:00 AM - 5:00 PM",
    "contact.social": "Follow Us",
    "contact.section.form": "Send a Message",
    "contact.section.info": "Contact Information",

    // Profile section
    "profile.title": "Profile",
    "profile.download": "Download",
    "profile.view": "View Profile",

    // Footer
    "footer.rights": `All rights reserved © ${currentYear} Ray Training & Consulting Center`,
    "footer.title": " RAY TRAINING & CONSULTING CENTER - ESOL",
    "footer.links": "Quick Links",
    "footer.connect": "Connect With Us",
    "footer.address": "Saudi Arabia, Riyadh",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Use",
    "footer.description":
      "A Saudi company inspired by the need to keep pace with developments and technology to build and develop human element skills through training programs and consulting services.",
    "footer.about": "About Us",
    "footer.programs": "Training Programs",
    "footer.policies": "Terms and Conditions",
    "footer.consultations": "Consulting",

    "footer.team": "Our Team",
    "footer.contact": "Contact Us",
    "footer.tracks": "Tracks",

    // Track categories
    "tracks.cyber-security": "Cyber Security",
    "tracks.digital-transformation": "Digital Transformation",
    "tracks.artificial-intelligence": "Artificial Intelligence",
    "tracks.data-science": "Data Science",
    "tracks.organizational-transformation": "Organizational Transformation",
    "tracks.risk-avoidance": "Risk Avoidance",
    "tracks.leadership-development": "Leadership Development",

    // Tracks page additional translations
    "tracks.specialized_track_description":
      "A specialized training track based on latest global methodologies",
    "tracks.browse_programs":
      "Browse the available programs in this track and choose the one that suits your needs",
    "tracks.back_to_tracks": "Back to Tracks",
    "tracks.no_programs": "No programs available in this track at the moment",
    "tracks.specialized_programs":
      "Specialized training programs within this track to develop professional skills and knowledge",

    // Stats section
    "stats.programs": "Training Programs",
    "stats.trainees": "Trainees",
    "stats.trainers": "Professional Trainers",
    "stats.tracks": "Specialized Tracks",

    // Call to action section
    "callToAction.title": "Are you ready to develop your skills?",
    "callToAction.description":
      "Join our distinguished training programs and acquire the skills and knowledge you need to succeed in today's rapidly changing world",
    "callToAction.explorePrograms": "Evaluate your skills for free",
    "callToAction.contactUs": "Contact Us",
  },
};

// Translation function
export function translate(key: string, language?: Language): string {
  const lang = language || useI18nStore.getState().language;
  const translation = dictionary[lang][key];

  // Log for debugging
  if (!translation && process.env.NODE_ENV === "development") {
    console.log(`Translation missing for key "${key}" in language "${lang}"`);
  }

  return translation || key;
}

// Shorthand function for translation
export const t = translate;
