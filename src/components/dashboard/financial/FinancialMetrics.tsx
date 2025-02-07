
import { DollarSign, TrendingUp, Building2, Percent } from "lucide-react";
import { StandardCard } from "@/components/ui/standard-card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

export const FinancialMetrics = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['financial-metrics'],
    queryFn: async () => {
      console.log("Fetching financial metrics...");
      const { data: properties, error } = await supabase
        .from('properties')
        .select('monthly_rent, occupancy_rate, market_rate');
      
      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }

      if (!properties || properties.length === 0) {
        return {
          totalRevenue: 0,
          averageDailyRate: 0,
          occupancyRate: 0,
          revPAR: 0
        };
      }

      const totalRevenue = properties.reduce((sum, prop) => sum + (Number(prop.monthly_rent) || 0), 0);
      const avgOccupancy = properties.reduce((sum, prop) => sum + (Number(prop.occupancy_rate) || 0), 0) / properties.length;
      const averageDailyRate = totalRevenue / 30; // Daily rate
      
      return {
        totalRevenue: totalRevenue * 12, // Annualized
        averageDailyRate,
        occupancyRate: avgOccupancy,
        revPAR: averageDailyRate * (avgOccupancy / 100)
      };
    }
  });

  const topMetrics = [
    {
      title: "Total Annual Revenue",
      value: isLoading ? "Loading..." : formatCurrency(metrics?.totalRevenue || 0),
      icon: DollarSign,
      description: "Combined revenue from all properties",
      trend: "+12.3%",
      trendType: "positive"
    },
    {
      title: "Average Daily Rate (ADR)",
      value: isLoading ? "Loading..." : formatCurrency(metrics?.averageDailyRate || 0),
      icon: TrendingUp,
      description: "Average rate per night",
      trend: "+8.7%",
      trendType: "positive"
    },
    {
      title: "Occupancy Rate",
      value: isLoading ? "Loading..." : `${(metrics?.occupancyRate || 0).toFixed(1)}%`,
      icon: Building2,
      description: "Average occupancy across properties",
      trend: "+5.4%",
      trendType: "positive"
    },
    {
      title: "RevPAR",
      value: isLoading ? "Loading..." : formatCurrency(metrics?.revPAR || 0),
      icon: Percent,
      description: "Revenue per available room",
      trend: "+3.2%",
      trendType: "positive"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {topMetrics.map((metric, index) => (
        <StandardCard
          key={index}
          icon={metric.icon}
          title={
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">
                  {metric.value}
                </span>
                <span 
                  className={`text-sm font-medium ${
                    metric.trendType === "positive" 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}
                >
                  {metric.trend}
                </span>
              </div>
            </div>
          }
          description={metric.description}
          className="hover:shadow-lg transition-all duration-200"
        />
      ))}
    </motion.div>
  );
};
