export interface CalculatorSettings {
  investmentAmount: number;
  annualReturn: number;
  appreciation: number;
}

export interface MarketData {
  averageRentalYield: number;
  averageAppreciation: number;
  averageOccupancy: number;
  averageDailyRate: number;
  seasonalityFactors: number[];
  marketTrends: {
    [key: string]: { yield: number; appreciation: number };
  };
}

export interface PropertyDetails {
  location: string;
  bedrooms: number;
  maxGuests: number;
  isFurnished: boolean;
  propertyType: string;
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

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface EvaluationResult {
  estimatedRevenue: number;
  estimatedOccupancy: number;
  averageDailyRate: number;
  rentalMonths: string[];
}