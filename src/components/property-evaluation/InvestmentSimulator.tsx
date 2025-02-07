import { useState } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";

export const InvestmentSimulator = () => {
  const [investment, setInvestment] = useState(2000000);
  const [period, setPeriod] = useState(5);
  const [type, setType] = useState("long-term");

  const calculateReturns = () => {
    // Simplified calculation - replace with actual logic
    const annualReturn = type === "long-term" ? 0.08 : 0.12;
    const totalReturn = investment * Math.pow(1 + annualReturn, period);
    const profit = totalReturn - investment;
    
    return {
      totalReturn,
      profit,
      annualReturn: annualReturn * 100
    };
  };

  const returns = calculateReturns();

  return (
    <CardSpotlight className="p-6">
      <h3 className="text-xl font-semibold mb-4">Investment Simulator</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Initial Investment</label>
          <Input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Investment Type</label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short-term">Short Term Rental</SelectItem>
              <SelectItem value="long-term">Long Term Rental</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Period (Years)</label>
          <Select value={period.toString()} onValueChange={(v) => setPeriod(Number(v))}>
            <SelectTrigger>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="text-sm text-muted-foreground">Total Return</div>
          <div className="text-2xl font-semibold">{formatCurrency(returns.totalReturn)}</div>
        </div>
        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="text-sm text-muted-foreground">Total Profit</div>
          <div className="text-2xl font-semibold">{formatCurrency(returns.profit)}</div>
        </div>
        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="text-sm text-muted-foreground">Annual Return</div>
          <div className="text-2xl font-semibold">{returns.annualReturn.toFixed(1)}%</div>
        </div>
      </div>
    </CardSpotlight>
  );
};