
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
    gitlab: "/lovable-uploads/25e147fd-5401-45c7-b101-00978ff92876.png",
    booking: "B.",
    airbnb: "/lovable-uploads/25e147fd-5401-45c7-b101-00978ff92876.png",
    host: "/lovable-uploads/25e147fd-5401-45c7-b101-00978ff92876.png",
    palm: "/lovable-uploads/25e147fd-5401-45c7-b101-00978ff92876.png",
    analytics: "/lovable-uploads/25e147fd-5401-45c7-b101-00978ff92876.png"
  };

  return (
    <div ref={containerRef} className="relative h-[400px] w-full">
      {/* Central QuacaBoard Logo */}
      <motion.div
        ref={centralNodeRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center"
        variants={pulseVariants}
        initial="initial"
        animate="animate"
      >
        <img 
          src="/lovable-uploads/dcc3e3a2-4ae3-4d6c-8301-ac7bcc8bd14f.png" 
          alt="QuacaBoard"
          className="w-12 h-12 object-contain"
        />
      </motion.div>

      {/* Platform Nodes */}
      {[
        { ref: gitlabRef, logo: platformLogos.gitlab, position: "left-[20%] top-[30%]", color: "bg-red-500" },
        { ref: bookingRef, logo: platformLogos.booking, position: "right-[20%] top-[30%]", color: "bg-blue-800" },
        { ref: airbnbRef, logo: platformLogos.airbnb, position: "left-[30%] bottom-[30%]", color: "bg-[#FF5A5F]" },
        { ref: hostRef, logo: platformLogos.host, position: "right-[30%] bottom-[30%]", color: "bg-orange-500" },
        { ref: palmRef, logo: platformLogos.palm, position: "left-[15%] top-[50%]", color: "bg-green-500" },
        { ref: analyticsRef, logo: platformLogos.analytics, position: "right-[15%] top-[50%]", color: "bg-emerald-500" }
      ].map((platform, index) => (
        <motion.div
          key={index}
          ref={platform.ref}
          className={`absolute w-12 h-12 ${platform.position} rounded-full ${platform.color} shadow-lg flex items-center justify-center`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          {typeof platform.logo === 'string' && platform.logo.endsWith('.png') ? (
            <img src={platform.logo} alt="Platform" className="w-8 h-8 object-contain" />
          ) : (
            <span className="text-white font-bold">{platform.logo}</span>
          )}
          <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
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
    </div>
  );
};
