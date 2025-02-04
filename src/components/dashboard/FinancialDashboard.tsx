
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Building2, TrendingUp, DollarSign, Percent, Home, Plus, FileText, Settings, Clock } from "lucide-react";
import { StandardCard } from "../ui/standard-card";
import { CardSpotlight } from "../ui/card-spotlight";
import PropertyPerformance from "../PropertyPerformance";
import { supabase } from "@/integrations/supabase/client";
import { GuestStats } from "./guests/GuestStats";
import { GuestTypeDistribution } from "./guests/GuestTypeDistribution";
import { CommunityStats } from "../community/CommunityStats";
import { Button } from "../ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "../ui/breadcrumb";
import { ActivityCard } from "../ui/activity-card";
import { usePropertiesSubscription } from "@/hooks/usePropertiesSubscription";

interface FinancialMetrics {
  totalRevenue: number;
  averageDailyRate: number;
  occupancyRate: number;
  revPAR: number;
}

const FinancialDashboard = () => {
  // Enable real-time subscription
  usePropertiesSubscription();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['financial-metrics'],
    queryFn: async () => {
      const { data: properties, error } = await supabase
        .from('properties')
        .select('monthly_rent, occupancy_rate, market_rate');
      
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

  const quickActions = [
    { icon: Plus, label: "Add Property" },
    { icon: FileText, label: "Create Report" },
    { icon: Settings, label: "Settings" }
  ];

  const activityMetrics = [
    { label: "Move", value: "92", trend: 92, unit: "min" as const },
    { label: "Exercise", value: "85", trend: 85, unit: "min" as const },
    { label: "Stand", value: "12", trend: 78, unit: "hrs" as const }
  ];

  const sampleGoals = [
    { id: "1", title: "Complete monthly financial reports", isCompleted: true },
    { id: "2", title: "Schedule property inspections", isCompleted: false },
    { id: "3", title: "Review tenant applications", isCompleted: false }
  ];

  return (
    <div className="space-y-8 p-8">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">
            <Home className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>QuackBoard</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">QuackBoard - Unified Data Hub</h1>
          <p className="text-gray-600 mb-2">Your centralized dashboard for comprehensive business insights</p>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
        <div className="flex gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex items-center gap-2"
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>
        
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Financial Overview</h2>
          <div className="grid grid-cols-2 gap-6">
            {topMetrics.slice(0, 4).map((metric, index) => (
              <StandardCard
                key={index}
                icon={metric.icon}
                title={metric.value}
                description={metric.title}
                className="hover:shadow-lg transition-shadow bg-white"
              />
            ))}
          </div>
        </div>
        
        <ActivityCard
          title="Property Management"
          category="Daily Tasks & Goals"
          metrics={activityMetrics}
          dailyGoals={sampleGoals}
          onAddGoal={() => console.log('Add property management goal')}
          onToggleGoal={(id) => console.log('Toggle goal', id)}
          onViewDetails={() => console.log('View property management details')}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-50 rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Guest Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardSpotlight className="bg-white">
            <GuestStats
              totalGuests={1250}
              averageRating={4.8}
              repeatGuests={280}
            />
          </CardSpotlight>
          <CardSpotlight className="bg-white">
            <GuestTypeDistribution data={[
              { name: 'Business', value: 30 },
              { name: 'Leisure', value: 45 },
              { name: 'Long-term', value: 15 },
              { name: 'Group', value: 10 }
            ]} />
          </CardSpotlight>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gray-50 rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Property Performance</h2>
        <CardSpotlight className="bg-white">
          <PropertyPerformance />
        </CardSpotlight>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gray-50 rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Community Engagement</h2>
        <CardSpotlight className="bg-white">
          <CommunityStats />
        </CardSpotlight>
      </motion.div>
    </div>
  );
};

export default FinancialDashboard;
