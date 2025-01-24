import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CalculatorInputs } from "./types";
import { Building2, MapPin, Bed, Coins, Calculator, BankCard } from "lucide-react";

interface CalculatorFormProps {
  onCalculate: (inputs: CalculatorInputs) => void;
}

export const CalculatorForm = ({ onCalculate }: CalculatorFormProps) => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    propertyValue: 1000000,
    propertySize: 1000,
    location: "downtown",
    bedrooms: 1,
    initialInvestment: 50000,
    monthlyMortgage: 5000,
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            Property Value (AED)
          </label>
          <Input
            type="number"
            value={inputs.propertyValue}
            onChange={(e) =>
              setInputs({ ...inputs, propertyValue: Number(e.target.value) })
            }
            className="bg-white border-primary/20 focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Property Size (sq ft)
          </label>
          <Input
            type="number"
            value={inputs.propertySize}
            onChange={(e) =>
              setInputs({ ...inputs, propertySize: Number(e.target.value) })
            }
            className="bg-white border-primary/20 focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Location
          </label>
          <Select
            value={inputs.location}
            onValueChange={(value) =>
              setInputs({ ...inputs, location: value })
            }
          >
            <SelectTrigger className="bg-white border-primary/20">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="downtown">Downtown Dubai</SelectItem>
              <SelectItem value="marina">Dubai Marina</SelectItem>
              <SelectItem value="palm">Palm Jumeirah</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Bed className="w-4 h-4 text-primary" />
            Number of Bedrooms
          </label>
          <Input
            type="number"
            value={inputs.bedrooms}
            onChange={(e) =>
              setInputs({ ...inputs, bedrooms: Number(e.target.value) })
            }
            className="bg-white border-primary/20 focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Coins className="w-4 h-4 text-primary" />
            Initial Investment (AED)
          </label>
          <Input
            type="number"
            value={inputs.initialInvestment}
            onChange={(e) =>
              setInputs({ ...inputs, initialInvestment: Number(e.target.value) })
            }
            className="bg-white border-primary/20 focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <BankCard className="w-4 h-4 text-primary" />
            Monthly Mortgage (AED)
          </label>
          <Input
            type="number"
            value={inputs.monthlyMortgage}
            onChange={(e) =>
              setInputs({ ...inputs, monthlyMortgage: Number(e.target.value) })
            }
            className="bg-white border-primary/20 focus:border-primary"
          />
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button 
          onClick={() => onCalculate(inputs)} 
          className="bg-primary hover:bg-primary-dark text-white font-semibold px-8"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calculate ROI
        </Button>
      </div>
    </div>
  );
};