import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Particles } from "./ui/particles";
import { MovingBorderButton } from "./ui/moving-border-button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Particles animation */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        staticity={30}
        color="var(--primary)"
      />
      
      {/* Decorative background elements */}
      <motion.img
        src="/lovable-uploads/f9449e44-5bd7-4a33-85c1-4daa76d02fe9.png"
        alt="Dubai Skyline"
        className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-30"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
      
      <div className="container mx-auto px-4 pt-20 relative z-10 flex items-end pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg dark:text-gradient">
            Turn Real Estate Into Your Wealth Multiplier
          </h1>
          <p className="mt-4 text-xl text-white mb-8 drop-shadow-lg dark:text-white/90">
            Welcome to Dubai's premier family-owned luxury property management company, 
            where exceptional service meets unparalleled returns.
          </p>
          <div className="flex gap-4 justify-center">
            <MovingBorderButton 
              onClick={() => navigate("/calculator")}
              className="px-6 py-2 font-medium"
              borderClassName="bg-[radial-gradient(var(--primary)_40%,transparent_60%)]"
            >
              Calculate ROI <ArrowRight className="ml-2 h-4 w-4" />
            </MovingBorderButton>
            <MovingBorderButton 
              onClick={() => navigate("/proposal")}
              className="px-6 py-2 font-medium"
              borderClassName="bg-[radial-gradient(var(--primary)_40%,transparent_60%)]"
            >
              View Proposal
            </MovingBorderButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;