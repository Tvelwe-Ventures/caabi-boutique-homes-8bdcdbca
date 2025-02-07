
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { Card, CardHeader, CardTitle } from "../ui/card";

interface InvestmentChartProps {
  data: Array<{
    month: number;
    rental: number;
    appreciation: number;
    total: number;
  }>;
}

const InvestmentChart = ({ data }: InvestmentChartProps) => {
  return (
    <Card className="bg-white shadow-sm border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Investment Growth</CardTitle>
        <p className="text-sm text-gray-500">Projected returns over time</p>
      </CardHeader>
      <div className="h-[400px] p-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRental" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAppreciation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tickFormatter={(value: number) => `Year ${Math.floor(value/12)}`}
              stroke="#94a3b8"
              axisLine={false}
              tickLine={false}
              ticks={[0, 12, 24, 36, 48, 60]}
            />
            <YAxis 
              stroke="#94a3b8"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) => `${(value/1000000).toFixed(1)}M`}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-4 border rounded-lg shadow-lg">
                      <p className="font-semibold mb-2">Year {Math.floor(Number(label)/12)}</p>
                      {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" 
                            style={{ 
                              backgroundColor: entry.name === "rental" ? "#6366F1" : "#A855F7" 
                            }} 
                          />
                          {entry.name === "rental" ? "Rental Return: " : "Property Appreciation: "}
                          {formatCurrency(entry.value)}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="rental" 
              stroke="#6366F1" 
              fillOpacity={1}
              fill="url(#colorRental)"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="appreciation" 
              stroke="#A855F7" 
              fillOpacity={1}
              fill="url(#colorAppreciation)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default InvestmentChart;
