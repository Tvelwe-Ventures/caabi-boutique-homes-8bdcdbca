import { motion } from "framer-motion";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { StandardCard } from "@/components/ui/standard-card";
import { Building2, TrendingUp, Home, Activity } from "lucide-react";

const Statistics = () => {
  // Sample data - Replace with actual API data
  const priceData = [
    { month: "Jan", price: 1250 },
    { month: "Feb", price: 1280 },
    { month: "Mar", price: 1300 },
    { month: "Apr", price: 1340 },
    { month: "May", price: 1360 },
    { month: "Jun", price: 1400 },
  ];

  const transactionData = [
    { area: "Downtown Dubai", transactions: 450 },
    { area: "Dubai Marina", transactions: 380 },
    { area: "Palm Jumeirah", transactions: 320 },
    { area: "Business Bay", transactions: 280 },
    { area: "JBR", transactions: 250 },
  ];

  const distributionData = [
    { month: "Jan", apartments: 65, villas: 35 },
    { month: "Feb", apartments: 68, villas: 32 },
    { month: "Mar", apartments: 62, villas: 38 },
    { month: "Apr", apartments: 64, villas: 36 },
    { month: "May", apartments: 66, villas: 34 },
    { month: "Jun", apartments: 63, villas: 37 },
  ];

  const stats = [
    {
      title: "Average Price/sqft",
      value: "AED 1,400",
      change: "+5.2%",
      icon: Building2,
      description: "Year-over-year increase"
    },
    {
      title: "Monthly Transactions",
      value: "2,850",
      change: "+12.3%",
      icon: TrendingUp,
      description: "Compared to last month"
    },
    {
      title: "Properties Listed",
      value: "15,420",
      change: "+8.7%",
      icon: Home,
      description: "Active listings"
    },
    {
      title: "Market Activity",
      value: "High",
      change: "+3.5%",
      icon: Activity,
      description: "Buyer interest"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Dubai Real Estate Statistics</h1>
        <p className="text-gray-600">Comprehensive market insights and trends</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StandardCard
            key={index}
            icon={stat.icon}
            title={stat.value}
            description={stat.title}
            className="card-hover-animation"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CardSpotlight className="p-6">
          <h3 className="text-xl font-semibold mb-4">Average Price Trends (AED/sqft)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#8380CA"
                  strokeWidth={2}
                  dot={{ fill: "#8380CA" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardSpotlight>

        <CardSpotlight className="p-6">
          <h3 className="text-xl font-semibold mb-4">Top Areas by Transactions</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="area" type="category" stroke="#94a3b8" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="transactions" fill="#8380CA" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardSpotlight>

        <CardSpotlight className="p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Property Type Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.5rem",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="apartments"
                  stackId="1"
                  stroke="#8380CA"
                  fill="#8380CA"
                />
                <Area
                  type="monotone"
                  dataKey="villas"
                  stackId="1"
                  stroke="#B2D1E3"
                  fill="#B2D1E3"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardSpotlight>
      </div>
    </div>
  );
};

export default Statistics;