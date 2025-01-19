import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const images = [
    "/lovable-uploads/b15c3401-f911-4651-8a29-c977822c4e2e.png",
    "/lovable-uploads/9cde2d5f-e367-48cc-8b38-8e6df94defb1.png",
    "/lovable-uploads/40d6c6da-4294-4638-9aeb-98bd74e6d51e.png",
    "/lovable-uploads/f9512c5e-e45a-45b9-95ef-8f9fe931efc2.png"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background with parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${images[0]}')`,
            filter: "brightness(0.8)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 px-4 text-center"
      >
        <motion.img
          src="/lovable-uploads/783c852b-b3e6-4476-a18c-74d4b537e6c1.png"
          alt="Caabi Boutique Homes"
          className="w-48 mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.4,
            type: "spring",
            stiffness: 100 
          }}
          className="text-4xl md:text-6xl font-bold mb-6 text-white"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            Experience Dubai's Finest
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            Short-Term Rentals
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-2xl mx-auto text-lg text-white mb-8 backdrop-blur-sm bg-black/10 p-4 rounded-lg"
        >
          Welcome to Dubai's premier family-owned luxury property management company, 
          where exceptional service meets unparalleled returns.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
          >
            View Properties
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-white text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
          >
            Calculate ROI
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;