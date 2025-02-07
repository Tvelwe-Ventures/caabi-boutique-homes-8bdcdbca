
import { useQuery } from "@tanstack/react-query";
import { BadgeDollarSign, BarChart3, DollarSign, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { StandardCard } from "@/components/ui/standard-card";
import { formatCurrency } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SummaryMetricsProps {
  metrics: any;
  isLoading: boolean;
}

export const SummaryMetrics = ({ metrics, isLoading }: SummaryMetricsProps) => {
  const summaryMetrics = [
    {
      title: "Monthly Revenue",
      value: metrics?.monthly_revenue ? formatCurrency(metrics.monthly_revenue) : "Loading...",
      icon: DollarSign,
      description: "Total revenue this month",
      trend: "+12.3%",
      trendType: "positive",
      helperText: "Combined revenue from all properties"
    },
    {
      title: "Average Daily Rate",
      value: metrics?.avg_daily_rate ? formatCurrency(metrics.avg_daily_rate) : "Loading...",
      icon: BadgeDollarSign,
      description: "ADR across properties",
      trend: "+8.7%",
      trendType: "positive",
      helperText: "Average rate per night"
    },
    {
      title: "RevPAR",
      value: metrics?.revpar ? formatCurrency(metrics.revpar) : "Loading...",
      icon: BarChart3,
      description: "Revenue per available room",
      trend: "+5.4%",
      trendType: "positive",
      helperText: "Revenue per available room"
    },
    {
      title: "Occupancy Rate",
      value: metrics?.occupancy_rate ? `${metrics.occupancy_rate}%` : "Loading...",
      icon: Percent,
      description: "Current occupancy",
      trend: "+3.2%",
      trendType: "positive",
      helperText: "Percentage of occupied rooms"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryMetrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="w-full"
        >
          <StandardCard
            icon={metric.icon}
            title={
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg md:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    {metric.value}
                  </span>
                  <span 
                    className={`text-xs md:text-sm px-2 py-0.5 rounded-full ${
                      metric.trendType === "positive" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {metric.trend}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{metric.helperText}</p>
              </div>
            }
            description={metric.title}
            className="glass-card hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]"
          />
        </motion.div>
      ))}
    </div>
  );
};
