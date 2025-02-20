
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

interface CommunityHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const CommunityHeader = ({ searchQuery, setSearchQuery }: CommunityHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
    
    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAuthStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);
    setLoading(false);
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate("/auth");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/05a25d35-9cba-4184-8637-313d262535f1.png"
            alt="PropOSphere" 
            className="h-8 md:h-12 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="flex items-center gap-4">
          <Input
            type="search"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          {!loading && (
            isLoggedIn ? (
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Button 
                onClick={handleLogin}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
