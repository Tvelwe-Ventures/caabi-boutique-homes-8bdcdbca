
import { Building2, Wallet, Calendar, Percent, Calculator } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvestmentDetailsProps {
  investment: number;
  setInvestment: (value: number) => void;
  propertySize: number;
  setPropertySize: (value: number) => void;
  period: number;
  setPeriod: (value: number) => void;
  usageType: string;
  setUsageType: (value: string) => void;
  monthlyRent: number;
  setMonthlyRent: (value: number) => void;
  appreciationRate: number;
  setAppreciationRate: (value: number) => void;
  financingType: string;
  setFinancingType: (value: string) => void;
}

export const InvestmentDetails = ({
  investment,
  setInvestment,
  propertySize,
  setPropertySize,
  period,
  setPeriod,
  usageType,
  setUsageType,
  monthlyRent,
  setMonthlyRent,
  appreciationRate,
  setAppreciationRate,
  financingType,
  setFinancingType,
}: InvestmentDetailsProps) => {
  // Generate years array from 1 to 30
  const years = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-gray-500" />
          Investment Amount (AED)
        </Label>
        <Input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(Number(e.target.value))}
          className="bg-white border-gray-200"
          placeholder="Enter amount in AED"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-500" />
          Financing Type
        </Label>
        <Select value={financingType} onValueChange={setFinancingType}>
          <SelectTrigger className="bg-white border-gray-200">
            <SelectValue placeholder="Select financing type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="mortgage">Mortgage</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-500" />
          Usage Type
        </Label>
        <Select value={usageType} onValueChange={setUsageType}>
          <SelectTrigger className="bg-white border-gray-200">
            <SelectValue placeholder="Select usage type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="long-term">Long Term Rent</SelectItem>
            <SelectItem value="short-term">Short Term Rent</SelectItem>
            <SelectItem value="own-use">Own Use</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          Holding Period (Years)
        </Label>
        <Select value={period.toString()} onValueChange={(v) => setPeriod(Number(v))}>
          <SelectTrigger className="bg-white border-gray-200">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year} {year === 1 ? 'Year' : 'Years'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Only show these fields if not "own-use" */}
      {usageType !== 'own-use' && (
        <>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-gray-500" />
              Monthly Rent (AED)
            </Label>
            <Input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="bg-white border-gray-200"
              placeholder="Enter monthly rent"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-gray-500" />
              Expected Appreciation (%)
            </Label>
            <Input
              type="number"
              value={appreciationRate}
              onChange={(e) => setAppreciationRate(Number(e.target.value))}
              className="bg-white border-gray-200"
              min={0}
              max={100}
              placeholder="Enter expected appreciation"
            />
          </div>
        </>
      )}
    </div>
  );
};
