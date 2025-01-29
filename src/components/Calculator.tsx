import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Footer from "./Footer";
import CalculatorHeader from "./calculator/CalculatorHeader";
import InvestmentChart from "./calculator/InvestmentChart";
import ReturnMetrics from "./calculator/ReturnMetrics";
import ImportantNotes from "./calculator/ImportantNotes";
import { CalculatorInputs } from "./calculator/CalculatorInputs";
import { useCalculator } from "@/hooks/useCalculator";

export const MARKET_DATA = {
  averageRentalYield: 9.9,
  averageAppreciation: 5.65,
  averageOccupancy: 85,
  averageDailyRate: 1000,
  seasonalityFactors: [1, 1.2, 1.3, 1.1, 0.9, 0.8, 0.8, 0.9, 1, 1.1, 1.2, 1.3],
  marketTrends: {
    downtown: { yield: 9.9, appreciation: 5.65 },
    marina: { yield: 8.5, appreciation: 5.2 },
    palm: { yield: 10.2, appreciation: 6.0 }
  }
};

const Calculator = () => {
  const {
    investmentAmount,
    setInvestmentAmount,
    annualReturn,
    setAnnualReturn,
    appreciation,
    setAppreciation,
    handleValueChange,
    generateChartData
  } = useCalculator();

  const chartData = generateChartData();
  const totalReturn = chartData[chartData.length - 1].total;
  const totalROIPercentage = (totalReturn / investmentAmount * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-gradient-to-b from-primary/10 to-transparent pt-16 md:pt-32 pb-12 md:pb-20">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px] [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <CalculatorHeader />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-20 max-w-7xl">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          <Card className="p-4 md:p-6">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl md:text-2xl">Investment Calculator</CardTitle>
              <CardDescription>
                Your settings are automatically saved as you make changes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 md:space-y-8">
              <CalculatorInputs
                investmentAmount={investmentAmount}
                annualReturn={annualReturn}
                appreciation={appreciation}
                onInvestmentChange={(value) => {
                  setInvestmentAmount(value);
                  handleValueChange();
                }}
                onAnnualReturnChange={(value) => {
                  setAnnualReturn(value);
                  handleValueChange();
                }}
                onAppreciationChange={(value) => {
                  setAppreciation(value);
                  handleValueChange();
                }}
              />

              <div className="w-full overflow-x-auto">
                <InvestmentChart data={chartData} />
              </div>

              <ReturnMetrics 
                totalReturn={totalReturn}
                totalROIPercentage={totalROIPercentage}
                annualReturn={totalReturn / 5}
              />
            </CardContent>
          </Card>

          <ImportantNotes marketData={MARKET_DATA} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calculator;