import { Plus, FileText, Settings, MessageCircle, TrendingUp, Users, CreditCard, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { FinancialMetrics } from "./financial/FinancialMetrics";
import PortfolioMap from "./PortfolioMap";
import { usePropertiesSubscription } from "@/hooks/usePropertiesSubscription";
import { CircularMetrics } from "./CircularMetrics";

const FinancialDashboard = () => {
  const { toast } = useToast();
  usePropertiesSubscription();

  const { data: dashboardMetrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dashboard_metrics')
        .select('*')
        .order('category');

      if (error) {
        toast({
          title: "Error fetching metrics",
          description: "Could not load dashboard metrics",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    }
  });

  const { data: integrationStatus, isLoading: integrationsLoading } = useQuery({
    queryKey: ['integration-status'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('integration_status')
        .select('*');

      if (error) {
        toast({
          title: "Error fetching integration status",
          description: "Could not load integration statuses",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    }
  });

  const quickActions = [
    { icon: Plus, label: "Add Property", variant: "default" as const },
    { icon: FileText, label: "Create Report", variant: "default" as const },
    { icon: Settings, label: "Settings", variant: "default" as const },
    { icon: MessageCircle, label: "System Feedback", variant: "secondary" as const, className: "text-muted-foreground" }
  ];

  const getMetricIcon = (icon: string | null) => {
    const icons = {
      'trending-up': TrendingUp,
      'users': Users,
      'credit-card': CreditCard,
      'activity': Activity
    };
    return icons[icon as keyof typeof icons] || Activity;
  };

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
              variant={action.variant}
              size="sm"
              className={`flex items-center gap-2 ${action.className || ''}`}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Circular Metrics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CircularMetrics />
      </motion.div>

      {/* Integration Status Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {integrationStatus?.map((integration, index) => (
          <Card key={integration.id} className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{integration.name}</CardTitle>
              <div className={`px-2 py-1 rounded-full text-xs ${
                integration.status === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {integration.status}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {integration.success_rate}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last synced: {new Date(integration.last_sync || '').toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Financial Overview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-xl font-semibold">Financial Overview</h2>
        <FinancialMetrics />
      </motion.div>

      {/* Portfolio Properties Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">Portfolio Properties</h2>
        <div className="h-[400px] rounded-lg overflow-hidden border bg-card">
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
