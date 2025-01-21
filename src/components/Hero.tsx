import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-primary/5">
      {/* Decorative background elements */}
      <motion.img
        src="/lovable-uploads/f9449e44-5bd7-4a33-85c1-4daa76d02fe9.png"
        alt="Dubai Skyline"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="container mx-auto px-4 pt-20 relative z-10 flex items-end pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Turn Real Estate Into Your Wealth Multiplier
          </h1>
          <p className="mt-4 text-xl text-white mb-8 drop-shadow-lg">
            Welcome to Dubai's premier family-owned luxury property management company, 
            where exceptional service meets unparalleled returns.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate("/calculator")}
              className="bg-primary hover:bg-primary-dark text-white text-lg"
            >
              Calculate ROI <ArrowRight className="ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/proposal")}
              className="border-white text-primary hover:bg-white/10 backdrop-blur-sm bg-white"
            >
              View Proposal
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;