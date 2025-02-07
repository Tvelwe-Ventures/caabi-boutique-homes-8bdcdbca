
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  LineChart, 
  Users, 
  Calendar,
  Settings,
  Globe,
  MessageSquare,
  Brain,
  LayoutDashboard
} from "lucide-react";

const modules = [
  {
    title: "Dashboard Overview",
    icon: LayoutDashboard,
    description: "Comprehensive dashboard with real-time insights",
    features: [
      "Real-time data integration visualization",
      "Financial metrics (Revenue, ADR, RevPAR)",
      "Market KPIs from multiple sources",
      "Interactive property portfolio map"
    ]
  },
  {
    title: "Property Management",
    icon: Building2,
    description: "Manage your properties, track maintenance, and handle bookings",
    features: [
      "Property listing management",
      "Maintenance tracking",
      "Occupancy management",
      "Revenue tracking"
    ]
  },
  {
    title: "Financial Analytics",
    icon: LineChart,
    description: "Track financial performance and analyze revenue streams",
    features: [
      "Revenue analytics",
      "Expense tracking",
      "ROI calculations",
      "Financial forecasting"
    ]
  },
  {
    title: "Guest Management",
    icon: Users,
    description: "Handle guest communications and booking management",
    features: [
      "Booking management",
      "Guest communications",
      "Review management",
      "Guest profiles"
    ]
  },
  {
    title: "Channel Integration",
    icon: Globe,
    description: "Manage listings across multiple booking platforms",
    features: [
      "Airbnb integration",
      "Booking.com sync",
      "PriceLabs connection",
      "Unified calendar"
    ]
  },
  {
    title: "Calendar & Scheduling",
    icon: Calendar,
    description: "Coordinate bookings, cleaning, and maintenance schedules",
    features: [
      "Unified booking calendar",
      "Cleaning schedule",
      "Maintenance planning",
      "Availability management"
    ]
  },
  {
    title: "AI Assistant",
    icon: Brain,
    description: "Get intelligent insights and recommendations",
    features: [
      "Market analysis",
      "Pricing optimization",
      "Performance insights",
      "Trend predictions"
    ]
  },
  {
    title: "Communication Hub",
    icon: MessageSquare,
    description: "Centralize all your communication channels",
    features: [
      "Guest messaging",
      "Team communication",
      "Automated responses",
      "Message templates"
    ]
  },
  {
    title: "Settings & Configuration",
    icon: Settings,
    description: "Manage system settings and integrations",
    features: [
      "User management",
      "API configurations",
      "Notification settings",
      "System preferences"
    ]
  }
];

const Documentation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">System Documentation</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete guide to the property management system modules and their functionalities
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <module.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <ul className="space-y-2">
                  {module.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Documentation;
