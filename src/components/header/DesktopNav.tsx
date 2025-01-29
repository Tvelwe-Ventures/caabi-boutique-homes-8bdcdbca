import { NavLink } from "./NavLink";
import { motion } from "framer-motion";

export const DesktopNav = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="hidden md:flex items-center space-x-8"
    >
      <NavLink to="/">Home</NavLink>
      <NavLink to="/calculator">ROI Calculator</NavLink>
      <NavLink to="/investment">Investment Proposal</NavLink>
      <NavLink to="/statistics">Statistics</NavLink>
      <NavLink to="/chat">Chat</NavLink>
      <NavLink to="/community">Community</NavLink>
    </motion.nav>
  );
};