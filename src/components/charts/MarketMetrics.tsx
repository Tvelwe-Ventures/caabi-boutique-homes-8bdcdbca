import { motion } from "framer-motion";
import { Building2, TrendingUp, Home, Activity, Calendar, Users, DollarSign, Percent } from "lucide-react";
import { StandardCard } from "../ui/standard-card";

interface MarketMetric {
  title: string;
  value: string;
  change?: string;
  icon: any;
  description: string;
}

const MarketMetrics = ({ metrics }: { metrics: MarketMetric[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <StandardCard
            icon={metric.icon}
            title={
              <div className="flex items-center gap-2">
                <span>{metric.value}</span>
                {metric.change && (
                  <span className={`text-sm ${
                    metric.change.startsWith('-') ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {metric.change}
                  </span>
                )}
              </div>
            }
            description={metric.title}
            className="hover:shadow-lg transition-shadow duration-200"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default MarketMetrics;