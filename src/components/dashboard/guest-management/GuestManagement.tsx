
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Star, Users, Calendar } from "lucide-react";
import { StandardCard } from "@/components/ui/standard-card";

const GuestManagement = () => {
  const metrics = [
    {
      title: "Total Guests",
      value: "1,245",
      icon: Users,
      description: "All-time guest count"
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: Star,
      description: "Overall guest satisfaction"
    },
    {
      title: "Active Bookings",
      value: "32",
      icon: Calendar,
      description: "Current active bookings"
    },
    {
      title: "Returning Guests",
      value: "286",
      icon: User,
      description: "Repeat guest count"
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Guest Management</h1>
        <p className="text-gray-600">Guest profiles and booking management</p>
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
            <CardTitle>Guest Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            Demographics chart coming soon...
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
          </CardHeader>
          <CardContent>
            Trends chart coming soon...
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuestManagement;
