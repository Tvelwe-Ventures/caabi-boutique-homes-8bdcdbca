import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Logo } from "./header/Logo";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isQuackOSRoute = location.pathname.includes('dashboard');

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

  if (isQuackOSRoute) {
    return (
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="pl-16 md:pl-20"> {/* Added padding to align with sidebar */}
              <Logo />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-gray-700 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.header>
    );
  }

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#8798CE] border-b border-primary-light/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-white/80">Home</a>
            <a href="/calculator" className="text-white hover:text-white/80">ROI Calculator</a>
            <a href="/statistics" className="text-white hover:text-white/80">Statistics</a>
            <a href="/community" className="text-white hover:text-white/80">Community</a>
            <a href="/auth" className="text-white hover:text-white/80">QuackOS</a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;