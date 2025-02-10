
import React from "react";
import { Database, TrendingUp, CircleDollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MetricChart } from "./metrics/MetricChart";
import { COLORS } from "./metrics/constants";

export const CircularMetrics = () => {
  const { data: airbnbData, isLoading } = useQuery({
    queryKey: ['airbnb-revenue'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('airbnb_revenue_estimates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching Airbnb revenue data:', error);
        throw error;
      }

      console.log('Fetched Airbnb data:', data);
      return data;
    }
  });

  const revenueSourcesData = [
    { 
      name: "Property Rentals", 
      value: 45, 
      trend: airbnbData ? `+${((airbnbData.occupancy_rate || 0) * 100).toFixed(1)}%` : "+5.2%" 
    },
    { 
      name: "Service Fees", 
      value: 30, 
      trend: "+2.8%" 
    },
    { 
      name: "Management Fees", 
      value: 25, 
      trend: "-1.5%" 
    },
  ];

  const expenseDistributionData = [
    { 
      name: "Operations", 
      value: 40, 
      trend: "+3.1%" 
    },
    { 
      name: "Maintenance", 
      value: 35, 
      trend: "+0.8%" 
    },
    { 
      name: "Marketing", 
      value: 25, 
      trend: "-2.3%" 
    },
  ];

  const portfolioAllocationData = [
    { 
      name: "Residential", 
      value: 50, 
      trend: airbnbData ? `+${((airbnbData.annual_revenue || 0) / 1000).toFixed(1)}k` : "+4.2%" 
    },
    { 
      name: "Commercial", 
      value: 30, 
      trend: "+1.7%" 
    },
    { 
      name: "Vacation", 
      value: 20, 
      trend: "+6.3%" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricChart
        data={revenueSourcesData}
        colors={COLORS.revenue}
        title="Revenue Distribution"
        icon={CircleDollarSign}
        source={isLoading ? "Loading..." : "Financial Reports"}
      />
      <MetricChart
        data={expenseDistributionData}
        colors={COLORS.expense}
        title="Expense Distribution"
        icon={TrendingUp}
        source="Expense Tracker"
      />
      <MetricChart
        data={portfolioAllocationData}
        colors={COLORS.portfolio}
        title="Portfolio Allocation"
        icon={Database}
        source="Asset Management"
      />
    </div>
  );
};
