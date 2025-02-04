import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Building2, TrendingUp, DollarSign, Percent } from "lucide-react";
import { StandardCard } from "../ui/standard-card";
import { CardSpotlight } from "../ui/card-spotlight";
import PropertyPerformance from "../PropertyPerformance";
import { supabase } from "@/integrations/supabase/client";
import { GuestStats } from "./guests/GuestStats";
import { GuestTypeDistribution } from "./guests/GuestTypeDistribution";
import { CommunityStats } from "../community/CommunityStats";

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

  // Mock data for guest type distribution
  const guestTypeData = [
    { name: 'Business', value: 30 },
    { name: 'Leisure', value: 45 },
    { name: 'Long-term', value: 15 },
    { name: 'Group', value: 10 }
  ];

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">QuackBoard - Unified Data Hub</h1>
        <p className="text-gray-600 mb-6">Your centralized dashboard for comprehensive business insights</p>
        
        {/* Financial Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Financial Overview</h2>
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
        </motion.div>

        {/* Guest Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Guest Insights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CardSpotlight>
              <GuestStats
                totalGuests={1250}
                averageRating={4.8}
                repeatGuests={280}
              />
            </CardSpotlight>
            <CardSpotlight>
              <GuestTypeDistribution data={guestTypeData} />
            </CardSpotlight>
          </div>
        </motion.div>

        {/* Property Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Property Performance</h2>
          <CardSpotlight>
            <PropertyPerformance />
          </CardSpotlight>
        </motion.div>

        {/* Community Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Community Engagement</h2>
          <CardSpotlight>
            <CommunityStats />
          </CardSpotlight>
        </motion.div>
      </div>
    </div>
  );
};

export default FinancialDashboard;