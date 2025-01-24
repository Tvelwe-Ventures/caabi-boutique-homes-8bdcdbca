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
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Footer from "./Footer";

const Calculator = () => {
  const [results, setResults] = useState<ResultsType>({
    annualRevenue: 0,
    netProfit: 0,
    roi: 0,
    occupancyRate: 0,
    averageNightlyRate: 0,
    airbnbFees: 0,
    managementFees: 0,
    scenarios: {
      conservative: { revenue: 0, roi: 0 },
      moderate: { revenue: 0, roi: 0 },
      optimistic: { revenue: 0, roi: 0 }
    }
  });

  const [investmentAmount, setInvestmentAmount] = useState(1000000);
  const [annualReturn, setAnnualReturn] = useState(9.9);
  const [appreciation, setAppreciation] = useState(5.65);

  const generateChartData = () => {
    const years = 5;
    const data = [];
    
    for (let i = 0; i <= years; i++) {
      const rentalReturn = investmentAmount * (Math.pow(1 + annualReturn / 100, i) - 1);
      const propertyAppreciation = investmentAmount * (Math.pow(1 + appreciation / 100, i) - 1);
      
      data.push({
        year: i,
        rental: rentalReturn,
        appreciation: propertyAppreciation,
        total: rentalReturn + propertyAppreciation
      });
    }
    
    return data;
  };

  const handleCalculate = (inputs: CalculatorInputs) => {
    const calculatedResults = calculateROI(inputs);
    setResults(calculatedResults);
  };

  const chartData = generateChartData();
  const totalReturn = chartData[chartData.length - 1].total;
  const totalROIPercentage = (totalReturn / investmentAmount * 100).toFixed(2);

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
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Investment Calculator</CardTitle>
              <CardDescription>
                Adjust the sliders to see how your investment could grow over time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Investment Amount (AED)</Label>
                  <Input 
                    type="number" 
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="text-lg font-semibold"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Annual Rental Return (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[annualReturn]}
                      onValueChange={(value) => setAnnualReturn(value[0])}
                      min={4}
                      max={12}
                      step={0.1}
                      className="flex-1"
                    />
                    <span className="text-lg font-semibold w-20">{annualReturn}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Annual Appreciation (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[appreciation]}
                      onValueChange={(value) => setAppreciation(value[0])}
                      min={2}
                      max={8}
                      step={0.1}
                      className="flex-1"
                    />
                    <span className="text-lg font-semibold w-20">{appreciation}%</span>
                  </div>
                </div>
              </div>

              <div className="h-[300px] mt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      label={{ value: 'Years', position: 'bottom' }} 
                    />
                    <YAxis 
                      label={{ 
                        value: 'Return (AED)', 
                        angle: -90, 
                        position: 'insideLeft' 
                      }} 
                    />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="rental" 
                      stackId="1"
                      stroke="#8394CA" 
                      fill="#8394CA" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="appreciation" 
                      stackId="1"
                      stroke="#B2D1E3" 
                      fill="#B2D1E3" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-xl">Total Return</CardTitle>
                    <p className="text-2xl font-bold text-primary">
                      AED {totalReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </CardHeader>
                </Card>
                
                <Card className="bg-gradient-to-br from-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-xl">Total ROI</CardTitle>
                    <p className="text-2xl font-bold text-primary">{totalROIPercentage}%</p>
                  </CardHeader>
                </Card>
                
                <Card className="bg-gradient-to-br from-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-xl">Annual Return</CardTitle>
                    <p className="text-2xl font-bold text-primary">
                      {(totalReturn / 5).toLocaleString(undefined, { maximumFractionDigits: 0 })} AED/year
                    </p>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </Card>

          <CardSpotlight className="overflow-hidden relative">
            <BorderBeam />
            <GlowingStars />
            <CardHeader className="text-center relative z-10">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
                Detailed ROI Calculator
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