
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
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#9b87f5]">
                    {metric.title}
                  </span>
                  <span 
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      metric.trendType === "positive" 
                        ? "bg-[#F2FCE2] text-green-700" 
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {metric.trend}
                  </span>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </span>
                <span className="text-sm text-gray-500">
                  {metric.description}
                </span>
              </div>
            }
            className="hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]"
          />
        </motion.div>
      ))}
    </div>
  );
};
