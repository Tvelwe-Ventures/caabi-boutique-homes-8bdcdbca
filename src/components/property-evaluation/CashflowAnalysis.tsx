
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  { year: 0, cashflow: -200000, operatingCashflow: 0, sellingPrice: 0, downPayment: -200000 },
  { year: 1, cashflow: 85780, operatingCashflow: 85780, sellingPrice: 0, downPayment: 0 },
  { year: 2, cashflow: 88170, operatingCashflow: 88170, sellingPrice: 0, downPayment: 0 },
  { year: 3, cashflow: 88170, operatingCashflow: 88170, sellingPrice: 0, downPayment: 0 },
  { year: 4, cashflow: 90000, operatingCashflow: 90000, sellingPrice: 0, downPayment: 0 },
  { year: 5, cashflow: 92000, operatingCashflow: 92000, sellingPrice: 3500000, downPayment: 0 },
];

interface CashflowDetailsProps {
  year: number;
  data: {
    totalAnnualCashflow: number;
    operatingCashflow: number;
    netRentalIncome: number;
    grossRentalIncome: number;
    vacancyCosts: number;
    operatingExpenses: number;
  };
}

const CashflowDetails = ({ year, data }: CashflowDetailsProps) => (
  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
    <div className="flex justify-between items-center">
      <span className="font-semibold">Year {year}</span>
      <span className="text-[#22C55E] font-semibold">
        AED {data.totalAnnualCashflow.toLocaleString()}
      </span>
    </div>
    
    <div className="space-y-3">
      <div>
        <div className="text-sm text-gray-500">Operating Cashflow</div>
        <div className="font-semibold text-[#22C55E]">
          AED {data.operatingCashflow.toLocaleString()}
        </div>
      </div>
      
      <div>
        <div className="text-sm text-gray-500">Net Rental Income</div>
        <div className="font-semibold">
          AED {data.netRentalIncome.toLocaleString()}
        </div>
        <div className="pl-4 text-sm">
          <div className="flex justify-between">
            <span>Gross Rental Income</span>
            <span>AED {data.grossRentalIncome.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Vacancy Costs</span>
            <span>AED {data.vacancyCosts.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Operating Expenses</span>
            <span>-AED {Math.abs(data.operatingExpenses).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const CashflowAnalysis = () => {
  const [selectedYear, setSelectedYear] = useState(0);
  const [activeTab, setActiveTab] = useState("operating");

  const yearData = {
    totalAnnualCashflow: 85780,
    operatingCashflow: 85780,
    netRentalIncome: 85780,
    grossRentalIncome: 124000,
    vacancyCosts: 0,
    operatingExpenses: -38220
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-500">Total Net Rental Income</div>
            <div className="text-xl font-semibold text-[#22C55E]">AED 442,986</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Cashflow</div>
            <div className="text-xl font-semibold">AED 442,986</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Cash-on-Cash (CoC) return</div>
            <div className="text-xl font-semibold text-[#22C55E]">5.0%</div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="operating">Operating Cashflow</TabsTrigger>
            <TabsTrigger value="total">Total Cashflow</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCashflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8380CA" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8380CA" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                tickFormatter={(value) => `Year ${value}`}
              />
              <YAxis 
                tickFormatter={(value) => `AED ${(value/1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number) => [`AED ${value.toLocaleString()}`, "Cashflow"]}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Area
                type="monotone"
                dataKey={activeTab === "operating" ? "operatingCashflow" : "cashflow"}
                stroke="#8380CA"
                fillOpacity={1}
                fill="url(#colorCashflow)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedYear(Math.max(0, selectedYear - 1))}
              disabled={selectedYear === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold">Year {selectedYear}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedYear(Math.min(5, selectedYear + 1))}
              disabled={selectedYear === 5}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <CashflowDetails year={selectedYear} data={yearData} />
        </div>
      </div>
    </Card>
  );
};
