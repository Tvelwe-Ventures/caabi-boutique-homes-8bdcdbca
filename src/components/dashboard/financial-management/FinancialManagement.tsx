
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
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const StatusBadge = ({ status, time, percentage }: { status: 'completed' | 'failed', time: string, percentage: number }) => (
    <div className={cn(
      "flex items-center justify-between px-3 py-1.5 rounded-full text-sm transition-colors duration-200",
      status === 'completed' ? "bg-[#F2FCE2] text-green-700 hover:bg-[#E7F7D4]" : "bg-[#FFDEE2] text-red-700 hover:bg-[#FFD4D9]"
    )}>
      <div className="flex items-center gap-2">
        {status === 'completed' ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
        <span className="font-medium capitalize">{status}</span>
        <span className="text-gray-500 text-xs">{time}</span>
      </div>
      <span className={cn(
        "flex items-center font-medium",
        percentage > 0 ? "text-green-600" : "text-red-600"
      )}>
        {percentage > 0 ? "+" : ""}{percentage}%
      </span>
    </div>
  );

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
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <StatusBadge 
                status="completed" 
                time="2h ago" 
                percentage={12.3} 
              />
              <StatusBadge 
                status="failed" 
                time="1m ago" 
                percentage={-5.2} 
              />
            </div>
          </div>

          {/* Data Flow Visualization with unified hub design */}
          <Card className="p-6 bg-gradient-to-br from-background to-secondary/20">
            <DataFlowVisualization />
          </Card>

          {/* Revenue Metrics Grid with new design */}
          <Card className="p-6 bg-gradient-to-br from-background to-secondary/20">
            <RevenueMetricsGrid />
          </Card>

          {/* Key Financial Metrics with circular design */}
          <Card className="p-6 bg-gradient-to-br from-background to-secondary/20">
            <SummaryMetrics metrics={metrics} isLoading={isLoading} />
          </Card>
          
          {/* Operational Performance with updated styling */}
          <Card className="p-6 bg-gradient-to-br from-background to-secondary/20">
            <OperationalMetrics metrics={metrics} isLoading={isLoading} />
          </Card>
          
          {/* Integration Status with new logos */}
          <Card className="p-6 bg-gradient-to-br from-background to-secondary/20">
            <IntegrationMetrics metrics={metrics} />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FinanceAndRevenueManagement;
