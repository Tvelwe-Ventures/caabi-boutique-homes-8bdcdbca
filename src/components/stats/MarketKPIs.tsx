import { motion } from "framer-motion";
import { DollarSign, Calendar, Users, Percent, Clock, Home } from "lucide-react";
import { StandardCard } from "../ui/standard-card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface KPIMetric {
  title: string;
  value: string | number;
  change: string;
  icon: any;
  tooltip?: string;
}

const MarketKPIs = () => {
  const { data: metrics } = useQuery({
    queryKey: ['market-kpis'],
    queryFn: async () => {
      const { data: indicators, error } = await supabase
        .from('uae_market_indicators')
        .select('*')
        .order('time_period', { ascending: false })
        .limit(100);

      if (error) throw error;
      
      // Calculate metrics from indicators
      const revenue = indicators?.reduce((acc, curr) => 
        curr.indicator_type === 'revenue' ? curr.value : acc, 0);
      const occupancy = indicators?.reduce((acc, curr) => 
        curr.indicator_type === 'occupancy' ? curr.value : acc, 0);
      
      return {
        revenue,
        occupancy,
        // Add more calculated metrics as needed
      };
    }
  });

  const kpiData: KPIMetric[] = [
    {
      title: "Revenue (Estimated)",
      value: metrics?.revenue || "17.5K",
      change: "-9.61K",
      icon: DollarSign,
      tooltip: "Total estimated revenue across all properties"
    },
    {
      title: "RevPAR",
      value: "62",
      change: "-29",
      icon: DollarSign,
      tooltip: "Revenue per available room"
    },
    {
      title: "Occupancy %",
      value: metrics?.occupancy || "52",
      change: "-15",
      icon: Percent,
      tooltip: "Current occupancy rate"
    },
    {
      title: "ADR",
      value: "119",
      change: "-16",
      icon: DollarSign,
      tooltip: "Average Daily Rate"
    },
    {
      title: "Active Listings",
      value: "5.73K",
      change: "+36",
      icon: Home,
      tooltip: "Number of active property listings"
    },
    {
      title: "Bookings",
      value: "81.9K",
      change: "-17.2K",
      icon: Calendar,
      tooltip: "Total number of bookings"
    },
    {
      title: "Booking Window",
      value: "16",
      change: "-10",
      icon: Clock,
      tooltip: "Average days between booking and check-in"
    },
    {
      title: "Length of Stay",
      value: "3",
      change: "-1",
      icon: Users,
      tooltip: "Average length of stay in days"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((metric, index) => (
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
                <span className={`text-sm ${metric.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                  {metric.change}
                </span>
              </div>
            }
            description={metric.title}
            tooltip={metric.tooltip}
            className="hover:shadow-lg transition-shadow duration-200"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default MarketKPIs;