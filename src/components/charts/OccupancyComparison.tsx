import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { CardSpotlight } from "../ui/card-spotlight";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const data = [
  { name: 'New York', value: 55, color: '#E6E6FA' },
  { name: 'London', value: 52, color: '#E6E6FA' },
  { name: 'Singapore', value: 36, color: '#E6E6FA' },
  { name: 'Hong Kong', value: 33, color: '#E6E6FA' },
  { name: 'Monaco', value: 37, color: '#E6E6FA' },
  { name: 'Dubai', value: 43, color: '#4169E1' },
  { name: 'Amsterdam', value: 48, color: '#D3D3D3' },
  { name: 'Berlin', value: 44, color: '#D3D3D3' },
  { name: 'Sydney', value: 47, color: '#D3D3D3' },
  { name: 'Paris', value: 38, color: '#D3D3D3' },
  { name: 'Los Angeles', value: 43, color: '#D3D3D3' },
];

const OccupancyComparison = () => {
  return (
    <CardSpotlight className="p-8">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Dubai's short-let<br />
              <span className="text-[#4169E1]">occupancy level</span>
            </h2>
            <p className="text-gray-600 mb-6">
              We are proud to achieve the highest occupancy rates in Dubai for our clients across our portfolio.
              We proactively monitor market trends and implement a strategic pricing approach which ensures you keep ahead of the competition.
            </p>
            <Button className="inline-flex items-center gap-2 bg-[#4169E1] hover:bg-[#3158D3]">
              Book a free consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
        
        <div className="h-[400px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[0, 60]} 
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={100}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border">
                        <p className="font-semibold">{label}</p>
                        <p className="text-[#4169E1]">
                          Occupancy: {payload[0].value}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="value"
                fill="#4169E1"
                radius={[0, 4, 4, 0]}
                barSize={20}
              >
                {data.map((entry, index) => (
                  <motion.rect
                    key={`bar-${index}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CardSpotlight>
  );
};

export default OccupancyComparison;