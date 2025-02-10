
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { MetricChartProps } from "./types";

export const MetricChart = ({ data, colors, title, icon: Icon, source }: MetricChartProps) => {
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
