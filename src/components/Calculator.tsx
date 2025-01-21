import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CalculatorForm } from "./calculator/CalculatorForm";
import { CalculatorResults } from "./calculator/CalculatorResults";
import { calculateROI } from "./calculator/calculatorUtils";
import type { CalculatorInputs, CalculatorResults as ResultsType } from "./calculator/types";
import { CardSpotlight } from "./ui/card-spotlight";
import { Hero } from "./ui/hero";
import { GlowingStars } from "./ui/glowing-stars";
import { BorderBeam } from "./ui/border-beam";

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
      <Hero 
        title={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-gradient">Maximize</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent"
            >
              your real estate investments
            </motion.span>
          </motion.div>
        }
        subtitle="Request a free consultation over a coffee"
        actions={[
          {
            label: "Book Consultation",
            href: "/contact",
            variant: "default"
          }
        ]}
        className="mb-12"
      />
      
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
                  Calculate Your Property's Potential
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
    </div>
  );
};

export default Calculator;