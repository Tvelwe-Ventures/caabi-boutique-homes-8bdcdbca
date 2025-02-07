import { Check, X } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const InfoRow = ({ label, value, isPositive }: { label: string; value: string; isPositive?: boolean }) => (
  <div className="flex items-center justify-between py-2 border-b last:border-b-0">
    <span>{label}</span>
    <div className="flex items-center gap-2">
      <span>{value}</span>
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
    <CardSpotlight className="p-6">
      <h3 className="text-xl font-semibold mb-4">Foreign Investor Considerations</h3>
      <div className="space-y-2">
        <InfoRow 
          label="Foreign Ownership" 
          value="Yes, with restrictions" 
        />
        <InfoRow 
          label="Residency" 
          value="Available" 
          isPositive={true}
        />
        <InfoRow 
          label="Passport" 
          value="Not Required" 
          isPositive={true}
        />
        <InfoRow 
          label="Min. Investment" 
          value="AED 545,000" 
        />
      </div>
    </CardSpotlight>
  );
};