import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import DesignSystemDemo from "@/components/dashboard/DesignSystemDemo";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import FinancialDashboard from "@/components/dashboard/FinancialDashboard";

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
      <Header />
      <DashboardSidebar />
      <main className="lg:pl-[250px] pt-24">
        <Routes>
          <Route index element={<FinancialDashboard />} />
          <Route path="design-system" element={<DesignSystemDemo />} />
        </Routes>
      </main>
      <div className="lg:pl-[250px]">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default Dashboard;