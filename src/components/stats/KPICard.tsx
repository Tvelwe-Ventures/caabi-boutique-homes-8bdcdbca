
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { StandardCard } from "../ui/standard-card";
import { Badge } from "../ui/badge";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  tooltip: string;
  index: number;
  source?: "PriceLabs" | "Hostaway" | "Combined";
}

export const KPICard = ({ title, value, change, icon, tooltip, index, source }: KPICardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <StandardCard
        icon={icon}
        title={
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span>{value}</span>
              <span className={`text-sm ${change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                {change}
              </span>
            </div>
            {source && (
              <Badge variant="outline" className="text-xs">
                {source}
              </Badge>
            )}
          </div>
        }
        description={title}
        tooltip={tooltip}
        className="hover:shadow-lg transition-shadow duration-200"
      />
    </motion.div>
  );
};
