import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { BorderBeam } from "./ui/border-beam";
import { cn } from "@/lib/utils";
import { Particles } from "./ui/particles";

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
      className: "md:col-span-2 lg:col-span-1"
    },
    { 
      value: 4.94, 
      decimals: 2, 
      label: "Guest Satisfaction",
      description: "Based on verified guest reviews",
      className: "lg:col-span-2"
    },
    { 
      value: 65, 
      suffix: "+", 
      label: "5-Star Reviews",
      description: "From satisfied guests worldwide",
      className: "md:col-span-2 lg:col-span-1"
    },
  ];

  return (
    <section ref={ref} className="relative py-20 section-dark overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className={cn(
                "relative p-8 bento-card glow-effect group",
                stat.className
              )}
            >
              <BorderBeam duration={15} delay={index} />
              <div className="relative z-10">
                <div className="text-4xl font-bold animated-gradient-text mb-2">
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2}
                      decimals={stat.decimals || 0}
                      suffix={stat.suffix || ""}
                    />
                  )}
                </div>
                <p className="text-lg font-semibold text-white mb-2">{stat.label}</p>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;