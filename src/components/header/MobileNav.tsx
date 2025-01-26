import { NavLink } from "./NavLink";
import { ThemeToggle } from "../ThemeToggle";
import { motion } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="md:hidden mt-4"
    >
      <nav className="flex flex-col space-y-4">
        <NavLink to="/" onClick={onClose}>Home</NavLink>
        <NavLink to="/calculator" onClick={onClose}>ROI Calculator</NavLink>
        <NavLink to="/investment" onClick={onClose}>Investment Proposal</NavLink>
        <NavLink to="/statistics" onClick={onClose}>Statistics</NavLink>
        <NavLink to="/chat" onClick={onClose}>Chat</NavLink>
        <NavLink to="/community" onClick={onClose}>Community</NavLink>
      </nav>
      <div className="mt-4 pb-2">
        <ThemeToggle />
      </div>
    </motion.div>
  );
};