import { NavLink } from "./NavLink";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-8">
          <NavLink to="/calculator">ROI Calculator</NavLink>
          <NavLink to="/property-evaluation">Property Evaluation</NavLink>
          <NavLink to="/investment">Investment Proposal</NavLink>
          <NavLink to="/statistics">Statistics</NavLink>
          <NavLink to="/community">Community</NavLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
};