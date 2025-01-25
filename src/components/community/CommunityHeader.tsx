import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CommunityHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const CommunityHeader = ({ searchQuery, setSearchQuery }: CommunityHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (session) {
      // If already logged in, show a message
      toast({
        title: "Already logged in",
        description: "You are already logged in to your account.",
      });
      return;
    }

    // If not logged in, redirect to auth page (we'll create this next)
    navigate("/auth");
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-dark">Community</h1>
        <div className="flex items-center gap-4">
          <Input
            type="search"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button 
            onClick={handleLogin}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};