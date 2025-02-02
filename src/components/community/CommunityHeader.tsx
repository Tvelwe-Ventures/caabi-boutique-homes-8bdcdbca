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
        <div className="flex flex-col items-center">
          <div className="relative flex flex-col items-center">
            <img 
              src="/lovable-uploads/fbda3091-cdbd-45db-9212-e98a7256ef7d.png" 
              alt="PropOsphere" 
              className="h-16 md:h-20 w-auto"
            />
            <span className="text-sm text-gray-500 mt-1">
              by Caabi
            </span>
          </div>
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