import { useRef } from "react";
import { AnimatedBeam } from "../ui/animated-beam";
import { motion } from "framer-motion";

export const DataIntegrationBeams = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centralNodeRef = useRef<HTMLDivElement>(null);
  const airbnbRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const propertyRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const nodeStyle = "absolute h-4 w-4 rounded-full bg-gradient-to-r from-primary to-primary-light shadow-lg";
  const satelliteStyle = "absolute h-3 w-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 shadow-md";

  return (
    <div ref={containerRef} className="relative h-full w-full min-h-[300px]">
      <motion.div
        ref={centralNodeRef}
        className={`${nodeStyle} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
        variants={pulseVariants}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      </motion.div>

      <motion.div
        ref={airbnbRef}
        className={`${satelliteStyle} left-[20%] top-[30%]`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse" />
      </motion.div>

      <motion.div
        ref={bookingRef}
        className={`${satelliteStyle} right-[20%] top-[30%]`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse" />
      </motion.div>

      <motion.div
        ref={propertyRef}
        className={`${satelliteStyle} bottom-[30%] left-[30%]`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse" />
      </motion.div>

      <motion.div
        ref={analyticsRef}
        className={`${satelliteStyle} bottom-[30%] right-[30%]`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse" />
      </motion.div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={airbnbRef}
        toRef={centralNodeRef}
        delay={0}
        curvature={50}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={bookingRef}
        toRef={centralNodeRef}
        delay={1}
        curvature={50}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={propertyRef}
        toRef={centralNodeRef}
        delay={2}
        curvature={50}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={analyticsRef}
        toRef={centralNodeRef}
        delay={3}
        curvature={50}
      />
    </div>
  );
};