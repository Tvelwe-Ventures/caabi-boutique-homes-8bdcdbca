
import React from "react";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";

export interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "neutral" | "negative";
  trendType?: "up" | "down" | "neutral";
  className?: string;
  icon?: React.ReactNode;
  variant?: "default" | "gradient";
}

export const KPICard = ({
  title,
  value,
  change,
  changeType,
  trendType = "neutral",
  className,
  icon,
  variant = "default"
}: KPICardProps) => {
  const getTrendIcon = () => {
    if (trendType === "up") return ArrowUpIcon;
    if (trendType === "down") return ArrowDownIcon;
    return ArrowRightIcon;
  };

  const TrendIcon = getTrendIcon();

  const getBadgeStyles = () => {
    const baseStyles = "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1";
    
    if (changeType === "positive") {
      return "bg-green-50 text-green-700 dark:bg-green-500/20 dark:text-green-400";
    }
    if (changeType === "negative") {
      return "bg-red-50 text-red-700 dark:bg-red-500/20 dark:text-red-400";
    }
    return "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400";
  };

  return (
    <Card className={cn(
      "relative overflow-hidden p-6",
      variant === "gradient" && "bg-gradient-to-br from-gray-900 to-gray-800 border-0",
      className
    )}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          {icon && (
            <div className={cn(
              "p-2 rounded-lg",
              variant === "gradient" ? "bg-gray-800" : "bg-gray-100"
            )}>
              {icon}
            </div>
          )}
          <div className={cn(getBadgeStyles())}>
            <TrendIcon className="h-3 w-3" />
            {change}
          </div>
        </div>

        <div>
          <p className={cn(
            "text-sm font-medium mb-1",
            variant === "gradient" ? "text-gray-400" : "text-muted-foreground"
          )}>
            {title}
          </p>
          <p className={cn(
            "text-2xl font-semibold",
            variant === "gradient" ? "text-white" : "text-foreground"
          )}>
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
};
