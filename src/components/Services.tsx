import { motion } from "framer-motion";
import { Camera, Clock, Home, Palette, Shield, Users } from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "Beautiful Listings",
    description: "Professional photos, eye-catching descriptions, and flexible pricing strategies to boost bookings."
  },
  {
    icon: Clock,
    title: "24/7 Guest Care",
    description: "Round-the-clock support for all guest inquiries, check-ins, and everything in between."
  },
  {
    icon: Shield,
    title: "Property Maintenance & Care",
    description: "Regular cleaning, maintenance checks, and inspections to keep your property in top shape."
  },
  {
    icon: Palette,
    title: "Furnishing Solutions",
    description: "Complete furnishing services with our trusted design partners, from full transformations to stylish upgrades."
  },
  {
    icon: Users,
    title: "A Personal Touch",
    description: "Building long-lasting relationships with flexible, hands-on, and responsive service."
  },
  {
    icon: Home,
    title: "Premium Platforms",
    description: "Listed on top platforms like Airbnb and Booking.com for maximum visibility."
  }
];

const Services = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">What We Offer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive property management services designed to maximize your returns while providing exceptional guest experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <service.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;