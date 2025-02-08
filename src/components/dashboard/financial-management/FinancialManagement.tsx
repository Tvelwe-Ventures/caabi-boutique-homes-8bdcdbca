import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { SummaryMetrics } from "./components/SummaryMetrics";
import { OperationalMetrics } from "./components/OperationalMetrics";
import { RevenueMetricsGrid } from "./RevenueMetricsGrid";
import { KPICard } from "@/components/ui/kpi-card";
import { Users, DollarSign, TrendingUp, Activity } from "lucide-react";
import { CircleProgress } from "./components/CircleProgress";

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
        competitive_index: 0
      };
    }
  });

  // Circle progress metrics
  const circleMetrics = [
    {
      title: "Activity",
      value: "1,358",
      label: "Active Users",
      progress: 75,
      color: "#ffffff"
    },
    {
      title: "Revenue",
      value: "2,450",
      label: "Monthly",
      progress: 85,
      color: "#8394CA"
    },
    {
      title: "Engagement",
      value: "4,200",
      label: "Daily Views",
      progress: 92,
      color: "#9b87f5"
    }
  ];

  // KPI cards data
  const kpiMetrics = [
    {
      title: "Total Revenue",
      value: "$228,451",
      change: "+33%",
      changeType: "positive" as const,
      trendType: "up" as const,
      icon: <DollarSign className="h-4 w-4 text-green-700" />
    },
    {
      title: "Total Expenses",
      value: "$71,887",
      change: "-13.0%",
      changeType: "negative" as const,
      trendType: "down" as const,
      icon: <Activity className="h-4 w-4 text-red-700" />
    },
    {
      title: "Net Profit",
      value: "$156,540",
      change: "0.0%",
      changeType: "neutral" as const,
      trendType: "neutral" as const,
      icon: <TrendingUp className="h-4 w-4 text-yellow-700" />
    },
    {
      title: "New Customers",
      value: "1,234",
      change: "+1.0%",
      changeType: "positive" as const,
      trendType: "up" as const,
      icon: <Users className="h-4 w-4 text-green-700" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 md:p-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          {/* Header section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <img 
                  src="/lovable-uploads/dcc3e3a2-4ae3-4d6c-8301-ac7bcc8bd14f.png" 
                  alt="QuacaBoard" 
                  className="h-8 md:h-10"
                />
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Track and optimize your portfolio's financial performance
              </p>
            </div>
          </div>

          {/* Circle Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {circleMetrics.map((metric, index) => (
              <CircleProgress key={index} {...metric} />
            ))}
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiMetrics.map((metric, index) => (
              <KPICard
                key={index}
                {...metric}
                variant="gradient"
              />
            ))}
          </div>

          {/* Revenue Metrics Grid */}
          <Card className="p-6 bg-gradient-to-br from-background to-secondary/20">
            <RevenueMetricsGrid />
          </Card>

          {/* Operational Metrics */}
          <Card className="p-6 bg-gradient-to-br from-background to-secondary/20">
            <OperationalMetrics metrics={metrics} isLoading={isLoading} />
          </Card>

          {/* Summary Metrics */}
          <Card className="p-6 bg-gradient-to-br from-background to-secondary/20">
            <SummaryMetrics metrics={metrics} isLoading={isLoading} />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FinanceAndRevenueManagement;
