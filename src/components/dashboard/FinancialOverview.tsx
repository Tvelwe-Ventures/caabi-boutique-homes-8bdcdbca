
import { useQuery } from "@tanstack/react-query";
import { LineChart, Settings, Users, DollarSign, Wallet, TrendingUp } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { ChartLoading } from "@/components/ui/chart-loading";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";
import { CircularMetrics } from "./CircularMetrics";
import { KPICard } from "@/components/ui/kpi-card";

export const FinancialOverview = () => {
  const { data: financialData, isLoading } = useQuery({
    queryKey: ['financial-overview'],
    queryFn: async () => {
      console.log("Fetching financial overview data...");
      const [propertiesResponse, metricsResponse] = await Promise.all([
        supabase
          .from('properties')
          .select('monthly_rent, current_value, property_type, revenue_ytd, occupancy_rate')
          .eq('owner_id', (await supabase.auth.getUser()).data.user?.id),
        supabase
          .from('revenue_metrics')
          .select('*')
          .eq('metric_type', 'revenue')
          .order('period', { ascending: false })
          .limit(1)
      ]);
      
      if (propertiesResponse.error) {
        console.error("Error fetching properties:", propertiesResponse.error);
        throw propertiesResponse.error;
      }

      if (metricsResponse.error) {
        console.error("Error fetching metrics:", metricsResponse.error);
        throw metricsResponse.error;
      }

      const properties = propertiesResponse.data;
      const metrics = metricsResponse.data[0];
      
      console.log("Properties data:", properties);
      console.log("Metrics data:", metrics);
      
      // Calculate totals and averages
      const totalMonthlyRent = properties?.reduce((sum, prop) => sum + (Number(prop.monthly_rent) || 0), 0) || 0;
      const totalValue = properties?.reduce((sum, prop) => sum + (Number(prop.current_value) || 0), 0) || 0;
      const totalRevenue = properties?.reduce((sum, prop) => sum + (Number(prop.revenue_ytd) || 0), 0) || 0;
      const avgOccupancy = properties?.length 
        ? properties.reduce((sum, prop) => sum + (Number(prop.occupancy_rate) || 0), 0) / properties.length 
        : 0;

      return {
        properties,
        metrics,
        summary: {
          totalMonthlyRent,
          totalValue,
          totalRevenue,
          avgOccupancy,
          propertyCount: properties?.length || 0
        }
      };
    }
  });

  if (isLoading) {
    return <ChartLoading className="mt-8" />;
  }

  if (!financialData?.properties?.length) {
    return (
      <EmptyState
        icon={LineChart}
        title="No Financial Data"
        description="Add your first property to start tracking your financial performance"
        className="mt-8"
      />
    );
  }

  const kpiData = [
    {
      title: "Total Revenue",
      value: formatCurrency(financialData.summary.totalRevenue),
      change: `${financialData.metrics?.year_over_year_change?.toFixed(1)}%` || "0.0%",
      changeType: (financialData.metrics?.year_over_year_change || 0) > 0 ? "positive" as const : "negative" as const,
      trendType: (financialData.metrics?.year_over_year_change || 0) > 0 ? "up" as const : "down" as const,
      icon: <DollarSign className="h-4 w-4 text-green-700" />
    },
    {
      title: "Monthly Rent",
      value: formatCurrency(financialData.summary.totalMonthlyRent),
      change: `${financialData.metrics?.month_over_month_change?.toFixed(1)}%` || "0.0%",
      changeType: (financialData.metrics?.month_over_month_change || 0) > 0 ? "positive" as const : "negative" as const,
      trendType: (financialData.metrics?.month_over_month_change || 0) > 0 ? "up" as const : "down" as const,
      icon: <Wallet className="h-4 w-4 text-blue-700" />
    },
    {
      title: "Portfolio Value",
      value: formatCurrency(financialData.summary.totalValue),
      change: "0.0%",
      changeType: "neutral" as const,
      trendType: "neutral" as const,
      icon: <TrendingUp className="h-4 w-4 text-yellow-700" />
    },
    {
      title: "Properties",
      value: financialData.summary.propertyCount,
      change: "+1.0%",
      changeType: "positive" as const,
      trendType: "up" as const,
      icon: <Users className="h-4 w-4 text-green-700" />
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Financial Overview</h2>
        <Settings className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            {...kpi}
            variant="gradient"
          />
        ))}
      </div>

      <div className="grid gap-6">
        <CircularMetrics />
      </div>
    </div>
  );
};
