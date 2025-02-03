import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import DesignSystemDemo from "@/components/dashboard/DesignSystemDemo";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

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
      <main className="ml-[250px] pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DesignSystemDemo />
        </motion.div>
      </main>
      <div className="ml-[250px]">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default Dashboard;