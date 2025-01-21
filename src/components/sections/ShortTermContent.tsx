import { Button } from "@/components/ui/button";
import { Video, MoveUpRight } from "lucide-react";

const ShortTermContent = () => {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        Whether you are looking to supplement your monthly income, have a property investment portfolio, or are looking to make AED while you list your home for sale, the short-let market offers you great financial returns with full control of your asset and ultimate flexibility (including no RERA obligations).
      </p>
      
      <div className="flex flex-wrap gap-4">
        <Button 
          className="bg-[#0A0F1D] hover:bg-[#1A1F2D] text-white"
          size="lg"
        >
          Book a meeting
          <Video className="ml-2 h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          className="border-gray-300"
          size="lg"
        >
          Get a quote
          <MoveUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ShortTermContent;