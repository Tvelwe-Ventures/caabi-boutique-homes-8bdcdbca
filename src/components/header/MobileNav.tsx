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
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
        <nav className="flex flex-col space-y-4 mt-8">
          <div className="px-4 py-2 text-sm font-medium text-gray-500">Investment Tools</div>
          <div className="pl-4 space-y-2">
            <NavLink to="/calculator" className="block py-2">ROI Calculator</NavLink>
            <NavLink to="/property-evaluation" className="block py-2">Property Evaluation</NavLink>
            <NavLink to="/investment" className="block py-2">Investment Proposal</NavLink>
          </div>
          <div className="border-t border-gray-200 my-2"></div>
          <NavLink to="/statistics" className="px-4 py-2">Statistics</NavLink>
          <NavLink to="/community" className="px-4 py-2">Community</NavLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
};