import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useI18nStore } from "@/lib/i18n";
import { TranslatedText } from "@/components/ui/translated-text";
import { useEffect, useState } from "react";
import { 
  Target, 
  Users, 
  BookOpen, 
  CheckCircle, 
  Presentation,
  Settings,
  PenTool,
  CheckSquare,
  ClipboardList,
  BarChart2,
  Sliders,
  Repeat,
  RefreshCw
} from "lucide-react";

// Component for consistent methodology card display
function MethodologyCard({ 
  icon: Icon, 
  titleKey, 
  descKey, 
  points = [] 
}: { 
  icon: any, 
  titleKey: string, 
  descKey: string, 
  points?: string[] 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Title area */}
      <div className="flex flex-col mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 text-alignment-dynamic">
          <TranslatedText textKey={titleKey} />
        </h3>
        
        {/* Icon */}
        <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
          <Icon className="h-7 w-7 text-[#2a2665]" />
        </div>
      </div>
      
      {/* Description */}
      <p className="text-gray-600 text-alignment-dynamic">
        <TranslatedText textKey={descKey} />
      </p>
      
      {/* Optional bullet points */}
      {points.length > 0 && (
        <ul className="mt-4 space-y-2 text-alignment-dynamic list-disc">
          {points.map((point, index) => (
            <li key={index} className="text-gray-600 methodology-list-item">
              <TranslatedText textKey={point} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function MethodologyPage() {
  const { language } = useI18nStore();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Force component to re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language change event detected in MethodologyPage");
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2a2665] mb-4">
            <TranslatedText textKey="methodology.title" />
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            <TranslatedText textKey="methodology.description" />
          </p>
        </div>

        <Tabs defaultValue="planning" className="w-full">
          <TabsList className="flex mb-8 w-full justify-center gap-2 methodology-tabs-list">
            <TabsTrigger value="planning" className="data-[state=active]:bg-[#2a2665] data-[state=active]:text-white">
              <TranslatedText textKey="methodology.planning" />
            </TabsTrigger>
            <TabsTrigger value="execution" className="data-[state=active]:bg-[#2a2665] data-[state=active]:text-white">
              <TranslatedText textKey="methodology.execution" />
            </TabsTrigger>
            <TabsTrigger value="evaluation" className="data-[state=active]:bg-[#2a2665] data-[state=active]:text-white">
              <TranslatedText textKey="methodology.evaluation" />
            </TabsTrigger>
            <TabsTrigger value="improvement" className="data-[state=active]:bg-[#2a2665] data-[state=active]:text-white">
              <TranslatedText textKey="methodology.improvement" />
            </TabsTrigger>
          </TabsList>
          
          {/* Planning Tab */}
          <TabsContent value="planning">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#2a2665] mb-2 text-alignment-dynamic">
                <TranslatedText textKey="methodology.planning.subtitle" />
              </h2>
              <p className="text-gray-600 mb-6 text-alignment-dynamic">
                <TranslatedText textKey="methodology.planning.subdesc" />
              </p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 methodology-grid"
            >
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={Target} 
                  titleKey="methodology.planning.needs"
                  descKey="methodology.planning.needs.desc"
                  points={[
                    "methodology.planning.needs.point1",
                    "methodology.planning.needs.point2",
                    "methodology.planning.needs.point3"
                  ]}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={BookOpen} 
                  titleKey="methodology.planning.design"
                  descKey="methodology.planning.design.desc"
                  points={[
                    "methodology.planning.design.point1",
                    "methodology.planning.design.point2",
                    "methodology.planning.design.point3"
                  ]}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={Users} 
                  titleKey="methodology.planning.trainers"
                  descKey="methodology.planning.trainers.desc"
                  points={[
                    "methodology.planning.trainers.point1",
                    "methodology.planning.trainers.point2",
                    "methodology.planning.trainers.point3"
                  ]}
                />
              </motion.div>
            </motion.div>
          </TabsContent>
          
          {/* Execution Tab */}
          <TabsContent value="execution">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#2a2665] mb-2 text-alignment-dynamic">
                <TranslatedText textKey="methodology.execution.subtitle" />
              </h2>
              <p className="text-gray-600 mb-6 text-alignment-dynamic">
                <TranslatedText textKey="methodology.execution.subdesc" />
              </p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 methodology-grid"
            >
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={Presentation} 
                  titleKey="methodology.execution.environment"
                  descKey="methodology.execution.environment.desc"
                  points={[
                    "methodology.execution.environment.point1",
                    "methodology.execution.environment.point2",
                    "methodology.execution.environment.point3"
                  ]}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={PenTool} 
                  titleKey="methodology.execution.methods"
                  descKey="methodology.execution.methods.desc"
                  points={[
                    "methodology.execution.methods.point1",
                    "methodology.execution.methods.point2",
                    "methodology.execution.methods.point3"
                  ]}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={Settings} 
                  titleKey="methodology.execution.materials"
                  descKey="methodology.execution.materials.desc"
                  points={[
                    "methodology.execution.materials.point1",
                    "methodology.execution.materials.point2",
                    "methodology.execution.materials.point3"
                  ]}
                />
              </motion.div>
            </motion.div>
          </TabsContent>
          
          {/* Evaluation Tab */}
          <TabsContent value="evaluation">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#2a2665] mb-2 text-alignment-dynamic">
                <TranslatedText textKey="methodology.evaluation.subtitle" />
              </h2>
              <p className="text-gray-600 mb-6 text-alignment-dynamic">
                <TranslatedText textKey="methodology.evaluation.subdesc" />
              </p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 methodology-grid"
            >
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={CheckSquare} 
                  titleKey="methodology.evaluation.performance"
                  descKey="methodology.evaluation.performance.desc"
                  points={[
                    "methodology.evaluation.performance.point1",
                    "methodology.evaluation.performance.point2",
                    "methodology.evaluation.performance.point3"
                  ]}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={ClipboardList} 
                  titleKey="methodology.evaluation.programs"
                  descKey="methodology.evaluation.programs.desc"
                  points={[
                    "methodology.evaluation.programs.point1",
                    "methodology.evaluation.programs.point2",
                    "methodology.evaluation.programs.point3"
                  ]}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={BarChart2} 
                  titleKey="methodology.evaluation.impact"
                  descKey="methodology.evaluation.impact.desc"
                  points={[
                    "methodology.evaluation.impact.point1",
                    "methodology.evaluation.impact.point2",
                    "methodology.evaluation.impact.point3"
                  ]}
                />
              </motion.div>
            </motion.div>
          </TabsContent>
          
          {/* Improvement Tab */}
          <TabsContent value="improvement">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#2a2665] mb-2 text-alignment-dynamic">
                <TranslatedText textKey="methodology.improvement.subtitle" />
              </h2>
              <p className="text-gray-600 mb-6 text-alignment-dynamic">
                <TranslatedText textKey="methodology.improvement.subdesc" />
              </p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 methodology-grid"
            >
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={Sliders} 
                  titleKey="methodology.improvement.analysis"
                  descKey="methodology.improvement.analysis.desc"
                  points={[
                    "methodology.improvement.analysis.point1",
                    "methodology.improvement.analysis.point2",
                    "methodology.improvement.analysis.point3"
                  ]}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={Repeat} 
                  titleKey="methodology.improvement.content"
                  descKey="methodology.improvement.content.desc"
                  points={[
                    "methodology.improvement.content.point1",
                    "methodology.improvement.content.point2",
                    "methodology.improvement.content.point3"
                  ]}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={RefreshCw} 
                  titleKey="methodology.improvement.methods"
                  descKey="methodology.improvement.methods.desc"
                  points={[
                    "methodology.improvement.methods.point1",
                    "methodology.improvement.methods.point2",
                    "methodology.improvement.methods.point3"
                  ]}
                />
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}