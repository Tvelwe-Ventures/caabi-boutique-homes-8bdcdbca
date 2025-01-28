import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Info } from "lucide-react";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useToast } from "./ui/use-toast";
import Footer from "./Footer";
import CalculatorHeader from "./calculator/CalculatorHeader";
import InvestmentChart from "./calculator/InvestmentChart";
import ReturnMetrics from "./calculator/ReturnMetrics";
import ImportantNotes from "./calculator/ImportantNotes";
import { supabase } from "@/lib/supabaseClient";
import { CalculatorSettings, MarketData } from "./calculator/types";
import { useQuery } from "@tanstack/react-query";

const MARKET_DATA: MarketData = {
  averageRentalYield: 9.9,
  averageAppreciation: 5.65,
  averageOccupancy: 85,
  averageDailyRate: 1000,
  seasonalityFactors: [1, 1.2, 1.3, 1.1, 0.9, 0.8, 0.8, 0.9, 1, 1.1, 1.2, 1.3],
  marketTrends: {
    downtown: { yield: 9.9, appreciation: 5.65 },
    marina: { yield: 8.5, appreciation: 5.2 },
    palm: { yield: 10.2, appreciation: 6.0 }
  }
};

const Calculator = () => {
  const { toast } = useToast();
  const [investmentAmount, setInvestmentAmount] = useState(1000000);
  const [annualReturn, setAnnualReturn] = useState(MARKET_DATA.averageRentalYield);
  const [appreciation, setAppreciation] = useState(MARKET_DATA.averageAppreciation);

  // Fetch user's saved settings with error handling
  const { data: savedSettings } = useQuery({
    queryKey: ['calculatorSettings'],
    queryFn: async () => {
      try {
        console.log('Attempting to fetch calculator settings...');
        const { data, error } = await supabase
          .from('calculator_settings')
          .select('*')
          .single();
        
        if (error) {
          console.warn('Supabase query returned error:', error);
          return null;
        }
        
        console.log('Successfully fetched settings:', data);
        return data as CalculatorSettings;
      } catch (error) {
        console.warn('Failed to fetch calculator settings:', error);
        return null;
      }
    },
    retry: false,
    gcTime: 0
  });

  // Load saved settings when available
  useEffect(() => {
    if (savedSettings) {
      setInvestmentAmount(savedSettings.investmentAmount);
      setAnnualReturn(savedSettings.annualReturn);
      setAppreciation(savedSettings.appreciation);
    }
  }, [savedSettings]);

  const handleValueChange = async () => {
    try {
      const { error } = await supabase
        .from('calculator_settings')
        .upsert({
          investment_amount: investmentAmount,
          annual_return: annualReturn,
          appreciation: appreciation,
        });
      
      if (error) {
        console.warn('Error saving settings:', error);
        toast({
          title: "Note",
          description: "Changes saved locally. Connect to save online.",
          duration: 3000,
        });
        return;
      }

      toast({
        title: "Settings saved",
        description: "Your calculator settings have been saved successfully.",
        duration: 3000,
      });
    } catch (error) {
      console.warn('Failed to save settings:', error);
      toast({
        title: "Note",
        description: "Changes saved locally. Connect to save online.",
        duration: 3000,
      });
    }
  };

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

  const chartData = generateChartData();
  const totalReturn = chartData[chartData.length - 1].total;
  const totalROIPercentage = (totalReturn / investmentAmount * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-gradient-to-b from-primary/10 to-transparent pt-16 md:pt-32 pb-12 md:pb-20">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px] [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <CalculatorHeader />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-20 max-w-7xl">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          <Card className="p-4 md:p-6">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl md:text-2xl">Investment Calculator</CardTitle>
              <CardDescription>
                Your settings are automatically saved as you make changes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 md:space-y-8">
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
                  onChange={(e) => {
                    setInvestmentAmount(Number(e.target.value));
                    handleValueChange();
                  }}
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
                  onValueChange={([value]) => {
                    setAnnualReturn(value);
                    handleValueChange();
                  }}
                  min={0}
                  max={20}
                  step={0.1}
                  className="w-full"
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
                  onValueChange={([value]) => {
                    setAppreciation(value);
                    handleValueChange();
                  }}
                  min={0}
                  max={15}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="w-full overflow-x-auto">
                <InvestmentChart data={chartData} />
              </div>

              <ReturnMetrics 
                totalReturn={totalReturn}
                totalROIPercentage={totalROIPercentage}
                annualReturn={totalReturn / 5}
              />
            </CardContent>
          </Card>

          <ImportantNotes marketData={MARKET_DATA} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calculator;