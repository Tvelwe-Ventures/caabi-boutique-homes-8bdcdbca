
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CircleProgress } from "./components/CircleProgress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, DollarSign, TrendingUp, Percent } from "lucide-react";

export const RevenueMetricsGrid = () => {
  // Fetch actual data but with fallback
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['revenue-metrics'],
    queryFn: async () => {
      console.log("Fetching revenue metrics with fallback...");
      try {
        const { data, error } = await supabase
          .from('property_revenue_metrics')
          .select('*')
          .order('date', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        
        // If no data, use fallback
        if (!data) {
          console.log("Using fallback data for demo");
          return {
            daily_revenue: 15000,
            occupancy_rate: 85,
            average_daily_rate: 750,
            revpar: 637.5
          };
        }

        console.log("Revenue metrics data:", data);
        return data;
      } catch (error) {
        console.error("Error, using fallback data:", error);
        return {
          daily_revenue: 15000,
          occupancy_rate: 85,
          average_daily_rate: 750,
          revpar: 637.5
        };
      }
    }
  });

  // Calculate monthly revenue from daily revenue
  const monthlyRevenue = metrics?.daily_revenue ? metrics.daily_revenue * 30 : 450000;
  
  // Calculate RevPAR (Revenue Per Available Room)
  const revpar = metrics?.average_daily_rate && metrics?.occupancy_rate 
    ? (metrics.average_daily_rate * metrics.occupancy_rate / 100)
    : 637.5;

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
                  <h3 className="text-lg font-medium">Revenue Growth</h3>
                </div>
                <p className="mt-2 text-3xl font-bold">${monthlyRevenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Monthly Performance</p>
              </div>
              <div className="flex-1 p-6">
                <CircleProgress
                  title="Monthly Growth"
                  value="+12.3%"
                  label="Revenue Growth"
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
                ${metrics?.average_daily_rate?.toLocaleString() || "750"}
              </p>
              <p className="text-sm text-muted-foreground">Daily Rate Performance</p>
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
              <p className="text-sm text-muted-foreground">Revenue Per Available Room</p>
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
              <p className="mt-2 text-2xl font-bold">{metrics?.occupancy_rate || "85"}%</p>
              <p className="text-sm text-muted-foreground">Current Occupancy</p>
              <div className="mt-4 flex-1">
                <div className="h-2 w-full bg-gray-100 rounded-full">
                  <div 
                    className="h-full bg-[#8394CA] rounded-full" 
                    style={{ width: `${metrics?.occupancy_rate || 85}%` }}
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
