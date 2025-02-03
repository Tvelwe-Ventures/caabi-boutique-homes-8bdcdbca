import { NavLink } from "./NavLink";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, Calculator, Building2, FileSpreadsheet, BarChart3, Users, Home, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const MobileNav = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Successfully signed out!",
      });
      navigate("/");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden text-white/90 hover:text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
        <nav className="flex flex-col space-y-4 mt-8">
          <NavLink 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </NavLink>

          <div className="px-4 py-2 text-sm font-medium text-gray-500">Investment Tools</div>
          <div className="pl-4 space-y-2">
            <NavLink 
              to="/calculator" 
              className="flex items-center gap-2 py-2 px-2 rounded-md hover:bg-gray-100"
            >
              <Calculator className="h-4 w-4" />
              <span>ROI Calculator</span>
            </NavLink>
            <NavLink 
              to="/property-evaluation" 
              className="flex items-center gap-2 py-2 px-2 rounded-md hover:bg-gray-100"
            >
              <Building2 className="h-4 w-4" />
              <span>Property Evaluation</span>
            </NavLink>
            <NavLink 
              to="/investment-proposal" 
              className="flex items-center gap-2 py-2 px-2 rounded-md hover:bg-gray-100"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Investment Proposal</span>
            </NavLink>
          </div>

          <div className="border-t border-gray-200 my-2"></div>
          
          <NavLink 
            to="/dashboard" 
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink 
            to="/community" 
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            <Users className="h-4 w-4" />
            <span>Community</span>
          </NavLink>

          <Button
            variant="ghost"
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};