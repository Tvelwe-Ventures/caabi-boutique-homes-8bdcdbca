import { Info } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BenchmarkProps {
  label: string;
  value: string;
  info?: string;
}

const Benchmark = ({ label, value, info }: BenchmarkProps) => (
  <div className="flex items-center justify-between p-2 border-b last:border-b-0">
    <div className="flex items-center gap-2">
      {label}
      {info && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{info}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
    <span className="font-semibold">{value}</span>
  </div>
);

export const MarketBenchmarks = () => {
  return (
    <CardSpotlight className="p-6">
      <h3 className="text-xl font-semibold mb-4">Property Market Benchmarks</h3>
      <div className="space-y-2">
        <Benchmark 
          label="Price per Sqm" 
          value="AED 14,042"
          info="Average price per square meter in the selected area" 
        />
        <Benchmark 
          label="Gross Rental Yield" 
          value="7.3%"
          info="Annual rental income as a percentage of property value" 
        />
        <Benchmark 
          label="Cap Rate" 
          value="4.8%"
          info="Net operating income as a percentage of property value" 
        />
        <Benchmark 
          label="Transaction Costs" 
          value="8.5%"
          info="Total costs including transfer fees, agent commission, and registration" 
        />
        <Benchmark 
          label="Annual Appreciation" 
          value="12.6%"
          info="Average annual property value increase in the area" 
        />
      </div>
    </CardSpotlight>
  );
};