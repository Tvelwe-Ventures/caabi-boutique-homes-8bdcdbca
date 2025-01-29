export interface CalculatorInputs {
  type: 'rental' | 'sale';
  rental?: {
    location: string;
    bedrooms: number;
    maxGuests: number;
  };
  sale?: {
    propertyValue: number;
    downPayment: number;
    loanTerm: number;
  };
}

export interface CalculatorResults {
  monthlyRevenue: number;
  annualRevenue: number;
  occupancyRate: number;
  roi: number;
  propertyValue: number;
}