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
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary-light">
              {results.annualRevenue.toLocaleString()} AED
            </CardTitle>
            <CardDescription className="text-gray-400">
              Annual Revenue
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary-light">
              {results.netProfit.toLocaleString()} AED
            </CardTitle>
            <CardDescription className="text-gray-400">
              Net Annual Profit
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary-light">
              {results.roi.toFixed(2)}%
            </CardTitle>
            <CardDescription className="text-gray-400">
              Return on Investment
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    </motion.div>
  );
};