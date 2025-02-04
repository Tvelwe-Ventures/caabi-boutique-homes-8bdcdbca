
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, PieChart, BarChart, DollarSign } from "lucide-react";
import { StandardCard } from "@/components/ui/standard-card";

const ShareholderAnalytics = () => {
  const metrics = [
    {
      title: "Total Investment",
      value: "AED 12.4M",
      icon: DollarSign,
      description: "Total capital invested"
    },
    {
      title: "ROI",
      value: "18.5%",
      icon: TrendingUp,
      description: "Return on investment"
    },
    {
      title: "Properties",
      value: "8",
      icon: PieChart,
      description: "Number of properties"
    },
    {
      title: "Distribution",
      value: "AED 845K",
      icon: BarChart,
      description: "Last quarter distribution"
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Shareholder Analytics</h1>
        <p className="text-gray-600">Investment performance and shareholder metrics</p>
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
            <CardTitle>Investment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            Distribution chart coming soon...
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Historical Returns</CardTitle>
          </CardHeader>
          <CardContent>
            Returns chart coming soon...
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShareholderAnalytics;
