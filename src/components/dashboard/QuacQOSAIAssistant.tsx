
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export const QuacQOSAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const features = [
    {
      title: "AI Design Suggestions",
      description: "Get AI-powered suggestions for component styling and layout improvements"
    },
    {
      title: "Code Generation",
      description: "Generate boilerplate code and common patterns automatically"
    },
    {
      title: "Performance Insights",
      description: "Receive AI analysis of your app's performance and optimization tips"
    },
    {
      title: "Accessibility Checks",
      description: "AI-powered accessibility recommendations and fixes"
    }
  ];

  const handleFeatureClick = (feature: typeof features[0]) => {
    setIsOpen(false);
    toast({
      title: `${feature.title} Activated`,
      description: "AI assistant is analyzing your request...",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Sparkles className="w-4 h-4" />
          AI Assistant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-lg">QuacQOS AI Assistant</h4>
            <p className="text-sm text-muted-foreground">
              Select an AI-powered feature to enhance your dashboard experience
            </p>
          </div>
          <div className="grid gap-2">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 p-3 cursor-pointer hover:bg-accent rounded-lg transition-colors"
                onClick={() => handleFeatureClick(feature)}
              >
                <div className="font-medium">{feature.title}</div>
                <div className="text-sm text-muted-foreground">
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
