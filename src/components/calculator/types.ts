export interface CalculatorSettings {
  id: string;
  created_at: string;
  investment_amount: number;
  annual_return: number;
  appreciation: number;
  user_id: string;
}

export interface MarketData {
  averageRentalYield: number;
  averageAppreciation: number;
  marketTrends: {
    downtown: { yield: number; appreciation: number };
    marina: { yield: number; appreciation: number };
    palmJumeirah: { yield: number; appreciation: number };
  };
}

export interface ChartData {
  month: number;
  rental: number;
  appreciation: number;
  total: number;
}

export interface CalculatorInputs {
  type: 'rental' | 'purchase';
  rental?: {
    annualRent: number;
    initialInvestment: number;
    numberOfCheques: number;
    location: string;
    bedrooms: number;
    area: number;
  };
  purchase?: {
    purchaseValue: number;
    paymentType: 'cash' | 'mortgage';
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
    conservative: { revenue: number; roi: number };
    moderate: { revenue: number; roi: number };
    optimistic: { revenue: number; roi: number };
  };
}