import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Logo = () => (
  <Link to="/">
    <motion.img
      src="/lovable-uploads/19e19dba-2d9f-4ea9-90d7-a959d65d869b.png"
      alt="Caabi Boutique Homes"
      className="h-8 md:h-12 w-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    />
  </Link>
);