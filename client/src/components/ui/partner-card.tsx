// src/components/ui/partner-card.tsx
import { Partner } from "@/data/partners";
import {
  Building2,
  Cpu,
  Globe as Languages,
  Shield,
  Users,
  Landmark,
  Lock,
  Database,
  Award,
} from "lucide-react";
import clsx from "clsx";

interface PartnerCardProps {
  partner: Partner;
  className?: string;
}

export default function PartnerCard({ partner, className }: PartnerCardProps) {
  const getIcon = () => {
    switch (partner.icon) {
      case "cpu":
        return <Cpu className="h-8 w-8 text-[#2a2665]" />;
      case "languages":
        return <Languages className="h-8 w-8 text-[#2a2665]" />;
      case "shield":
        return <Shield className="h-8 w-8 text-[#2a2665]" />;
      case "users":
        return <Users className="h-8 w-8 text-[#2a2665]" />;
      case "landmark":
        return <Landmark className="h-8 w-8 text-[#2a2665]" />;
      case "lock":
        return <Lock className="h-8 w-8 text-[#2a2665]" />;
      case "database":
        return <Database className="h-8 w-8 text-[#2a2665]" />;
      case "award":
      case "graduation-cap":
        return <Award className="h-8 w-8 text-[#2a2665]" />;
      default:
        return <Building2 className="h-8 w-8 text-[#2a2665]" />;
    }
  };

  return (
    <div
      className={clsx(
        "bg-white rounded-xl transition-all duration-300 p-5 ",
        "flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="h-full w-full rounded-full flex items-center justify-center mb-3 bg-white">
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            loading="lazy"
            className="h-1/2 w-1/2 object-cover hover:grayscale-0 transition"
          />
        ) : (
          getIcon()
        )}
      </div>
      {/* <h3 className="text-xs font-medium text-center text-[#2a2665] line-clamp-2">
        {partner.name}
      </h3> */}
    </div>
  );
}
