
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const revenueSourcesData = [
  { name: "Property Rentals", value: 45 },
  { name: "Service Fees", value: 30 },
  { name: "Management Fees", value: 25 },
];

const expenseDistributionData = [
  { name: "Operations", value: 40 },
  { name: "Maintenance", value: 35 },
  { name: "Marketing", value: 25 },
];

const portfolioAllocationData = [
  { name: "Residential", value: 50 },
  { name: "Commercial", value: 30 },
  { name: "Vacation", value: 20 },
];

// Updated color scheme using design system colors
const COLORS = {
  revenue: ['#8394CA', '#B2D1E3', '#DFD5EA'],
  expense: ['#1A2957', '#8E9196', '#F8F9FC'],
  portfolio: ['#8394CA', '#1A2957', '#DFD5EA'],
};

interface MetricChartProps {
  data: Array<{ name: string; value: number }>;
  colors: string[];
  title: string;
}

const MetricChart = ({ data, colors, title }: MetricChartProps) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardHeader>
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] relative flex">
        <ResponsiveContainer width="50%" height="100%">
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
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]}
                  strokeWidth={0}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col justify-center space-y-4 pl-4">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[index] }}
              />
              <span className="text-sm text-gray-600">
                {entry.name} ({entry.value}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

export const CircularMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MetricChart
        data={revenueSourcesData}
        colors={COLORS.revenue}
        title="Revenue Sources"
      />
      <MetricChart
        data={expenseDistributionData}
        colors={COLORS.expense}
        title="Expense Distribution"
      />
      <MetricChart
        data={portfolioAllocationData}
        colors={COLORS.portfolio}
        title="Portfolio Allocation"
      />
      <div className="hidden md:block" /> {/* Empty div for 2x2 grid alignment */}
    </div>
  );
};
