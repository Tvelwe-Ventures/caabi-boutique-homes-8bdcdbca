import { CalculatorInputs, CalculatorResults } from "./types";

export const calculateROI = (inputs: CalculatorInputs): CalculatorResults => {
  const baseNightlyRates = {
    downtown: 1100,
    marina: 900,
    palm: 1300,
  };

  const occupancyRate = 0.88; // 88% occupancy
  const averageNightlyRate = baseNightlyRates[inputs.location as keyof typeof baseNightlyRates];
  const annualRevenue = averageNightlyRate * 365 * occupancyRate;
  const annualMortgage = inputs.monthlyMortgage * 12;
  const managementFee = annualRevenue * 0.25; // 25% management fee
  const netProfit = annualRevenue - managementFee - annualMortgage;
  const roi = (netProfit / inputs.initialInvestment) * 100;

  return {
    annualRevenue,
    netProfit,
    roi,
    occupancyRate: occupancyRate * 100,
    averageNightlyRate,
  };
};