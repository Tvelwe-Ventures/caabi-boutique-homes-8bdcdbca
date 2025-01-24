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
          <div className="relative h-full rounded-xl overflow-hidden bg-white/95 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D3E4FD]/40 via-[#F8F9FC]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="mb-6 inline-flex rounded-xl bg-[#D3E4FD]/50 p-3 w-fit">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-primary-dark group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-600 flex-grow group-hover:text-primary-dark transition-colors">
                {feature.description}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-primary group-hover:text-primary-dark transition-colors">Learn more</span>
                <div className="h-px flex-grow mx-4 bg-primary/20" />
                <span className="text-sm text-primary group-hover:text-primary-dark transition-colors">→</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}