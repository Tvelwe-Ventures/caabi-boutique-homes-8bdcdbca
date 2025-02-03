import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: 'Jan', performance: 8.2 },
  { month: 'Feb', performance: 8.4 },
  { month: 'Mar', performance: 8.7 },
  { month: 'Apr', performance: 8.5 },
  { month: 'May', performance: 8.6 },
  { month: 'Jun', performance: 8.9 },
];

const portfolioStats = [
  {
    title: "Total Portfolio Value",
    value: formatCurrency(12500000),
    change: "+5.2%",
    isPositive: true,
  },
  {
    title: "Annual Return",
    value: "8.7%",
    change: "+0.5%",
    isPositive: true,
  },
  {
    title: "Occupancy Rate",
    value: "92%",
    change: "-2%",
    isPositive: false,
  }
];

const PortfolioPerformance = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolioStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`text-sm ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, "Performance"]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="#8884d8"
                  name="ROI %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioPerformance;