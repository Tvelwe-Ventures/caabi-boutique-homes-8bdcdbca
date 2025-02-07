
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { SummaryMetrics } from "./components/SummaryMetrics";
import { OperationalMetrics } from "./components/OperationalMetrics";
import { IntegrationMetrics } from "./components/IntegrationMetrics";

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

      const defaultMetrics = {
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

      console.log("Retrieved financial metrics:", data || defaultMetrics);
      return data || defaultMetrics;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 md:p-8 space-y-6 md:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 animated-gradient-text">
                Finance & Revenue Management
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Comprehensive financial overview and revenue optimization tools
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Card className="glass-card p-2 w-full md:w-auto">
                <p className="text-xs text-muted-foreground">Last PriceLabs sync:</p>
                <p className="text-sm font-medium truncate">
                  {metrics?.last_sync_pricelabs 
                    ? new Date(metrics.last_sync_pricelabs).toLocaleString() 
                    : 'Never'}
                </p>
              </Card>
              <Card className="glass-card p-2 w-full md:w-auto">
                <p className="text-xs text-muted-foreground">Last Hostaway sync:</p>
                <p className="text-sm font-medium truncate">
                  {metrics?.last_sync_hostaway 
                    ? new Date(metrics.last_sync_hostaway).toLocaleString() 
                    : 'Never'}
                </p>
              </Card>
            </div>
          </div>

          {/* Performance Metrics */}
          <SummaryMetrics metrics={metrics} isLoading={isLoading} />

          {/* Operational Metrics */}
          <OperationalMetrics metrics={metrics} isLoading={isLoading} />

          {/* Integration Cards */}
          <IntegrationMetrics metrics={metrics} />
        </motion.div>
      </div>
    </div>
  );
};

export default FinanceAndRevenueManagement;
