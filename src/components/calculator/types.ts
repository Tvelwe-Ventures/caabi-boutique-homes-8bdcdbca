export interface CalculatorInputs {
  type: 'rental' | 'purchase';
  rental?: {
    annualRent: number;
    initialInvestment: number;
    numberOfCheques: number;
    location: string;
    bedrooms: number;
    area: number;
    maxGuests: number;
  };
  purchase?: {
    purchaseValue: number;
    paymentType: 'mortgage';
    downPayment: number;
    monthlyMortgage: number;
    reraFees: number;
    interiorCosts: number;
  };
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
    conservative: {
      revenue: number;
      roi: number;
    };
    moderate: {
      revenue: number;
      roi: number;
    };
    optimistic: {
      revenue: number;
      roi: number;
    };
  };
}

export interface CalculatorSettings {
  investment_amount: number;
  annual_return: number;
  appreciation: number;
  user_id?: string;
}