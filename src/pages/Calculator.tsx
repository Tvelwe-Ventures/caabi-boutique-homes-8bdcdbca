import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import InvestmentChart from "@/components/calculator/InvestmentChart";
import ReturnMetrics from "@/components/calculator/ReturnMetrics";
import ImportantNotes from "@/components/calculator/ImportantNotes";
import { useCalculator } from "@/hooks/useCalculator";
import { HeroSection } from "@/components/ui/hero-section";
import Header from "@/components/Header";
import { motion } from "framer-motion";

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
      <Header />
      <main>
        <HeroSection 
          title="Investment Calculator"
          subtitle={{
            regular: "Calculate your potential ",
            gradient: "returns in Dubai's property market",
          }}
          description="Our AI-powered calculator provides accurate revenue projections, occupancy rates, and ROI estimates based on Dubai's current market conditions."
        />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
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
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calculator;