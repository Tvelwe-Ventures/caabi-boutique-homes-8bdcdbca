
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CreditCard, DollarSign, LineChart, TrendingUp, Activity, BadgeDollarSign, BarChart3, Percent } from "lucide-react";
import { StandardCard } from "@/components/ui/standard-card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const FinanceAndRevenueManagement = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['financial-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('financial_metrics')
        .select('*')
        .order('month', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        toast({
          title: "Error fetching metrics",
          description: "Could not load financial metrics",
          variant: "destructive",
        });
        throw error;
      }

      console.log("Latest financial metrics:", data);
      return data;
    }
  });

  const summaryMetrics = [
    {
      title: "Monthly Revenue",
      value: metrics?.monthly_revenue ? formatCurrency(metrics.monthly_revenue) : "Loading...",
      icon: DollarSign,
      description: "Total revenue this month",
      trend: "+12.3%",
      trendType: "positive",
      helperText: "Combined revenue from all properties"
    },
    {
      title: "Average Daily Rate",
      value: metrics?.avg_daily_rate ? formatCurrency(metrics.avg_daily_rate) : "Loading...",
      icon: BadgeDollarSign,
      description: "ADR across properties",
      trend: "+8.7%",
      trendType: "positive",
      helperText: "Average rate per night"
    },
    {
      title: "RevPAR",
      value: metrics?.revpar ? formatCurrency(metrics.revpar) : "Loading...",
      icon: BarChart3,
      description: "Revenue per available room",
      trend: "+5.4%",
      trendType: "positive",
      helperText: "Revenue per available room"
    },
    {
      title: "Occupancy Rate",
      value: metrics?.occupancy_rate ? `${metrics.occupancy_rate}%` : "Loading...",
      icon: Percent,
      description: "Current occupancy",
      trend: "+3.2%",
      trendType: "positive",
      helperText: "Percentage of occupied rooms"
    }
  ];

  const operationalMetrics = [
    {
      title: "Operating Expenses",
      value: metrics?.operating_expenses ? formatCurrency(metrics.operating_expenses) : "Loading...",
      icon: Activity,
      description: "Total expenses this month",
      trend: "-2.1%",
      trendType: "negative"
    },
    {
      title: "Net Operating Income",
      value: metrics?.net_operating_income ? formatCurrency(metrics.net_operating_income) : "Loading...",
      icon: TrendingUp,
      description: "NOI this month",
      trend: "+8.7%",
      trendType: "positive"
    },
    {
      title: "Market Demand Score",
      value: metrics?.market_demand_score ? `${metrics.market_demand_score}/100` : "Loading...",
      icon: LineChart,
      description: "Current market demand",
      trend: "+4.5%",
      trendType: "positive"
    },
    {
      title: "Competitive Index",
      value: metrics?.competitive_index ? `${metrics.competitive_index}` : "Loading...",
      icon: Building2,
      description: "Market position score",
      trend: "+2.8%",
      trendType: "positive"
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-light">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full"
            >
              <StandardCard
                icon={metric.icon}
                title={
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg md:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        {metric.value}
                      </span>
                      <span 
                        className={`text-xs md:text-sm px-2 py-0.5 rounded-full ${
                          metric.trendType === "positive" 
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {metric.trend}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.helperText}</p>
                  </div>
                }
                description={metric.title}
                className="glass-card hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]"
              />
            </motion.div>
          ))}
        </div>

        {/* Operational Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {operationalMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full"
            >
              <StandardCard
                icon={metric.icon}
                title={
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg md:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                      {metric.value}
                    </span>
                    <span 
                      className={`text-xs md:text-sm px-2 py-0.5 rounded-full ${
                        metric.trendType === "positive" 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {metric.trend}
                    </span>
                  </div>
                }
                description={metric.title}
                className="glass-card hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]"
              />
            </motion.div>
          ))}
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  PriceLabs Insights
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <span className="text-sm text-muted-foreground">Market Rate</span>
                  <span className="font-medium">AED 850/night</span>
                </li>
                <li className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <span className="text-sm text-muted-foreground">Demand Score</span>
                  <span className="font-medium">85/100</span>
                </li>
                <li className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <span className="text-sm text-muted-foreground">Price Recommendation</span>
                  <span className="font-medium text-green-500">+12% increase</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  Hostaway Analytics
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <span className="text-sm text-muted-foreground">Booking Pace</span>
                  <span className="font-medium">+23% MoM</span>
                </li>
                <li className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <span className="text-sm text-muted-foreground">Channel Mix</span>
                  <span className="font-medium">Airbnb 65%</span>
                </li>
                <li className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <span className="text-sm text-muted-foreground">LOS Average</span>
                  <span className="font-medium">4.2 nights</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-primary" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  Financial Health
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <span className="text-sm text-muted-foreground">Gross Margin</span>
                  <span className="font-medium">32%</span>
                </li>
                <li className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <span className="text-sm text-muted-foreground">Cost per Booking</span>
                  <span className="font-medium">AED 125</span>
                </li>
                <li className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <span className="text-sm text-muted-foreground">Revenue Growth</span>
                  <span className="font-medium text-green-500">+18% YoY</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default FinanceAndRevenueManagement;
