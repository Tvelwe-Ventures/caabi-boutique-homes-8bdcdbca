import { motion } from "framer-motion";
import { NavLink } from "./NavLink";

export const DesktopNav = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="hidden md:flex items-center space-x-6"
    >
      <NavLink to="/calculator">ROI Calculator</NavLink>
      <NavLink to="/property-evaluation">Property Evaluation</NavLink>
      <NavLink to="/investment">Investment Proposal</NavLink>
      <NavLink to="/statistics">Statistics</NavLink>
      <NavLink to="/community">Community</NavLink>
    </motion.nav>
  );
};