
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
  LayoutDashboard,
  AlertTriangle,
  TrendingUp,
  Star,
  BarChart,
  Activity,
  Shield
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
    title: "Revenue Optimization",
    icon: TrendingUp,
    description: "Dynamic pricing intelligence and revenue maximization tools",
    features: [
      "Market rate comparison across platforms",
      "Automatic price alerts for local events",
      "Occupancy-based pricing strategies",
      "Competition monitoring and alerts"
    ]
  },
  {
    title: "Guest Management",
    icon: Users,
    description: "Comprehensive guest relationship and experience management",
    features: [
      "Cross-platform guest tracking",
      "Booking pattern analysis",
      "Personalized experience creation",
      "VIP guest identification system"
    ]
  },
  {
    title: "Operational Efficiency",
    icon: Settings,
    description: "Smart operational management and service provider accountability",
    features: [
      "Automated task management system",
      "Smart cleaning schedule optimization",
      "Predictive maintenance tracking",
      "Supply inventory management"
    ]
  },
  {
    title: "Market Intelligence",
    icon: LineChart,
    description: "Advanced analytics and market insights",
    features: [
      "Cross-platform booking trends",
      "Market demand forecasting",
      "Seasonal pattern analysis",
      "Revenue potential calculator"
    ]
  },
  {
    title: "Business Growth",
    icon: BarChart,
    description: "Portfolio optimization and growth opportunities",
    features: [
      "Property performance comparison",
      "Investment opportunity scoring",
      "ROI analysis by property type",
      "Data-driven expansion recommendations"
    ]
  },
  {
    title: "Risk Management",
    icon: Shield,
    description: "Proactive risk monitoring and alerts",
    features: [
      "Occupancy rate monitoring",
      "Price deviation detection",
      "Booking pattern anomalies",
      "Market trend shift alerts"
    ]
  },
  {
    title: "Smart Alerts",
    icon: AlertTriangle,
    description: "Automated alert system for critical metrics",
    features: [
      "Price optimization opportunities",
      "Booking pace monitoring",
      "Competitor price changes",
      "High-demand period alerts"
    ]
  },
  {
    title: "Revenue Maximizer",
    icon: Brain,
    description: "AI-powered revenue optimization tools",
    features: [
      "Smart pricing recommendations",
      "Demand forecasting calendar",
      "Event impact analysis",
      "Stay length optimization"
    ]
  },
  {
    title: "Guest Experience",
    icon: Star,
    description: "Enhanced guest experience management",
    features: [
      "Smart communication system",
      "Amenity recommendations",
      "Review management automation",
      "Loyalty program tracking"
    ]
  },
  {
    title: "Market Position",
    icon: Activity,
    description: "Comprehensive market position analysis",
    features: [
      "Competitive set analysis",
      "Market share calculation",
      "Performance benchmarking",
      "Revenue gap analysis"
    ]
  },
  {
    title: "Performance Optimizer",
    icon: Globe,
    description: "Property performance optimization tools",
    features: [
      "Property scoring system",
      "Improvement recommendations",
      "Upgrade ROI calculator",
      "Occupancy optimization"
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
