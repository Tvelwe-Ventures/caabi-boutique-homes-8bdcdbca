import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { PriceLabsMarketData, PriceLabsPropertyData, PriceLabsRecommendation } from "@/types/pricelabs";

interface PriceLabsParams {
  endpoint: 'market-data' | 'listings' | 'neighborhood-data' | 'reservation-data';
  params?: Record<string, string>;
}

export function usePriceLabsData<T extends PriceLabsMarketData | PriceLabsPropertyData | PriceLabsRecommendation>({ 
  endpoint, 
  params 
}: PriceLabsParams) {
  return useQuery({
    queryKey: ['pricelabs', endpoint, params],
    queryFn: async () => {
      console.log(`Fetching PriceLabs data for ${endpoint}`, params);
      
      const { data, error } = await supabase.functions.invoke('price-labs', {
        body: { endpoint, params }
      });

      if (error) {
        console.error('PriceLabs query error:', error);
        throw error;
      }

      console.log(`PriceLabs data received for ${endpoint}:`, data);
      return data as T;
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2
  });
}

// Convenience hooks for specific PriceLabs data types
export function useMarketData(params?: Record<string, string>) {
  return usePriceLabsData<PriceLabsMarketData>({
    endpoint: 'market-data',
    params
  });
}

export function usePropertyData(params?: Record<string, string>) {
  return usePriceLabsData<PriceLabsPropertyData>({
    endpoint: 'listings',
    params
  });
}

export function usePriceRecommendations(params?: Record<string, string>) {
  return usePriceLabsData<PriceLabsRecommendation>({
    endpoint: 'neighborhood-data',
    params
  });
}