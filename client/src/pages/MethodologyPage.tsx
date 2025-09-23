import React from "react";
import { useI18nStore } from "@/lib/i18n";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  Users, 
  BookOpen, 
  Presentation
} from "lucide-react";
import raayVideo from "../assets/videos/raay-center-video.mp4";

export default function MethodologyPage() {
  const { language } = useI18nStore();
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section with Video Background */}
      <section className="relative py-24 text-white">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-[#272467] opacity-80 z-10"></div>
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            muted 
            loop
            playsInline
            src={raayVideo}
          ></video>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              {language === 'ar' ? "مركز راي للتدريب والاستشارات" : "Ray Training & Consulting Center"}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? "نسعى لتقديم خدمات تدريبية واستشارية متميزة تسهم في بناء الكفاءات وتطوير المهارات وتحقيق التميز المؤسسي"
                : "We strive to provide distinguished training and consulting services that contribute to building competencies, developing skills, and achieving institutional excellence"
              }
            </p>
          </div>
        </div>
      </section>
      
      {/* Methodology Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Methodology Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
            {language === 'ar' ? "منهجية راي" : "Raay Methodology"}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? "نقدم منهجية شاملة ومتكاملة لتنفيذ الخدمات التدريبية والاستشارية تتميز بالتركيز على تلبية احتياجات العميل وضمان جودة التدريب والاستشارات"
              : "We provide a comprehensive and integrated methodology for implementing training and consulting services that focuses on meeting client needs and ensuring the quality of training and consulting"
            }
          </p>
        </div>
        
        {/* Methodology Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="planning" className="w-full">
            <TabsList className={`flex w-full justify-center mb-12 gap-2 overflow-x-auto ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <TabsTrigger 
                value="planning" 
                className="px-6 py-3 data-[state=active]:bg-[#2a2665] data-[state=active]:text-white"
              >
                {language === 'ar' ? "التخطيط للتدريب" : "Training Planning"}
              </TabsTrigger>
              <TabsTrigger 
                value="execution" 
                className="px-6 py-3 data-[state=active]:bg-[#2a2665] data-[state=active]:text-white"
              >
                {language === 'ar' ? "تنفيذ التدريب" : "Training Execution"}
              </TabsTrigger>
              <TabsTrigger 
                value="evaluation" 
                className="px-6 py-3 data-[state=active]:bg-[#2a2665] data-[state=active]:text-white"
              >
                {language === 'ar' ? "التقييم والمتابعة" : "Evaluation"}
              </TabsTrigger>
              <TabsTrigger 
                value="improvement" 
                className="px-6 py-3 data-[state=active]:bg-[#2a2665] data-[state=active]:text-white"
              >
                {language === 'ar' ? "التحسين المستمر" : "Continuous Improvement"}
              </TabsTrigger>
            </TabsList>
            
            {/* Planning Content */}
            <TabsContent value="planning">
              <div className={`grid md:grid-cols-3 gap-12 ${language === 'ar' ? 'md:grid-flow-row-dense' : ''}`}>
                <div className={`bg-white rounded-lg p-8 shadow-md flex flex-col items-center text-center ${language === 'ar' ? 'md:order-1' : ''}`}>
                  <h3 className="text-xl font-bold text-[#2a2665] mb-4">
                    {language === 'ar' ? "تحديد الاحتياجات التدريبية" : "Identifying Training Needs"}
                  </h3>
                  <div className="mb-4 mt-2">
                    <div className="rounded-full bg-[#f3f4ff] p-4 inline-block">
                      <Target className="h-8 w-8 text-[#2a2665]" />
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? "يتم تحليل متطلبات المتدربين وأهداف الجهة الطالبة للتدريب بدقة لتحديد الاحتياجات الفعلية." 
                      : "Trainees' requirements and requesting entity's objectives are carefully analyzed to identify actual needs."}
                  </p>
                </div>
                
                <div className={`bg-white rounded-lg p-8 shadow-md flex flex-col items-center text-center ${language === 'ar' ? 'md:order-2' : ''}`}>
                  <h3 className="text-xl font-bold text-[#2a2665] mb-4">
                    {language === 'ar' ? "تصميم البرامج التدريبية" : "Training Program Design"}
                  </h3>
                  <div className="mb-4 mt-2">
                    <div className="rounded-full bg-[#f3f4ff] p-4 inline-block">
                      <BookOpen className="h-8 w-8 text-[#2a2665]" />
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? "يتم تصميم البرامج لتتناسب مع الاحتياجات المحددة، مع مراعاة الجوانب النظرية والعملية." 
                      : "Programs are designed to suit identified needs, taking into account theoretical and practical aspects."}
                  </p>
                </div>
                
                <div className={`bg-white rounded-lg p-8 shadow-md flex flex-col items-center text-center ${language === 'ar' ? 'md:order-3' : ''}`}>
                  <h3 className="text-xl font-bold text-[#2a2665] mb-4">
                    {language === 'ar' ? "اختيار المدربين والاستشاريين" : "Selecting Trainers and Consultants"}
                  </h3>
                  <div className="mb-4 mt-2">
                    <div className="rounded-full bg-[#f3f4ff] p-4 inline-block">
                      <Users className="h-8 w-8 text-[#2a2665]" />
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? "يتم اختيار مدربين واستشاريين مؤهلين ومتخصصين ذوي خبرة واسعة في المجالات المطلوبة لضمان جودة التدريب والاستشارات." 
                      : "Qualified and specialized trainers and consultants with extensive experience in required fields are selected to ensure quality."}
                  </p>
                </div>
              </div>
            </TabsContent>
            
            {/* Execution Content */}
            <TabsContent value="execution">
              <div className={`grid md:grid-cols-3 gap-12 ${language === 'ar' ? 'md:grid-flow-row-dense' : ''}`}>
                <div className={`bg-white rounded-lg p-8 shadow-md flex flex-col items-center text-center ${language === 'ar' ? 'md:order-1' : ''}`}>
                  <h3 className="text-xl font-bold text-[#2a2665] mb-4">
                    {language === 'ar' ? "تهيئة بيئة التدريب" : "Preparing Training Environment"}
                  </h3>
                  <div className="mb-4 mt-2">
                    <div className="rounded-full bg-[#f3f4ff] p-4 inline-block">
                      <Presentation className="h-8 w-8 text-[#2a2665]" />
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? "توفير بيئة تدريبية محفزة ومناسبة تساعد على التعلم الفعال وتحقيق أهداف التدريب." 
                      : "Providing a stimulating and appropriate training environment that helps effective learning and achieves training objectives."}
                  </p>
                </div>
                
                <div className={`bg-white rounded-lg p-8 shadow-md flex flex-col items-center text-center ${language === 'ar' ? 'md:order-2' : ''}`}>
                  <h3 className="text-xl font-bold text-[#2a2665] mb-4">
                    {language === 'ar' ? "استخدام أساليب تدريب متنوعة" : "Using Diverse Training Methods"}
                  </h3>
                  <div className="mb-4 mt-2">
                    <div className="rounded-full bg-[#f3f4ff] p-4 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2a2665]">
                        <circle cx="17" cy="4" r="2"/>
                        <path d="M15.59 5.41 5.41 15.59"/>
                        <circle cx="4" cy="17" r="2"/>
                        <path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        <path d="M12 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? "تنويع أساليب التدريب بين المحاضرات وورش العمل والتمارين التطبيقية ودراسات الحالة." 
                      : "Varying training methods between lectures, workshops, practical exercises, and case studies."}
                  </p>
                </div>
                
                <div className={`bg-white rounded-lg p-8 shadow-md flex flex-col items-center text-center ${language === 'ar' ? 'md:order-3' : ''}`}>
                  <h3 className="text-xl font-bold text-[#2a2665] mb-4">
                    {language === 'ar' ? "توفير المواد التدريبية" : "Providing Training Materials"}
                  </h3>
                  <div className="mb-4 mt-2">
                    <div className="rounded-full bg-[#f3f4ff] p-4 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2a2665]">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? "إعداد وتوفير مواد تدريبية عالية الجودة وحديثة تدعم عملية التعلم والتطبيق العملي." 
                      : "Preparing and providing high-quality, up-to-date training materials that support learning and practical application."}
                  </p>
                </div>
              </div>
            </TabsContent>
            
            {/* Evaluation Content */}
            <TabsContent value="evaluation">
              <div className={`grid md:grid-cols-3 gap-12 ${language === 'ar' ? 'md:grid-flow-row-dense' : ''}`}>
                <div className={`bg-white rounded-lg p-8 shadow-md flex flex-col items-center text-center ${language === 'ar' ? 'md:order-1' : ''}`}>
                  <h3 className="text-xl font-bold text-[#2a2665] mb-4">
                    {language === 'ar' ? "تقييم أداء المتدربين" : "Evaluating Trainees' Performance"}
                  </h3>
                  <div className="mb-4 mt-2">
                    <div className="rounded-full bg-[#f3f4ff] p-4 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2a2665]">
                        <polyline points="9 11 12 14 22 4"/>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? "قياس مدى اكتساب المتدربين للمهارات والمعارف المستهدفة من خلال الاختبارات والتطبيقات العملية." 
                      : "Measuring the extent to which trainees acquire targeted skills and knowledge through tests and practical applications."}
                  </p>
                </div>
                
                <div className={`bg-white rounded-lg p-8 shadow-md flex flex-col items-center text-center ${language === 'ar' ? 'md:order-2' : ''}`}>
                  <h3 className="text-xl font-bold text-[#2a2665] mb-4">
                    {language === 'ar' ? "تقييم فعالية البرامج" : "Evaluating Program Effectiveness"}
                  </h3>
                  <div className="mb-4 mt-2">
                    <div className="rounded-full bg-[#f3f4ff] p-4 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2a2665]">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                        <path d="m9 14 2 2 4-4"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? "تقييم جودة ومحتوى البرامج التدريبية وأداء المدربين من خلال استبيانات رضا المتدربين وتقارير الإشراف." 
                      : "Evaluating the quality and content of training programs and trainers' performance through trainee satisfaction surveys and supervision reports."}
                  </p>
                </div>
                
                <div className={`bg-white rounded-lg p-8 shadow-md flex flex-col items-center text-center ${language === 'ar' ? 'md:order-3' : ''}`}>
                  <h3 className="text-xl font-bold text-[#2a2665] mb-4">
                    {language === 'ar' ? "قياس الأثر التدريبي" : "Measuring Training Impact"}
                  </h3>
                  <div className="mb-4 mt-2">
                    <div className="rounded-full bg-[#f3f4ff] p-4 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2a2665]">
                        <line x1="18" y1="20" x2="18" y2="10"/>
                        <line x1="12" y1="20" x2="12" y2="4"/>
                        <line x1="6" y1="20" x2="6" y2="14"/>
                        <line x1="3" y1="20" x2="21" y2="20"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? "متابعة وقياس أثر التدريب على أداء المتدربين في بيئة العمل ومدى تطبيق المهارات المكتسبة." 
                      : "Following up and measuring the impact of training on trainees' performance in the work environment and the extent of applying acquired skills."}
                  </p>
                </div>
              </div>
            </TabsContent>
            
            {/* Improvement Content */}
            <TabsContent value="improvement">
              <div className={`grid md:grid-cols-3 gap-12 ${language === 'ar' ? 'md:grid-flow-row-dense' : ''}`}>
                <div className={`bg-white rounded-lg p-8 shadow-md flex flex-col items-center text-center ${language === 'ar' ? 'md:order-1' : ''}`}>
                  <h3 className="text-xl font-bold text-[#2a2665] mb-4">
                    {language === 'ar' ? "تحليل نتائج التقييم" : "Analyzing Evaluation Results"}
                  </h3>
                  <div className="mb-4 mt-2">
                    <div className="rounded-full bg-[#f3f4ff] p-4 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2a2665]">
                        <path d="M2 20h20"/>
                        <path d="M5 20a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2"/>
                        <path d="M12 2v8"/>
                        <path d="m9 7 3-3 3 3"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? "دراسة وتحليل نتائج التقييم وملاحظات المتدربين لتحديد نقاط القوة والضعف في البرامج التدريبية." 
                      : "Studying and analyzing evaluation results and trainees' notes to identify strengths and weaknesses in training programs."}
                  </p>
                </div>
                
                <div className={`bg-white rounded-lg p-8 shadow-md flex flex-col items-center text-center ${language === 'ar' ? 'md:order-2' : ''}`}>
                  <h3 className="text-xl font-bold text-[#2a2665] mb-4">
                    {language === 'ar' ? "تطوير المحتوى التدريبي" : "Developing Training Content"}
                  </h3>
                  <div className="mb-4 mt-2">
                    <div className="rounded-full bg-[#f3f4ff] p-4 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2a2665]">
                        <path d="M12 22a9.5 9.5 0 0 0 7.5-4 9.5 9.5 0 0 0-7.5-4 9.5 9.5 0 0 0-7.5 4 9.5 9.5 0 0 0 7.5 4z"/>
                        <path d="M12 15a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"/>
                        <path d="M2 10s2.5-4 10-4 10 4 10 4"/> 
                        <path d="M12 6a3 3 0 1 0 0-6 3 3 0 1 0 0 6z"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? "تحديث وتطوير المحتوى التدريبي بناءً على التغذية الراجعة والمستجدات في المجال." 
                      : "Updating and developing training content based on feedback and developments in the field."}
                  </p>
                </div>
                
                <div className={`bg-white rounded-lg p-8 shadow-md flex flex-col items-center text-center ${language === 'ar' ? 'md:order-3' : ''}`}>
                  <h3 className="text-xl font-bold text-[#2a2665] mb-4">
                    {language === 'ar' ? "تطوير منهجيات التدريب" : "Developing Training Methodologies"}
                  </h3>
                  <div className="mb-4 mt-2">
                    <div className="rounded-full bg-[#f3f4ff] p-4 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2a2665]">
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <path d="M3 3v5h5"/>
                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                        <path d="M16 16h5v5"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? "تحسين وتطوير أساليب التدريب والوسائل المستخدمة بما يتواكب مع أحدث التوجهات في مجال التدريب." 
                      : "Improving and developing training methods and tools in line with the latest trends in the training field."}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}