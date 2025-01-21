import { motion } from "framer-motion";
import { Camera, Clock, Home, Palette, Shield, Users } from "lucide-react";
import { Particles } from "./ui/particles";
import { BentoGrid, BentoCard } from "./ui/bento-grid";

const services = [
  {
    Icon: Camera,
    name: "Beautiful Listings",
    description: "Professional photos, eye-catching descriptions, and flexible pricing strategies to boost bookings.",
  },
  {
    Icon: Clock,
    name: "24/7 Guest Care",
    description: "Round-the-clock support for all guest inquiries, check-ins, and everything in between.",
  },
  {
    Icon: Shield,
    name: "Property Maintenance & Care",
    description: "Regular cleaning, maintenance checks, and inspections to keep your property in top shape.",
  },
  {
    Icon: Palette,
    name: "Furnishing Solutions",
    description: "Complete furnishing services with our trusted design partners, from full transformations to stylish upgrades.",
  },
  {
    Icon: Users,
    name: "A Personal Touch",
    description: "Building long-lasting relationships with flexible, hands-on, and responsive service.",
  },
  {
    Icon: Home,
    name: "Premium Platforms",
    description: "Listed on top platforms like Airbnb and Booking.com for maximum visibility.",
  }
];

const Services = () => {
  return (
    <section className="relative py-24 section-dark">
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
          <h2 className="text-4xl font-bold animated-gradient-text mb-6">
            What We Offer
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive property management services designed to maximize your returns while providing exceptional guest experiences.
          </p>
        </motion.div>
        
        <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              />
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default Services;