
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { SummaryMetrics } from "./components/SummaryMetrics";
import { OperationalMetrics } from "./components/OperationalMetrics";
import { IntegrationMetrics } from "./components/IntegrationMetrics";
import { RevenueMetricsGrid } from "./RevenueMetricsGrid";
import DataFlowVisualization from "./components/DataFlowVisualization";

const FinanceAndRevenueManagement = () => {
  const { toast } = useToast();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['financial-metrics'],
    queryFn: async () => {
      console.log("Fetching financial metrics...");
      const { data, error } = await supabase
        .from('financial_metrics')
        .select('*')
        .order('month', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching financial metrics:", error);
        toast({
          title: "Error fetching metrics",
          description: "Could not load financial metrics",
          variant: "destructive",
        });
        throw error;
      }

      console.log("Financial metrics data:", data);
      return data || {
        monthly_revenue: 0,
        operating_expenses: 0,
        net_operating_income: 0,
        avg_daily_rate: 0,
        revpar: 0,
        occupancy_rate: 0,
        market_demand_score: 0,
        competitive_index: 0,
        last_sync_pricelabs: null,
        last_sync_hostaway: null
      };
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 md:p-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Finance & Revenue Management
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Track and optimize your portfolio's financial performance
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <Card className="p-3 w-full md:w-auto bg-card">
                <p className="text-xs text-muted-foreground">Last PriceLabs sync:</p>
                <p className="text-sm font-medium">
                  {metrics?.last_sync_pricelabs 
                    ? new Date(metrics.last_sync_pricelabs).toLocaleString() 
                    : 'Never'}
                </p>
              </Card>
              <Card className="p-3 w-full md:w-auto bg-card">
                <p className="text-xs text-muted-foreground">Last Hostaway sync:</p>
                <p className="text-sm font-medium">
                  {metrics?.last_sync_hostaway 
                    ? new Date(metrics.last_sync_hostaway).toLocaleString() 
                    : 'Never'}
                </p>
              </Card>
            </div>
          </div>

          {/* Data Flow Visualization */}
          <DataFlowVisualization />

          {/* Revenue Metrics Grid */}
          <RevenueMetricsGrid />

          {/* Key Financial Metrics */}
          <SummaryMetrics metrics={metrics} isLoading={isLoading} />
          
          {/* Operational Performance */}
          <OperationalMetrics metrics={metrics} isLoading={isLoading} />
          
          {/* Integration Status */}
          <IntegrationMetrics metrics={metrics} />
        </motion.div>
      </div>
    </div>
  );
};

export default FinanceAndRevenueManagement;
