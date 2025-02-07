
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

const RevenueMetrics = () => {
  const { data: analytics, isLoading, error } = useQuery({
    queryKey: ['revenue-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('revenue_analytics')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      return data;
    }
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load revenue analytics
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading || !analytics) {
    return <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />;
  }

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Revenue Analytics</CardTitle>
      </CardHeader>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analytics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" 
              tickFormatter={(value) => formatCurrency(value)} />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" 
              tickFormatter={(value) => `${value}%`} />
            <Tooltip 
              formatter={(value, name) => {
                if (name === "occupancy_rate") return `${value}%`;
                return formatCurrency(Number(value));
              }}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="daily_revenue" 
              stroke="#8884d8" 
              name="Daily Revenue"
              strokeWidth={2}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="occupancy_rate" 
              stroke="#82ca9d" 
              name="Occupancy Rate"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RevenueMetrics;
