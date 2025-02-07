
import { Check, X, Info } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InfoRowProps {
  label: string;
  value: string;
  isPositive?: boolean;
  info?: string;
}

const InfoRow = ({ label, value, isPositive, info }: InfoRowProps) => (
  <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg mb-3 last:mb-0">
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
    <div className="flex items-center gap-2">
      <span className="font-medium">{value}</span>
      {isPositive !== undefined && (
        isPositive ? 
          <Check className="w-4 h-4 text-green-500" /> : 
          <X className="w-4 h-4 text-red-500" />
      )}
    </div>
  </div>
);

export const ForeignInvestor = () => {
  return (
    <CardSpotlight className="p-6 bg-gradient-to-br from-white/90 to-[#F5E6FA]/20">
      <h3 className="text-xl font-semibold mb-6 text-gray-900">Foreign Investor Considerations</h3>
      <div className="space-y-2">
        <InfoRow 
          label="Foreign Ownership" 
          value="Yes, with restrictions" 
          info="Specific areas allow foreign ownership"
        />
        <InfoRow 
          label="Residency" 
          value="Available" 
          isPositive={true}
          info="Property investment can lead to residency"
        />
        <InfoRow 
          label="Passport" 
          value="Not Required" 
          isPositive={true}
          info="Investment possible without passport"
        />
        <InfoRow 
          label="Min. Investment" 
          value="AED 545,000" 
          info="Minimum investment required for property purchase"
        />
      </div>
    </CardSpotlight>
  );
};
