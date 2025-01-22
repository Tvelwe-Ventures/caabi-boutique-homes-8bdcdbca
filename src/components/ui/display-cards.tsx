import { motion } from "framer-motion";
import { Building, Users, Trophy } from "lucide-react";

const features = [
  {
    icon: <Building className="w-6 h-6 text-primary-foreground" />,
    title: "Premium Properties",
    description: "Exclusive properties in Downtown Dubai's most sought-after locations"
  },
  {
    icon: <Users className="w-6 h-6 text-primary-foreground" />,
    title: "Personal Service",
    description: "Dedicated support team available 24/7 for all your needs"
  },
  {
    icon: <Trophy className="w-6 h-6 text-primary-foreground" />,
    title: "Expert Management",
    description: "Professional property management with proven results"
  }
];

export function DisplayCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <div className="h-full p-8 rounded-xl bg-primary hover:bg-primary-light transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-foreground">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/90">
                {feature.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}