import { useQuery } from "@tanstack/react-query";
import { LineChart, Settings } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading-state";
import { ChartLoading } from "@/components/ui/chart-loading";
import { supabase } from "@/integrations/supabase/client";

export const FinancialOverview = () => {
  const { data: financialData, isLoading } = useQuery({
    queryKey: ['financial-overview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('monthly_rent, current_value')
        .eq('owner_id', (await supabase.auth.getUser()).data.user?.id);
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <ChartLoading className="mt-8" />;
  }

  if (!financialData?.length) {
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
      
      <div className="h-[300px] rounded-xl border bg-card p-6">
        Chart coming soon...
      </div>
    </div>
  );
};