import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { team } from "@/data/team";
import { Search } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export default function ExpertDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [, navigate] = useLocation();

  const filteredExperts = team.filter(expert =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {/* العنوان الرئيسي */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#2a2665] mb-4"
          >
            دليل خبراء مركز راي
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-3xl mx-auto text-lg"
          >
            مجموعة متميزة من الخبراء والمدربين ذوي الكفاءة العالية في مختلف التخصصات
          </motion.p>
        </div>

        {/* البحث */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن خبير أو تخصص..."
              className="pl-10 py-6 text-base border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* قائمة الخبراء */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredExperts.map((expert) => (
            <motion.div key={expert.id} variants={item}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all border-transparent hover:border-[#b29567]">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a2665]/80 to-transparent"></div>
                  <div className="absolute bottom-0 w-full p-4 text-white">
                    <h3 className="text-xl font-bold">{expert.name}</h3>
                    <p className="text-gray-200">{expert.title}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">{expert.bio}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3 rtl:space-x-reverse">
                      {expert.linkedin && (
                        <a
                          href={expert.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0A66C2] hover:text-[#0A66C2]/80"
                        >
                          <FaLinkedin size={24} />
                        </a>
                      )}
                    </div>
                    <Button 
                      className="bg-[#b29567] hover:bg-[#b29567]/90 text-white"
                      onClick={() => navigate('/contact')}
                    >
                      التواصل مع الخبير
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* دعوة للانضمام */}
        <div className="mt-16 bg-[#2a2665] text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">هل ترغب في الانضمام إلى فريق خبرائنا؟</h2>
          <p className="mb-6">نرحب بالخبراء والمدربين المتميزين للانضمام إلى فريق مركز راي</p>
          <Button 
            className="bg-[#b29567] hover:bg-[#b29567]/90 text-white px-8 py-6 text-lg"
            onClick={() => navigate('/auth')}
          >
            سجل كخبير الآن
          </Button>
        </div>
      </div>
    </div>
  );
}