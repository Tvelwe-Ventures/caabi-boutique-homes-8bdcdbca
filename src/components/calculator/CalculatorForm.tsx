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
    <Card>
      <CardContent className="grid gap-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Property Value (AED)</label>
            <Input
              type="number"
              value={inputs.propertyValue}
              onChange={(e) =>
                setInputs({ ...inputs, propertyValue: Number(e.target.value) })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Property Size (sq ft)</label>
            <Input
              type="number"
              value={inputs.propertySize}
              onChange={(e) =>
                setInputs({ ...inputs, propertySize: Number(e.target.value) })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Select
              value={inputs.location}
              onValueChange={(value) =>
                setInputs({ ...inputs, location: value })
              }
            >
              <SelectTrigger>
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
            <label className="text-sm font-medium">Number of Bedrooms</label>
            <Input
              type="number"
              value={inputs.bedrooms}
              onChange={(e) =>
                setInputs({ ...inputs, bedrooms: Number(e.target.value) })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Initial Investment (AED)</label>
            <Input
              type="number"
              value={inputs.initialInvestment}
              onChange={(e) =>
                setInputs({ ...inputs, initialInvestment: Number(e.target.value) })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Monthly Mortgage (AED)</label>
            <Input
              type="number"
              value={inputs.monthlyMortgage}
              onChange={(e) =>
                setInputs({ ...inputs, monthlyMortgage: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <Button onClick={() => onCalculate(inputs)} className="w-full">
          Calculate ROI
        </Button>
      </CardContent>
    </Card>
  );
};