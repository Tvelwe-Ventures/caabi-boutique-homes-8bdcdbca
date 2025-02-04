import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Building2, TrendingUp, DollarSign, Percent } from "lucide-react";
import { StandardCard } from "../ui/standard-card";
import { CardSpotlight } from "../ui/card-spotlight";
import PropertyPerformance from "../PropertyPerformance";
import { supabase } from "@/integrations/supabase/client";

interface FinancialMetrics {
  totalRevenue: number;
  averageDailyRate: number;
  occupancyRate: number;
  revPAR: number;
}

const FinancialDashboard = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['financial-metrics'],
    queryFn: async () => {
      const { data: properties, error } = await supabase
        .from('properties')
        .select('monthly_rent, occupancy_rate');
      
      if (error) throw error;

      const totalRevenue = properties?.reduce((sum, prop) => sum + Number(prop.monthly_rent), 0) || 0;
      const avgOccupancy = properties?.reduce((sum, prop) => sum + Number(prop.occupancy_rate), 0) / (properties?.length || 1);
      
      const metrics: FinancialMetrics = {
        totalRevenue: totalRevenue * 12,
        averageDailyRate: (totalRevenue / 30),
        occupancyRate: avgOccupancy,
        revPAR: (totalRevenue / 30) * (avgOccupancy / 100)
      };

      return metrics;
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
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">QuackBoard - Unified Data Hub</h1>
        <p className="text-gray-600 mb-6">Your centralized dashboard for comprehensive business insights</p>
        
        {/* Top Level Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {topMetrics.map((metric, index) => (
            <StandardCard
              key={index}
              icon={metric.icon}
              title={metric.value}
              description={metric.title}
              className="hover:shadow-lg transition-shadow"
            />
          ))}
        </div>

        {/* Property Performance Section */}
        <CardSpotlight className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Property Performance</h2>
            <PropertyPerformance />
          </div>
        </CardSpotlight>
      </div>
    </div>
  );
};

export default FinancialDashboard;