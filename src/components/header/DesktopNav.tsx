import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "../ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";

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
      <NavLink to="/calculator" className="text-white hover:text-white/80">
        Calculator
      </NavLink>
      <NavLink to="/property-evaluation" className="text-white hover:text-white/80">
        Property Evaluation
      </NavLink>
      <NavLink to="/investment-proposal" className="text-white hover:text-white/80">
        Investment Proposal
      </NavLink>
      <NavLink to="/dashboard" className="text-white hover:text-white/80">
        Dashboard
      </NavLink>
      <NavLink to="/community" className="text-white hover:text-white/80">
        Community
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