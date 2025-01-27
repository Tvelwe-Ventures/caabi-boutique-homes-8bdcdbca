import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CalculatorInputs } from "./calculator/types";
import { Building2, MapPin, Bed, Coins, Calculator, CreditCard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface CalculatorFormProps {
  onCalculate: (inputs: CalculatorInputs) => void;
}

export const CalculatorForm = ({ onCalculate }: CalculatorFormProps) => {
  const [calculatorType, setCalculatorType] = useState<'rental' | 'purchase'>('rental');
  const [rentalInputs, setRentalInputs] = useState({
    annualRent: 120000,
    initialInvestment: 50000,
    numberOfCheques: 1,
    location: "downtown",
    bedrooms: 1,
    area: 800,
  });

  const [purchaseInputs, setPurchaseInputs] = useState({
    purchaseValue: 1000000,
    paymentType: 'mortgage' as const,
    downPayment: 200000,
    monthlyMortgage: 5000,
    reraFees: 4000,
    interiorCosts: 100000,
  });

  const handleCalculate = () => {
    onCalculate({
      type: calculatorType,
      rental: calculatorType === 'rental' ? rentalInputs : undefined,
      purchase: calculatorType === 'purchase' ? purchaseInputs : undefined,
    });
  };

  return (
    <div className="space-y-8">
      <Tabs
        defaultValue="rental"
        className="w-full"
        onValueChange={(value) => setCalculatorType(value as 'rental' | 'purchase')}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rental">Rental Property</TabsTrigger>
          <TabsTrigger value="purchase">Purchase Property</TabsTrigger>
        </TabsList>

        <TabsContent value="rental" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Annual Rent (AED)
              </label>
              <Input
                type="number"
                value={rentalInputs.annualRent}
                onChange={(e) =>
                  setRentalInputs({ ...rentalInputs, annualRent: Number(e.target.value) })
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
                value={rentalInputs.initialInvestment}
                onChange={(e) =>
                  setRentalInputs({ ...rentalInputs, initialInvestment: Number(e.target.value) })
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
                value={rentalInputs.location}
                onValueChange={(value) =>
                  setRentalInputs({ ...rentalInputs, location: value })
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
                Bedrooms
              </label>
              <Input
                type="number"
                value={rentalInputs.bedrooms}
                onChange={(e) =>
                  setRentalInputs({ ...rentalInputs, bedrooms: Number(e.target.value) })
                }
                className="bg-white border-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="purchase" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Purchase Value (AED)
              </label>
              <Input
                type="number"
                value={purchaseInputs.purchaseValue}
                onChange={(e) =>
                  setPurchaseInputs({ ...purchaseInputs, purchaseValue: Number(e.target.value) })
                }
                className="bg-white border-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                Down Payment (AED)
              </label>
              <Input
                type="number"
                value={purchaseInputs.downPayment}
                onChange={(e) =>
                  setPurchaseInputs({ ...purchaseInputs, downPayment: Number(e.target.value) })
                }
                className="bg-white border-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Coins className="w-4 h-4 text-primary" />
                Monthly Mortgage (AED)
              </label>
              <Input
                type="number"
                value={purchaseInputs.monthlyMortgage}
                onChange={(e) =>
                  setPurchaseInputs({ ...purchaseInputs, monthlyMortgage: Number(e.target.value) })
                }
                className="bg-white border-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Interior Costs (AED)
              </label>
              <Input
                type="number"
                value={purchaseInputs.interiorCosts}
                onChange={(e) =>
                  setPurchaseInputs({ ...purchaseInputs, interiorCosts: Number(e.target.value) })
                }
                className="bg-white border-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center gap-4">
        <Button 
          onClick={handleCalculate} 
          className="bg-primary hover:bg-primary-dark text-white font-semibold px-8"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calculate ROI
        </Button>
      </div>
    </div>
  );
};