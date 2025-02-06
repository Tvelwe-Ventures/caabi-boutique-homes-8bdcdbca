import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WebsiteFeedback } from "@/components/WebsiteFeedback";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Chat from "@/components/Chat";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import LocationMap from "@/components/maps/LocationMap";
import { format } from 'date-fns';

interface MarketIndicator {
  indicator_type: string;
  location: string;
  value: number;
  unit: string;
  time_period: string;
  property_type?: string;
  segment?: string;
}

const formatIndicatorName = (name: string) => {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const Statistics = () => {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ['uae-market-indicators'],
    queryFn: async () => {
      console.log("Fetching UAE market indicators...");
      const { data, error } = await supabase
        .from('uae_market_indicators')
        .select('*')
        .order('time_period', { ascending: false });

      if (error) {
        console.error('Error fetching market indicators:', error);
        throw error;
      }

      console.log("UAE market indicators received:", data);
      return data as MarketIndicator[];
    }
  });

  const renderMarketIndicator = (indicator: MarketIndicator) => (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">
        {formatIndicatorName(indicator.indicator_type)}
      </h3>
      <p className="text-3xl font-bold text-primary mb-2">
        {indicator.value.toLocaleString()}{' '}
        <span className="text-lg font-normal text-gray-600">{indicator.unit}</span>
      </p>
      <div className="text-sm text-gray-500 space-y-1">
        {indicator.property_type && indicator.property_type !== 'All' && (
          <p>Property Type: {indicator.property_type}</p>
        )}
        {indicator.segment && indicator.segment !== 'All' && (
          <p>Segment: {indicator.segment}</p>
        )}
        <p>Last Updated: {format(new Date(indicator.time_period), 'MMM d, yyyy')}</p>
      </div>
    </Card>
  );

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

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-6">Key Market Indicators</h2>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <Card key={i} className="p-6">
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-8 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/3" />
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {marketData?.map((indicator, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {renderMarketIndicator(indicator)}
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

            <section className="mt-12">
              <LocationMap />
            </section>
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