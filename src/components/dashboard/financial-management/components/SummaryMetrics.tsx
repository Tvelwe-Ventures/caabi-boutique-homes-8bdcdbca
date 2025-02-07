
import { useQuery } from "@tanstack/react-query";
import { BadgeDollarSign, BarChart3, DollarSign, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { StandardCard } from "@/components/ui/standard-card";
import { formatCurrency } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface SummaryMetricsProps {
  metrics: any;
  isLoading: boolean;
}

// Sample trend data - in a real app, this would come from your API
const generateTrendData = (baseline: number, volatility: number = 0.1) => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: i,
    value: baseline * (1 + (Math.random() - 0.5) * volatility)
  }));
};

export const SummaryMetrics = ({ metrics, isLoading }: SummaryMetricsProps) => {
  const summaryMetrics = [
    {
      title: "Monthly Revenue",
      value: metrics?.monthly_revenue ? formatCurrency(metrics.monthly_revenue) : "Loading...",
      icon: DollarSign,
      description: "Total revenue this month",
      trend: "+12.3%",
      trendType: "positive",
      helperText: "Combined revenue from all properties",
      trendData: generateTrendData(metrics?.monthly_revenue || 1000000)
    },
    {
      title: "Average Daily Rate",
      value: metrics?.avg_daily_rate ? formatCurrency(metrics.avg_daily_rate) : "Loading...",
      icon: BadgeDollarSign,
      description: "ADR across properties",
      trend: "+8.7%",
      trendType: "positive",
      helperText: "Average rate per night",
      trendData: generateTrendData(metrics?.avg_daily_rate || 500)
    },
    {
      title: "RevPAR",
      value: metrics?.revpar ? formatCurrency(metrics.revpar) : "Loading...",
      icon: BarChart3,
      description: "Revenue per available room",
      trend: "+5.4%",
      trendType: "positive",
      helperText: "Revenue per available room",
      trendData: generateTrendData(metrics?.revpar || 300)
    },
    {
      title: "Occupancy Rate",
      value: metrics?.occupancy_rate ? `${metrics.occupancy_rate}%` : "Loading...",
      icon: Percent,
      description: "Current occupancy",
      trend: "+3.2%",
      trendType: "positive",
      helperText: "Percentage of occupied rooms",
      trendData: generateTrendData(metrics?.occupancy_rate || 80)
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
              <div className="space-y-2">
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
                <div className="h-[40px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metric.trendData}>
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#9b87f5" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#9b87f5" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#9b87f5"
                        fill={`url(#gradient-${index})`}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
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
