import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface CalculatorInputsProps {
  investmentAmount: number;
  annualReturn: number;
  appreciation: number;
  onInvestmentChange: (value: number) => void;
  onAnnualReturnChange: (value: number) => void;
  onAppreciationChange: (value: number) => void;
}

export const CalculatorInputs = ({
  investmentAmount,
  annualReturn,
  appreciation,
  onInvestmentChange,
  onAnnualReturnChange,
  onAppreciationChange
}: CalculatorInputsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="investment">Investment Amount</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>The total amount you plan to invest in the property</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input
        id="investment"
        type="number"
        value={investmentAmount}
        onChange={(e) => onInvestmentChange(Number(e.target.value))}
        className="w-full"
      />

      <div className="flex items-center gap-2">
        <Label>Annual Rental Return (%)</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Expected yearly rental income as a percentage of property value</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Slider
        value={[annualReturn]}
        onValueChange={([value]) => onAnnualReturnChange(value)}
        min={0}
        max={20}
        step={0.1}
        className="w-full"
      />

      <div className="flex items-center gap-2">
        <Label>Property Appreciation (%)</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Expected annual increase in property value</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Slider
        value={[appreciation]}
        onValueChange={([value]) => onAppreciationChange(value)}
        min={0}
        max={15}
        step={0.1}
        className="w-full"
      />
    </div>
  );
};