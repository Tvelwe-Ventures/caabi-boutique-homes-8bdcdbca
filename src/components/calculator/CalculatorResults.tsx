import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { CalculatorResults as ResultsType } from "./types";
import { TrendingUp, DollarSign, Percent, BarChart } from "lucide-react";

interface CalculatorResultsProps {
  results: ResultsType;
}

export const CalculatorResults = ({ results }: CalculatorResultsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800">
                {results.annualRevenue.toLocaleString()} AED
              </CardTitle>
              <CardDescription className="text-gray-600">
                Annual Revenue
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800">
                {results.netProfit.toLocaleString()} AED
              </CardTitle>
              <CardDescription className="text-gray-600">
                Net Annual Profit
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Percent className="w-5 h-5 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800">
                {results.roi.toFixed(2)}%
              </CardTitle>
              <CardDescription className="text-gray-600">
                Return on Investment
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-primary/10">
                <BarChart className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-xl text-gray-800">Occupancy Scenarios</CardTitle>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <h4 className="font-semibold text-gray-700">Conservative (75%)</h4>
                <p className="text-lg font-bold text-primary">{results.scenarios.conservative.revenue.toLocaleString()} AED</p>
                <p className="text-sm text-gray-600">ROI: {results.scenarios.conservative.roi.toFixed(2)}%</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Moderate (85%)</h4>
                <p className="text-lg font-bold text-primary">{results.scenarios.moderate.revenue.toLocaleString()} AED</p>
                <p className="text-sm text-gray-600">ROI: {results.scenarios.moderate.roi.toFixed(2)}%</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Optimistic (95%)</h4>
                <p className="text-lg font-bold text-primary">{results.scenarios.optimistic.revenue.toLocaleString()} AED</p>
                <p className="text-sm text-gray-600">ROI: {results.scenarios.optimistic.roi.toFixed(2)}%</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 mb-4">Fee Breakdown</CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Airbnb Fees (20%)</span>
                <span className="font-semibold">{results.airbnbFees.toLocaleString()} AED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Management Fees (15-20%)</span>
                <span className="font-semibold">{results.managementFees.toLocaleString()} AED</span>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>
    </motion.div>
  );
};