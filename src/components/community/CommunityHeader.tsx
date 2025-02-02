import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
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

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);
  };

  const handleLogin = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (session) {
      toast({
        title: "Already logged in",
        description: "You are already logged in to your account.",
      });
      return;
    }

    navigate("/auth");
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/05a25d35-9cba-4184-8637-313d262535f1.png" 
            alt="PropOSphere" 
            className="h-8 md:h-12 w-auto"
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
          {!isLoggedIn && (
            <Button 
              onClick={handleLogin}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};