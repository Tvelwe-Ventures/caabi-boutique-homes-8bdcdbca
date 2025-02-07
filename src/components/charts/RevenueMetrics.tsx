
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CardSpotlight } from "../ui/card-spotlight";

const data = [
  { city: 'New York', adr: 267.1, revenue: 63369.48, size: 80 },
  { city: 'London', adr: 232.91, revenue: 55257.90, size: 76 },
  { city: 'Singapore', adr: 181.69, revenue: 35771.68, size: 85 },
  { city: 'Hong Kong', adr: 118.77, revenue: 17773.96, size: 45 },
  { city: 'Monaco', adr: 395.41, revenue: 67832.59, size: 80 },
  { city: 'Los Angeles', adr: 303, revenue: 69674.85, size: 69 },
  { city: 'Paris', adr: 254.65, revenue: 69710.44, size: 112 },
  { city: 'Sydney', adr: 223.43, revenue: 55455.33, size: 214 },
  { city: 'Berlin', adr: 150.23, revenue: 40577.12, size: 109 },
  { city: 'Amsterdam', adr: 256.02, revenue: 72888.89, size: 117 },
  { city: 'Dubai', adr: 215.76, revenue: 44888.87, size: 66 }
];

const RevenueMetrics = () => {
  return (
    <CardSpotlight className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">Global Revenue Comparison</h2>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="city" 
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="#9b87f5" 
                label={{ value: 'Revenue (USD)', angle: -90, position: 'insideLeft' }} 
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#7E69AB" 
                label={{ value: 'ADR (USD)', angle: 90, position: 'insideRight' }} 
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-4 border rounded-lg shadow-lg">
                        <p className="font-semibold mb-2">{label}</p>
                        <p className="text-sm">
                          <span className="inline-block w-3 h-3 rounded-full bg-[#9b87f5] mr-2" />
                          Revenue: ${payload[0].value?.toLocaleString()}
                        </p>
                        <p className="text-sm">
                          <span className="inline-block w-3 h-3 rounded-full bg-[#7E69AB] mr-2" />
                          ADR: ${payload[1].value?.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#9b87f5" 
                strokeWidth={2}
                dot={{ fill: "#9b87f5" }}
                name="Revenue" 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="adr" 
                stroke="#7E69AB" 
                strokeWidth={2}
                dot={{ fill: "#7E69AB" }}
                name="ADR" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </CardSpotlight>
  );
};

export default RevenueMetrics;
