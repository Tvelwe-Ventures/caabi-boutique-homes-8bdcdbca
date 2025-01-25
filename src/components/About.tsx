import { motion } from "framer-motion";
import { Particles } from "./ui/particles";
import { StandardCard } from "./ui/standard-card";
import { Info, Home, Star, Heart, DollarSign } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: Home,
      title: "88%",
      description: "Average Occupancy Rate",
      subtitle: "Consistently outperforming market average of 65%"
    },
    {
      icon: Star,
      title: "4.94",
      description: "Guest Satisfaction",
      subtitle: "Based on verified guest reviews"
    },
    {
      icon: Heart,
      title: "65+",
      description: "5-Star Reviews",
      subtitle: "From satisfied guests worldwide"
    },
    {
      icon: DollarSign,
      title: "32%",
      description: "Higher Revenue",
      subtitle: "Compared to traditional long-term rentals"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <Particles
        className="absolute inset-0 -z-10 opacity-20"
        quantity={30}
        staticity={90}
        color="#1EAEDB"
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <StandardCard
            icon={Info}
            title="About Caabi Boutique Homes"
            description="We're Caabi Boutique Homes, a small, family-run business that kicked off in May 2024 with just one property. Fast forward a bit, and we're now managing three beautiful homes, all in the heart of Downtown Dubai! What sets us apart? Well, we're all about the personal touch. We treat every property like it's part of our own family, making sure both homeowners and guests get the best experience possible. Since we're a boutique operation, we offer a level of attention and care that the bigger guys just can't match. Whether you're looking to rent out your property or stay in one of our luxurious homes, we're here to make it a smooth, stress-free experience from start to finish."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StandardCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              description={stat.description}
              subtitle={stat.subtitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;