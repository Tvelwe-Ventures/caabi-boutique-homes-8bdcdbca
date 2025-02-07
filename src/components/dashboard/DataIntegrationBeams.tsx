
import { useRef } from "react";
import { AnimatedBeam } from "../ui/animated-beam";
import { motion } from "framer-motion";

export const DataIntegrationBeams = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centralNodeRef = useRef<HTMLDivElement>(null);
  const gitlabRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const airbnbRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const palmRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);

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

  const platformLogos = {
    gitlab: "/lovable-uploads/ee5517ba-19b4-4c59-b6b4-418ffa17e89e.png",
    booking: "/lovable-uploads/bcac5dee-e73a-4549-9bfa-c14d064c0790.png",
    airbnb: "/lovable-uploads/c67c5439-06f3-4f71-9507-a3876b858ae4.png",
    host: "/lovable-uploads/8f7a11d9-3d0e-4047-aa16-f25a77f559c1.png",
    palm: "/lovable-uploads/6b33931a-6e07-4d55-a4d0-dd6e06d1d816.png",
    analytics: "/lovable-uploads/6b33931a-6e07-4d55-a4d0-dd6e06d1d816.png"
  };

  return (
    <div ref={containerRef} className="relative h-[400px] w-full bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-xl backdrop-blur-sm border border-primary/10">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Central QuacaBoard Logo */}
      <motion.div
        ref={centralNodeRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-white/80 shadow-lg backdrop-blur-sm flex items-center justify-center z-10"
        variants={pulseVariants}
        initial="initial"
        animate="animate"
      >
        <img 
          src="/lovable-uploads/dcc3e3a2-4ae3-4d6c-8301-ac7bcc8bd14f.png" 
          alt="QuacaBoard"
          className="w-14 h-14 object-contain"
        />
      </motion.div>

      {/* Platform Nodes */}
      {[
        { ref: gitlabRef, logo: platformLogos.gitlab, position: "left-[20%] top-[30%]", color: "from-[#FC6D26]/80 to-[#E24329]/80", name: "GitLab" },
        { ref: bookingRef, logo: platformLogos.booking, position: "right-[20%] top-[30%]", color: "from-[#003580]/80 to-[#003580]/80", name: "Booking.com" },
        { ref: airbnbRef, logo: platformLogos.airbnb, position: "left-[30%] bottom-[30%]", color: "from-[#00A4B4]/80 to-[#00A4B4]/80", name: "Airbnb" },
        { ref: hostRef, logo: platformLogos.host, position: "right-[30%] bottom-[30%]", color: "from-[#FF5A1F]/80 to-[#FF5A1F]/80", name: "HostAway" },
        { ref: palmRef, logo: platformLogos.palm, position: "left-[15%] top-[50%]", color: "from-[#00875A]/80 to-[#00875A]/80", name: "PalM" },
        { ref: analyticsRef, logo: platformLogos.analytics, position: "right-[15%] top-[50%]", color: "from-[#00875A]/80 to-[#00875A]/80", name: "Analytics" }
      ].map((platform, index) => (
        <motion.div
          key={index}
          ref={platform.ref}
          className={`absolute w-16 h-16 ${platform.position} rounded-xl bg-gradient-to-br ${platform.color} shadow-lg backdrop-blur-sm flex items-center justify-center z-10`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <img src={platform.logo} alt={platform.name} className="w-10 h-10 object-contain" />
          <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse" />
        </motion.div>
      ))}

      {/* Connection Beams */}
      {[gitlabRef, bookingRef, airbnbRef, hostRef, palmRef, analyticsRef].map((ref, index) => (
        <AnimatedBeam
          key={index}
          containerRef={containerRef}
          fromRef={ref}
          toRef={centralNodeRef}
          delay={index}
          curvature={50}
        />
      ))}

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
