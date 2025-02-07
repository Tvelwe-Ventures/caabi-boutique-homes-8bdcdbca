
import { useRef } from "react";
import { motion } from "framer-motion";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";

export const DataIntegrationBeams = () => {
  const platformLogos = {
    gitlab: "/lovable-uploads/ee5517ba-19b4-4c59-b6b4-418ffa17e89e.png",
    booking: "/lovable-uploads/bcac5dee-e73a-4549-9bfa-c14d064c0790.png",
    airbnb: "/lovable-uploads/c67c5439-06f3-4f71-9507-a3876b858ae4.png",
    host: "/lovable-uploads/8f7a11d9-3d0e-4047-aa16-f25a77f559c1.png",
    palm: "/lovable-uploads/6b33931a-6e07-4d55-a4d0-dd6e06d1d816.png",
    analytics: "/lovable-uploads/6b33931a-6e07-4d55-a4d0-dd6e06d1d816.png"
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.8 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative h-[400px] w-full bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-xl backdrop-blur-sm border border-primary/10 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Central Node with Orbiting Integrations */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central QuacaBoard Logo */}
        <motion.div
          className="relative size-24 rounded-2xl bg-white/80 shadow-lg backdrop-blur-sm flex items-center justify-center z-20"
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        >
          <img 
            src="/lovable-uploads/dcc3e3a2-4ae3-4d6c-8301-ac7bcc8bd14f.png" 
            alt="QuacaBoard"
            className="w-16 h-16 object-contain"
          />
        </motion.div>

        {/* Orbiting Integration 1 - GitLab */}
        <OrbitingCircles radius={100} duration={25} delay={0}>
          <div className="size-14 rounded-xl bg-gradient-to-br from-[#FC6D26]/80 to-[#E24329]/80 p-2 flex items-center justify-center">
            <img src={platformLogos.gitlab} alt="GitLab" className="w-10 h-10 object-contain" />
          </div>
        </OrbitingCircles>

        {/* Orbiting Integration 2 - Booking.com */}
        <OrbitingCircles radius={100} duration={30} delay={5} reverse>
          <div className="size-14 rounded-xl bg-gradient-to-br from-[#003580]/80 to-[#003580]/80 p-2 flex items-center justify-center">
            <img src={platformLogos.booking} alt="Booking.com" className="w-10 h-10 object-contain" />
          </div>
        </OrbitingCircles>

        {/* Orbiting Integration 3 - Airbnb */}
        <OrbitingCircles radius={150} duration={35} delay={10}>
          <div className="size-14 rounded-xl bg-gradient-to-br from-[#00A4B4]/80 to-[#00A4B4]/80 p-2 flex items-center justify-center">
            <img src={platformLogos.airbnb} alt="Airbnb" className="w-10 h-10 object-contain" />
          </div>
        </OrbitingCircles>

        {/* Orbiting Integration 4 - HostAway */}
        <OrbitingCircles radius={150} duration={40} delay={15} reverse>
          <div className="size-14 rounded-xl bg-gradient-to-br from-[#FF5A1F]/80 to-[#FF5A1F]/80 p-2 flex items-center justify-center">
            <img src={platformLogos.host} alt="HostAway" className="w-10 h-10 object-contain" />
          </div>
        </OrbitingCircles>

        {/* Orbiting Integration 5 - PalM */}
        <OrbitingCircles radius={200} duration={45} delay={20}>
          <div className="size-14 rounded-xl bg-gradient-to-br from-[#00875A]/80 to-[#00875A]/80 p-2 flex items-center justify-center">
            <img src={platformLogos.palm} alt="PalM" className="w-10 h-10 object-contain" />
          </div>
        </OrbitingCircles>

        {/* Orbiting Integration 6 - Analytics */}
        <OrbitingCircles radius={200} duration={50} delay={25} reverse>
          <div className="size-14 rounded-xl bg-gradient-to-br from-[#00875A]/80 to-[#00875A]/80 p-2 flex items-center justify-center">
            <img src={platformLogos.analytics} alt="Analytics" className="w-10 h-10 object-contain" />
          </div>
        </OrbitingCircles>
      </div>

      {/* Decorative Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
