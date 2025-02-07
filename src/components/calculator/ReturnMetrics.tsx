
import { Card, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "@/lib/utils";
import { BadgeDelta } from "../ui/badge-delta";

interface ReturnMetricsProps {
  totalReturn: number;
  totalROIPercentage: string;
  annualReturn: number;
}

const ReturnMetrics = ({ totalReturn, totalROIPercentage, annualReturn }: ReturnMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white shadow-sm border border-gray-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Total Return</CardTitle>
            <BadgeDelta deltaType="increase" value={totalROIPercentage} />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-semibold text-gray-900">
              {formatCurrency(totalReturn)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {parseFloat(totalROIPercentage) > 0 ? '+' : ''}{totalROIPercentage}% all time
            </p>
          </div>
        </CardHeader>
      </Card>
      
      <Card className="bg-white shadow-sm border border-gray-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">ROI</CardTitle>
            <BadgeDelta deltaType="increase" value={totalROIPercentage} />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-semibold text-gray-900">{totalROIPercentage}%</p>
            <p className="text-sm text-gray-500 mt-1">Total return on investment</p>
          </div>
        </CardHeader>
      </Card>
      
      <Card className="bg-white shadow-sm border border-gray-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Annual Return</CardTitle>
            <BadgeDelta deltaType="increase" value={(parseFloat(totalROIPercentage) / 5).toFixed(1)} />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-semibold text-gray-900">
              {formatCurrency(annualReturn)}
            </p>
            <p className="text-sm text-gray-500 mt-1">Per year</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ReturnMetrics;
