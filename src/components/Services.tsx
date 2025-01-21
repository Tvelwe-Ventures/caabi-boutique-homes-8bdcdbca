import { motion } from "framer-motion";
import { Camera, Clock, Home, Palette, Shield, Users } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Particles } from "./ui/particles";

const services = [
  {
    Icon: Camera,
    name: "Beautiful Listings",
    description: "Professional photos, eye-catching descriptions, and flexible pricing strategies to boost bookings.",
    className: "lg:col-span-2 lg:row-span-1 bg-gradient-to-br from-white via-primary-light/5 to-primary/10 hover:shadow-lg hover:shadow-primary/10"
  },
  {
    Icon: Clock,
    name: "24/7 Guest Care",
    description: "Round-the-clock support for all guest inquiries, check-ins, and everything in between.",
    className: "lg:row-span-2 bg-gradient-to-br from-white via-primary-light/5 to-primary/10 hover:shadow-lg hover:shadow-primary/10"
  },
  {
    Icon: Shield,
    name: "Property Maintenance & Care",
    description: "Regular cleaning, maintenance checks, and inspections to keep your property in top shape.",
    className: "lg:col-span-1 bg-gradient-to-br from-white via-primary-light/5 to-primary/10 hover:shadow-lg hover:shadow-primary/10"
  },
  {
    Icon: Palette,
    name: "Furnishing Solutions",
    description: "Complete furnishing services with our trusted design partners, from full transformations to stylish upgrades.",
    className: "lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-white via-primary-light/5 to-primary/10 hover:shadow-lg hover:shadow-primary/10"
  },
  {
    Icon: Users,
    name: "A Personal Touch",
    description: "Building long-lasting relationships with flexible, hands-on, and responsive service.",
    className: "lg:col-span-1 bg-gradient-to-br from-white via-primary-light/5 to-primary/10 hover:shadow-lg hover:shadow-primary/10"
  },
  {
    Icon: Home,
    name: "Premium Platforms",
    description: "Listed on top platforms like Airbnb and Booking.com for maximum visibility.",
    className: "lg:col-span-2 bg-gradient-to-br from-white via-primary-light/5 to-primary/10 hover:shadow-lg hover:shadow-primary/10"
  }
];

const Services = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-primary/5 via-white to-primary/5 dark:from-black dark:via-primary/10 dark:to-black">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        staticity={50}
        color={`var(--${window.matchMedia('(prefers-color-scheme: dark)').matches ? 'primary-light' : 'primary'}`}
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-6">What We Offer</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Comprehensive property management services designed to maximize your returns while providing exceptional guest experiences.
          </p>
        </motion.div>
        
        <BentoGrid className="lg:grid-rows-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BentoCard
                Icon={service.Icon}
                name={service.name}
                description={service.description}
                className={service.className}
              />
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default Services;