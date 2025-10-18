import { FaEye, FaBullseye, FaHandshake, FaStar, FaChartLine, FaUsers, FaUserGraduate, FaCheckCircle } from "react-icons/fa";
import { TranslatedText } from "@/components/ui/translated-text";
import { useI18nStore } from "@/lib/i18n";
import { motion } from "framer-motion";
import workValuesImg from "../../assets/image_1747131919824.png";
import raayVideo from "../../assets/videos/raay-center-video.mp4";
import raayIntroVideo from "../../assets/videos/raay-intro-video.mp4";

export default function AboutSection() {
  const { language } = useI18nStore();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative py-24 text-white">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-[#2a2665] opacity-80 z-10"></div>
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            muted 
            loop
            src={raayVideo}
          ></video>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              {language === 'ar' ? 'مركز راي للتدريب والاستشارات' : 'Ray Training & Consulting Center'}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8 leading-relaxed"
            >
              {language === 'ar' 
                ? 'نسعى لتقديم خدمات تدريبية واستشارية متميزة تسهم في بناء الكفاءات وتطوير المهارات وتحقيق التميز المؤسسي'
                : 'We strive to provide distinguished training and consulting services that contribute to building competencies, developing skills, and achieving institutional excellence'}
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* About Center Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* <div className=" gap-12 items-center"> */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              // className="lg:w-1/2"
            >
              <h2 className="text-3xl font-bold text-[#2a2665] mb-6">
                {language === 'ar' ? 'نبذة عن المركز' : 'About The Center'}
              </h2>
              <div className="h-1 w-20 bg-[#b29567] mb-6"></div>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                {language === 'ar' 
                  ? 'مركز راي للتدريب والاستشارات هو مؤسسة وطنية متخصصة في تقديم خدمات التدريب والاستشارات بمعايير عالمية. نهدف إلى المساهمة الفعالة في تنمية الموارد البشرية وتطوير الأداء المؤسسي بما ينسجم مع رؤية المملكة 2030.'
                  : 'Raay Training and Consulting Center is a specialized national institution providing training and consulting services with global standards. We aim to contribute effectively to human resource development and institutional performance improvement in line with Saudi Vision 2030.'}
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                {language === 'ar' 
                  ? 'يقدم المركز باقة متنوعة من البرامج التدريبية والخدمات الاستشارية في مجالات متعددة منها القيادة، الإدارة، التحول الرقمي، الذكاء الاصطناعي، الأمن السيبراني وغيرها من المجالات المتخصصة التي تلبي احتياجات سوق العمل.'
                  : 'The center offers a diverse range of training programs and consulting services in multiple fields including leadership, management, digital transformation, artificial intelligence, cybersecurity, and other specialized fields that meet the needs of the labor market.'}
              </p>
            </motion.div>
            
            {/* <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="rounded-lg overflow-hidden shadow-lg">
                <video 
                  src={raayIntroVideo}
                  controls
                  autoPlay={false}
                  preload="auto"
                  className="w-full h-auto"
                />
              </div>
            </motion.div> */}
          </div>
        </div>
      </section>
      
      {/* Vision Mission Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {language === 'ar' ? 'رؤيتنا ورسالتنا وقيمنا' : 'Our Vision, Mission & Values'}
            </h2>
            <div className="h-1 w-20 bg-[#b29567] mx-auto mb-6"></div>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mt-12"
          >
            <motion.div 
              variants={itemVariants}
              id="vision" 
              className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-all border-t-4 border-[#2a2665]"
            >
              <div className="bg-[#2a2665]/10 inline-flex items-center justify-center w-20 h-20 rounded-full mb-6">
                <FaEye className="text-[#2a2665] text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#2a2665]">
                <TranslatedText textKey="about.vision" />
              </h3>
              <p className="text-gray-700 leading-relaxed">
                <TranslatedText textKey="about.vision.text" />
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              id="mission" 
              className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-all border-t-4 border-[#b29567]"
            >
              <div className="bg-[#b29567]/10 inline-flex items-center justify-center w-20 h-20 rounded-full mb-6">
                <FaBullseye className="text-[#b29567] text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#2a2665]">
                <TranslatedText textKey="about.mission" />
              </h3>
              <p className="text-gray-700 leading-relaxed">
                <TranslatedText textKey="about.mission.text" />
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-all border-t-4 border-[#2a2665]"
            >
              <div className="bg-[#2a2665]/10 inline-flex items-center justify-center w-20 h-20 rounded-full mb-6">
                <FaHandshake className="text-[#2a2665] text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#2a2665]">
                <TranslatedText textKey="about.values" />
              </h3>
              <p className="text-gray-700 leading-relaxed">
                <TranslatedText textKey="about.values.text" />
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Knowledge Building Activities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {language === 'ar' ? 'أنشطة بناء المعرفة' : 'Knowledge Building Activities'}
            </h2>
            <div className="h-1 w-20 bg-[#b29567] mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-3xl mx-auto">
              {language === 'ar'
                ? 'نقدم مجموعة من الأنشطة المعرفية المتنوعة التي تسهم في بناء وتطوير المهارات'
                : 'We provide a variety of knowledge activities that contribute to building and developing skills'}
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow text-center hover:shadow-md transition-all">
              <div className="bg-[#2a2665]/10 inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                <FaUserGraduate className="text-[#2a2665] text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-[#2a2665] mb-3">
                {language === 'ar' ? 'برامج تدريبية' : 'Training Programs'}
              </h4>
              <p className="text-gray-700">
                {language === 'ar'
                  ? 'برامج تدريبية متخصصة في مجالات متعددة وفق أفضل الممارسات'
                  : 'Specialized training programs in multiple fields according to best practices'}
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow text-center hover:shadow-md transition-all">
              <div className="bg-[#b29567]/10 inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                <FaUsers className="text-[#b29567] text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-[#2a2665] mb-3">
                {language === 'ar' ? 'ورش عمل' : 'Workshops'}
              </h4>
              <p className="text-gray-700">
                {language === 'ar'
                  ? 'ورش عمل تفاعلية تركز على حل المشكلات وتطبيق المهارات'
                  : 'Interactive workshops focusing on problem-solving and skill application'}
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow text-center hover:shadow-md transition-all">
              <div className="bg-[#2a2665]/10 inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                <FaChartLine className="text-[#2a2665] text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-[#2a2665] mb-3">
                {language === 'ar' ? 'خدمات استشارية' : 'Consulting Services'}
              </h4>
              <p className="text-gray-700">
                {language === 'ar'
                  ? 'استشارات متخصصة لمساعدة المؤسسات على تحقيق أهدافها'
                  : 'Specialized consultations to help organizations achieve their goals'}
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow text-center hover:shadow-md transition-all">
              <div className="bg-[#b29567]/10 inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                <FaStar className="text-[#b29567] text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-[#2a2665] mb-3">
                {language === 'ar' ? 'تقييم مهارات' : 'Skills Assessment'}
              </h4>
              <p className="text-gray-700">
                {language === 'ar'
                  ? 'تقييم المهارات وتحديد الاحتياجات التدريبية بدقة'
                  : 'Skills assessment and accurate identification of training needs'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* قيم العمل - صورة بحجم كامل */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {language === 'ar' ? 'قيم العمل' : 'Work Values'}
            </h2>
            <div className="h-1 w-20 bg-[#b29567] mx-auto mb-6"></div>
          </div>
          <div className="max-w-full overflow-visible">
            <img 
              src={workValuesImg} 
              alt={language === 'ar' ? 'قيم العمل' : 'Work Values'} 
              style={{ 
                width: "100%", 
                maxWidth: "1500px", 
                height: "auto", 
                display: "block", 
                margin: "0 auto",
                objectFit: "contain"
              }}
            />
          </div>
        </div>
      </section>
      
      {/* لماذا تختار مركز راي */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
              {language === 'ar' ? 'لماذا تختار مركز راي؟' : 'Why Choose Raay Center?'}
            </h2>
            <div className="h-1 w-20 bg-[#b29567] mx-auto mb-6"></div>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all h-full">
              <div className="flex items-center gap-3  mb-4">
                <div className="bg-[#2a2665] rounded-full p-3 mr-4">
                  <FaCheckCircle className="text-white text-xl" />
                </div>
                <h4 className="text-xl font-bold text-[#2a2665]">
                  {language === 'ar' ? 'خبرات وطنية ودولية' : 'National & International Expertise'}
                </h4>
              </div>
              <p className="text-gray-700 mt-4 pl-16">
                {language === 'ar' 
                  ? 'نضم نخبة من الخبراء والمدربين ذوي الكفاءات العالية والخبرات المتميزة محلياً ودولياً'
                  : 'We bring together elite experts and trainers with high competencies and distinguished experiences locally and internationally'}
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all h-full">
              <div className="flex items-center gap-3  mb-4">
                <div className="bg-[#b29567] rounded-full p-3 mr-4">
                  <FaCheckCircle className="text-white text-xl" />
                </div>
                <h4 className="text-xl font-bold text-[#2a2665]">
                  {language === 'ar' ? 'منهجية متكاملة' : 'Integrated Methodology'}
                </h4>
              </div>
              <p className="text-gray-700 mt-4 pl-16">
                {language === 'ar'
                  ? 'نعتمد على منهجية متكاملة في التدريب والاستشارات تشمل التخطيط والتنفيذ والتقييم والتحسين'
                  : 'We rely on an integrated methodology in training and consulting that includes planning, implementation, evaluation, and improvement'}
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all h-full">
              <div className="flex items-center gap-3  mb-4">
                <div className="bg-[#2a2665] rounded-full p-3 mr-4">
                  <FaCheckCircle className="text-white text-xl" />
                </div>
                <h4 className="text-xl font-bold text-[#2a2665]">
                  {language === 'ar' ? 'برامج متخصصة' : 'Specialized Programs'}
                </h4>
              </div>
              <p className="text-gray-700 mt-4 pl-16">
                {language === 'ar'
                  ? 'برامجنا مصممة بعناية لتلبية احتياجات المتدربين وتحقيق أهداف المؤسسات بشكل فعال'
                  : 'Our programs are carefully designed to meet the needs of trainees and effectively achieve organizational objectives'}
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all h-full">
              <div className="flex items-center gap-3  mb-4">
                <div className="bg-[#b29567] rounded-full p-3 mr-4">
                  <FaCheckCircle className="text-white text-xl" />
                </div>
                <h4 className="text-xl font-bold text-[#2a2665]">
                  {language === 'ar' ? 'أساليب تدريب متنوعة' : 'Diverse Training Methods'}
                </h4>
              </div>
              <p className="text-gray-700 mt-4 pl-16">
                {language === 'ar'
                  ? 'نستخدم أساليب تدريب متنوعة تناسب جميع أنماط التعلم وتضمن تحقيق أقصى استفادة للمتدربين'
                  : 'We use diverse training methods that suit all learning styles and ensure maximum benefit for trainees'}
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all h-full">
              <div className="flex items-center gap-3  mb-4">
                <div className="bg-[#2a2665] rounded-full p-3 mr-4">
                  <FaCheckCircle className="text-white text-xl" />
                </div>
                <h4 className="text-xl font-bold text-[#2a2665]">
                  {language === 'ar' ? 'حقائب تدريبية احترافية' : 'Professional Training Packages'}
                </h4>
              </div>
              <p className="text-gray-700 mt-4 pl-16">
                {language === 'ar'
                  ? 'حقائبنا التدريبية مصممة وفق أحدث المعايير العالمية وتتضمن محتوى تفاعلي وتطبيقي'
                  : 'Our training packages are designed according to the latest global standards and include interactive and applied content'}
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all h-full">
                <div className="flex items-center gap-3  mb-4">
                <div className="bg-[#b29567] rounded-full p-3 mr-4">
                  <FaCheckCircle className="text-white text-xl" />
                </div>
                <h4 className="text-xl font-bold text-[#2a2665]">
                  {language === 'ar' ? 'تقييم دقيق للمخرجات' : 'Accurate Output Evaluation'}
                </h4>
              </div>
              <p className="text-gray-700 mt-4 pl-16">
                {language === 'ar'
                  ? 'نولي اهتماماً كبيراً لتقييم مخرجات التدريب وقياس الأثر على أداء المتدربين والمؤسسات'
                  : 'We pay great attention to evaluating training outputs and measuring the impact on the performance of trainees and organizations'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
