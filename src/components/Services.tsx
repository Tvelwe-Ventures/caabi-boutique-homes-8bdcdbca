import { motion } from "framer-motion";
import { Camera, Clock, Home, Palette, Shield, Users } from "lucide-react";
import { Particles } from "./ui/particles";
import { BorderBeam } from "./ui/border-beam";

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
    <section className="relative py-24 bg-gradient-to-br from-[#8394ca]/10 to-[#a2d4f4]/10 dark:section-dark">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        staticity={50}
        color="var(--primary)"
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gradient mb-6">
            What We Offer
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
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
              className={`${service.isFeatured ? 'row-span-2' : ''} relative group`}
            >
              {/* Gradient glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-[#D3E4FD]/30 to-transparent dark:from-[#213674]/20 dark:to-transparent blur-xl group-hover:from-[#D3E4FD]/40 dark:group-hover:from-[#213674]/30 transition-all duration-300 -z-10" />
              
              <div className="relative h-full rounded-xl overflow-hidden bg-white/90 dark:bg-[#121C30]/40 backdrop-blur-xl border border-[#355AD1] dark:border-[#213674] group transition-all duration-300 hover:translate-y-[-4px]">
                <BorderBeam 
                  className="rounded-xl" 
                  duration={10} 
                  colorFrom="#355AD1"
                  colorTo="#8394CA"
                />
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <div className="mb-6 inline-flex rounded-xl bg-[#8394CA]/10 dark:bg-[#213674]/20 p-3 w-fit">
                    <service.Icon className="h-6 w-6 text-[#355AD1] dark:text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-[#213674] dark:text-white group-hover:text-[#355AD1] dark:group-hover:text-[#8394CA] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 flex-grow group-hover:text-[#213674] dark:group-hover:text-gray-200 transition-colors">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-[#355AD1] dark:text-white group-hover:text-[#8394CA] transition-colors">Learn more</span>
                    <div className="h-px flex-grow mx-4 bg-[#355AD1]/20 dark:bg-[#213674]/20" />
                    <span className="text-sm text-[#355AD1] dark:text-white group-hover:text-[#8394CA] transition-colors">→</span>
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