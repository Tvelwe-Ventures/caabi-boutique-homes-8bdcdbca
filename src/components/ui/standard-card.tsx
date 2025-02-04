import { Card } from "./card";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface StandardCardProps {
  icon?: any;
  title?: React.ReactNode;
  description?: string;
  className?: string;
  tooltip?: string;
}

export function StandardCard({
  icon: Icon,
  title,
  description,
  className,
  tooltip,
}: StandardCardProps) {
  const CardContent = (
    <Card className={cn("p-6 flex flex-col items-center text-center", className)}>
      {Icon && <Icon className="h-8 w-8 mb-4 text-primary" />}
      {title && <h3 className="text-2xl font-semibold mb-2">{title}</h3>}
      {description && <p className="text-sm text-gray-500">{description}</p>}
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