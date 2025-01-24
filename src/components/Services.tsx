import { motion } from "framer-motion";
import { Building2, Clock, Trophy } from "lucide-react";
import { Particles } from "./ui/particles";

const services = [
  {
    Icon: Building2,
    name: "Premium Properties",
    description: "Exclusive properties in Downtown Dubai's most sought-after locations",
    isFeatured: true
  },
  {
    Icon: Clock,
    name: "Personal Service",
    description: "Dedicated support team available 24/7 for all your needs",
    isFeatured: false
  },
  {
    Icon: Trophy,
    name: "Expert Management",
    description: "Professional property management with proven results",
    isFeatured: true
  }
];

const Services = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-gray-50/80 to-gray-100/50">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={30}
        staticity={70}
        color="var(--primary)"
      />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <div className="mb-6 inline-flex rounded-xl bg-primary-light/20 p-3 w-fit">
                    <service.Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-lg text-gray-600 flex-grow">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center">
                    <span className="text-sm text-primary font-medium">Learn more</span>
                    <span className="ml-2 text-primary">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;