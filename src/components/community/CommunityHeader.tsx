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
        <div className="flex flex-col">
          <img 
            src="/lovable-uploads/a5da3d5d-8a5a-4d5e-9212-80d44c6a6a88.png" 
            alt="PropOsphere" 
            className="h-12 md:h-16 w-auto" // Increased from h-8/h-10 to h-12/h-16
          />
          <span className="text-xs text-gray-500 mt-1">by Caabi</span>
        </div>
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