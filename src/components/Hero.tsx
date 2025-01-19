import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative background logo */}
      <motion.img
        src="/lovable-uploads/844637b7-bec7-4617-895b-028a7e1be2e2.png"
        alt=""
        className="absolute right-0 top-1/4 w-96 opacity-5 -rotate-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1 }}
      />
      
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-5xl font-bold">Welcome to Caabi Boutique Homes</h1>
        <p className="mt-4 text-lg">Experience luxury living with our curated homes.</p>
        <button className="mt-6 flex items-center px-4 py-2 bg-primary text-white rounded">
          Explore Homes <ArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
