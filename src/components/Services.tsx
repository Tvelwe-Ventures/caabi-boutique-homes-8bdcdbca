import { motion } from "framer-motion";
import { Camera, Clock, Home, Palette, Shield, Users } from "lucide-react";
import { Particles } from "./ui/particles";
import { CardSpotlight } from "./ui/card-spotlight";

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
    <section className="relative py-24 bg-gradient-dark">
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
          <h2 className="text-4xl font-bold text-gradient mb-6">What We Offer</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive property management services designed to maximize your returns while providing exceptional guest experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardSpotlight>
                <div className="relative z-10 h-full">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                    <service.Icon className="h-6 w-6 text-primary-light" />
                  </div>
                  <h3 className="mb-2 font-semibold leading-none tracking-tight text-xl text-white">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-400">{service.description}</p>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;