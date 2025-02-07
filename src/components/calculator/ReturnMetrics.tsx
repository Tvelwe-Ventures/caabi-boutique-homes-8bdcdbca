import { Card, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "@/lib/utils";

interface ReturnMetricsProps {
  totalReturn: number;
  totalROIPercentage: string;
  annualReturn: number;
}

const ReturnMetrics = ({ totalReturn, totalROIPercentage, annualReturn }: ReturnMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-gray-600">Total Return</CardTitle>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(totalReturn)}
          </p>
        </CardHeader>
      </Card>
      
      <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-gray-600">Total ROI</CardTitle>
          <p className="text-2xl font-bold text-primary">{totalROIPercentage}%</p>
        </CardHeader>
      </Card>
      
      <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-gray-600">Annual Return</CardTitle>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(annualReturn)}/year
          </p>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ReturnMetrics;