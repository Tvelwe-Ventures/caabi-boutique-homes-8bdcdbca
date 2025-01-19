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
        src="/lovable-uploads/844637b7-bec7-4617-895b-028a7e1be2e2.png"
        alt=""
        className="absolute right-0 top-1/4 w-96 opacity-5 -rotate-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1 }}
      />
      
      <div className="container mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Experience Dubai's Finest Short-Term Rentals
          </h1>
          <p className="mt-4 text-lg text-gray-600 mb-8">
            Welcome to Dubai's premier family-owned luxury property management company, 
            where exceptional service meets unparalleled returns.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate("/calculator")}
              className="bg-primary hover:bg-primary-dark text-white"
            >
              Calculate ROI <ArrowRight className="ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/proposal")}
              className="border-primary text-primary hover:bg-primary/10"
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