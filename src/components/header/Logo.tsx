
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const Logo = () => {
  const location = useLocation();
  const isQuacQOSRoute = location.pathname.includes('dashboard');

  return (
    <Link to={isQuacQOSRoute ? "/dashboard" : "/"}>
      <motion.img
        src={isQuacQOSRoute ? "/lovable-uploads/e3dce32b-7ebc-44e2-8286-7329641c3558.png" : "/lovable-uploads/8d2c4f1d-4dfc-4201-81c1-a9ac1aa8de36.png"}
        alt={isQuacQOSRoute ? "QuacQBoard" : "Caabi Boutique Homes"}
        className="h-10 md:h-14 w-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    </Link>
  );
};
