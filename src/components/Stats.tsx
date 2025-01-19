import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    { value: 88, suffix: "%", label: "Average Occupancy Rate" },
    { value: 4.94, decimals: 2, label: "Guest Satisfaction" },
    { value: 65, suffix: "+", label: "5-Star Reviews" },
  ];

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10"
            >
              <div className="text-4xl font-bold text-gold mb-2">
                {inView && (
                  <CountUp
                    end={stat.value}
                    duration={2}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix || ""}
                  />
                )}
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;