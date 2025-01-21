import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CalculatorForm } from "./calculator/CalculatorForm";
import { CalculatorResults } from "./calculator/CalculatorResults";
import { calculateROI } from "./calculator/calculatorUtils";
import type { CalculatorInputs, CalculatorResults as ResultsType } from "./calculator/types";

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
    <div className="min-h-screen bg-gradient-to-br from-white to-primary/5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Calculate Your Property's Potential</CardTitle>
              <CardDescription>
                Use our interactive calculator to estimate your potential returns from 
                short-term rental property management in Dubai.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <div className="mt-6">
            <CalculatorForm onCalculate={handleCalculate} />
          </div>

          {results.annualRevenue > 0 && (
            <CalculatorResults results={results} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Calculator;