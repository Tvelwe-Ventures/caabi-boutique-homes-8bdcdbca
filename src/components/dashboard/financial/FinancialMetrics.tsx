
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

      // Ensure we have properties before calculating
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
      title: "Annual Revenue",
      value: isLoading ? "Loading..." : formatCurrency(metrics?.totalRevenue || 0),
      icon: DollarSign,
      description: "Total annual revenue across all properties"
    },
    {
      title: "Average Daily Rate",
      value: isLoading ? "Loading..." : formatCurrency(metrics?.averageDailyRate || 0),
      icon: TrendingUp,
      description: "Average daily rate per property"
    },
    {
      title: "Occupancy Rate",
      value: isLoading ? "Loading..." : `${(metrics?.occupancyRate || 0).toFixed(1)}%`,
      icon: Building2,
      description: "Average occupancy across properties"
    },
    {
      title: "RevPAR",
      value: isLoading ? "Loading..." : formatCurrency(metrics?.revPAR || 0),
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
          className="glass-card hover:shadow-lg transition-shadow"
        />
      ))}
    </motion.div>
  );
};
