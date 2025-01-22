import { motion } from "framer-motion";
import { Building, Users, Trophy } from "lucide-react";
import { GradientCard } from "./gradient-card";

const features = [
  {
    icon: <Building className="w-6 h-6 text-primary" />,
    title: "Premium Properties",
    description: "Exclusive properties in Downtown Dubai's most sought-after locations"
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Personal Service",
    description: "Dedicated support team available 24/7 for all your needs"
  },
  {
    icon: <Trophy className="w-6 h-6 text-primary" />,
    title: "Expert Management",
    description: "Professional property management with proven results"
  }
];

export function DisplayCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 px-4">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <GradientCard>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-primary/10 dark:bg-white/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          </GradientCard>
        </motion.div>
      ))}
    </div>
  );
}