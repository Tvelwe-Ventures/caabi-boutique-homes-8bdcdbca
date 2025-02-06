import { Plus, FileText, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { DataIntegrationBeams } from "./DataIntegrationBeams";
import { FinancialMetrics } from "./financial/FinancialMetrics";
import { PropertyManagement } from "./financial/PropertyManagement";
import { GuestInsights } from "./financial/GuestInsights";
import { CommunitySection } from "./financial/CommunitySection";
import PortfolioMap from "./PortfolioMap";
import { usePropertiesSubscription } from "@/hooks/usePropertiesSubscription";
import { WebsiteFeedback } from "../WebsiteFeedback";

const FinancialDashboard = () => {
  usePropertiesSubscription();

  const quickActions = [
    { icon: Plus, label: "Add Property" },
    { icon: FileText, label: "Create Report" },
    { icon: Settings, label: "Settings" }
  ];

  return (
    <div className="space-y-8 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <img 
            src="/lovable-uploads/dcc3e3a2-4ae3-4d6c-8301-ac7bcc8bd14f.png" 
            alt="QuacaBoard" 
            className="h-8 mb-4"
          />
          <h2 className="text-lg text-gray-600">Your centralized dashboard for comprehensive business insights</h2>
        </div>
        <div className="flex gap-3 items-center">
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
          <WebsiteFeedback />
        </div>
      </div>

      <div className="relative min-h-[400px] bg-white rounded-lg p-6 shadow-sm">
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
      
      <footer className="mt-12 text-center">
        <img 
          src="/lovable-uploads/dcc3e3a2-4ae3-4d6c-8301-ac7bcc8bd14f.png" 
          alt="QuacaBoard" 
          className="h-6 mx-auto mb-4"
        />
        <p className="text-sm text-gray-500">© 2024 QuacaBoard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FinancialDashboard;
