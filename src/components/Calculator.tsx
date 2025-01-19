import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CalculatorInputs {
  propertyValue: number;
  propertySize: number;
  location: string;
  bedrooms: number;
  initialInvestment: number;
  monthlyMortgage: number;
}

interface CalculatorResults {
  annualRevenue: number;
  netProfit: number;
  roi: number;
  occupancyRate: number;
  averageNightlyRate: number;
}

const Calculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    propertyValue: 1000000,
    propertySize: 1000,
    location: "downtown",
    bedrooms: 1,
    initialInvestment: 50000,
    monthlyMortgage: 5000,
  });

  const [results, setResults] = useState<CalculatorResults>({
    annualRevenue: 0,
    netProfit: 0,
    roi: 0,
    occupancyRate: 0,
    averageNightlyRate: 0,
  });

  const calculateROI = () => {
    const baseNightlyRates = {
      downtown: 1100,
      marina: 900,
      palm: 1300,
    };

    const occupancyRate = 0.88; // 88% occupancy
    const averageNightlyRate = baseNightlyRates[inputs.location as keyof typeof baseNightlyRates];
    const annualRevenue = averageNightlyRate * 365 * occupancyRate;
    const annualMortgage = inputs.monthlyMortgage * 12;
    const managementFee = annualRevenue * 0.25; // 25% management fee
    const netProfit = annualRevenue - managementFee - annualMortgage;
    const roi = (netProfit / inputs.initialInvestment) * 100;

    setResults({
      annualRevenue,
      netProfit,
      roi,
      occupancyRate: occupancyRate * 100,
      averageNightlyRate,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-primary/5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Calculate Your Property's Potential</CardTitle>
              <CardDescription>
                Use our interactive calculator to estimate your potential returns from 
                short-term rental property management in Dubai.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
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
              <Button onClick={calculateROI} className="w-full">Calculate ROI</Button>
              
              {results.annualRevenue > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        {results.annualRevenue.toLocaleString()} AED
                      </CardTitle>
                      <CardDescription>Annual Revenue</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        {results.netProfit.toLocaleString()} AED
                      </CardTitle>
                      <CardDescription>Net Annual Profit</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        {results.roi.toFixed(2)}%
                      </CardTitle>
                      <CardDescription>Return on Investment</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Calculator;