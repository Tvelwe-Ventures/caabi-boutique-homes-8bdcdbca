
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Particles } from "./ui/particles";
import { FeyButton } from "./ui/fey-button";
import { useState, useEffect } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/lovable-uploads/d2b589ed-e60c-4ce2-aa36-237d64b2a62e.png",
    "/lovable-uploads/7991a2c3-27fc-4d0e-a270-d195af276951.png",
    "/lovable-uploads/20ef23e7-7914-4739-8e09-59c7660417c8.png",
    "/lovable-uploads/d5623907-02e5-4601-8db4-e7614ef6f391.png",
    "/lovable-uploads/c5902c9f-a64c-4de1-9b6d-761cb47d05d8.png", // New dining room image
    "/lovable-uploads/fcea24d8-44c8-4a75-9f8c-329a416f9fa8.png"  // New living room image
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        staticity={30}
        color="#8798CE"
      />
      
      {images.map((image, index) => (
        <motion.img
          key={image}
          src={image}
          alt={`Luxury Dubai Property ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentImageIndex === index ? 0.8 : 0,
            scale: currentImageIndex === index ? 1 : 1.1
          }}
          transition={{ duration: 1 }}
        />
      ))}
      
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container mx-auto px-4 pt-20 relative z-10 flex items-end pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl hero-heading mb-6 md:mb-8 text-white drop-shadow-lg font-bold">
            Turning Properties into Profit
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-2xl lg:text-3xl text-white mb-8 md:mb-10 drop-shadow-lg px-4 md:px-0 leading-relaxed">
            Detail-oriented? We iron the welcome mats.<br />
            People-focused? We remember your cat's birthday.<br />
            Performance-driven? Our returns make economists blush.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <FeyButton 
              onClick={() => navigate("/calculator")}
              className="w-full md:w-auto bg-[#8798CE] hover:bg-[#8798CE]/90"
            >
              <span className="flex items-center gap-2">
                Calculate ROI
                <Calculator className="w-4 h-4" />
              </span>
            </FeyButton>
            <FeyButton 
              onClick={() => navigate("/property-evaluation")}
              className="w-full md:w-auto bg-gradient-to-r from-[#4169E1] to-[#8798CE] hover:from-[#4169E1]/90 hover:to-[#8798CE]/90 animate-pulse"
            >
              <span className="flex items-center gap-2">
                Evaluate Your Property
                <ArrowRight className="w-4 h-4" />
              </span>
            </FeyButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
