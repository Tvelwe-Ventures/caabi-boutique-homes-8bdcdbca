import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { CalculatorResults as ResultsType } from "./types";

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
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
    >
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {results.annualRevenue.toLocaleString()} AED
            </CardTitle>
            <CardDescription>Annual Revenue</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {results.netProfit.toLocaleString()} AED
            </CardTitle>
            <CardDescription>Net Annual Profit</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {results.roi.toFixed(2)}%
            </CardTitle>
            <CardDescription>Return on Investment</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    </motion.div>
  );
};