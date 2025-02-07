import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";

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
    <div className="h-[400px] mt-8 bg-white/50 rounded-lg p-6 border border-primary/20">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">Return Timeline Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRental" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8394CA" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8394CA" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAppreciation" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B2D1E3" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#B2D1E3" stopOpacity={0}/>
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
                            backgroundColor: entry.name === "rental" ? "#8394CA" : "#B2D1E3" 
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
            stroke="#8394CA" 
            fillOpacity={1}
            fill="url(#colorRental)"
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="appreciation" 
            stroke="#B2D1E3" 
            fillOpacity={1}
            fill="url(#colorAppreciation)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvestmentChart;