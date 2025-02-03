import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyList from "@/components/dashboard/PropertyList";
import FinancialOverview from "@/components/dashboard/FinancialOverview";
import PortfolioPerformance from "@/components/dashboard/PortfolioPerformance";
import Header from "@/components/Header";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Property Dashboard</h1>
          
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList>
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
    </div>
  );
};

export default Dashboard;