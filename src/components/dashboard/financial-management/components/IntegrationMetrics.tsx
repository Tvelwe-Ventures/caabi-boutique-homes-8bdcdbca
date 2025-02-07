
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart3, DollarSign } from "lucide-react";

interface IntegrationMetricsProps {
  metrics: any;
}

export const IntegrationMetrics = ({ metrics }: IntegrationMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="glass-card transition-all duration-200 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]">
              PriceLabs Insights
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex justify-between items-center p-2 rounded-lg neo-blur">
              <span className="text-sm text-muted-foreground">Market Rate</span>
              <span className="font-medium">AED 850/night</span>
            </li>
            <li className="flex justify-between items-center p-2 rounded-lg neo-blur">
              <span className="text-sm text-muted-foreground">Demand Score</span>
              <span className="font-medium">85/100</span>
            </li>
            <li className="flex justify-between items-center p-2 rounded-lg neo-blur">
              <span className="text-sm text-muted-foreground">Price Recommendation</span>
              <span className="font-medium text-green-500">+12% increase</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="glass-card transition-all duration-200 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]">
              Hostaway Analytics
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex justify-between items-center p-2 rounded-lg neo-blur">
              <span className="text-sm text-muted-foreground">Booking Pace</span>
              <span className="font-medium">+23% MoM</span>
            </li>
            <li className="flex justify-between items-center p-2 rounded-lg neo-blur">
              <span className="text-sm text-muted-foreground">Channel Mix</span>
              <span className="font-medium">Airbnb 65%</span>
            </li>
            <li className="flex justify-between items-center p-2 rounded-lg neo-blur">
              <span className="text-sm text-muted-foreground">LOS Average</span>
              <span className="font-medium">4.2 nights</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="glass-card transition-all duration-200 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]">
              Financial Health
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex justify-between items-center p-2 rounded-lg neo-blur">
              <span className="text-sm text-muted-foreground">Gross Margin</span>
              <span className="font-medium">32%</span>
            </li>
            <li className="flex justify-between items-center p-2 rounded-lg neo-blur">
              <span className="text-sm text-muted-foreground">Cost per Booking</span>
              <span className="font-medium">AED 125</span>
            </li>
            <li className="flex justify-between items-center p-2 rounded-lg neo-blur">
              <span className="text-sm text-muted-foreground">Revenue Growth</span>
              <span className="font-medium text-green-500">+18% YoY</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
