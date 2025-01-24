import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CalculatorForm } from "./calculator/CalculatorForm";
import { CalculatorResults } from "./calculator/CalculatorResults";
import { calculateROI } from "./calculator/calculatorUtils";
import type { CalculatorInputs, CalculatorResults as ResultsType } from "./calculator/types";
import { CardSpotlight } from "./ui/card-spotlight";
import { GlowingStars } from "./ui/glowing-stars";
import { BorderBeam } from "./ui/border-beam";
import { Calculator as CalculatorIcon, TrendingUp, DollarSign, Info } from "lucide-react";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Footer from "./Footer";

// Market data - In a real application, these would come from an API
const MARKET_DATA = {
  averageRentalYield: 9.9,
  averageAppreciation: 5.65,
  marketTrends: {
    downtown: { yield: 9.9, appreciation: 5.65 },
    marina: { yield: 8.5, appreciation: 5.2 },
    palmJumeirah: { yield: 10.2, appreciation: 6.0 }
  }
};

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
  const [annualReturn, setAnnualReturn] = useState(MARKET_DATA.averageRentalYield);
  const [appreciation, setAppreciation] = useState(MARKET_DATA.averageAppreciation);

  const generateChartData = () => {
    const years = 5;
    const data = [];
    
    for (let i = 0; i <= years * 12; i++) {
      const month = i;
      const rentalReturn = Number(investmentAmount) * (Math.pow(1 + (Number(annualReturn) / 100) / 12, i) - 1);
      const propertyAppreciation = Number(investmentAmount) * (Math.pow(1 + (Number(appreciation) / 100) / 12, i) - 1);
      
      data.push({
        month,
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
              Dubai Property Investment Calculator
            </h1>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">How to Use This Calculator</h2>
              <div className="grid gap-4 text-left text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">1</div>
                  <p>Enter your investment amount (property purchase price)</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">2</div>
                  <p>Adjust the annual rental return slider based on expected rental yield (current market average: {MARKET_DATA.averageRentalYield}%)</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">3</div>
                  <p>Adjust the property appreciation slider based on expected value increase (current market average: {MARKET_DATA.averageAppreciation}%)</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">4</div>
                  <p>View your projected returns over 5 years, including rental income and property appreciation</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <CalculatorForm onCalculate={handleCalculate} />

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
              <div className="h-[300px] mt-8 bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Return Timeline Trend</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRental" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAppreciation" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tickFormatter={(value) => `${Math.floor(value/12)}`}
                      stroke="#94a3b8"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#94a3b8"
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${(value/1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-4 shadow-lg rounded-lg border">
                              <p className="text-sm text-gray-600">
                                Year {Math.floor(payload[0].payload.month/12)}
                              </p>
                              <p className="text-sm font-semibold">
                                Rental: {(payload[0].value/1000000).toFixed(2)}M AED
                              </p>
                              <p className="text-sm font-semibold">
                                Appreciation: {(payload[1].value/1000000).toFixed(2)}M AED
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="rental" 
                      stroke="#8884d8" 
                      fillOpacity={1}
                      fill="url(#colorRental)"
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="appreciation" 
                      stroke="#82ca9d" 
                      fillOpacity={1}
                      fill="url(#colorAppreciation)"
                      strokeWidth={2}
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
