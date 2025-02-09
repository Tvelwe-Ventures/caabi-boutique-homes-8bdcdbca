
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarContent } from "./sidebar/SidebarContent";
import { DashboardFooter } from "./DashboardFooter";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { QuackButton } from "@/components/ui/quack-button";
import { QuacQOSAIAssistant } from "./QuacQOSAIAssistant";
import { Plus, FileText, Settings, Search } from "lucide-react";
import { Button } from "../ui/button";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [soundEnabled, setSoundEnabled] = useLocalStorage("quack-sounds-enabled", false);
  const { toast } = useToast();

  useEffect(() => {
    if (soundEnabled) {
      const quackInterval = setInterval(() => {
        const audio = new Audio("/quack.mp3");
        audio.volume = 0.3;
        audio.play().catch(() => {
          // Ignore autoplay errors
        });
      }, 300000); // Every 5 minutes

      return () => clearInterval(quackInterval);
    }
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast({
      title: soundEnabled ? "Quack sounds disabled" : "Quack sounds enabled",
      description: soundEnabled ? 
        "You won't hear any more quacks" : 
        "You'll hear occasional quacks while using the dashboard",
    });
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <div className={cn(
        "fixed top-0 left-0 h-screen border-r shadow-sm transition-all duration-300",
        open ? "w-[240px]" : "w-[70px]"
      )}>
        <button
          onClick={() => setOpen(!open)}
          className="absolute -right-3 top-6 z-40 rounded-full border bg-white p-1 shadow-sm hover:bg-gray-50"
        >
          <svg
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
        <SidebarContent open={open} />
      </div>
      
      <main className={cn(
        "flex-1 transition-all duration-300 flex flex-col",
        open ? "ml-[240px]" : "ml-[70px]"
      )}>
        <div className="container py-6 space-y-6 flex-1">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="/lovable-uploads/e3dce32b-7ebc-44e2-8286-7329641c3558.png"
                  alt="QuackBoard"
                  className="h-12 w-auto"
                />
              </div>
              <div className="flex items-center gap-3">
                <QuacQOSAIAssistant />
                <QuackButton enabled={soundEnabled} onToggle={toggleSound} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-medium">Your centralized dashboard for comprehensive business insights</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Property
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Create Report
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Search className="h-4 w-4" />
                  System Feedback
                </Button>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
        <DashboardFooter />
      </main>
    </div>
  );
};

export default DashboardLayout;
