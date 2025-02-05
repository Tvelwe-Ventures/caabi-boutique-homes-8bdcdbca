
import { useState, useEffect } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

const tourSteps = [
  {
    title: "Welcome to QuackOS! 🎉",
    description: "Let's explore your new property management dashboard.",
    target: "dashboard-header",
    position: { top: "80px", left: "260px" }
  },
  {
    title: "Navigation Made Simple",
    description: "Access different sections like Financial Management and Guest Management.",
    target: "sidebar-nav",
    position: { top: "120px", left: "260px" }
  },
  {
    title: "Real-time Data Integration",
    description: "Watch your property data update in real-time.",
    target: "data-integration",
    position: { top: "400px", left: "400px" }
  },
  {
    title: "Financial Overview",
    description: "Track revenue, expenses, and key metrics in one place.",
    target: "financial-metrics",
    position: { top: "600px", left: "300px" }
  },
  {
    title: "Need Help?",
    description: "Access documentation through the Help section anytime.",
    target: "help-section",
    position: { top: "80vh", left: "260px" }
  }
];

export const DashboardTour = () => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const checkTourStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { data, error } = await supabase
        .from('user_preferences')
        .select('has_completed_tour')
        .eq('user_id', session.user.id)
        .single();
        
      if (error || !data?.has_completed_tour) {
        setCurrentStep(0);
      }
    };
    
    checkTourStatus();
  }, []);

  const handleFinishTour = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    await supabase
      .from('user_preferences')
      .upsert({
        user_id: session.user.id,
        has_completed_tour: true
      });
      
    setCurrentStep(null);
    toast({
      title: "Tour Completed! 🎉",
      description: "You can always access help through the documentation section.",
    });
  };

  const handleNext = () => {
    if (currentStep !== null && currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinishTour();
    }
  };

  const handleSkip = () => {
    handleFinishTour();
  };

  if (currentStep === null) return null;

  const currentTourStep = tourSteps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          position: "fixed",
          ...currentTourStep.position,
          zIndex: 50
        }}
      >
        <HoverCard open>
          <HoverCardTrigger asChild>
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
          </HoverCardTrigger>
          <HoverCardContent 
            className="w-80 p-4 bg-white/95 backdrop-blur-sm shadow-lg rounded-lg border border-primary/20"
            side="right"
          >
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{currentTourStep.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{currentTourStep.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={handleSkip}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Skip tour
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
              <div className="flex justify-center gap-1 mt-2">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </motion.div>
    </AnimatePresence>
  );
};
