
import { InfoCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MetricProps {
  label: string;
  value: string | number;
  valueColor?: string;
  showInfo?: boolean;
}

const Metric = ({ label, value, valueColor = "text-gray-900", showInfo = false }: MetricProps) => (
  <div>
    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
      {label}
      {showInfo && <InfoCircle className="w-4 h-4" />}
    </div>
    <div className={`text-xl font-semibold ${valueColor}`}>
      {value}
    </div>
  </div>
);

export const InvestmentSummary = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card className="p-6 mb-6">
      <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Metric 
            label="Total Profit" 
            value="AED 1,709,153" 
            valueColor="text-[#22C55E]"
            showInfo 
          />
          <Metric 
            label="Return on Investment" 
            value="77.8%" 
            showInfo 
          />
          <Metric 
            label="Internal Rate of Return" 
            value="13.3%" 
            showInfo 
          />
          <Metric 
            label="Cap-Rate" 
            value="5.5%" 
            showInfo 
          />
          <Metric 
            label="Cash-on-Cash" 
            value="5.0%" 
            showInfo 
          />
        </div>

        <div className="flex justify-center">
          <Button 
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500"
          >
            {expanded ? "Show Less" : "Show More"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
