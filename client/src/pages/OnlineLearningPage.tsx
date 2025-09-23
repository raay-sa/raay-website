import { Helmet } from "react-helmet";
import { useI18nStore } from "@/lib/i18n";
import { FaLaptop, FaVideo, FaUsersCog, FaUserCheck, FaCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function OnlineLearningPage() {
  const { language } = useI18nStore();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Force component to re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language change event detected in OnlineLearningPage");
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'التدريب الأونلاين | مركز راي للتدريب والاستشارات' : 'Online Training | Ray Training & Consulting Center'}</title>
      </Helmet>
      
      <div className="bg-gradient-to-b from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'ar' ? 'التدريب الأونلاين' : 'Online Training'}
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'استكشف برامجنا التدريبية الأونلاين المصممة لتناسب جدولك الزمني وتمكنك من التعلم بمرونة من أي مكان'
              : 'Explore our online training programs designed to fit your schedule and enable you to learn flexibly from anywhere'
            }
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#2a2665] mb-4">
              {language === 'ar' 
                ? 'مميزات التدريب الأونلاين في مركز راي'
                : 'Online Training Features at Raay Center'
              }
            </h2>
            <div className="w-20 h-1 bg-[#b29567] mx-auto mb-6"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="bg-[#2a2665]/10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaLaptop className="text-[#2a2665] text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {language === 'ar' ? 'مرونة في التعلم' : 'Learning Flexibility'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'تعلم في أي وقت ومن أي مكان يناسبك من خلال منصتنا الإلكترونية المتطورة'
                  : 'Learn anytime and from anywhere that suits you through our advanced e-learning platform'
                }
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="bg-[#2a2665]/10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaVideo className="text-[#2a2665] text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {language === 'ar' ? 'محتوى تفاعلي' : 'Interactive Content'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'محاضرات فيديو عالية الجودة مع تمارين تفاعلية واختبارات لتعزيز فهمك'
                  : 'High-quality video lectures with interactive exercises and quizzes to enhance your understanding'
                }
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="bg-[#2a2665]/10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaUsersCog className="text-[#2a2665] text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {language === 'ar' ? 'دعم مستمر' : 'Continuous Support'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'تواصل مباشر مع المدربين والخبراء للإجابة على استفساراتك خلال فترة التدريب'
                  : 'Direct communication with trainers and experts to answer your inquiries during the training period'
                }
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-[#2a2665] mb-6 text-center">
              {language === 'ar' ? 'التدريبات المتاحة أونلاين' : 'Available Online Training Programs'}
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">
                      {language === 'ar' ? 'الذكاء الاصطناعي وتطبيقاته' : 'Artificial Intelligence and Its Applications'}
                    </h4>
                    <div className={`flex items-center text-gray-500 text-sm ${language === 'ar' ? 'space-x-4 space-x-reverse' : 'space-x-4'} mb-4`}>
                      <span className="flex items-center">
                        <FaCalendarAlt className={language === 'ar' ? 'ml-1' : 'mr-1'} /> 
                        {language === 'ar' ? '8 أسابيع' : '8 Weeks'}
                      </span>
                      <span className="flex items-center">
                        <FaUserCheck className={language === 'ar' ? 'ml-1' : 'mr-1'} /> 
                        {language === 'ar' ? '120+ متدرب' : '120+ Trainees'}
                      </span>
                    </div>
                  </div>
                  <Button className="bg-[#2a2665] hover:bg-[#2a2665]/90">
                    {language === 'ar' ? 'سجل الآن' : 'Register Now'}
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">
                      {language === 'ar' ? 'الأمن السيبراني المتقدم' : 'Advanced Cyber Security'}
                    </h4>
                    <div className={`flex items-center text-gray-500 text-sm ${language === 'ar' ? 'space-x-4 space-x-reverse' : 'space-x-4'} mb-4`}>
                      <span className="flex items-center">
                        <FaCalendarAlt className={language === 'ar' ? 'ml-1' : 'mr-1'} /> 
                        {language === 'ar' ? '12 أسبوع' : '12 Weeks'}
                      </span>
                      <span className="flex items-center">
                        <FaUserCheck className={language === 'ar' ? 'ml-1' : 'mr-1'} /> 
                        {language === 'ar' ? '85+ متدرب' : '85+ Trainees'}
                      </span>
                    </div>
                  </div>
                  <Button className="bg-[#2a2665] hover:bg-[#2a2665]/90">
                    {language === 'ar' ? 'سجل الآن' : 'Register Now'}
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">
                      {language === 'ar' 
                        ? 'القيادة الإدارية في عصر التحول الرقمي' 
                        : 'Management Leadership in the Digital Transformation Era'
                      }
                    </h4>
                    <div className={`flex items-center text-gray-500 text-sm ${language === 'ar' ? 'space-x-4 space-x-reverse' : 'space-x-4'} mb-4`}>
                      <span className="flex items-center">
                        <FaCalendarAlt className={language === 'ar' ? 'ml-1' : 'mr-1'} /> 
                        {language === 'ar' ? '6 أسابيع' : '6 Weeks'}
                      </span>
                      <span className="flex items-center">
                        <FaUserCheck className={language === 'ar' ? 'ml-1' : 'mr-1'} /> 
                        {language === 'ar' ? '150+ متدرب' : '150+ Trainees'}
                      </span>
                    </div>
                  </div>
                  <Button className="bg-[#2a2665] hover:bg-[#2a2665]/90">
                    {language === 'ar' ? 'سجل الآن' : 'Register Now'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'ar' 
                ? 'جاهز للبدء في رحلة التعلم معنا؟'
                : 'Ready to start your learning journey with us?'
              }
            </h3>
            <Button className="bg-[#b29567] hover:bg-[#b29567]/90 text-white font-bold text-lg px-8 py-6">
              {language === 'ar' 
                ? 'استكشف جميع البرامج الأونلاين'
                : 'Explore All Online Programs'
              }
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}