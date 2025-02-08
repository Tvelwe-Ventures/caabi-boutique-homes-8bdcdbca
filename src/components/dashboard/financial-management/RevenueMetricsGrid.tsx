
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { KPICard } from "@/components/ui/kpi-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, DollarSign, Users, Percent, TrendingUp } from "lucide-react";

export const RevenueMetricsGrid = () => {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['revenue-metrics'],
    queryFn: async () => {
      console.log("Fetching revenue metrics...");
      const { data, error } = await supabase
        .from('property_revenue_metrics')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching revenue metrics:", error);
        throw error;
      }

      console.log("Revenue metrics data:", data);
      return data;
    }
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load revenue metrics
        </AlertDescription>
      </Alert>
    );
  }

  // Calculate monthly revenue from daily revenue
  const monthlyRevenue = metrics?.daily_revenue ? metrics.daily_revenue * 30 : 0;
  
  // Calculate RevPAR (Revenue Per Available Room)
  const revpar = metrics?.average_daily_rate && metrics?.occupancy_rate 
    ? (metrics.average_daily_rate * metrics.occupancy_rate / 100)
    : 0;

  const revenueMetrics = [
    {
      title: "Monthly Revenue",
      value: `$${monthlyRevenue.toLocaleString()}`,
      change: "+12.3%",
      changeType: "positive" as const,
      trendType: "up" as const,
      icon: <DollarSign className="h-4 w-4 text-green-600" />
    },
    {
      title: "Average Daily Rate",
      value: metrics?.average_daily_rate ? `$${metrics.average_daily_rate.toLocaleString()}` : "$0",
      change: "+5.2%",
      changeType: "positive" as const,
      trendType: "up" as const,
      icon: <TrendingUp className="h-4 w-4 text-green-600" />
    },
    {
      title: "RevPAR",
      value: `$${revpar.toLocaleString()}`,
      change: "+8.7%",
      changeType: "positive" as const,
      trendType: "up" as const,
      icon: <DollarSign className="h-4 w-4 text-green-600" />
    },
    {
      title: "Occupancy Rate",
      value: metrics?.occupancy_rate ? `${metrics.occupancy_rate}%` : "0%",
      change: "+3.2%",
      changeType: "positive" as const,
      trendType: "up" as const,
      icon: <Percent className="h-4 w-4 text-green-600" />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {revenueMetrics.map((metric, index) => (
        <KPICard
          key={index}
          {...metric}
          variant="default"
        />
      ))}
    </div>
  );
};
