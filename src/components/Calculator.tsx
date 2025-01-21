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
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-gradient"
        >
          Calculate Your Investment Returns
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-center mb-12 text-gray-300"
        >
          Discover the potential of your property investment in Dubai
        </motion.p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pb-20"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="moving-border relative">
            <CardSpotlight className="overflow-hidden relative">
              <BorderBeam />
              <GlowingStars />
              <CardHeader className="text-center relative z-10">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
                  ROI Calculator
                </CardTitle>
                <CardDescription className="text-lg mt-4 text-gray-400">
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
          </div>

          {results.annualRevenue > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="moving-border relative">
                <CardSpotlight className="relative">
                  <BorderBeam delay={2} />
                  <GlowingStars />
                  <CardContent className="p-6 relative z-10">
                    <CalculatorResults results={results} />
                  </CardContent>
                </CardSpotlight>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Calculator;