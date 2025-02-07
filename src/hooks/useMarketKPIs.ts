
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building2, TrendingUp, Home, Activity, DollarSign, Percent, FileText, CreditCard } from "lucide-react";

export const useMarketKPIs = () => {
  const { data: marketData, isLoading, error } = useQuery({
    queryKey: ['dubai-market-metrics'],
    queryFn: async () => {
      console.log("Fetching Dubai market metrics...");
      const { data, error } = await supabase
        .from('dubai_market_metrics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching market metrics:', error);
        throw error;
      }
      
      console.log("Dubai market metrics received:", data);
      return data;
    }
  });

  const formatValue = (value: number, type: string) => {
    if (type === 'market_value') {
      return `${(value / 1000000000).toFixed(1)}B`;
    }
    if (type === 'average_price_per_sqft') {
      return `${value.toLocaleString()} AED`;
    }
    if (type === 'rental_yield') {
      return `${value}%`;
    }
    if (value > 1000) {
      return value.toLocaleString();
    }
    return value.toString();
  };

  const kpiData = marketData?.map((metric, index) => {
    const getIcon = (type: string) => {
      switch (type) {
        case 'average_price_per_sqft':
          return DollarSign;
        case 'total_transactions':
          return Activity;
        case 'market_value':
          return Building2;
        case 'rental_yield':
          return TrendingUp;
        case 'off_plan_sales':
          return FileText;
        case 'mortgage_transactions':
          return CreditCard;
        default:
          return Home;
      }
    };

    const getTitle = (type: string) => {
      return type
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    return {
      title: getTitle(metric.metric_type),
      value: formatValue(Number(metric.value), metric.metric_type),
      change: metric.change_percentage > 0 ? `+${metric.change_percentage}%` : `${metric.change_percentage}%`,
      icon: getIcon(metric.metric_type),
      tooltip: `${metric.area}${metric.property_type !== 'All' ? ` - ${metric.property_type}` : ''} | ${metric.period}`,
      variant: index % 3 === 0 ? 'default' : index % 3 === 1 ? 'gradient' : 'outlined'
    };
  }) || [];

  return {
    kpiData,
    isLoading,
    error
  };
};
