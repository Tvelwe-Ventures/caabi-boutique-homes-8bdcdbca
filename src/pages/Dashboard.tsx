
import { useEffect, useState } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DesignSystemDemo from "@/components/dashboard/DesignSystemDemo";
import FinancialDashboard from "@/components/dashboard/FinancialDashboard";
import FinanceAndRevenueManagement from "@/components/dashboard/financial-management/FinancialManagement";
import GuestManagement from "@/components/dashboard/guest-management/GuestManagement";
import ShareholderAnalytics from "@/components/dashboard/shareholder-analytics/ShareholderAnalytics";
import PropertyPerformance from "@/components/dashboard/PortfolioPerformance";
import ServiceManagement from "@/components/dashboard/service-management/ServiceManagement";
import Documentation from "@/pages/docs/Documentation";
import { DashboardTour } from "@/components/dashboard/onboarding/DashboardTour";
import { DataUpload } from "@/components/DataUpload";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Authentication required",
            description: "Please log in to access the dashboard",
            variant: "destructive",
          });
          navigate('/auth', { state: { from: '/dashboard' } });
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check error:", error);
        toast({
          title: "Error",
          description: "Failed to check authentication status",
          variant: "destructive",
        });
        navigate('/auth');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        navigate('/auth');
      } else if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: '/dashboard' }} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardTour />
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<FinancialDashboard />} />
          <Route path="financial-management" element={<FinanceAndRevenueManagement />} />
          <Route path="guest-management" element={<GuestManagement />} />
          <Route path="shareholder-analytics" element={<ShareholderAnalytics />} />
          <Route path="property-performance" element={<PropertyPerformance />} />
          <Route path="service-management" element={<ServiceManagement />} />
          <Route path="data-import" element={<DataUpload />} />
          <Route path="design-system" element={<DesignSystemDemo />} />
          <Route path="docs" element={<Documentation />} />
          <Route path="help" element={<Documentation />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Dashboard;
