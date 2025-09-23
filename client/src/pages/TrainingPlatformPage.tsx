import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTracks } from "@/data/tracks";
import { programs, ProgramCategory } from "@/data/programs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TrainingVideoSection from "@/components/sections/TrainingVideoSection";
import { useI18nStore } from "@/lib/i18n";
import { formatCurrency } from "@/lib/utils";

export default function TrainingPlatformPage() {
  const { language } = useI18nStore();
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [filteredPrograms, setFilteredPrograms] = useState(programs);
  const [, navigate] = useLocation();
  const tracksData = useTracks();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Force component to re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language change event detected in TrainingPlatformPage");
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    if (selectedTrack) {
      const track = tracksData.find(t => t.id === selectedTrack);
      if (track) {
        setFilteredPrograms(programs.filter(program => 
          program.category === getCategoryFromTrackId(selectedTrack)
        ));
      }
    } else {
      setFilteredPrograms(programs);
    }
  }, [selectedTrack, tracksData, forceUpdate]);
  
  // Function to convert track ID to program category
  const getCategoryFromTrackId = (trackId: number): ProgramCategory => {
    switch(trackId) {
      case 1: return "cyber-security";
      case 2: return "digital-transformation";
      case 3: return "artificial-intelligence";
      case 4: return "data-science";
      case 5: return "organizational-transformation";
      case 6: return "risk-avoidance";
      default: return "leadership-development";
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Main title */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#2a2665] mb-4"
          >
            {language === 'ar' ? 'منصة راي التدريبية' : 'Raay Training Platform'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-3xl mx-auto text-lg"
          >
            {language === 'ar' 
              ? 'تقدم منصة راي التدريبية مجموعة متنوعة من البرامج التدريبية المتخصصة في مختلف المجالات لتطوير قدراتك المهنية'
              : 'Raay Training Platform offers a diverse range of specialized training programs in various fields to develop your professional capabilities'
            }
          </motion.p>
        </div>

        {/* Training Tracks */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#2a2665] mb-8 text-center">
            {language === 'ar' ? 'المسارات التدريبية' : 'Training Tracks'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tracksData.map((track) => (
              <Card
                key={track.id}
                className={`h-full transition-all hover:shadow-lg cursor-pointer ${selectedTrack === track.id ? 'border-[#b29567] bg-[#b29567]/5' : 'hover:border-[#b29567]/50'}`}
                onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[#2a2665]/10 rounded-full flex items-center justify-center text-[#2a2665]">
                      {<track.icon size={32} />}
                    </div>
                  </div>
                  <CardTitle className="text-center text-[#2a2665]">{track.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{track.description}</CardDescription>
                  <div className="text-center mt-4">
                    <Button
                      className="bg-[#b29567] hover:bg-[#b29567]/90 text-white border-none"
                      onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
                    >
                      {selectedTrack === track.id 
                        ? (language === 'ar' ? "عرض جميع المسارات" : "View All Tracks") 
                        : (language === 'ar' ? "عرض البرامج" : "View Programs")
                      }
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Training Programs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#2a2665] mb-8 text-center">
            {language === 'ar' 
              ? `البرامج التدريبية ${selectedTrack ? `- ${tracksData.find(t => t.id === selectedTrack)?.title}` : ''}`
              : `Training Programs ${selectedTrack ? `- ${tracksData.find(t => t.id === selectedTrack)?.title}` : ''}`
            }
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPrograms.map((program) => (
              <motion.div key={program.id} variants={item}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-[#b29567]/50 overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#2a2665]">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{program.description.substring(0, 120)}...</CardDescription>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <div>
                        {language === 'ar' ? `المدة: ${program.duration}` : `Duration: ${program.duration}`}
                      </div>
                      <div className="font-bold text-[#b29567]">
                        {language === 'ar' 
                          ? `${program.price} ريال` 
                          : formatCurrency(program.price)
                        }
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-[#2a2665] hover:bg-[#2a2665]/90 text-white"
                      onClick={() => navigate(`/assessment?programId=${program.id}`)}
                    >
                      {language === 'ar' ? 'تقييم المهارات' : 'Skills Assessment'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Video Section */}
        <TrainingVideoSection />

        {/* Call to Action */}
        <div className="text-center py-16">
          <p className="text-lg text-gray-600 mb-6">
            {language === 'ar'
              ? 'هل أنت مستعد لتطوير مهاراتك وتحقيق أهدافك المهنية؟'
              : 'Are you ready to develop your skills and achieve your professional goals?'
            }
          </p>
          <Button 
            className="bg-[#b29567] hover:bg-[#b29567]/90 text-white px-8 py-6 text-lg"
            onClick={() => navigate('/assessment')}
          >
            {language === 'ar'
              ? 'ابدأ تقييم مهاراتك الآن'
              : 'Start Your Skills Assessment Now'
            }
          </Button>
        </div>
      </div>
    </div>
  );
}