
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMarketData } from "@/hooks/usePriceLabsData";
import { DollarSign, Calendar, Users, Percent, Clock, Home, Activity, TrendingUp } from "lucide-react";

export const useMarketKPIs = () => {
  const { data: marketData, isLoading: isPriceLabsLoading, error: priceLabsError } = useMarketData();
  
  const { data: indicators, isLoading: isIndicatorsLoading, error: indicatorsError } = useQuery({
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

  console.log("Combined market data status:", {
    isLoading: isPriceLabsLoading,
    error: priceLabsError,
    marketData,
    indicators
  });

  const revenue = marketData?.revenue || indicators?.find(i => i.indicator_type === 'transaction_value')?.value || 0;
  const occupancy = marketData?.occupancy || indicators?.find(i => i.indicator_type === 'occupancy_rate')?.value || 0;
  const adr = marketData?.adr || indicators?.find(i => i.indicator_type === 'average_price')?.value || 0;
  const activeListings = marketData?.active_listings || indicators?.find(i => i.indicator_type === 'active_listings')?.value || 0;

  const kpiData = [
    {
      title: "Revenue (Monthly)",
      value: `${(revenue / 1000000).toFixed(1)}M`,
      change: "+12.3%",
      icon: DollarSign,
      tooltip: "Total monthly revenue across all properties",
      source: "PriceLabs" as const
    },
    {
      title: "RevPAR",
      value: marketData?.revpar?.toFixed(0) || "62",
      change: "+8.5%",
      icon: DollarSign,
      tooltip: "Revenue per available room",
      source: "Combined" as const
    },
    {
      title: "Occupancy %",
      value: occupancy?.toFixed(1) || "52",
      change: "+5.2%",
      icon: Percent,
      tooltip: "Current occupancy rate",
      source: "PriceLabs" as const
    },
    {
      title: "ADR",
      value: adr?.toFixed(0) || "119",
      change: "+10.3%",
      icon: DollarSign,
      tooltip: "Average Daily Rate",
      source: "PriceLabs" as const
    },
    {
      title: "Active Listings",
      value: activeListings?.toLocaleString() || "5.73K",
      change: "+3.6%",
      icon: Home,
      tooltip: "Number of active property listings",
      source: "Hostaway" as const
    },
    {
      title: "Market Demand",
      value: marketData?.market_demand?.toUpperCase() || "MEDIUM",
      change: "+2.1%",
      icon: Activity,
      tooltip: "Current market demand level",
      source: "Hostaway" as const
    },
    {
      title: "Booking Window",
      value: `${marketData?.avg_booking_window?.toFixed(0) || "16"} days`,
      change: "-2.1",
      icon: Clock,
      tooltip: "Average days between booking and check-in",
      source: "PriceLabs" as const
    },
    {
      title: "Length of Stay",
      value: `${marketData?.avg_length_of_stay?.toFixed(1) || "3"} days`,
      change: "+0.5",
      icon: Users,
      tooltip: "Average length of stay in days",
      source: "PriceLabs" as const
    }
  ];

  return {
    kpiData,
    isLoading: isPriceLabsLoading || isIndicatorsLoading,
    marketData,
    error: priceLabsError || indicatorsError
  };
};
