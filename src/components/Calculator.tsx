import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Footer from "./Footer";
import { useCalculator } from "@/hooks/useCalculator";
import { HeroSection } from "./ui/hero-section";
import Header from "./Header";
import { motion } from "framer-motion";
import { CalculatorForm } from "./calculator/CalculatorForm";
import { CalculatorResults } from "./calculator/CalculatorResults";
import { useState } from "react";
import { CalculatorInputs } from "./calculator/types";
import { calculateROI } from "./calculator/calculatorUtils";
import InvestmentChart from "./calculator/InvestmentChart";
import ReturnMetrics from "./calculator/ReturnMetrics";
import ImportantNotes from "./calculator/ImportantNotes";

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
  const [calculatorResults, setCalculatorResults] = useState<any>(null);
  const {
    investmentAmount,
    generateChartData
  } = useCalculator();

  const handleCalculate = (inputs: CalculatorInputs) => {
    console.log('Calculating ROI with inputs:', inputs);
    const results = calculateROI(inputs);
    setCalculatorResults(results);
  };

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
            gradient: "returns in Dubai's short term rental market",
          }}
          description="Our AI-powered calculator provides accurate revenue projections, occupancy rates, and ROI estimates based on Dubai's current market conditions."
        />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <Card className="p-4 md:p-6">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl md:text-2xl">Investment Calculator</CardTitle>
                <CardDescription>
                  Your settings are automatically saved as you make changes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 md:space-y-8">
                <CalculatorForm onCalculate={handleCalculate} />
                
                {calculatorResults && (
                  <CalculatorResults results={calculatorResults} />
                )}

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