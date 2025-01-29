import { motion } from "framer-motion";
import { NavLink } from "./NavLink";
import { Sheet } from "../ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

export const MobileNav = () => {
  return (
    <Sheet>
      <Sheet.Trigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-8">
          <NavLink to="/calculator">ROI Calculator</NavLink>
          <NavLink to="/property-evaluation">Property Evaluation</NavLink>
          <NavLink to="/investment">Investment Proposal</NavLink>
          <NavLink to="/statistics">Statistics</NavLink>
          <NavLink to="/community">Community</NavLink>
        </nav>
      </Sheet.Content>
    </Sheet>
  );
};