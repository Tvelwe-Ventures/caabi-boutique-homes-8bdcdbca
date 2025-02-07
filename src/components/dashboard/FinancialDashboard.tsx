
import { Plus, FileText, Settings, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { FinancialMetrics } from "./financial/FinancialMetrics";
import { PropertyManagement } from "./financial/PropertyManagement";
import PortfolioMap from "./PortfolioMap";
import { usePropertiesSubscription } from "@/hooks/usePropertiesSubscription";

const FinancialDashboard = () => {
  usePropertiesSubscription();

  const quickActions = [
    { icon: Plus, label: "Add Property" },
    { icon: FileText, label: "Create Report" },
    { icon: Settings, label: "Settings" },
    { icon: MessageCircle, label: "System Feedback", variant: "outline", className: "text-muted-foreground" }
  ];

  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/dcc3e3a2-4ae3-4d6c-8301-ac7bcc8bd14f.png" 
              alt="QuacaBoard" 
              className="h-6"
            />
          </div>
          <h2 className="text-sm text-muted-foreground">
            Your centralized dashboard for comprehensive business insights
          </h2>
        </div>
        <div className="flex gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "default"}
              size="sm"
              className={`flex items-center gap-2 ${action.className || ''}`}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Revenue Analytics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-xl font-semibold">Revenue Analytics</h2>
        <div className="grid grid-cols-1 gap-6">
          {/* Revenue metrics will be rendered here */}
        </div>
      </motion.div>

      {/* Financial Overview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold">Financial Overview</h2>
          <FinancialMetrics />
        </div>
        <div>
          <PropertyManagement />
        </div>
      </motion.div>

      {/* Portfolio Properties Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">Portfolio Properties</h2>
        <div className="h-[400px] rounded-lg overflow-hidden">
          <PortfolioMap />
        </div>
      </motion.div>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© 2024 QuacaBoard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FinancialDashboard;
