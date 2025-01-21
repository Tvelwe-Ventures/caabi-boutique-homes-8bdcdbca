import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";
import { Particles } from "./ui/particles";
import { GlareCard } from "./ui/glare-card";
import { DollarSign, Star, Home, Clock, Award, Heart } from "lucide-react";

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    { 
      value: 88, 
      suffix: "%", 
      label: "Average Occupancy Rate",
      description: "Consistently outperforming market average of 65%",
      icon: <Home className="w-6 h-6 text-primary-light" />,
      className: "md:col-span-2 lg:col-span-1"
    },
    { 
      value: 4.94, 
      decimals: 2, 
      label: "Guest Satisfaction",
      description: "Based on verified guest reviews",
      icon: <Star className="w-6 h-6 text-primary-light" />,
      className: "lg:col-span-2"
    },
    { 
      value: 65, 
      suffix: "+", 
      label: "5-Star Reviews",
      description: "From satisfied guests worldwide",
      icon: <Heart className="w-6 h-6 text-primary-light" />,
      className: "md:col-span-2 lg:col-span-1"
    },
    { 
      value: 32, 
      suffix: "%", 
      label: "Higher Revenue",
      description: "Compared to traditional long-term rentals",
      icon: <DollarSign className="w-6 h-6 text-primary-light" />,
      className: "md:col-span-2 lg:col-span-1"
    },
    { 
      value: 24, 
      suffix: "/7", 
      label: "Support Available",
      description: "Round-the-clock assistance for hosts and guests",
      icon: <Clock className="w-6 h-6 text-primary-light" />,
      className: "lg:col-span-2"
    },
    { 
      value: 10, 
      prefix: "Top ", 
      label: "Property Management",
      description: "Ranked among the best in the region",
      icon: <Award className="w-6 h-6 text-primary-light" />,
      className: "md:col-span-2 lg:col-span-1"
    },
  ];

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-black/40">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        staticity={50}
        color="var(--primary-light)"
      />
      
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold animated-gradient-text mb-6">
            Our Performance
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Delivering exceptional results through dedicated property management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className={cn("flex justify-center", stat.className)}
            >
              <GlareCard>
                <div className="p-8 flex flex-col items-center justify-center h-full">
                  <div className="mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-white via-primary-light to-white bg-clip-text text-transparent mb-2">
                    {inView && (
                      <>
                        {stat.prefix}
                        <CountUp
                          end={stat.value}
                          duration={2}
                          decimals={stat.decimals || 0}
                        />
                        {stat.suffix}
                      </>
                    )}
                  </div>
                  <p className="text-lg font-semibold text-white mb-2">{stat.label}</p>
                  <p className="text-sm text-gray-400 text-center">{stat.description}</p>
                </div>
              </GlareCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;