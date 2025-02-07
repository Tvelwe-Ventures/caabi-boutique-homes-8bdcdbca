import { useState } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import InvestmentChart from "@/components/calculator/InvestmentChart";
import ReturnMetrics from "@/components/calculator/ReturnMetrics";
import { Building2, DollarSign, Percent, Calendar } from "lucide-react";

export const InvestmentSimulator = () => {
  const [investment, setInvestment] = useState(2000000);
  const [period, setPeriod] = useState(5);
  const [type, setType] = useState("short-term");
  const [occupancyRate, setOccupancyRate] = useState(85);
  const [appreciationRate, setAppreciationRate] = useState(5);
  const [monthlyRent, setMonthlyRent] = useState(15000);

  const calculateReturns = () => {
    const annualReturn = type === "long-term" ? 0.08 : 0.12;
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
    const annualReturn = type === "long-term" ? 0.08 : 0.12;
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

  const returns = calculateReturns();
  const chartData = generateChartData();

  return (
    <CardSpotlight className="p-6 space-y-8">
      <div>
        <h3 className="text-2xl font-semibold mb-2">Investment Simulator</h3>
        <p className="text-muted-foreground">
          Simulate your potential returns based on market data and historical performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            Investment Amount (AED)
          </Label>
          <Input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="bg-white/50 border-primary/20"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            Investment Type
          </Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="bg-white/50 border-primary/20">
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
            <Calendar className="w-4 h-4 text-primary" />
            Investment Period (Years)
          </Label>
          <Select value={period.toString()} onValueChange={(v) => setPeriod(Number(v))}>
            <SelectTrigger className="bg-white/50 border-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 3, 5, 10].map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year} Years
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            Monthly Rent (AED)
          </Label>
          <Input
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value))}
            className="bg-white/50 border-primary/20"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-primary" />
            Expected Occupancy Rate (%)
          </Label>
          <Input
            type="number"
            value={occupancyRate}
            onChange={(e) => setOccupancyRate(Number(e.target.value))}
            className="bg-white/50 border-primary/20"
            min={0}
            max={100}
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-primary" />
            Property Appreciation Rate (%)
          </Label>
          <Input
            type="number"
            value={appreciationRate}
            onChange={(e) => setAppreciationRate(Number(e.target.value))}
            className="bg-white/50 border-primary/20"
            min={0}
            max={100}
          />
        </div>
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