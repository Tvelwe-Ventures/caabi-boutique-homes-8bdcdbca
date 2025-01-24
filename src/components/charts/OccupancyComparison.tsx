import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CardSpotlight } from "../ui/card-spotlight";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const data = [
  { name: 'New York', value: 55, color: '#4169E1' },
  { name: 'London', value: 52, color: '#4169E1' },
  { name: 'Singapore', value: 36, color: '#4169E1' },
  { name: 'Hong Kong', value: 33, color: '#4169E1' },
  { name: 'Monaco', value: 37, color: '#4169E1' },
  { name: 'Dubai', value: 43, color: '#FF7F7F' },
  { name: 'Amsterdam', value: 48, color: '#E6E6FA' },
  { name: 'Berlin', value: 44, color: '#E6E6FA' },
  { name: 'Sydney', value: 47, color: '#E6E6FA' },
  { name: 'Paris', value: 38, color: '#E6E6FA' },
  { name: 'Los Angeles', value: 43, color: '#E6E6FA' },
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
              <span className="text-primary">occupancy level</span>
            </h2>
            <p className="text-gray-600 mb-6">
              We are proud to achieve the highest occupancy rates in Dubai for our clients across our portfolio.
              We proactively monitor market trends and implement a strategic pricing approach which ensures you keep ahead of the competition.
            </p>
            <Button className="inline-flex items-center gap-2">
              Book a free consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
        
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={140}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 rounded shadow">
                        <p className="text-sm">{`${payload[0].name}: ${payload[0].value}%`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CardSpotlight>
  );
};

export default OccupancyComparison;