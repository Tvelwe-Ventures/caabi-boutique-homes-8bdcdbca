import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Users, 
  Shield,
  Bell,
  Megaphone,
  Brain,
  Building2,
  Clock
} from "lucide-react";

const modules = [
  {
    title: "Revenue Optimization",
    icon: LineChart,
    description: "Dynamic pricing and revenue management features",
    features: [
      "PriceLabs Integration",
      "Market-based pricing",
      "Seasonal adjustments",
      "Competitor analysis"
    ]
  },
  {
    title: "Guest Management",
    icon: Users,
    description: "Enhanced guest experience and communication tools",
    features: [
      "Hostaway Integration",
      "Guest communication hub",
      "Automated messaging",
      "Guest profiles"
    ]
  },
  {
    title: "Risk Management",
    icon: Shield,
    description: "Comprehensive risk assessment and mitigation",
    features: [
      "Property risk scoring",
      "Insurance tracking",
      "Incident reporting",
      "Compliance monitoring"
    ]
  },
  {
    title: "Duck Calls",
    icon: Bell,
    description: "Actionable insights and notifications",
    features: [
      "Smart alerts",
      "Performance notifications",
      "Market opportunity alerts",
      "Maintenance reminders"
    ]
  },
  {
    title: "Marketing Hub",
    icon: Megaphone,
    description: "Marketing and promotion tools",
    features: [
      "Channel management",
      "Listing optimization",
      "Performance tracking",
      "Campaign analytics"
    ]
  },
  {
    title: "AI Insights",
    icon: Brain,
    description: "AI-powered analytics and recommendations",
    features: [
      "Market predictions",
      "Pricing recommendations",
      "Guest behavior analysis",
      "Trend forecasting"
    ]
  },
  {
    title: "Property Management",
    icon: Building2,
    description: "Core property management features",
    features: [
      "Property portfolio",
      "Maintenance tracking",
      "Document management",
      "Staff coordination"
    ]
  },
  {
    title: "Operations",
    icon: Clock,
    description: "Day-to-day operational tools",
    features: [
      "Task management",
      "Calendar coordination",
      "Service provider management",
      "Quality control"
    ]
  }
];

const DuckUmentation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Duck-umentation</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete guide to QuacaBoard's features, modules, and integrations
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

export default DuckUmentation;