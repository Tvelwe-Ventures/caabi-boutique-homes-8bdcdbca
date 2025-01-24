import { CalculatorInputs, CalculatorResults } from "./types";

const baseNightlyRates = {
  downtown: { 1: 800, 2: 1200, 3: 1600 },
  marina: { 1: 700, 2: 1000, 3: 1400 },
  palm: { 1: 900, 2: 1300, 3: 1800 },
};

const calculateOccupancyScenarios = (baseRevenue: number) => ({
  conservative: { occupancy: 0.75, revenue: baseRevenue * 0.75 },
  moderate: { occupancy: 0.85, revenue: baseRevenue * 0.85 },
  optimistic: { occupancy: 0.95, revenue: baseRevenue * 0.95 },
});

export const calculateROI = (inputs: CalculatorInputs): CalculatorResults => {
  if (inputs.type === 'rental' && inputs.rental) {
    const { annualRent, initialInvestment, location, bedrooms } = inputs.rental;
    const baseNightlyRate = baseNightlyRates[location as keyof typeof baseNightlyRates]?.[bedrooms as keyof (typeof baseNightlyRates)['downtown']] || 1000;
    const baseAnnualRevenue = baseNightlyRate * 365;
    
    const scenarios = calculateOccupancyScenarios(baseAnnualRevenue);
    const moderateRevenue = scenarios.moderate.revenue;
    
    const airbnbFees = moderateRevenue * 0.20; // 20% Airbnb fees
    const managementFees = moderateRevenue * 0.175; // 17.5% average management fees
    const totalCosts = airbnbFees + managementFees + annualRent;
    const netProfit = moderateRevenue - totalCosts;
    const roi = (netProfit / initialInvestment) * 100;

    return {
      annualRevenue: moderateRevenue,
      netProfit,
      roi,
      occupancyRate: scenarios.moderate.occupancy * 100,
      averageNightlyRate: baseNightlyRate,
      airbnbFees,
      managementFees,
      scenarios: {
        conservative: {
          revenue: scenarios.conservative.revenue,
          roi: ((scenarios.conservative.revenue - totalCosts) / initialInvestment) * 100
        },
        moderate: {
          revenue: moderateRevenue,
          roi
        },
        optimistic: {
          revenue: scenarios.optimistic.revenue,
          roi: ((scenarios.optimistic.revenue - totalCosts) / initialInvestment) * 100
        }
      }
    };
  } else if (inputs.type === 'purchase' && inputs.purchase) {
    const { purchaseValue, monthlyMortgage, interiorCosts, reraFees } = inputs.purchase;
    const totalInvestment = purchaseValue + interiorCosts + reraFees;
    const annualMortgage = monthlyMortgage * 12;
    
    const baseNightlyRate = purchaseValue / 1000; // Simplified calculation
    const baseAnnualRevenue = baseNightlyRate * 365;
    
    const scenarios = calculateOccupancyScenarios(baseAnnualRevenue);
    const moderateRevenue = scenarios.moderate.revenue;
    
    const airbnbFees = moderateRevenue * 0.20;
    const managementFees = moderateRevenue * 0.175;
    const totalCosts = airbnbFees + managementFees + annualMortgage;
    const netProfit = moderateRevenue - totalCosts;
    const roi = (netProfit / totalInvestment) * 100;

    return {
      annualRevenue: moderateRevenue,
      netProfit,
      roi,
      occupancyRate: scenarios.moderate.occupancy * 100,
      averageNightlyRate: baseNightlyRate,
      airbnbFees,
      managementFees,
      scenarios: {
        conservative: {
          revenue: scenarios.conservative.revenue,
          roi: ((scenarios.conservative.revenue - totalCosts) / totalInvestment) * 100
        },
        moderate: {
          revenue: moderateRevenue,
          roi
        },
        optimistic: {
          revenue: scenarios.optimistic.revenue,
          roi: ((scenarios.optimistic.revenue - totalCosts) / totalInvestment) * 100
        }
      }
    };
  }

  return {
    annualRevenue: 0,
    netProfit: 0,
    roi: 0,
    occupancyRate: 0,
    averageNightlyRate: 0,
    airbnbFees: 0,
    managementFees: 0,
    scenarios: {
      conservative: { revenue: 0, roi: 0 },
      moderate: { revenue: 0, roi: 0 },
      optimistic: { revenue: 0, roi: 0 }
    }
  };
};