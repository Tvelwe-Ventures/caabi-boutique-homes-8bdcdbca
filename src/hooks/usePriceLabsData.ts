import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PriceLabsParams {
  endpoint: string;
  params?: Record<string, any>;
}

export function usePriceLabsData({ endpoint, params }: PriceLabsParams) {
  return useQuery({
    queryKey: ['pricelabs', endpoint, params],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('price-labs', {
        body: { endpoint, params }
      });

      if (error) throw error;
      return data;
    }
  });
}