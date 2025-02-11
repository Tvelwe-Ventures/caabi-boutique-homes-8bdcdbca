
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Header from "@/components/Header";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyShortTerm from "@/components/WhyShortTerm";
import { Globe } from "@/components/Globe";
import Portfolio from "@/components/Portfolio";
import PropertyPerformance from "@/components/PropertyPerformance";
import Feedback from "@/components/Feedback";
import { WebsiteFeedback } from "@/components/WebsiteFeedback";
import Footer from "@/components/Footer";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Chat from "@/components/Chat";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Initialize Hostaway Search Bar
    const searchScript = document.createElement("script");
    searchScript.src = "https://d2q3n06xhbi0am.cloudfront.net/widget.js?1640277196";
    searchScript.async = true;
    
    searchScript.onerror = (error) => {
      console.error("Failed to load Hostaway widget script:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load booking widget. Please try refreshing the page.",
      });
    };

    searchScript.onload = () => {
      try {
        console.log("Initializing Hostaway widget...");
        // @ts-ignore - Hostaway widget global
        window.searchBar({
          baseUrl: 'https://proxy3.holidayfuture.com/',  // Using direct proxy URL until subdomain is ready
          showLocation: true,
          color: '#1A2957', // Using your brand color
          rounded: true,
          openInNewTab: false,
          font: 'Inter',
        });
        console.log("Hostaway widget initialized successfully");
      } catch (error) {
        console.error("Error initializing Hostaway widget:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to initialize booking widget. Please try refreshing the page.",
        });
      }
    };

    document.body.appendChild(searchScript);

    return () => {
      document.body.removeChild(searchScript);
    };
  }, [toast]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Header />
      <Hero />
      
      {/* Hostaway Booking Widgets Section */}
      <section className="py-24 bg-gradient-to-br from-primary-light/20 via-white to-secondary-light/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 font-bricolage">
                Find Your Perfect Stay
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our curated collection of premium properties across Dubai's most sought-after locations
              </p>
            </div>
            
            {/* Hostaway Search Widget */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
              <div 
                id="hostaway-booking-widget" 
                className="w-full"
                style={{
                  minHeight: '120px',
                  borderRadius: '0.75rem',
                  overflow: 'hidden'
                }}
              />
            </div>

            {/* Additional Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="text-primary text-lg font-semibold mb-2">Instant Booking</div>
                <p className="text-gray-600">Secure your stay immediately with our real-time booking system</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="text-primary text-lg font-semibold mb-2">Best Price Guarantee</div>
                <p className="text-gray-600">Get the best rates directly through our platform</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="text-primary text-lg font-semibold mb-2">24/7 Support</div>
                <p className="text-gray-600">Our dedicated team is here to assist you around the clock</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />
      <Globe />
      <Services />
      <Portfolio />
      <Stats />
      <PropertyPerformance />
      <WhyShortTerm />
      <Feedback />
      <Footer />
      <WebsiteFeedback />
      
      {/* Floating Chat Dialog */}
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
    </motion.div>
  );
};

export default Index;
