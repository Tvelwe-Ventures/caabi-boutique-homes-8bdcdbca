
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { year: 0, cashflow: 0 },
  { year: 1, cashflow: 85780 },
  { year: 2, cashflow: 88170 },
  { year: 3, cashflow: 88170 },
  { year: 4, cashflow: 90000 },
  { year: 5, cashflow: 92000 },
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
    
    <div className="space-y-4">
      <div>
        <div className="text-sm text-gray-500">Operating Cashflow</div>
        <div className="text-[#22C55E] font-semibold">
          AED {data.operatingCashflow.toLocaleString()}
        </div>
      </div>
      
      <div>
        <div className="text-sm text-gray-500">Net Rental Income</div>
        <div className="font-semibold">
          AED {data.netRentalIncome.toLocaleString()}
        </div>
        <div className="pl-4 text-sm space-y-1 mt-2">
          <div className="flex justify-between">
            <span>Gross Rental Income</span>
            <span>AED {data.grossRentalIncome.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Vacancy Costs</span>
            <span>AED {data.vacancyCosts}</span>
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

  const yearData = {
    totalAnnualCashflow: 85780,
    operatingCashflow: 85780,
    netRentalIncome: 85780,
    grossRentalIncome: 124000,
    vacancyCosts: 0,
    operatingExpenses: 38220
  };

  return (
    <Card className="p-6 bg-white">
      <div className="space-y-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="gradientFlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                tickFormatter={(value) => `Year ${value}`}
                stroke="#94a3b8"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="#94a3b8"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `AED ${value/1000}k`}
              />
              <Area 
                type="monotone" 
                dataKey="cashflow" 
                stroke="#9b87f5" 
                fillOpacity={1}
                fill="url(#gradientFlow)"
                strokeWidth={2}
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
