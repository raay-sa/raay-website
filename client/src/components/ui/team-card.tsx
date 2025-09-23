import { FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
import { TeamMember } from "@/data/team";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TeamCardProps {
  member: TeamMember;
  className?: string;
}

export default function TeamCard({ member, className }: TeamCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden group h-full transition-all hover:shadow-lg hover:border-[#2a2665]/50", 
      className
    )}>
      <div className="absolute top-0 left-0 w-full h-1 bg-[#2a2665]/20"></div>
      
      <div className="relative overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={member.image} 
            alt={`صورة ${member.name}`} 
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* تراكب شفاف للصورة */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* شارة المنصب تظهر عند تحريك الماوس */}
        <div className="absolute bottom-4 right-4 transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Badge variant="outline" className="bg-white/80 text-[#2a2665] font-medium border-[#2a2665]/20">
            {member.title}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pt-6 pb-2">
        <h3 className="font-bold text-xl text-gray-800 text-center">{member.name}</h3>
      </CardHeader>
      
      <CardContent className="text-center px-6 pb-2">
        <CardDescription className="text-gray-600 text-sm leading-relaxed">
          {member.bio}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="flex justify-center py-4 space-x-4 space-x-reverse">
        {member.linkedin && (
          <motion.a 
            href={member.linkedin} 
            className="text-gray-600 hover:text-blue-600 transition-colors"
            whileHover={{ scale: 1.2 }}
          >
            <FaLinkedin className="h-5 w-5" />
          </motion.a>
        )}
        {member.twitter && (
          <motion.a 
            href={member.twitter} 
            className="text-gray-600 hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.2 }}
          >
            <FaTwitter className="h-5 w-5" />
          </motion.a>
        )}
        {member.website && (
          <motion.a 
            href={member.website} 
            className="text-gray-600 hover:text-[#2a2665] transition-colors"
            whileHover={{ scale: 1.2 }}
          >
            <FaGlobe className="h-5 w-5" />
          </motion.a>
        )}
      </CardFooter>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2a2665]/20"></div>
    </Card>
  );
}
