
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { StandardCard } from "@/components/ui/standard-card";

const ServiceManagement = () => {
  const metrics = [
    {
      title: "Active Requests",
      value: "24",
      icon: Wrench,
      description: "Current service requests"
    },
    {
      title: "Average Response",
      value: "2.4h",
      icon: Clock,
      description: "Average response time"
    },
    {
      title: "Completed",
      value: "156",
      icon: CheckCircle,
      description: "Completed this month"
    },
    {
      title: "Priority",
      value: "5",
      icon: AlertCircle,
      description: "High priority requests"
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Service Management</h1>
        <p className="text-gray-600">Service requests and maintenance management</p>
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
            <CardTitle>Service Request Status</CardTitle>
          </CardHeader>
          <CardContent>
            Status chart coming soon...
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Response Time Trends</CardTitle>
          </CardHeader>
          <CardContent>
            Response time chart coming soon...
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceManagement;
