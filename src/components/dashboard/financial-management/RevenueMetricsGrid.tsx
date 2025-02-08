
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CircleProgress } from "./components/CircleProgress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, DollarSign, TrendingUp, Percent } from "lucide-react";

export const RevenueMetricsGrid = () => {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['revenue-metrics'],
    queryFn: async () => {
      console.log("Fetching revenue metrics...");
      const { data, error } = await supabase
        .from('property_revenue_metrics')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching revenue metrics:", error);
        throw error;
      }

      console.log("Revenue metrics data:", data);
      return data;
    }
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load revenue metrics
        </AlertDescription>
      </Alert>
    );
  }

  // Calculate monthly revenue from daily revenue
  const monthlyRevenue = metrics?.daily_revenue ? metrics.daily_revenue * 30 : 0;
  
  // Calculate RevPAR (Revenue Per Available Room)
  const revpar = metrics?.average_daily_rate && metrics?.occupancy_rate 
    ? (metrics.average_daily_rate * metrics.occupancy_rate / 100)
    : 0;

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="mt-6 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {/* Monthly Revenue - Large Card */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="px-6 pt-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#8394CA]" />
                  <h3 className="text-lg font-medium">Monthly Revenue</h3>
                </div>
                <p className="mt-2 text-3xl font-bold">${monthlyRevenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">+12.3% from last month</p>
              </div>
              <div className="flex-1 p-6">
                <CircleProgress
                  title="Revenue Growth"
                  value="+12.3%"
                  label="Monthly Growth"
                  progress={78}
                  color="#8394CA"
                />
              </div>
            </div>
          </div>

          {/* Average Daily Rate */}
          <div className="relative">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#8394CA]" />
                <h3 className="text-lg font-medium">Average Daily Rate</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">
                ${metrics?.average_daily_rate.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">+5.2% from last month</p>
              <div className="mt-4 flex-1">
                <div className="h-2 w-full bg-gray-100 rounded-full">
                  <div className="h-full w-3/4 bg-[#8394CA] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* RevPAR */}
          <div className="relative">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#8394CA]" />
                <h3 className="text-lg font-medium">RevPAR</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">${revpar.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">+8.7% from last month</p>
              <div className="mt-4 flex-1">
                <div className="h-2 w-full bg-gray-100 rounded-full">
                  <div className="h-full w-2/3 bg-[#8394CA] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Occupancy Rate */}
          <div className="relative lg:col-start-2">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6">
              <div className="flex items-center gap-2">
                <Percent className="h-5 w-5 text-[#8394CA]" />
                <h3 className="text-lg font-medium">Occupancy Rate</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">{metrics?.occupancy_rate}%</p>
              <p className="text-sm text-muted-foreground">+3.2% from last month</p>
              <div className="mt-4 flex-1">
                <div className="h-2 w-full bg-gray-100 rounded-full">
                  <div 
                    className="h-full bg-[#8394CA] rounded-full" 
                    style={{ width: `${metrics?.occupancy_rate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
