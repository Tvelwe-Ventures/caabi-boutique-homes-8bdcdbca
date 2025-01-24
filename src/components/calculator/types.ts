export interface RentalCalculatorInputs {
  annualRent: number;
  initialInvestment: number;
  numberOfCheques: number;
  location: string;
  bedrooms: number;
  area: number;
}

export interface PurchaseCalculatorInputs {
  purchaseValue: number;
  paymentType: 'cash' | 'mortgage';
  downPayment: number;
  monthlyMortgage: number;
  reraFees: number;
  interiorCosts: number;
}

export interface CalculatorInputs {
  type: 'rental' | 'purchase';
  rental?: RentalCalculatorInputs;
  purchase?: PurchaseCalculatorInputs;
}

export interface CalculatorResults {
  annualRevenue: number;
  netProfit: number;
  roi: number;
  occupancyRate: number;
  averageNightlyRate: number;
  airbnbFees: number;
  managementFees: number;
  scenarios: {
    conservative: { revenue: number; roi: number };
    moderate: { revenue: number; roi: number };
    optimistic: { revenue: number; roi: number };
  };
}