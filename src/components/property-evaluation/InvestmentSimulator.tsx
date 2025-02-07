
import { useState } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import InvestmentChart from "@/components/calculator/InvestmentChart";
import ReturnMetrics from "@/components/calculator/ReturnMetrics";
import { Building2, Wallet, Calendar, Percent, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const InvestmentSimulator = () => {
  const [investment, setInvestment] = useState(2000000);
  const [period, setPeriod] = useState(5);
  const [financingType, setFinancingType] = useState("cash");
  const [usageType, setUsageType] = useState("short-term");
  const [occupancyRate, setOccupancyRate] = useState(85);
  const [appreciationRate, setAppreciationRate] = useState(5);
  const [monthlyRent, setMonthlyRent] = useState(15000);
  const [propertySize, setPropertySize] = useState(1000);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const calculateReturns = () => {
    const annualReturn = usageType === "long-term" ? 0.08 : 0.12;
    const totalReturn = investment * Math.pow(1 + annualReturn, period);
    const profit = totalReturn - investment;
    
    return {
      totalReturn,
      profit,
      annualReturn: annualReturn * 100
    };
  };

  const generateChartData = () => {
    const data = [];
    const annualReturn = usageType === "long-term" ? 0.08 : 0.12;
    const appreciation = appreciationRate / 100;
    
    for (let month = 0; month <= period * 12; month++) {
      const rentalReturn = (monthlyRent * 12 * (occupancyRate / 100)) * (month / 12);
      const propertyAppreciation = investment * (Math.pow(1 + appreciation/12, month) - 1);
      
      data.push({
        month,
        rental: rentalReturn,
        appreciation: propertyAppreciation,
        total: rentalReturn + propertyAppreciation
      });
    }
    
    return data;
  };

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const { data: simulation, error } = await supabase
        .from('property_investment_simulations')
        .insert({
          investment_amount: investment,
          financing_type: financingType,
          usage_type: usageType,
          holding_period: period,
          property_size: propertySize,
          annual_operating_income: monthlyRent * 12,
          annual_operating_expenses: (monthlyRent * 12) * 0.3, // Assuming 30% operating expenses
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Simulation saved successfully",
        description: "Your investment simulation has been saved and can be accessed later.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving simulation",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const returns = calculateReturns();
  const chartData = generateChartData();

  return (
    <CardSpotlight className="p-6 space-y-8">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900">Investment Simulator</h3>
        <p className="text-gray-500 mt-2">
          Calculate potential returns based on market data and historical performance
        </p>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="details">Investment Details</TabsTrigger>
          <TabsTrigger value="financing">Financing Options</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-gray-500" />
              Investment Amount (AED)
            </Label>
            <Input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="bg-white border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-500" />
              Property Size (sqft)
            </Label>
            <Input
              type="number"
              value={propertySize}
              onChange={(e) => setPropertySize(Number(e.target.value))}
              className="bg-white border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              Investment Period
            </Label>
            <Select value={period.toString()} onValueChange={(v) => setPeriod(Number(v))}>
              <SelectTrigger className="bg-white border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 3, 5, 10].map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year} {year === 1 ? 'Year' : 'Years'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-500" />
              Usage Type
            </Label>
            <Select value={usageType} onValueChange={setUsageType}>
              <SelectTrigger className="bg-white border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short-term">Short Term Rental</SelectItem>
                <SelectItem value="long-term">Long Term Rental</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-gray-500" />
              Monthly Rent (AED)
            </Label>
            <Input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="bg-white border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-gray-500" />
              Expected Appreciation (%)
            </Label>
            <Input
              type="number"
              value={appreciationRate}
              onChange={(e) => setAppreciationRate(Number(e.target.value))}
              className="bg-white border-gray-200"
              min={0}
              max={100}
            />
          </div>
        </div>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button
          onClick={handleSimulate}
          className="bg-primary hover:bg-primary/90 text-white px-8"
          disabled={loading}
        >
          {loading ? "Simulating..." : "Calculate Returns"}
        </Button>
      </div>

      <ReturnMetrics
        totalReturn={returns.totalReturn}
        totalROIPercentage={(returns.profit / investment * 100).toFixed(1)}
        annualReturn={returns.profit / period}
      />

      <InvestmentChart data={chartData} />
    </CardSpotlight>
  );
};
