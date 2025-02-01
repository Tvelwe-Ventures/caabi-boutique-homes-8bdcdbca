import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { useBuyVsRentCalculator } from "@/hooks/useBuyVsRentCalculator";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { Info } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export const BuyVsRentCalculator = () => {
  const {
    settings,
    handleSettingChange,
    generateComparisonData,
  } = useBuyVsRentCalculator();

  const comparisonData = generateComparisonData();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Buy vs. Rent Comparison</CardTitle>
        <CardDescription>
          Compare the financial impact of buying versus renting over time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Property Price (AED)</Label>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The current market value of the property</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
              <Slider
                value={[settings.propertyPrice]}
                onValueChange={([value]) => handleSettingChange('propertyPrice', value)}
                min={500000}
                max={10000000}
                step={100000}
                className="w-full"
              />
              <div className="text-sm text-right">{formatCurrency(settings.propertyPrice)}</div>
            </div>

            <div className="space-y-2">
              <Label>Down Payment (AED)</Label>
              <Slider
                value={[settings.downPayment]}
                onValueChange={([value]) => handleSettingChange('downPayment', value)}
                min={0}
                max={settings.propertyPrice}
                step={50000}
                className="w-full"
              />
              <div className="text-sm text-right">{formatCurrency(settings.downPayment)}</div>
            </div>

            <div className="space-y-2">
              <Label>Monthly Rent (AED)</Label>
              <Slider
                value={[settings.monthlyRent]}
                onValueChange={([value]) => handleSettingChange('monthlyRent', value)}
                min={3000}
                max={50000}
                step={1000}
                className="w-full"
              />
              <div className="text-sm text-right">{formatCurrency(settings.monthlyRent)}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Mortgage Term (Years)</Label>
              <Slider
                value={[settings.mortgageTerm]}
                onValueChange={([value]) => handleSettingChange('mortgageTerm', value)}
                min={5}
                max={30}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-right">{settings.mortgageTerm} years</div>
            </div>

            <div className="space-y-2">
              <Label>Interest Rate (%)</Label>
              <Slider
                value={[settings.interestRate]}
                onValueChange={([value]) => handleSettingChange('interestRate', value)}
                min={1}
                max={10}
                step={0.1}
                className="w-full"
              />
              <div className="text-sm text-right">{settings.interestRate}%</div>
            </div>

            <div className="space-y-2">
              <Label>Property Appreciation Rate (%)</Label>
              <Slider
                value={[settings.propertyAppreciationRate]}
                onValueChange={([value]) => handleSettingChange('propertyAppreciationRate', value)}
                min={0}
                max={15}
                step={0.1}
                className="w-full"
              />
              <div className="text-sm text-right">{settings.propertyAppreciationRate}%</div>
            </div>
          </div>
        </div>

        <div className="h-[400px] mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={comparisonData}>
              <defs>
                <linearGradient id="colorBuying" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRenting" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                label={{ value: 'Net Worth (AED)', angle: -90, position: 'insideLeft' }}
                tickFormatter={(value) => `${(value/1000000).toFixed(1)}M`}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Area
                type="monotone"
                dataKey="netWorthBuying"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorBuying)"
                name="Net Worth (Buying)"
              />
              <Area
                type="monotone"
                dataKey="netWorthRenting"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorRenting)"
                name="Net Worth (Renting)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Buying Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monthly Mortgage</span>
                  <span className="font-semibold">
                    {formatCurrency(comparisonData[0].mortgagePayment / 12)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Maintenance</span>
                  <span className="font-semibold">
                    {formatCurrency(comparisonData[0].maintenanceCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Property Tax</span>
                  <span className="font-semibold">
                    {formatCurrency(comparisonData[0].propertyTax)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Insurance</span>
                  <span className="font-semibold">
                    {formatCurrency(comparisonData[0].insurance)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Renting Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monthly Rent</span>
                  <span className="font-semibold">
                    {formatCurrency(settings.monthlyRent)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Rent</span>
                  <span className="font-semibold">
                    {formatCurrency(settings.monthlyRent * 12)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Rent Increase Rate</span>
                  <span className="font-semibold">
                    {settings.rentIncreaseRate}% per year
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};