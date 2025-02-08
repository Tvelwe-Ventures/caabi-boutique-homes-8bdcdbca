
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

  return (
    <Card className={cn(
      "relative overflow-hidden",
      variant === "gradient" && "bg-gradient-to-br from-card via-card to-muted/50",
      className
    )}>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          {icon && (
            <div className={cn(
              "p-2 rounded-lg",
              changeType === "positive" && "bg-green-100",
              changeType === "negative" && "bg-red-100",
              changeType === "neutral" && "bg-yellow-100"
            )}>
              {icon}
            </div>
          )}
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
            changeType === "positive" && "bg-green-100 text-green-700",
            changeType === "negative" && "bg-red-100 text-red-700",
            changeType === "neutral" && "bg-yellow-100 text-yellow-700"
          )}>
            <TrendIcon className="h-3 w-3" />
            {change}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-2xl font-semibold">
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
};
