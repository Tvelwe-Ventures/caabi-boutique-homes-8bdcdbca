import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import InvestmentChart from "@/components/calculator/InvestmentChart";
import ReturnMetrics from "@/components/calculator/ReturnMetrics";
import ImportantNotes from "@/components/calculator/ImportantNotes";
import { useCalculator } from "@/hooks/useCalculator";
import { HeroSection } from "@/components/ui/hero-section";
import { Calculator as CalculatorIcon } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-b from-[#F5E6FA] to-white">
      <HeroSection 
        title="Dubai Property Investment"
        subtitle={{
          regular: "Investment ",
          gradient: "Calculator",
        }}
        description="How to Use This Calculator"
        ctaText="Get Started"
        gridOptions={{
          opacity: 0.2,
          lightLineColor: "#8394CA",
          darkLineColor: "#1A2957"
        }}
      />

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-primary/10">
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <CalculatorIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">1. Enter your investment amount (property purchase price)</h3>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Adjust the annual rental return slider based on expected rental yield</h3>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <span className="text-primary font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Adjust the property appreciation slider based on expected value increase</h3>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <span className="text-primary font-semibold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">View your projected returns over 5 years, including rental income and property appreciation</h3>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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