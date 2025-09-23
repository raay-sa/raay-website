import { FaCheck, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Track } from "@/data/tracks";
import { useI18nStore } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TrackCardProps {
  track: Track;
}

export default function TrackCard({ track }: TrackCardProps) {
  const { language } = useI18nStore();
  
  // تحديد لون الخلفية المناسب بناءً على نوع المسار
  const getTrackColor = () => {
    switch (track.trackType) {
      case 'cyber-security':
        return '#2a2665'; // الأمن السيبراني - اللون الأزرق الداكن
      case 'digital-transformation':
        return '#2a2665'; // التحول الرقمي - اللون الأزرق الداكن
      case 'artificial-intelligence':
        return '#2a2665'; // الذكاء الاصطناعي - اللون الأزرق الداكن
      case 'data-science':
        return '#2a2665'; // علم البيانات - اللون الأزرق الداكن
      case 'institutional-transformation':
        return '#2a2665'; // التحول المؤسسي - اللون الأزرق الداكن
      case 'risk-avoidance':
        return '#2a2665'; // تجنب المخاطر - اللون الأزرق الداكن
      default:
        return '#2a2665';
    }
  };
  
  const textDir = language === 'ar' ? 'text-right' : 'text-left';
  const flexDir = language === 'ar' ? 'flex-row-reverse' : 'flex-row';
  const arrowIcon = language === 'ar' ? <FaArrowLeft className="mr-1 h-4 w-4" /> : <FaArrowRight className="ml-1 h-4 w-4" />;
  
  return (
    <div className="group transition-all duration-300 h-full flex flex-col overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl border border-gray-200">
      {/* صورة المسار (في هذه الحالة نستخدم خلفية ملونة مع أيقونة) */}
      <div 
        className="relative h-40 flex items-center justify-center p-6 overflow-hidden transition-colors"
        style={{ backgroundColor: getTrackColor() }}
      >
        {/* خلفية مزخرفة - أنماط متحركة */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/src/assets/images/pattern-bg.svg')] bg-repeat"></div>
        </div>
        
        {/* أيقونة المسار بحجم كبير */}
        <div className="relative z-10 flex justify-center">
          <track.icon className="text-5xl text-white" />
        </div>
        
        {/* شريط شعاعي للتلميع عند تحويم المؤشر */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-r from-white via-white to-transparent -rotate-45 transform scale-150"></div>
      </div>
      
      {/* محتوى البطاقة */}
      <div className="flex-grow flex flex-col p-5">
        {/* شارة التصنيف */}
        <div className="mb-3">
          <Badge className="bg-[#f7f9fd] text-[#2a2665] hover:bg-[#b29567]/10 border border-[#b29567]/20 hover:text-[#b29567]">
            {language === 'ar' ? 
              track.trackType === 'cyber-security' ? 'الأمن السيبراني' :
              track.trackType === 'digital-transformation' ? 'التحول الرقمي' :
              track.trackType === 'artificial-intelligence' ? 'الذكاء الاصطناعي' :
              track.trackType === 'data-science' ? 'علم البيانات' :
              track.trackType === 'institutional-transformation' ? 'التحول المؤسسي' :
              'تجنب المخاطر'
            : 
              track.trackType === 'cyber-security' ? 'Cyber Security' :
              track.trackType === 'digital-transformation' ? 'Digital Transformation' :
              track.trackType === 'artificial-intelligence' ? 'Artificial Intelligence' :
              track.trackType === 'data-science' ? 'Data Science' :
              track.trackType === 'institutional-transformation' ? 'Institutional Transformation' :
              'Risk Avoidance'
            }
          </Badge>
        </div>
        
        {/* عنوان المسار */}
        <h3 className={`text-xl font-bold mb-3 text-[#2a2665] ${textDir}`}>{track.title}</h3>
        
        {/* وصف المسار */}
        <p className={`text-gray-600 mb-4 text-sm ${textDir}`}>{track.description}</p>
        
        {/* مميزات المسار */}
        <div className="space-y-2 mb-5">
          {track.features.slice(0, 3).map((feature, index) => (
            <div key={index} className={`flex items-start ${flexDir} text-sm`}>
              <FaCheck className={`text-[#b29567] flex-shrink-0 mt-1 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              <span className="text-[#2a2665]/80">{feature}</span>
            </div>
          ))}
          
          {/* عرض "المزيد" إذا كان هناك ميزات أكثر من 3 */}
          {track.features.length > 3 && (
            <p className={`text-sm text-[#b29567] italic ${textDir}`}>
              {language === 'ar' ? `+${track.features.length - 3} ميزات أخرى` : `+${track.features.length - 3} more features`}
            </p>
          )}
        </div>
        
        {/* زر عرض البرامج */}
        <div className="mt-auto">
          <Button
            variant="outline"
            className="w-full border border-[#b29567] text-[#b29567] hover:bg-[#b29567] hover:text-white transition-colors group"
          >
            <span className="flex items-center justify-center">
              {language === 'ar' ? 'عرض البرامج' : 'View Programs'}
              {arrowIcon}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}