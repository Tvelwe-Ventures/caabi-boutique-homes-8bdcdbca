import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 px-4 text-center"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-4 px-4 py-1.5 bg-gold/10 text-gold rounded-full text-sm font-medium"
        >
          Premier Luxury Rentals
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-light to-gold-dark"
        >
          Experience Dubai's Finest <br />Short-Term Rentals
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8"
        >
          Welcome to Dubai's premier family-owned luxury property management company, 
          where exceptional service meets unparalleled returns.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button className="px-8 py-3 bg-gold hover:bg-gold-dark text-white rounded-lg transition-colors">
            View Properties
          </button>
          <button className="px-8 py-3 border border-gold text-gold hover:bg-gold/10 rounded-lg transition-colors">
            Calculate ROI
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;