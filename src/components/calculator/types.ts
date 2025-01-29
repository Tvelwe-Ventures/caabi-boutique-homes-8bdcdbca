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