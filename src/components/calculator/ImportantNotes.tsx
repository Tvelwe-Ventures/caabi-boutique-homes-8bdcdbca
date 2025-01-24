import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface MarketData {
  averageRentalYield: number;
  averageAppreciation: number;
}

const ImportantNotes = ({ marketData }: { marketData: MarketData }) => {
  return (
    <Card className="p-6 bg-slate-50">
      <CardHeader>
        <CardTitle className="text-xl">Important Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold">Calculation Method:</h4>
          <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Rental Return: Calculated monthly based on the annual rental yield percentage</li>
            <li>Property Appreciation: Compounds monthly based on the annual appreciation rate</li>
            <li>Total Return: Combines both rental income and property value increase</li>
            <li>ROI Percentage: (Total Return / Initial Investment) × 100</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Market Insights:</h4>
          <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Current market average rental yield: {marketData.averageRentalYield}%</li>
            <li>Average property appreciation rate: {marketData.averageAppreciation}%</li>
            <li>Returns vary by location and property type</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Assumptions:</h4>
          <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Calculations assume consistent market conditions over the 5-year period</li>
            <li>Property maintenance costs and other expenses are not included</li>
            <li>Actual returns may vary based on market conditions and property management</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportantNotes;