
import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DesignSystemDemo from "@/components/dashboard/DesignSystemDemo";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import FinancialDashboard from "@/components/dashboard/FinancialDashboard";
import FinancialManagement from "@/components/dashboard/financial-management/FinancialManagement";
import GuestManagement from "@/components/dashboard/guest-management/GuestManagement";
import ShareholderAnalytics from "@/components/dashboard/shareholder-analytics/ShareholderAnalytics";
import ServiceManagement from "@/components/dashboard/service-management/ServiceManagement";
import Documentation from "@/pages/docs/Documentation";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      }
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<FinancialDashboard />} />
          <Route path="financial-management" element={<FinancialManagement />} />
          <Route path="guest-management" element={<GuestManagement />} />
          <Route path="shareholder-analytics" element={<ShareholderAnalytics />} />
          <Route path="property-performance" element={<FinancialDashboard />} />
          <Route path="service-management" element={<ServiceManagement />} />
          <Route path="design-system" element={<DesignSystemDemo />} />
          <Route path="docs" element={<Documentation />} />
          <Route path="help" element={<Documentation />} />
        </Route>
      </Routes>
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
