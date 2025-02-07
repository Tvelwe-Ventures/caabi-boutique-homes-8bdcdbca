
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RevenueMetricsCard } from "./components/RevenueMetricsCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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

  const revenueMetrics = [
    {
      title: "Daily Revenue",
      progress: 75,
      value: metrics?.daily_revenue || 0,
      lastUpdated: metrics?.date ? new Date(metrics.date).toLocaleDateString() : "Never",
      issues: 0
    },
    {
      title: "Occupancy Rate",
      progress: metrics?.occupancy_rate || 0,
      lastUpdated: metrics?.date ? new Date(metrics.date).toLocaleDateString() : "Never",
      issues: 0
    },
    {
      title: "Average Daily Rate",
      progress: 82,
      value: metrics?.average_daily_rate || 0,
      lastUpdated: metrics?.date ? new Date(metrics.date).toLocaleDateString() : "Never",
      issues: 0
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
