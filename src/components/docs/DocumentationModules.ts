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
import { LucideIcon } from "lucide-react";

interface Module {
  title: string;
  icon: LucideIcon;
  description: string;
  features: string[];
}

export const documentationModules: Module[] = [
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
