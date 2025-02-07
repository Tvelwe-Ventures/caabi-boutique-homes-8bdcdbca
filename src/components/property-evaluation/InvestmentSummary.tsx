
import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MetricProps {
  label: string;
  value: string | number;
  valueColor?: string;
  showInfo?: boolean;
  tooltip?: string;
}

const Metric = ({ label, value, valueColor = "text-gray-900", showInfo = false, tooltip }: MetricProps) => (
  <div className="p-4 bg-white/50 rounded-lg">
    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
      {label}
      {showInfo && tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
    <div className={`text-xl font-semibold ${valueColor} truncate`}>
      {value}
    </div>
  </div>
);

export const InvestmentSummary = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card className="p-6 mb-6 bg-gradient-to-br from-white/80 to-[#F5E6FA]/30 backdrop-blur-sm">
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Metric 
            label="Total Profit" 
            value="AED 1,709,153" 
            valueColor="text-[#22C55E]"
            showInfo
            tooltip="Expected total profit over the investment period"
          />
          <Metric 
            label="Return on Investment" 
            value="77.8%" 
            showInfo
            tooltip="Total return as a percentage of initial investment"
          />
          <Metric 
            label="Internal Rate of Return" 
            value="13.3%" 
            showInfo
            tooltip="Annual growth rate of the investment"
          />
          <Metric 
            label="Cap-Rate" 
            value="5.5%" 
            showInfo
            tooltip="Net operating income as a percentage of property value"
          />
          <Metric 
            label="Cash-on-Cash" 
            value="5.0%" 
            showInfo
            tooltip="Annual pre-tax cash flow as a percentage of total investment"
          />
        </div>

        <div className="flex justify-center">
          <Button 
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
          >
            {expanded ? "Show Less" : "Show More"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
