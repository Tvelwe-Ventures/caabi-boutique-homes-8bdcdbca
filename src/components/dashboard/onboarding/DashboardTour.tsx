
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const tourSteps = [
  {
    title: "Welcome to QuackOS! 🎉",
    description: "Let's take a quick tour of your new property management dashboard.",
  },
  {
    title: "Navigation Made Simple",
    description: "Use the sidebar to access different sections like Financial Management, Guest Management, and more. You can collapse it for more space!",
  },
  {
    title: "Real-time Data Integration",
    description: "Watch your property data update in real-time with our powerful integration system.",
  },
  {
    title: "Financial Overview",
    description: "Track your revenue, expenses, and key metrics all in one place with our comprehensive financial dashboard.",
  },
  {
    title: "Need Help?",
    description: "Access our documentation anytime through the Help section in the sidebar. You're all set to start managing your properties!",
  },
];

export const DashboardTour = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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
        
      if (error || !data) {
        setOpen(true);
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
      
    setOpen(false);
    toast({
      title: "Tour Completed! 🎉",
      description: "You can always access help through the documentation section.",
    });
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {tourSteps[currentStep].title}
          </DialogTitle>
          <DialogDescription className="text-lg mt-4">
            {tourSteps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Skip Tour
            </Button>
            {currentStep === tourSteps.length - 1 ? (
              <Button onClick={handleFinishTour}>
                Finish
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
