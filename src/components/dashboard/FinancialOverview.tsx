
import { useQuery } from "@tanstack/react-query";
import { LineChart, Settings } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading-state";
import { ChartLoading } from "@/components/ui/chart-loading";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { CircularMetrics } from "./CircularMetrics";

export const FinancialOverview = () => {
  const { data: financialData, isLoading } = useQuery({
    queryKey: ['financial-overview'],
    queryFn: async () => {
      console.log("Fetching financial overview data...");
      const { data: properties, error } = await supabase
        .from('properties')
        .select('monthly_rent, current_value, property_type, revenue_ytd, occupancy_rate')
        .eq('owner_id', (await supabase.auth.getUser()).data.user?.id);
      
      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }

      console.log("Properties data:", properties);
      
      // Calculate totals and averages
      const totalMonthlyRent = properties?.reduce((sum, prop) => sum + (Number(prop.monthly_rent) || 0), 0) || 0;
      const totalValue = properties?.reduce((sum, prop) => sum + (Number(prop.current_value) || 0), 0) || 0;
      const totalRevenue = properties?.reduce((sum, prop) => sum + (Number(prop.revenue_ytd) || 0), 0) || 0;
      const avgOccupancy = properties?.length 
        ? properties.reduce((sum, prop) => sum + (Number(prop.occupancy_rate) || 0), 0) / properties.length 
        : 0;

      return {
        properties,
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Financial Overview</h2>
        <Settings className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <div className="grid gap-6">
        <CircularMetrics />
      </div>
    </div>
  );
};
