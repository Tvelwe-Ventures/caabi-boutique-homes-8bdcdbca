import { Card, CardHeader, CardTitle } from "../ui/card";

interface ReturnMetricsProps {
  totalReturn: number;
  totalROIPercentage: string;
  annualReturn: number;
}

const ReturnMetrics = ({ totalReturn, totalROIPercentage, annualReturn }: ReturnMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-xl">Total Return</CardTitle>
          <p className="text-2xl font-bold text-primary">
            AED {totalReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </CardHeader>
      </Card>
      
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-xl">Total ROI</CardTitle>
          <p className="text-2xl font-bold text-primary">{totalROIPercentage}%</p>
        </CardHeader>
      </Card>
      
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-xl">Annual Return</CardTitle>
          <p className="text-2xl font-bold text-primary">
            {annualReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })} AED/year
          </p>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ReturnMetrics;