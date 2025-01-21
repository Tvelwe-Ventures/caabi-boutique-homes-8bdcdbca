export interface CalculatorInputs {
  propertyValue: number;
  propertySize: number;
  location: string;
  bedrooms: number;
  initialInvestment: number;
  monthlyMortgage: number;
}

export interface CalculatorResults {
  annualRevenue: number;
  netProfit: number;
  roi: number;
  occupancyRate: number;
  averageNightlyRate: number;
}