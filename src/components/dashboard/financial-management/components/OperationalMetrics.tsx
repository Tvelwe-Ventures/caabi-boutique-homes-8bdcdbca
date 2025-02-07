
import { useQuery } from "@tanstack/react-query";
import { Activity, Building2, LineChart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { StandardCard } from "@/components/ui/standard-card";
import { formatCurrency } from "@/lib/utils";

interface OperationalMetricsProps {
  metrics: any;
  isLoading: boolean;
}

export const OperationalMetrics = ({ metrics, isLoading }: OperationalMetricsProps) => {
  const operationalMetrics = [
    {
      title: "Operating Expenses",
      value: metrics?.operating_expenses ? formatCurrency(metrics.operating_expenses) : "Loading...",
      icon: Activity,
      description: "Total expenses this month",
      trend: "-2.1%",
      trendType: "negative"
    },
    {
      title: "Net Operating Income",
      value: metrics?.net_operating_income ? formatCurrency(metrics.net_operating_income) : "Loading...",
      icon: TrendingUp,
      description: "NOI this month",
      trend: "+8.7%",
      trendType: "positive"
    },
    {
      title: "Market Demand Score",
      value: metrics?.market_demand_score ? `${metrics.market_demand_score}/100` : "Loading...",
      icon: LineChart,
      description: "Current market demand",
      trend: "+4.5%",
      trendType: "positive"
    },
    {
      title: "Competitive Index",
      value: metrics?.competitive_index ? `${metrics.competitive_index}` : "Loading...",
      icon: Building2,
      description: "Market position score",
      trend: "+2.8%",
      trendType: "positive"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {operationalMetrics.map((metric, index) => (
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
            }
            description={metric.title}
            className="glass-card hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]"
          />
        </motion.div>
      ))}
    </div>
  );
};
