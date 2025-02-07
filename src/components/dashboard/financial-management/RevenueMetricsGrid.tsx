
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RevenueMetricsCard } from "./components/RevenueMetricsCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const RevenueMetricsGrid = () => {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['revenue-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_revenue_metrics')
        .select('*')
        .order('date', { ascending: false })
        .limit(1);

      if (error) throw error;
      return data[0];
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

  const revenueMetrics = [
    {
      title: "Monthly Revenue",
      progress: 75,
      value: metrics?.daily_revenue || 0,
      lastUpdated: "2 hours ago",
      issues: 3
    },
    {
      title: "Occupancy Rate",
      progress: metrics?.occupancy_rate || 0,
      lastUpdated: "1 hour ago",
      issues: 2
    },
    {
      title: "Average Daily Rate",
      progress: 82,
      value: metrics?.average_daily_rate || 0,
      lastUpdated: "30 minutes ago",
      issues: 1
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {revenueMetrics.map((metric, index) => (
        <RevenueMetricsCard
          key={index}
          title={metric.title}
          progress={metric.progress}
          value={metric.value}
          lastUpdated={metric.lastUpdated}
          issues={metric.issues}
          loading={isLoading}
        />
      ))}
    </div>
  );
};
