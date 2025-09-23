import { VideoPlayer } from "@/components/ui/video-player";
import { useI18nStore } from "@/lib/i18n";

export default function TrainingVideoSection() {
  const { language } = useI18nStore();
  
  return (
    <section id="training-video" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
            {language === 'ar' ? 'فيديو تعريفي بمنصة التدريب' : 'Training Platform Introduction Video'}
          </h2>
          <p className="text-gray-600 mb-8">
            {language === 'ar' 
              ? 'شاهد هذا الفيديو التعريفي للتعرف على إمكانيات منصة التدريب الإلكتروني من مركز راي وكيفية الاستفادة منها في تطوير مهاراتك'
              : "Watch this introductory video to learn about Ray Training Center e-learning platform capabilities"
            }
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-8 border-white shadow-xl rounded-lg overflow-hidden">
            <video 
              controls
              className="w-full h-auto"
              poster=""
            >
              <source src="/videos/training-intro.mp4" type="video/mp4" />
              {language === 'ar' 
                ? 'متصفحك لا يدعم تشغيل الفيديو.'
                : 'Your browser does not support video playback.'
              }
            </video>
            <div className="absolute top-0 right-0 bg-[#2a2665] text-white py-2 px-4 z-10 rounded-bl-lg">
              {language === 'ar' ? 'مقدمة عن منصة التدريب' : 'Training Platform Introduction'}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-[#2a2665] mb-4">
            {language === 'ar' ? 'مميزات المنصة' : 'Platform Features'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="font-bold text-lg mb-2 text-secondary">
                {language === 'ar' ? 'دورات تدريبية متنوعة' : 'Diverse Training Courses'}
              </h4>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'تقدم المنصة مجموعة متنوعة من الدورات التدريبية في مختلف المجالات التي تلبي احتياجات سوق العمل'
                  : 'The platform offers a variety of training courses in various fields that meet the needs of the labor market'
                }
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="font-bold text-lg mb-2 text-secondary">
                {language === 'ar' ? 'محتوى تفاعلي' : 'Interactive Content'}
              </h4>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'محتوى تعليمي تفاعلي يشمل فيديوهات شرح واختبارات ومشاريع عملية لضمان أقصى استفادة'
                  : 'Interactive educational content that includes explanation videos, tests, and practical projects to ensure maximum benefit'
                }
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="font-bold text-lg mb-2 text-secondary">
                {language === 'ar' ? 'شهادات معتمدة' : 'Accredited Certificates'}
              </h4>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'الحصول على شهادات معتمدة بعد إتمام البرامج التدريبية تعزز من فرصك المهنية'
                  : 'Obtain accredited certificates after completing training programs that enhance your professional opportunities'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}