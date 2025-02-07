import { useState } from "react";
import { CalculatorInputs } from "./types";
import { Calculator } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ButtonColorful } from "../ui/button-colorful";
import { RentalInputs } from "./form/RentalInputs";
import { PurchaseInputs } from "./form/PurchaseInputs";

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
    maxGuests: 2,
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
          <RentalInputs values={rentalInputs} onChange={setRentalInputs} />
        </TabsContent>

        <TabsContent value="purchase" className="space-y-6">
          <PurchaseInputs values={purchaseInputs} onChange={setPurchaseInputs} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-center gap-4">
        <ButtonColorful 
          onClick={handleCalculate} 
          label="Calculate ROI"
        />
      </div>
    </div>
  );
};