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
      <div className="relative overflow-hidden py-20 sm:py-32 isolate">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.dark),transparent)]" />
        
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Calculate Your Investment Returns
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-300">
              Discover the potential of your property investment in Dubai with our advanced ROI calculator.
              Make informed decisions backed by real market data.
            </p>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pb-20"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="relative">
            <div className="moving-border">
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
          </div>

          {results.annualRevenue > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="moving-border">
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