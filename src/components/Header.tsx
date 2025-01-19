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
          src="/lovable-uploads/783c852b-b3e6-4476-a18c-74d4b537e6c1.png"
          alt="Caabi Boutique Homes"
          className="w-32"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.header>
  );
};

export default Header;