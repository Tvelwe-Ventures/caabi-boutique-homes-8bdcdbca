import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Home, Star, Heart, DollarSign } from "lucide-react";
import { CardSpotlight } from "./ui/card-spotlight";

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
      icon: <Home className="w-6 h-6 text-primary" />,
      className: "md:col-span-2 lg:col-span-1"
    },
    { 
      value: 4.94, 
      decimals: 2, 
      label: "Guest Satisfaction",
      description: "Based on verified guest reviews",
      icon: <Star className="w-6 h-6 text-primary/60" />,
      className: "lg:col-span-2"
    },
    { 
      value: 65, 
      suffix: "+", 
      label: "5-Star Reviews",
      description: "From satisfied guests worldwide",
      icon: <Heart className="w-6 h-6 text-primary/60" />,
      className: "md:col-span-2 lg:col-span-1"
    },
    { 
      value: 32, 
      suffix: "%", 
      label: "Higher Revenue",
      description: "Compared to traditional long-term rentals",
      icon: <DollarSign className="w-6 h-6 text-primary/60" />,
      className: "md:col-span-2 lg:col-span-1"
    }
  ];

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
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Delivering exceptional results through dedicated property management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className={stat.className}
            >
              <CardSpotlight className="h-full">
                <div className="relative z-10 p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold animated-gradient-text">
                    {inView && (
                      <>
                        <CountUp
                          end={stat.value}
                          duration={2}
                          decimals={stat.decimals || 0}
                        />
                        {stat.suffix}
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600">
                    {stat.label}
                  </h3>
                  <p className="text-gray-400">
                    {stat.description}
                  </p>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;