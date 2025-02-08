
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const trafficData = [
  { name: "Search", value: 35 },
  { name: "Direct", value: 25 },
  { name: "Social", value: 20 },
  { name: "Referral", value: 20 },
];

const deviceData = [
  { name: "Mobile", value: 45 },
  { name: "Desktop", value: 35 },
  { name: "Tablet", value: 15 },
  { name: "Smart TV", value: 5 },
];

const browserData = [
  { name: "Chrome", value: 45 },
  { name: "Safari", value: 30 },
  { name: "Firefox", value: 15 },
  { name: "Edge", value: 10 },
];

// Light mode colors
const COLORS = {
  traffic: ['#F7C948', '#FFD975', '#FFE5A3', '#FFF2D1'],
  device: ['#7ED49F', '#A5E4BE', '#C9F0D9', '#E8F9EF'],
  browser: ['#FF8B8B', '#FFB3B3', '#FFD1D1', '#FFEAEA'],
};

interface MetricChartProps {
  data: Array<{ name: string; value: number }>;
  colors: string[];
  title: string;
}

const MetricChart = ({ data, colors, title }: MetricChartProps) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute bottom-0 w-full">
          <div className="flex flex-wrap justify-center gap-4">
            {data.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="text-sm text-gray-600">
                  {entry.name} ({entry.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const CircularMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricChart
        data={trafficData}
        colors={COLORS.traffic}
        title="Traffic Sources"
      />
      <MetricChart
        data={deviceData}
        colors={COLORS.device}
        title="Device Usage"
      />
      <MetricChart
        data={browserData}
        colors={COLORS.browser}
        title="Browser Usage"
      />
    </div>
  );
};
