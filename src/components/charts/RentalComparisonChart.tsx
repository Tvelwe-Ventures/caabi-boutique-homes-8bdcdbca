
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

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
        <AreaChart data={data}>
          <defs>
            <linearGradient id="shortTermGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="longTermGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7E69AB" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#7E69AB" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F0FB" />
          <XAxis 
            dataKey="month" 
            stroke="#8E9196" 
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#8E9196" 
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `${value/1000}k`}
            label={{ 
              value: 'Revenue (AED)', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: '#8E9196', textAnchor: 'middle' }
            }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #F1F0FB',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            formatter={(value: number) => [`AED ${value.toLocaleString()}`, '']}
          />
          <Area
            type="monotone"
            dataKey="shortTerm"
            stroke="#9b87f5"
            strokeWidth={2}
            fill="url(#shortTermGradient)"
            name="Short term letting"
          />
          <Area
            type="monotone"
            dataKey="longTerm"
            stroke="#7E69AB"
            strokeWidth={2}
            fill="url(#longTermGradient)"
            name="12 month tenancy"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RentalComparisonChart;
