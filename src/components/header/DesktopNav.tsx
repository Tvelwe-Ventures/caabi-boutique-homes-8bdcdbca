import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "../ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const DesktopNav = () => {
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
    <nav className="hidden md:flex items-center gap-6">
      <NavLink to="/" className="text-white hover:text-white/80">
        Home
      </NavLink>
      
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-white/80 bg-transparent">
              Investment Tools
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[200px]">
                <NavLink to="/calculator" className="hover:bg-accent rounded-md p-2">
                  ROI Calculator
                </NavLink>
                <NavLink to="/property-evaluation" className="hover:bg-accent rounded-md p-2">
                  Property Evaluation
                </NavLink>
                <NavLink to="/investment-proposal" className="hover:bg-accent rounded-md p-2">
                  Investment Proposal
                </NavLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavLink to="/statistics" className="text-white hover:text-white/80">
        Statistics
      </NavLink>

      <NavLink to="/community" className="text-white hover:text-white/80">
        Community
      </NavLink>

      <div className="flex-1" />
      
      <NavLink to="/auth" className="text-white hover:text-white/80 text-lg font-semibold">
        QuackOS
      </NavLink>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        className="text-white hover:text-white/80"
      >
        <LogOut className="h-5 w-5" />
      </Button>
      <ThemeToggle />
    </nav>
  );
};