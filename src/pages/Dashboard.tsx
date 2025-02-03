import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import PropertyList from "@/components/dashboard/PropertyList";
import FinancialOverview from "@/components/dashboard/FinancialOverview";
import PortfolioPerformance from "@/components/dashboard/PortfolioPerformance";
import Footer from "@/components/Footer";

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
      <main className="ml-[250px] pt-24 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">QuackOS Dashboard</h1>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <PropertyList />
            </TabsContent>
            
            <TabsContent value="financial">
              <FinancialOverview />
            </TabsContent>
            
            <TabsContent value="performance">
              <PortfolioPerformance />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;