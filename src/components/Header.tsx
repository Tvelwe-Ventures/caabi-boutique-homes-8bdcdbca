import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-primary/20 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.img
          src="/lovable-uploads/19e19dba-2d9f-4ea9-90d7-a959d65d869b.png"
          alt="Caabi Boutique Homes"
          className="h-12 w-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.header>
  );
};

export default Header;