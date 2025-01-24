import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CalculatorForm } from "./calculator/CalculatorForm";
import { CalculatorResults } from "./calculator/CalculatorResults";
import { calculateROI } from "./calculator/calculatorUtils";
import type { CalculatorInputs, CalculatorResults as ResultsType } from "./calculator/types";
import { CardSpotlight } from "./ui/card-spotlight";
import { GlowingStars } from "./ui/glowing-stars";
import { BorderBeam } from "./ui/border-beam";
import { Calculator as CalculatorIcon, TrendingUp, DollarSign } from "lucide-react";
import Footer from "./Footer";

const Calculator = () => {
  const [results, setResults] = useState<ResultsType>({
    annualRevenue: 0,
    netProfit: 0,
    roi: 0,
    occupancyRate: 0,
    averageNightlyRate: 0,
  });

  const handleCalculate = (inputs: CalculatorInputs) => {
    const calculatedResults = calculateROI(inputs);
    setResults(calculatedResults);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-gradient-to-b from-primary/10 to-transparent pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px] [mask-image:linear-gradient(0deg,transparent,black)]" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8">
              <CalculatorIcon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gradient sm:text-6xl">
              Calculate Your Investment Returns
            </h1>
            <p className="text-lg leading-8 text-gray-600">
              Discover the potential of your property investment in Dubai with our advanced ROI calculator.
              Make informed decisions backed by real market data.
            </p>
          </div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-gray-800">Smart Analysis</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  Our calculator uses real market data to provide accurate ROI projections
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-gray-800">Revenue Insights</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  Get detailed breakdowns of potential earnings and expenses
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <CardSpotlight className="overflow-hidden relative">
            <BorderBeam />
            <GlowingStars />
            <CardHeader className="text-center relative z-10">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
                ROI Calculator
              </CardTitle>
              <CardDescription className="text-lg mt-4 text-gray-600">
                Use our interactive calculator to estimate your potential returns from 
                short-term rental property management in Dubai.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="mt-6">
                <CalculatorForm onCalculate={handleCalculate} />
              </div>
            </CardContent>
          </CardSpotlight>

          {results.annualRevenue > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardSpotlight className="relative">
                <BorderBeam delay={2} />
                <GlowingStars />
                <CardContent className="p-6 relative z-10">
                  <CalculatorResults results={results} />
                </CardContent>
              </CardSpotlight>
            </motion.div>
          )}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Calculator;