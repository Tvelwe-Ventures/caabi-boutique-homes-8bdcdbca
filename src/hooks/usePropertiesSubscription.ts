
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const usePropertiesSubscription = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('properties_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'properties'
        },
        async (payload) => {
          console.log('Real-time property update received:', payload);
          
          // Invalidate and refetch queries
          await queryClient.invalidateQueries({ queryKey: ['financial-metrics'] });
          
          // Show notification
          toast({
            title: "Property Update",
            description: `Property data has been ${payload.eventType.toLowerCase()}d`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast]);
};
