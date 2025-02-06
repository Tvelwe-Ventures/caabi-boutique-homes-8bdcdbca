import { motion } from "framer-motion";
import { DollarSign, Calendar, Users, Percent, Clock, Home } from "lucide-react";
import { StandardCard } from "../ui/standard-card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMarketData } from "@/hooks/usePriceLabsData";

const MarketKPIs = () => {
  const { data: marketData, isLoading: isPriceLabsLoading } = useMarketData();
  
  const { data: indicators, isLoading: isIndicatorsLoading } = useQuery({
    queryKey: ['market-kpis'],
    queryFn: async () => {
      console.log("Fetching UAE market indicators...");
      const { data, error } = await supabase
        .from('uae_market_indicators')
        .select('*')
        .order('time_period', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching market indicators:', error);
        throw error;
      }
      
      console.log("UAE market indicators received:", data);
      return data;
    }
  });

  // Calculate metrics from both PriceLabs and UAE market indicators
  const revenue = marketData?.revenue || indicators?.find(i => i.indicator_type === 'transaction_value')?.value || 0;
  const occupancy = marketData?.occupancy || indicators?.find(i => i.indicator_type === 'occupancy_rate')?.value || 0;
  const adr = marketData?.adr || indicators?.find(i => i.indicator_type === 'average_price')?.value || 0;
  const activeListings = marketData?.active_listings || indicators?.find(i => i.indicator_type === 'off_plan_sales')?.value || 0;

  const kpiData = [
    {
      title: "Revenue (Monthly)",
      value: `${(revenue / 1000000).toFixed(1)}M`,
      change: "+12.3%",
      icon: DollarSign,
      tooltip: "Total monthly revenue across all properties"
    },
    {
      title: "RevPAR",
      value: marketData?.revpar?.toFixed(0) || "62",
      change: "+8.5%",
      icon: DollarSign,
      tooltip: "Revenue per available room"
    },
    {
      title: "Occupancy %",
      value: occupancy?.toFixed(1) || "52",
      change: "+5.2%",
      icon: Percent,
      tooltip: "Current occupancy rate"
    },
    {
      title: "ADR",
      value: adr?.toFixed(0) || "119",
      change: "+10.3%",
      icon: DollarSign,
      tooltip: "Average Daily Rate"
    },
    {
      title: "Active Listings",
      value: activeListings?.toLocaleString() || "5.73K",
      change: "+3.6%",
      icon: Home,
      tooltip: "Number of active property listings"
    },
    {
      title: "Avg. Booking Value",
      value: marketData?.avg_booking_value?.toFixed(0) || "819",
      change: "+7.8%",
      icon: DollarSign,
      tooltip: "Average booking value"
    },
    {
      title: "Booking Window",
      value: marketData?.avg_booking_window?.toFixed(0) || "16",
      change: "-2.1",
      icon: Clock,
      tooltip: "Average days between booking and check-in"
    },
    {
      title: "Length of Stay",
      value: marketData?.avg_length_of_stay?.toFixed(1) || "3",
      change: "+0.5",
      icon: Users,
      tooltip: "Average length of stay in days"
    }
  ];

  if (isPriceLabsLoading || isIndicatorsLoading) {
    console.log("Loading market data...");
    return <div>Loading...</div>;
  }

  console.log("Rendered KPIs with PriceLabs data:", marketData);

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