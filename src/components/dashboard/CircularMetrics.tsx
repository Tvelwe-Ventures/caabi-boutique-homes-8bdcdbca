
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

// Professional financial color scheme
const COLORS = {
  revenue: ['#4CAF50', '#81C784', '#A5D6A7'],
  expense: ['#FF7043', '#FFB74D', '#FFCC80'],
  portfolio: ['#42A5F5', '#64B5F6', '#90CAF9'],
};

interface MetricChartProps {
  data: Array<{ name: string; value: number }>;
  colors: string[];
  title: string;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }: any) => {
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * RADIAN);
  
  // Calculate x position to align all labels on the right side
  const x = cx + 1.8 * outerRadius;
  // Calculate y position for stacked labels
  const y = cy - outerRadius + (index * 20);

  return (
    <g>
      {/* Connecting line */}
      <path
        d={`M ${cx + (outerRadius * Math.cos(-midAngle * RADIAN))},${cy + (outerRadius * Math.sin(-midAngle * RADIAN))} 
           L ${x - 40},${y}`}
        stroke="#9CA3AF"
        fill="none"
        strokeWidth="1"
      />
      {/* Label text */}
      <text
        x={x}
        y={y}
        fill="#374151"
        textAnchor="start"
        dominantBaseline="central"
        fontSize="12"
      >
        {`${name} (${value}%)`}
      </text>
    </g>
  );
};

const MetricChart = ({ data, colors, title }: MetricChartProps) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardHeader>
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="30%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
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

