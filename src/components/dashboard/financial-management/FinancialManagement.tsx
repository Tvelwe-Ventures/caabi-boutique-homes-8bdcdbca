
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CreditCard, DollarSign, LineChart, TrendingUp, Activity } from "lucide-react";
import { StandardCard } from "@/components/ui/standard-card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const FinanceAndRevenueManagement = () => {
  const { toast } = useToast();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['financial-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('financial_metrics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        toast({
          title: "Error fetching metrics",
          description: "Could not load financial metrics",
          variant: "destructive",
        });
        throw error;
      }

      return data?.[0];
    }
  });

  const summaryMetrics = [
    {
      title: "Monthly Revenue",
      value: metrics?.monthly_revenue ? `AED ${metrics.monthly_revenue.toLocaleString()}` : "Loading...",
      icon: DollarSign,
      description: "Total revenue this month",
      trend: "+12.3%",
      trendType: "positive"
    },
    {
      title: "Net Operating Income",
      value: metrics?.net_operating_income ? `AED ${metrics.net_operating_income.toLocaleString()}` : "Loading...",
      icon: TrendingUp,
      description: "NOI this month",
      trend: "+8.7%",
      trendType: "positive"
    },
    {
      title: "Operating Expenses",
      value: metrics?.operating_expenses ? `AED ${metrics.operating_expenses.toLocaleString()}` : "Loading...",
      icon: Activity,
      description: "Total expenses this month",
      trend: "-2.1%",
      trendType: "negative"
    },
    {
      title: "Revenue Per Property",
      value: "AED 13,033",
      icon: Building2,
      description: "Average revenue per property",
      trend: "+5.4%",
      trendType: "positive"
    }
  ];

  return (
    <div className="p-8 space-y-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Finance & Revenue Management</h1>
        <p className="text-gray-600">Comprehensive financial overview and revenue optimization tools</p>
      </motion.div>

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
                </div>
              }
              description={metric.title}
              className="hover:shadow-lg transition-shadow duration-200 bg-card"
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            Revenue chart integration coming soon...
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Expense Analysis</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            Expense analysis integration coming soon...
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>PriceLabs Insights</CardTitle>
          </CardHeader>
          <CardContent>
            Market rate optimization data coming soon...
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Hostaway Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            Channel performance data coming soon...
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Financial Health</CardTitle>
          </CardHeader>
          <CardContent>
            Key performance indicators coming soon...
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinanceAndRevenueManagement;
