
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MetricProps {
  label: string;
  value: string;
  icon?: boolean;
  tooltip?: string;
}

const Metric = ({ label, value, icon = true, tooltip }: MetricProps) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2 text-sm text-gray-600">
      {label}
      {icon && tooltip && (
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
    <div className={`text-lg font-semibold ${value.startsWith('AED') ? 'text-[#22C55E]' : 'text-gray-900'}`}>
      {value}
    </div>
  </div>
);

export const InvestmentSummary = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card className="p-6 bg-white">
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <Metric 
            label="Total Profit" 
            value="AED 1,709,153"
            tooltip="Expected total profit over the investment period"
          />
          <Metric 
            label="Return on Investment" 
            value="77.8%"
            tooltip="Total return as a percentage of initial investment"
          />
          <Metric 
            label="Internal Rate of Return" 
            value="13.3%"
            tooltip="Annual growth rate of the investment"
          />
          <Metric 
            label="Cap-Rate" 
            value="5.5%"
            tooltip="Net operating income as a percentage of property value"
          />
          <Metric 
            label="Cash-on-Cash" 
            value="5.0%"
            tooltip="Annual pre-tax cash flow as a percentage of total investment"
          />
        </div>

        <div className="flex justify-center">
          <Button 
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            {expanded ? "Show Less" : "Show More"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
