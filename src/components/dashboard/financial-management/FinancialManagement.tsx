
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CreditCard, DollarSign, LineChart, TrendingUp, Activity, BadgeDollarSign, BarChart3, Percent } from "lucide-react";
import { StandardCard } from "@/components/ui/standard-card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import RevenueMetrics from "@/components/charts/RevenueMetrics";
import { formatCurrency } from "@/lib/utils";

const FinanceAndRevenueManagement = () => {
  const { toast } = useToast();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['financial-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('financial_metrics')
        .select('*')
        .order('month', { ascending: false })
        .limit(1);

      if (error) {
        toast({
          title: "Error fetching metrics",
          description: "Could not load financial metrics",
          variant: "destructive",
        });
        throw error;
      }

      console.log("Latest financial metrics:", data?.[0]);
      return data?.[0];
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
    <div className="p-8 space-y-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Finance & Revenue Management</h1>
            <p className="text-muted-foreground">
              Comprehensive financial overview and revenue optimization tools
            </p>
          </div>
          <div className="flex gap-2">
            <Card className="bg-accent/10 p-2">
              <p className="text-xs text-muted-foreground">Last PriceLabs sync:</p>
              <p className="text-sm font-medium">
                {metrics?.last_sync_pricelabs 
                  ? new Date(metrics.last_sync_pricelabs).toLocaleString() 
                  : 'Never'}
              </p>
            </Card>
            <Card className="bg-accent/10 p-2">
              <p className="text-xs text-muted-foreground">Last Hostaway sync:</p>
              <p className="text-sm font-medium">
                {metrics?.last_sync_hostaway 
                  ? new Date(metrics.last_sync_hostaway).toLocaleString() 
                  : 'Never'}
              </p>
            </Card>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StandardCard
                icon={metric.icon}
                title={
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold">{metric.value}</span>
                      <span 
                        className={`text-sm ${
                          metric.trendType === "positive" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {metric.trend}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.helperText}</p>
                  </div>
                }
                description={metric.title}
                className="hover:shadow-lg transition-shadow duration-200 bg-card"
              />
            </motion.div>
          ))}
        </div>

        {/* Operational Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {operationalMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StandardCard
                icon={metric.icon}
                title={
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">{metric.value}</span>
                    <span 
                      className={`text-sm ${
                        metric.trendType === "positive" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {metric.trend}
                    </span>
                  </div>
                }
                description={metric.title}
                className="hover:shadow-lg transition-shadow duration-200 bg-card"
              />
            </motion.div>
          ))}
        </div>

        {/* Revenue Charts */}
        <RevenueMetrics />

        {/* Integration Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                PriceLabs Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Market Rate</span>
                  <span className="font-medium">AED 850/night</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Demand Score</span>
                  <span className="font-medium">85/100</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Price Recommendation</span>
                  <span className="font-medium text-green-500">+12% increase</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Hostaway Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Booking Pace</span>
                  <span className="font-medium">+23% MoM</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Channel Mix</span>
                  <span className="font-medium">Airbnb 65%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">LOS Average</span>
                  <span className="font-medium">4.2 nights</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Financial Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Gross Margin</span>
                  <span className="font-medium">32%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cost per Booking</span>
                  <span className="font-medium">AED 125</span>
                </li>
                <li className="flex justify-between items-center">
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
