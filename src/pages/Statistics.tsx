import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WebsiteFeedback } from "@/components/WebsiteFeedback";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Chat from "@/components/Chat";
import MarketPriceMap from "@/components/charts/MarketPriceMap";
import PriceIndexTrend from "@/components/charts/PriceIndexTrend";
import MarketMetrics from "@/components/charts/MarketMetrics";
import MarketKPIs from "@/components/stats/MarketKPIs";

const Statistics = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              UAE Real Estate Market Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive analysis of the UAE property market trends and statistics
            </p>
          </motion.div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-6">Key Performance Indicators</h2>
              <MarketKPIs />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarketPriceMap data={[]} />
              <PriceIndexTrend data={[]} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <WebsiteFeedback />
      
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg bg-primary hover:bg-primary/90"
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] h-[600px] p-0">
          <Chat />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Statistics;