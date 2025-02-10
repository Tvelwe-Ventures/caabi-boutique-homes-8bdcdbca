
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

const Index = () => {
  useEffect(() => {
    // Initialize Hostaway Search Bar
    const searchScript = document.createElement("script");
    searchScript.src = "https://d2q3n06xhbi0am.cloudfront.net/widget.js?1640277196";
    searchScript.async = true;
    searchScript.onload = () => {
      // @ts-ignore - Hostaway widget global
      window.searchBar({
        baseUrl: 'https://caabihome.holidayfuture.com/',
        showLocation: true,
        color: '#1A2957', // Using your brand color
        rounded: true,
        openInNewTab: false,
        font: 'Inter',
      });
    };
    document.body.appendChild(searchScript);

    return () => {
      document.body.removeChild(searchScript);
    };
  }, []);

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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Find Your Perfect Stay
              </h2>
              <p className="text-gray-600">
                Search through our curated selection of premium properties
              </p>
            </div>
            
            {/* Hostaway Search Widget */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div id="hostaway-booking-widget" className="w-full"></div>
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
