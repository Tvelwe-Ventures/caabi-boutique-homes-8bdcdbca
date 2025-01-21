import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', shortTerm: 14000, longTerm: 7500 },
  { month: 'Feb', shortTerm: 13000, longTerm: 7500 },
  { month: 'Mar', shortTerm: 13000, longTerm: 7500 },
  { month: 'Apr', shortTerm: 10000, longTerm: 7500 },
  { month: 'May', shortTerm: 9000, longTerm: 7500 },
  { month: 'Jun', shortTerm: 7000, longTerm: 7500 },
  { month: 'Jul', shortTerm: 7000, longTerm: 7500 },
  { month: 'Aug', shortTerm: 6000, longTerm: 7500 },
  { month: 'Sep', shortTerm: 10000, longTerm: 7500 },
  { month: 'Oct', shortTerm: 13000, longTerm: 7500 },
  { month: 'Nov', shortTerm: 13000, longTerm: 7500 },
  { month: 'Dec', shortTerm: 15000, longTerm: 7500 },
];

const RentalComparisonChart = () => {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis 
            dataKey="month" 
            stroke="#888" 
            fontSize={12}
          />
          <YAxis 
            stroke="#888" 
            fontSize={12}
            tickFormatter={(value) => `${value/1000}k`}
            label={{ 
              value: 'Income (AED)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="shortTerm"
            stroke="#7E69AB"
            strokeWidth={2}
            dot={{ fill: "#7E69AB" }}
            name="Short term letting"
          />
          <Line
            type="monotone"
            dataKey="longTerm"
            stroke="#FF6B6B"
            strokeWidth={2}
            dot={{ fill: "#FF6B6B" }}
            name="12 month tenancy"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RentalComparisonChart;