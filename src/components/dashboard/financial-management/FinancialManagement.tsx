
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CreditCard, DollarSign, LineChart } from "lucide-react";
import { StandardCard } from "@/components/ui/standard-card";

const FinancialManagement = () => {
  const metrics = [
    {
      title: "Monthly Revenue",
      value: "AED 156,400",
      icon: DollarSign,
      description: "Total revenue this month"
    },
    {
      title: "Operating Expenses",
      value: "AED 45,200",
      icon: CreditCard,
      description: "Total expenses this month"
    },
    {
      title: "Net Operating Income",
      value: "AED 111,200",
      icon: LineChart,
      description: "NOI this month"
    },
    {
      title: "Properties",
      value: "12",
      icon: Building2,
      description: "Total properties under management"
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Financial Management</h1>
        <p className="text-gray-600">Comprehensive financial overview and management tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <StandardCard
            key={index}
            icon={metric.icon}
            title={metric.value}
            description={metric.title}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            Revenue chart coming soon...
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            Expense chart coming soon...
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialManagement;
