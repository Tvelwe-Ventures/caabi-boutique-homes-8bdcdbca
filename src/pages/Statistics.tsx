import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Building2, TrendingUp, Home, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
import { useToast } from "@/hooks/use-toast";

const Statistics = () => {
  const { toast } = useToast();
  const [marketData, setMarketData] = useState({
    pricePoints: [],
    priceIndices: [],
    metrics: [
      {
        title: "Average Price/sqft",
        value: "Loading...",
        change: "0%",
        icon: Building2,
        description: "Year-over-year change"
      },
      {
        title: "Monthly Transactions",
        value: "Loading...",
        change: "0%",
        icon: TrendingUp,
        description: "Month-over-month change"
      },
      {
        title: "Properties Listed",
        value: "Loading...",
        change: "0%",
        icon: Home,
        description: "Active listings"
      },
      {
        title: "Market Activity",
        value: "Loading...",
        change: "0%",
        icon: Activity,
        description: "Buyer interest"
      }
    ]
  });

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const { data: indicators, error } = await supabase
          .from('uae_market_indicators')
          .select('*')
          .order('time_period', { ascending: false });

        if (error) throw error;

        if (indicators) {
          console.log('Fetched market indicators:', indicators);
          
          // Process the data for different visualizations
          const pricePoints = indicators
            .filter(i => i.indicator_type === 'price_per_sqft')
            .map(i => ({
              location: i.location,
              price: i.value,
              volume: Math.random() * 100 // This should be replaced with actual transaction volume data
            }));

          const priceIndices = indicators
            .filter(i => i.indicator_type === 'price_index')
            .reduce((acc, curr) => {
              const period = new Date(curr.time_period).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
              if (!acc.find(item => item.period === period)) {
                acc.push({
                  period,
                  apartment: indicators.find(i => i.time_period === curr.time_period && i.property_type === 'apartment')?.value || 0,
                  villa: indicators.find(i => i.time_period === curr.time_period && i.property_type === 'villa')?.value || 0,
                  office: indicators.find(i => i.time_period === curr.time_period && i.property_type === 'office')?.value || 0
                });
              }
              return acc;
            }, []);

          // Update metrics with real data
          const latestIndicators = indicators.reduce((acc, curr) => {
            if (!acc[curr.indicator_type] || new Date(curr.time_period) > new Date(acc[curr.indicator_type].time_period)) {
              acc[curr.indicator_type] = curr;
            }
            return acc;
          }, {});

          const updatedMetrics = marketData.metrics.map(metric => {
            // Update each metric based on the latest indicators
            // This is a simplified example - you should adapt this to your actual data structure
            return {
              ...metric,
              value: latestIndicators[metric.title.toLowerCase()]?.value.toLocaleString() || metric.value,
              change: `${((latestIndicators[metric.title.toLowerCase()]?.value || 0) * 100).toFixed(1)}%`
            };
          });

          setMarketData({
            pricePoints,
            priceIndices,
            metrics: updatedMetrics
          });

          toast({
            title: "Market Data Updated",
            description: "Latest real estate market data has been loaded",
            variant: "default",
          });
        }
      } catch (error) {
        console.error('Error fetching market data:', error);
        toast({
          title: "Error",
          description: "Failed to load market data",
          variant: "destructive",
        });
      }
    };

    fetchMarketData();

    // Set up real-time subscription
    const subscription = supabase
      .channel('market_data_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'uae_market_indicators' },
        () => {
          console.log('Market data changed, refreshing...');
          fetchMarketData();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

          <MarketMetrics metrics={marketData.metrics} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <MarketPriceMap data={marketData.pricePoints} />
            <PriceIndexTrend data={marketData.priceIndices} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <CardSpotlight className="p-6">
              <h3 className="text-xl font-semibold mb-4">Average Price Trends (AED/sqft)</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#8380CA"
                      strokeWidth={2}
                      dot={{ fill: "#8380CA" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardSpotlight>

            <CardSpotlight className="p-6">
              <h3 className="text-xl font-semibold mb-4">Top Areas by Transactions</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transactionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis dataKey="area" type="category" stroke="#94a3b8" width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Bar dataKey="transactions" fill="#8380CA" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardSpotlight>
          </div>

          <CardSpotlight className="p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Property Type Distribution</h3>
              <p className="text-sm text-gray-500">Source: DXB Interact</p>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="apartments"
                    stackId="1"
                    stroke="#8380CA"
                    fill="#8380CA"
                  />
                  <Area
                    type="monotone"
                    dataKey="villas"
                    stackId="1"
                    stroke="#B2D1E3"
                    fill="#B2D1E3"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardSpotlight>
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