
export const calculateReturns = (investment: number, period: number, usageType: string) => {
  const annualReturn = usageType === "long-term" ? 0.08 : 0.12;
  const totalReturn = investment * Math.pow(1 + annualReturn, period);
  const profit = totalReturn - investment;
  
  return {
    totalReturn,
    profit,
    annualReturn: annualReturn * 100
  };
};

export const generateChartData = (
  period: number,
  monthlyRent: number,
  occupancyRate: number,
  investment: number,
  appreciationRate: number,
  usageType: string
) => {
  const data = [];
  const appreciation = appreciationRate / 100;
  
  for (let month = 0; month <= period * 12; month++) {
    const rentalReturn = (monthlyRent * 12 * (occupancyRate / 100)) * (month / 12);
    const propertyAppreciation = investment * (Math.pow(1 + appreciation/12, month) - 1);
    
    data.push({
      month,
      rental: rentalReturn,
      appreciation: propertyAppreciation,
      total: rentalReturn + propertyAppreciation
    });
  }
  
  return data;
};
