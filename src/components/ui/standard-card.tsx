import { Card } from "./card";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { LucideIcon } from "lucide-react";

export interface StandardCardProps {
  icon?: LucideIcon;
  title?: React.ReactNode;
  description?: string;
  className?: string;
  tooltip?: string;
  children?: React.ReactNode;
  subtitle?: string;
  action?: {
    label: string;
    onClick?: () => void;
  };
}

export function StandardCard({
  icon: Icon,
  title,
  description,
  className,
  tooltip,
  children,
  subtitle,
  action,
}: StandardCardProps) {
  const CardContent = (
    <Card className={cn("p-6 flex flex-col items-center text-center group", className)}>
      {Icon && <Icon className="h-8 w-8 mb-4 text-primary" />}
      {title && <h3 className="text-2xl font-semibold mb-2">{title}</h3>}
      {description && <p className="text-sm text-gray-500">{description}</p>}
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      {children}
      {action && (
        <div className="mt-4">
          <button 
            onClick={action.onClick}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {action.label}
          </button>
        </div>
      )}
    </Card>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {CardContent}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return CardContent;
}