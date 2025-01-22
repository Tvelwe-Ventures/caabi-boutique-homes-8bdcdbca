import { motion } from "framer-motion";
import { Camera, Clock, Home, Palette, Shield, Users } from "lucide-react";
import { Particles } from "./ui/particles";
import { BentoGrid, BentoCard } from "./ui/bento-grid";
import { CardSpotlight } from "./ui/card-spotlight";

const services = [
  {
    Icon: Camera,
    name: "Beautiful Listings",
    description: "Professional photos, eye-catching descriptions, and flexible pricing strategies to boost bookings.",
    isFeatured: true
  },
  {
    Icon: Clock,
    name: "24/7 Guest Care",
    description: "Round-the-clock support for all guest inquiries, check-ins, and everything in between.",
    isFeatured: false
  },
  {
    Icon: Shield,
    name: "Property Maintenance & Care",
    description: "Regular cleaning, maintenance checks, and inspections to keep your property in top shape.",
    isFeatured: true
  },
  {
    Icon: Palette,
    name: "Furnishing Solutions",
    description: "Complete furnishing services with our trusted design partners, from full transformations to stylish upgrades.",
    isFeatured: false
  },
  {
    Icon: Users,
    name: "A Personal Touch",
    description: "Building long-lasting relationships with flexible, hands-on, and responsive service.",
    isFeatured: true
  },
  {
    Icon: Home,
    name: "Premium Platforms",
    description: "Listed on top platforms like Airbnb and Booking.com for maximum visibility.",
    isFeatured: false
  }
];

const Services = () => {
  return (
    <section className="relative py-24 bg-white dark:section-dark">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        staticity={50}
        color="var(--primary-light)"
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:animated-gradient-text mb-6">
            What We Offer
          </h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive property management services designed to maximize your returns while providing exceptional guest experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(240px,auto)]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${service.isFeatured ? 'row-span-2' : ''}`}
            >
              {service.isFeatured ? (
                <CardSpotlight className="h-full p-8 card-hover-animation">
                  <div className="flex flex-col h-full">
                    <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-3 w-fit">
                      <service.Icon className="h-6 w-6 card-icon" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 card-text">
                      {service.name}
                    </h3>
                    <p className="text-lg card-text opacity-90 flex-grow">
                      {service.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm text-primary">Learn more</span>
                      <div className="h-px flex-grow mx-4 bg-primary/20" />
                      <span className="text-sm text-primary">→</span>
                    </div>
                  </div>
                </CardSpotlight>
              ) : (
                <BentoCard
                  Icon={service.Icon}
                  name={service.name}
                  description={service.description}
                  className="h-full card-hover-animation"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;