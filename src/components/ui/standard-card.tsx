import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StandardCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick?: () => void;
  };
  className?: string;
}

export function StandardCard({
  icon: Icon,
  title,
  description,
  action,
  className,
}: StandardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 p-8 space-y-4">
        {Icon && (
          <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        
        <h3 className="text-xl font-semibold text-gray-900">
          {title}
        </h3>
        
        <p className="text-gray-700">
          {description}
        </p>

        {action && (
          <div className="pt-2 flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors cursor-pointer">
            <span className="text-sm font-medium">{action.label}</span>
            <span className="text-sm">→</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}