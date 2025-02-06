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
import MarketKPIs from "@/components/stats/MarketKPIs";
import LocationMap from "@/components/maps/LocationMap";
import { useMarketData } from "@/hooks/usePriceLabsData";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Statistics = () => {
  const { data: marketData, isLoading } = useMarketData();

  console.log("PriceLabs market data:", marketData);

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
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <Card key={i} className="p-6">
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-8 w-3/4" />
                    </Card>
                  ))}
                </div>
              ) : (
                <MarketKPIs />
              )}
            </section>

            <section>
              <LocationMap />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarketPriceMap data={marketData?.priceData || []} />
              <PriceIndexTrend data={marketData?.trendData || []} />
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