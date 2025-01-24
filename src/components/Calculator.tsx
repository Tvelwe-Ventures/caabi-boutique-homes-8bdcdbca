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
import { useQuery, useMutation } from "@tanstack/react-query";

const MARKET_DATA: MarketData = {
  averageRentalYield: 9.9,
  averageAppreciation: 5.65,
  marketTrends: {
    downtown: { yield: 9.9, appreciation: 5.65 },
    marina: { yield: 8.5, appreciation: 5.2 },
    palmJumeirah: { yield: 10.2, appreciation: 6.0 }
  }
};

const Calculator = () => {
  const { toast } = useToast();
  const [investmentAmount, setInvestmentAmount] = useState(1000000);
  const [annualReturn, setAnnualReturn] = useState(MARKET_DATA.averageRentalYield);
  const [appreciation, setAppreciation] = useState(MARKET_DATA.averageAppreciation);

  // Fetch user's saved settings
  const { data: savedSettings } = useQuery({
    queryKey: ['calculatorSettings'],
    queryFn: async () => {
      const { data: settings, error } = await supabase
        .from('calculator_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return settings as CalculatorSettings;
    },
  });

  // Save settings mutation
  const { mutate: saveSettings } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('calculator_settings')
        .upsert({
          investment_amount: investmentAmount,
          annual_return: annualReturn,
          appreciation: appreciation,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Settings saved",
        description: "Your calculator settings have been saved successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
      console.error('Error saving settings:', error);
    },
  });

  // Load saved settings when available
  useEffect(() => {
    if (savedSettings) {
      setInvestmentAmount(savedSettings.investment_amount);
      setAnnualReturn(savedSettings.annual_return);
      setAppreciation(savedSettings.appreciation);
    }
  }, [savedSettings]);

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

  const handleValueChange = () => {
    saveSettings();
  };

  const chartData = generateChartData();
  const totalReturn = chartData[chartData.length - 1].total;
  const totalROIPercentage = (totalReturn / investmentAmount * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-gradient-to-b from-primary/10 to-transparent pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px] [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container mx-auto px-4 relative z-10">
          <CalculatorHeader />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Investment Calculator</CardTitle>
              <CardDescription>
                Your settings are automatically saved as you make changes
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
                />
              </div>

              <InvestmentChart data={chartData} />

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