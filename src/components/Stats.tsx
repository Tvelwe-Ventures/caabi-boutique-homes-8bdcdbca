import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Home, Star, Heart, DollarSign } from "lucide-react";
import { StandardCard } from "./ui/standard-card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { toast } = useToast();
  const [stats, setStats] = useState([
    { 
      value: 88, 
      suffix: "%", 
      label: "Average Occupancy Rate",
      description: "Consistently outperforming market average of 65%",
      icon: Home,
      className: "md:col-span-2 lg:col-span-1"
    },
    { 
      value: 4.94, 
      decimals: 2, 
      label: "Guest Satisfaction",
      description: "Based on verified guest reviews",
      icon: Star,
      className: "lg:col-span-2"
    },
    { 
      value: 65, 
      suffix: "+", 
      label: "5-Star Reviews",
      description: "From satisfied guests worldwide",
      icon: Heart,
      className: "md:col-span-2 lg:col-span-1"
    },
    { 
      value: 32, 
      suffix: "%", 
      label: "Higher Revenue",
      description: "Compared to traditional long-term rentals",
      icon: DollarSign,
      className: "md:col-span-2 lg:col-span-1"
    }
  ]);

  useEffect(() => {
    // Initial fetch of stats
    const fetchStats = async () => {
      try {
        const { data: evaluations, error } = await supabase
          .from('property_evaluations')
          .select('estimated_revenue, estimated_occupancy, average_daily_rate')
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) throw error;

        if (evaluations && evaluations.length > 0) {
          // Calculate averages
          const avgOccupancy = evaluations.reduce((acc, curr) => acc + Number(curr.estimated_occupancy), 0) / evaluations.length;
          const avgRevenue = evaluations.reduce((acc, curr) => acc + Number(curr.estimated_revenue), 0) / evaluations.length;
          const avgDailyRate = evaluations.reduce((acc, curr) => acc + Number(curr.average_daily_rate), 0) / evaluations.length;

          // Update stats with real data
          setStats(currentStats => 
            currentStats.map(stat => {
              if (stat.label === "Average Occupancy Rate") {
                return { ...stat, value: Math.round(avgOccupancy) };
              }
              if (stat.label === "Higher Revenue") {
                return { ...stat, value: Math.round((avgRevenue / 50000 - 1) * 100) }; // Comparing to baseline of 50k
              }
              return stat;
            })
          );
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('property_stats')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'property_evaluations'
        },
        async (payload) => {
          console.log('Real-time update received:', payload);
          
          // Fetch updated stats after any change
          await fetchStats();
          
          // Show toast notification
          toast({
            title: "Statistics Updated",
            description: "Real-time data has been refreshed",
            variant: "success",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Performance
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Delivering exceptional results through dedicated property management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StandardCard
              key={index}
              icon={stat.icon}
              title={
                inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix}
                  />
                ) : (
                  "0"
                )
              }
              description={stat.description}
              className={stat.className}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;