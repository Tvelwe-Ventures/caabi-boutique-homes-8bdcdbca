
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Database, TrendingUp, TrendingDown, CircleDollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const COLORS = {
  revenue: ['#8394CA', '#B2D1E3', '#DFD5EA'],
  expense: ['#E5DEFF', '#D3E4FD', '#FDE1D3'],
  portfolio: ['#8394CA', '#1A2957', '#DFD5EA']
};

interface MetricChartProps {
  data: Array<{ name: string; value: number; trend: string }>;
  colors: string[];
  title: string;
  icon: React.ElementType;
  source: string;
}

const MetricChart = ({ data, colors, title, icon: Icon, source }: MetricChartProps) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <Card className="hover:bg-gray-50/50 transition-all duration-300">
      <CardHeader className="space-y-0 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-medium">{title}</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">Source: {source}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] relative flex">
          <ResponsiveContainer width="50%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={activeIndex !== null ? 85 : 80}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                animationDuration={300}
              >
                {data.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]}
                    strokeWidth={0}
                    className="transition-all duration-300"
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.7}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-center space-y-4 pl-4">
            {data.map((entry, index) => (
              <div 
                key={entry.name} 
                className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: colors[index] }}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {entry.name} ({entry.value}%)
                    </span>
                    <span className={`text-xs font-medium ${
                      entry.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {entry.trend}
                      {entry.trend.startsWith('+') 
                        ? <TrendingUp className="h-3 w-3 inline ml-1" />
                        : <TrendingDown className="h-3 w-3 inline ml-1" />
                      }
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

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
