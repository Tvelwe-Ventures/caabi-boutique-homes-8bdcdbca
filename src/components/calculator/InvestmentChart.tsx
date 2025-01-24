import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
    <div className="h-[300px] mt-8 bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Return Timeline Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRental" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAppreciation" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
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
                  <div className="bg-white p-3 border rounded shadow-lg">
                    <p className="font-semibold">Year {Math.floor(Number(label)/12)}</p>
                    {payload.map((entry: any, index: number) => (
                      <p key={index} className="text-sm">
                        {entry.name === "rental" ? "Rental Return: " : "Property Appreciation: "}
                        {(entry.value/1000000).toFixed(2)}M AED
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
            stroke="#8884d8" 
            fillOpacity={1}
            fill="url(#colorRental)"
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="appreciation" 
            stroke="#82ca9d" 
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