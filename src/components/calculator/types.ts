export interface CalculatorSettings {
  investmentAmount: number;
  annualReturn: number;
  appreciation: number;
}

export interface MarketData {
  averageOccupancy: number;
  averageDailyRate: number;
  seasonalityFactors: number[];
}

export interface PropertyDetails {
  location: string;
  bedrooms: number;
  maxGuests: number;
  isFurnished: boolean;
  propertyType: string;
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