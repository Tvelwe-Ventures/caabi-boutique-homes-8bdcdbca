import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import InvestmentChart from "@/components/calculator/InvestmentChart";
import ReturnMetrics from "@/components/calculator/ReturnMetrics";
import ImportantNotes from "@/components/calculator/ImportantNotes";
import { useCalculator } from "@/hooks/useCalculator";
import { Separator } from "@/components/ui/separator";
import { BuyVsRentCalculator } from "@/components/calculator/BuyVsRentCalculator";
import { HeroSection } from "@/components/ui/hero-section";

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
    annualReturn,
    appreciation,
    handleValueChange,
    generateChartData
  } = useCalculator();

  const chartData = generateChartData();
  const totalReturn = chartData[chartData.length - 1].total;
  const totalROIPercentage = (totalReturn / investmentAmount * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection 
        title="ROI Calculator"
        subtitle={{
          regular: "Calculate your potential ",
          gradient: "returns in Dubai's property market",
        }}
        description="Use our advanced ROI calculator to estimate your property's potential returns, taking into account rental yield, property appreciation, and market trends."
        gridOptions={{
          opacity: 0.3,
          lightLineColor: "#8394CA",
          darkLineColor: "#1A2957"
        }}
      />

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

          <Separator className="my-8" />

          <BuyVsRentCalculator />

          <ImportantNotes marketData={MARKET_DATA} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calculator;