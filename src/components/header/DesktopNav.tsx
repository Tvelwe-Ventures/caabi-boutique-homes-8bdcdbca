import { motion } from "framer-motion";
import { NavLink } from "./NavLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export const DesktopNav = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="hidden md:flex items-center space-x-6"
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center text-sm text-white/90 hover:text-white transition-colors">
          Investment Tools
          <ChevronDown className="ml-1 h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <NavLink to="/calculator">ROI Calculator</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink to="/property-evaluation">Property Evaluation</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink to="/investment">Investment Proposal</NavLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <NavLink to="/statistics">Statistics</NavLink>
      <NavLink to="/community">Community</NavLink>
    </motion.nav>
  );
};