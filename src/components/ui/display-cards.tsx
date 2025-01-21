import { motion } from "framer-motion";
import { CardSpotlight } from "./card-spotlight";
import { Building, Users, Trophy } from "lucide-react";

const features = [
  {
    icon: <Building className="w-6 h-6 text-primary-light" />,
    title: "Premium Properties",
    description: "Exclusive properties in Downtown Dubai's most sought-after locations"
  },
  {
    icon: <Users className="w-6 h-6 text-primary-light" />,
    title: "Personal Service",
    description: "Dedicated support team available 24/7 for all your needs"
  },
  {
    icon: <Trophy className="w-6 h-6 text-primary-light" />,
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
        >
          <CardSpotlight className="h-full">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          </CardSpotlight>
        </motion.div>
      ))}
    </div>
  );
}