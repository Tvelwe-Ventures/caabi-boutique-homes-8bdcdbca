import { DollarSign, TrendingUp, Building2, Percent } from "lucide-react";
import { StandardCard } from "@/components/ui/standard-card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

export const FinancialMetrics = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['financial-metrics'],
    queryFn: async () => {
      const { data: properties, error } = await supabase
        .from('properties')
        .select('monthly_rent, occupancy_rate, market_rate');
      
      if (error) throw error;

      const totalRevenue = properties?.reduce((sum, prop) => sum + Number(prop.monthly_rent), 0) || 0;
      const avgOccupancy = properties?.reduce((sum, prop) => sum + Number(prop.occupancy_rate), 0) / (properties?.length || 1);
      
      return {
        totalRevenue: totalRevenue * 12,
        averageDailyRate: (totalRevenue / 30),
        occupancyRate: avgOccupancy,
        revPAR: (totalRevenue / 30) * (avgOccupancy / 100)
      };
    }
  });

  const topMetrics = [
    {
      title: "Annual Revenue",
      value: metrics ? `AED ${metrics.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "Loading...",
      icon: DollarSign,
      description: "Total annual revenue across all properties"
    },
    {
      title: "Average Daily Rate",
      value: metrics ? `AED ${metrics.averageDailyRate.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "Loading...",
      icon: TrendingUp,
      description: "Average daily rate per property"
    },
    {
      title: "Occupancy Rate",
      value: metrics ? `${metrics.occupancyRate.toFixed(1)}%` : "Loading...",
      icon: Building2,
      description: "Average occupancy across properties"
    },
    {
      title: "RevPAR",
      value: metrics ? `AED ${metrics.revPAR.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "Loading...",
      icon: Percent,
      description: "Revenue per available room"
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
          title={metric.value}
          description={metric.title}
          className="hover:shadow-lg transition-shadow bg-white"
        />
      ))}
    </motion.div>
  );
};