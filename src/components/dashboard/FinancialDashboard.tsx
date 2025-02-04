import { Home } from "lucide-react";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { DataIntegrationBeams } from "./DataIntegrationBeams";
import { FinancialMetrics } from "./financial/FinancialMetrics";
import { PropertyManagement } from "./financial/PropertyManagement";
import { GuestInsights } from "./financial/GuestInsights";
import { CommunitySection } from "./financial/CommunitySection";
import PortfolioMap from "./PortfolioMap";
import { usePropertiesSubscription } from "@/hooks/usePropertiesSubscription";

const FinancialDashboard = () => {
  // Enable real-time subscription
  usePropertiesSubscription();

  const quickActions = [
    { icon: Plus, label: "Add Property" },
    { icon: FileText, label: "Create Report" },
    { icon: Settings, label: "Settings" }
  ];

  return (
    <div className="space-y-8 p-8">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">
            <Home className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>QuackBoard</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">QuackBoard - Unified Data Hub</h1>
          <p className="text-gray-600">Your centralized dashboard for comprehensive business insights</p>
        </div>
        <div className="flex gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex items-center gap-2"
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[300px] bg-gradient-to-b from-gray-50 to-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Real-time Data Integration</h2>
        <DataIntegrationBeams />
      </div>
        
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Financial Overview</h2>
          <FinancialMetrics />
        </div>
        <PropertyManagement />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <PortfolioMap />
      </motion.div>

      <GuestInsights />
      <CommunitySection />
    </div>
  );
};

export default FinancialDashboard;