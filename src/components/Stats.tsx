import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

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
      description: "Consistently outperforming market average of 65%"
    },
    { 
      value: 4.94, 
      decimals: 2, 
      label: "Guest Satisfaction",
      description: "Based on verified guest reviews"
    },
    { 
      value: 65, 
      suffix: "+", 
      label: "5-Star Reviews",
      description: "From satisfied guests worldwide"
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-white to-primary/5">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl font-bold text-primary mb-2">
                {inView && (
                  <CountUp
                    end={stat.value}
                    duration={2}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix || ""}
                  />
                )}
              </div>
              <p className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</p>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;