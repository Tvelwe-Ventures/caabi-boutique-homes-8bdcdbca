import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CalculatorForm } from "./calculator/CalculatorForm";
import { CalculatorResults } from "./calculator/CalculatorResults";
import { calculateROI } from "./calculator/calculatorUtils";
import type { CalculatorInputs, CalculatorResults as ResultsType } from "./calculator/types";
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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
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
        <div className="container mx-auto px-4 relative z-10">
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
        </div>
      </div>

      <CalculatorForm onCalculate={handleCalculate} />

      <div className="container mx-auto px-4 py-20">
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
                <div className="flex items-center gap-2">
                  <Label htmlFor="investment">Investment Amount</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>The total amount you plan to invest in the property</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="investment"
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full"
                />

                <div className="flex items-center gap-2">
                  <Label>Annual Rental Return (%)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Expected yearly rental income as a percentage of property value</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Slider
                  value={[annualReturn]}
                  onValueChange={([value]) => setAnnualReturn(value)}
                  min={0}
                  max={20}
                  step={0.1}
                />

                <div className="flex items-center gap-2">
                  <Label>Property Appreciation (%)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Expected annual increase in property value</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Slider
                  value={[appreciation]}
                  onValueChange={([value]) => setAppreciation(value)}
                  min={0}
                  max={15}
                  step={0.1}
                />
              </div>

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
                    <RechartsTooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 border rounded shadow-lg">
                              <p className="font-semibold">Year {Math.floor(Number(label)/12)}</p>
                              {payload.map((entry, index) => (
                                <p key={index} className="text-sm">
                                  {entry.name === "rental" ? "Rental Return: " : "Property Appreciation: "}
                                  {(entry.value/1000000).toFixed(2)}M AED
                                </p>
                              ))}
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

          <Card className="p-6 bg-slate-50">
            <CardHeader>
              <CardTitle className="text-xl">Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Calculation Method:</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                  <li>Rental Return: Calculated monthly based on the annual rental yield percentage</li>
                  <li>Property Appreciation: Compounds monthly based on the annual appreciation rate</li>
                  <li>Total Return: Combines both rental income and property value increase</li>
                  <li>ROI Percentage: (Total Return / Initial Investment) × 100</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Market Insights:</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                  <li>Current market average rental yield: {MARKET_DATA.averageRentalYield}%</li>
                  <li>Average property appreciation rate: {MARKET_DATA.averageAppreciation}%</li>
                  <li>Returns vary by location and property type</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Assumptions:</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                  <li>Calculations assume consistent market conditions over the 5-year period</li>
                  <li>Property maintenance costs and other expenses are not included</li>
                  <li>Actual returns may vary based on market conditions and property management</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calculator;
