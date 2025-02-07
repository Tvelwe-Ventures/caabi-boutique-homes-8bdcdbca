
import { useState } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import InvestmentChart from "@/components/calculator/InvestmentChart";
import ReturnMetrics from "@/components/calculator/ReturnMetrics";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { InvestmentDetails } from "./simulator/InvestmentDetails";
import { calculateReturns, generateChartData } from "./simulator/SimulationUtils";

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
          annual_operating_expenses: (monthlyRent * 12) * 0.3,
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

  const returns = calculateReturns(investment, period, usageType);
  const chartData = generateChartData(period, monthlyRent, occupancyRate, investment, appreciationRate, usageType);

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

        <InvestmentDetails
          investment={investment}
          setInvestment={setInvestment}
          propertySize={propertySize}
          setPropertySize={setPropertySize}
          period={period}
          setPeriod={setPeriod}
          usageType={usageType}
          setUsageType={setUsageType}
          monthlyRent={monthlyRent}
          setMonthlyRent={setMonthlyRent}
          appreciationRate={appreciationRate}
          setAppreciationRate={setAppreciationRate}
        />
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
