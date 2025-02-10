
import { LucideIcon } from "lucide-react";

export interface MetricChartProps {
  data: Array<{ name: string; value: number; trend: string }>;
  colors: string[];
  title: string;
  icon: LucideIcon;
  source: string;
}

export interface ChartColors {
  revenue: string[];
  expense: string[];
  portfolio: string[];
  market: string[];
}
