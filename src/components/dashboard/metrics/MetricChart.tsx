
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
            <Icon className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
          <span className="text-[10px] text-muted-foreground">Source: {source}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] relative flex">
          <ResponsiveContainer width="45%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={activeIndex !== null ? 65 : 60}
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
          <div className="flex flex-col justify-center space-y-2 pl-2">
            {data.map((entry, index) => (
              <div 
                key={entry.name} 
                className="flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: colors[index] }}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-600">
                      {entry.name} ({entry.value}%)
                    </span>
                    <span className={`text-[10px] font-medium ${
                      entry.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {entry.trend}
                      {entry.trend.startsWith('+') 
                        ? <TrendingUp className="h-2.5 w-2.5 inline ml-0.5" />
                        : <TrendingDown className="h-2.5 w-2.5 inline ml-0.5" />
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
