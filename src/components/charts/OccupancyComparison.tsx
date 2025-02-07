
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
  { name: 'Dubai', value: 43, color: '#8380CA' },
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
              Dubai's short-term<br />
              <span className="text-[#8380CA]">occupancy level</span>
            </h2>
            <p className="text-gray-600 mb-6">
              We are proud to achieve the highest occupancy rates in Dubai for our clients across our portfolio.
              We proactively monitor market trends and implement a strategic pricing approach which ensures you keep ahead of the competition.
            </p>
            <Button className="inline-flex items-center gap-2 bg-[#8380CA] hover:bg-[#1A2957]">
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
              layout="horizontal"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                type="number"
                domain={[0, 60]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border">
                        <p className="font-semibold">{label}</p>
                        <p className="text-[#8380CA]">
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
                radius={[4, 4, 0, 0]}
                barSize={30}
                fill="#E6E6FA"
              >
                {data.map((entry, index) => (
                  <motion.rect
                    key={`bar-${index}`}
                    fill={entry.name === 'Dubai' ? '#8380CA' : '#E6E6FA'}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
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
