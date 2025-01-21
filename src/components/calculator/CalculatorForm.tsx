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
import { Card, CardContent } from "../ui/card";
import { CalculatorInputs } from "./types";

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
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Property Value (AED)</label>
          <Input
            type="number"
            value={inputs.propertyValue}
            onChange={(e) =>
              setInputs({ ...inputs, propertyValue: Number(e.target.value) })
            }
            className="bg-black/50 border-primary/20 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Property Size (sq ft)</label>
          <Input
            type="number"
            value={inputs.propertySize}
            onChange={(e) =>
              setInputs({ ...inputs, propertySize: Number(e.target.value) })
            }
            className="bg-black/50 border-primary/20 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Location</label>
          <Select
            value={inputs.location}
            onValueChange={(value) =>
              setInputs({ ...inputs, location: value })
            }
          >
            <SelectTrigger className="bg-black/50 border-primary/20 text-gray-200">
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
          <label className="text-sm font-medium text-gray-300">Number of Bedrooms</label>
          <Input
            type="number"
            value={inputs.bedrooms}
            onChange={(e) =>
              setInputs({ ...inputs, bedrooms: Number(e.target.value) })
            }
            className="bg-black/50 border-primary/20 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Initial Investment (AED)</label>
          <Input
            type="number"
            value={inputs.initialInvestment}
            onChange={(e) =>
              setInputs({ ...inputs, initialInvestment: Number(e.target.value) })
            }
            className="bg-black/50 border-primary/20 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Monthly Mortgage (AED)</label>
          <Input
            type="number"
            value={inputs.monthlyMortgage}
            onChange={(e) =>
              setInputs({ ...inputs, monthlyMortgage: Number(e.target.value) })
            }
            className="bg-black/50 border-primary/20 text-gray-200"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => onCalculate(inputs)} 
          className="bg-primary hover:bg-primary-dark text-white font-semibold"
        >
          Calculate ROI
        </Button>
        <Button 
          variant="secondary"
          onClick={() => window.location.href = '/contact'}
          className="hover:bg-secondary-dark text-white font-semibold"
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
};