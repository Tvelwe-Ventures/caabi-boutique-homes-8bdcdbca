import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Logo = () => (
  <Link to="/">
    <motion.img
      src="/lovable-uploads/8d2c4f1d-4dfc-4201-81c1-a9ac1aa8de36.png"
      alt="Caabi Boutique Homes"
      className="h-8 md:h-12 w-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    />
  </Link>
);