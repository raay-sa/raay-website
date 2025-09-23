import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/ui/translated-text";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

interface JoinUsCardProps {
  jobTitle: string;
  className?: string;
}

export default function JoinUsCard({ jobTitle, className }: JoinUsCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden group h-full transition-all hover:shadow-lg hover:border-[#2a2665]/50 border-dashed border-2 border-gray-300",
      className
    )}>
      <div className="absolute top-0 left-0 w-full h-1 bg-[#2a2665]/20"></div>
      
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 180 }}
          transition={{ duration: 0.5 }}
          className="rounded-full bg-[#2a2665]/10 p-6 mb-4"
        >
          <FaPlus className="h-10 w-10 text-[#2a2665]" />
        </motion.div>
      </div>
      
      <CardHeader className="pt-6 pb-2">
        <h3 className="font-bold text-xl text-gray-800 text-center">
          <TranslatedText textKey="team.joinUs" defaultText="انضم إلينا" />
        </h3>
      </CardHeader>
      
      <CardContent className="text-center px-6 pb-6">
        <p className="text-gray-600 mb-4">{jobTitle}</p>
        <Button variant="outline" className="border-[#2a2665] text-[#2a2665] hover:bg-[#2a2665] hover:text-white">
          <TranslatedText textKey="team.applyNow" defaultText="تقدم الآن" />
        </Button>
      </CardContent>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2a2665]/20"></div>
    </Card>
  );
}