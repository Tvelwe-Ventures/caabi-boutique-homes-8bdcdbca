
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  tooltip: string;
  index: number;
  variant?: 'default' | 'gradient' | 'outlined';
}

export const KPICard = ({ title, value, change, icon: Icon, tooltip, index, variant = 'default' }: KPICardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative group"
    >
      <div
        className={cn(
          "p-6 rounded-xl transition-all duration-200 h-full",
          variant === 'default' && "bg-white hover:shadow-lg",
          variant === 'gradient' && "bg-gradient-to-br from-primary/10 via-primary/5 to-background hover:shadow-lg",
          variant === 'outlined' && "border-2 border-primary/10 hover:border-primary/20 bg-background"
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{value}</span>
              <span 
                className={cn(
                  "text-sm font-medium",
                  change.startsWith('-') ? 'text-red-500' : 'text-green-500'
                )}
              >
                {change}
              </span>
            </div>
          </div>
          <div 
            className={cn(
              "p-2 rounded-lg",
              variant === 'gradient' ? 'bg-primary/10' : 'bg-muted'
            )}
          >
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {tooltip}
        </p>
      </div>
    </motion.div>
  );
};
