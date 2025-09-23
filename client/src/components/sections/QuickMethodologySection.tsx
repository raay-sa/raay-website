import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useI18nStore } from "@/lib/i18n";
import { TranslatedText } from "@/components/ui/translated-text";
import { useEffect, useState } from "react";
import { 
  Target, 
  Users, 
  BookOpen, 
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
  descKey 
}: { 
  icon: any, 
  titleKey: string, 
  descKey: string 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Title first */}
      <h3 className="text-xl font-bold text-gray-800 mb-3 text-alignment-dynamic">
        <TranslatedText textKey={titleKey} />
      </h3>
      
      {/* Icon */}
      <div className="bg-[#2a2665]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-[#2a2665]" />
      </div>
      
      {/* Description */}
      <p className="text-gray-600 text-alignment-dynamic">
        <TranslatedText textKey={descKey} />
      </p>
    </div>
  );
}

export default function QuickMethodologySection() {
  const { language } = useI18nStore();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Force component to re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language change event detected in QuickMethodologySection");
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
    <section id="methodology" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#2a2665] mb-4">
            <TranslatedText textKey="methodology.title" />
          </h2>
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
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 methodology-grid"
            >
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={Target} 
                  titleKey="methodology.planning.needs"
                  descKey="methodology.planning.needs.desc"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={BookOpen} 
                  titleKey="methodology.planning.design"
                  descKey="methodology.planning.design.desc"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={Users} 
                  titleKey="methodology.planning.trainers"
                  descKey="methodology.planning.trainers.desc"
                />
              </motion.div>
            </motion.div>
          </TabsContent>
          
          {/* Execution Tab */}
          <TabsContent value="execution">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 methodology-grid"
            >
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={Presentation} 
                  titleKey="methodology.execution.environment"
                  descKey="methodology.execution.environment.desc"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={PenTool} 
                  titleKey="methodology.execution.methods"
                  descKey="methodology.execution.methods.desc"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={Settings} 
                  titleKey="methodology.execution.materials"
                  descKey="methodology.execution.materials.desc"
                />
              </motion.div>
            </motion.div>
          </TabsContent>
          
          {/* Evaluation Tab */}
          <TabsContent value="evaluation">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 methodology-grid"
            >
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={CheckSquare} 
                  titleKey="methodology.evaluation.performance"
                  descKey="methodology.evaluation.performance.desc"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={ClipboardList} 
                  titleKey="methodology.evaluation.programs"
                  descKey="methodology.evaluation.programs.desc"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={BarChart2} 
                  titleKey="methodology.evaluation.impact"
                  descKey="methodology.evaluation.impact.desc"
                />
              </motion.div>
            </motion.div>
          </TabsContent>
          
          {/* Improvement Tab */}
          <TabsContent value="improvement">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 methodology-grid"
            >
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={Sliders} 
                  titleKey="methodology.improvement.analysis"
                  descKey="methodology.improvement.analysis.desc"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={Repeat} 
                  titleKey="methodology.improvement.content"
                  descKey="methodology.improvement.content.desc"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MethodologyCard 
                  icon={RefreshCw} 
                  titleKey="methodology.improvement.methods"
                  descKey="methodology.improvement.methods.desc"
                />
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}