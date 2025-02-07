
import { motion } from "framer-motion";
import { User, Star, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export const GuestInsights = () => {
  const { data: guestData, isLoading } = useQuery({
    queryKey: ['guest-metrics'],
    queryFn: async () => {
      const { data: guests, error } = await supabase
        .from('guests')
        .select('*');

      if (error) {
        throw error;
      }
      
      return {
        totalGuests: guests?.length || 0,
        averageRating: guests?.reduce((acc, guest) => acc + (guest.average_rating || 0), 0) / (guests?.length || 1),
        repeatGuests: guests?.filter(guest => guest.total_stays > 1).length || 0
      };
    },
    staleTime: 5 * 60 * 1000 // Consider data fresh for 5 minutes
  });

  const metrics = [
    {
      title: "Total Guests",
      value: guestData?.totalGuests || 0,
      change: "+12%",
      icon: Users,
      color: "bg-primary/10"
    },
    {
      title: "Average Rating",
      value: `${(guestData?.averageRating || 0).toFixed(1)}/5.0`,
      change: "+5%",
      icon: Star,
      color: "bg-yellow-50"
    },
    {
      title: "Repeat Guests",
      value: guestData?.repeatGuests || 0,
      change: "+18%",
      icon: User,
      color: "bg-green-50"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900">Guest Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <CardSpotlight 
            key={metric.title}
            className="p-6 bg-white/95 backdrop-blur-sm border border-gray-100 hover:border-gray-200 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">{metric.title}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">{metric.value}</span>
                  <span className="text-sm font-medium text-green-600">
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className={`p-2 rounded-lg ${metric.color}`}>
                <metric.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: '70%' }}
                />
              </div>
            </div>
          </CardSpotlight>
        ))}
      </div>
    </motion.div>
  );
};
