import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, DollarSign, Percent, TrendingUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: 'Jan', revenue: 608000, expenses: 115817 },
  { month: 'Feb', revenue: 592000, expenses: 112880 },
  { month: 'Mar', revenue: 615000, expenses: 116850 },
  { month: 'Apr', revenue: 587000, expenses: 111530 },
  { month: 'May', revenue: 598000, expenses: 113620 },
  { month: 'Jun', revenue: 605000, expenses: 114950 },
];

const FinancialOverview = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Financial Overview</h2>
        <div className="flex gap-4">
          <Select defaultValue="AED">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AED">AED</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="15">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Management Fee %" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15% Management</SelectItem>
              <SelectItem value="20">20% Management</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(608000)}</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              +12.5% from last quarter
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(492183)}</div>
            <div className="flex items-center text-sm text-red-500">
              <ArrowDownIcon className="h-4 w-4 mr-1" />
              -2.3% from last quarter
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7%</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              +0.5% from last quarter
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `${(value/1000)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialOverview;