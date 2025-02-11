
import { motion } from "framer-motion";
import { useState } from "react"; // Add useState import
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
import { MessageSquare, Calculator, ArrowRight } from "lucide-react"; // Add Calculator and ArrowRight imports
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Chat from "@/components/Chat";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Particles } from "@/components/ui/particles"; // Add Particles import
import Footer from "@/components/Footer"; // Add Footer import
import { FeyButton } from "@/components/ui/fey-button"; // Add FeyButton import

// Define images array
const images = [
  "/lovable-uploads/d2b589ed-e60c-4ce2-aa36-237d64b2a62e.png",
  "/lovable-uploads/7991a2c3-27fc-4d0e-a270-d195af276951.png",
  "/lovable-uploads/20ef23e7-7914-4739-8e09-59c7660417c8.png",
  "/lovable-uploads/d5623907-02e5-4601-8db4-e7614ef6f391.png",
  "/lovable-uploads/c5902c9f-a64c-4de1-9b6d-761cb47d05d8.png",
  "/lovable-uploads/fcea24d8-44c8-4a75-9f8c-329a416f9fa8.png"
];

const Index = () => {
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [date, setDate] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const navigate = useNavigate();

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

  const handleQuickSearch = () => {
    navigate("/booking");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Header />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
        <Particles
          className="absolute inset-0 -z-10"
          quantity={100}
          staticity={30}
          color="#8798CE"
        />
        
        {images.map((image, index) => (
          <motion.img
            key={image}
            src={image}
            alt={`Luxury Dubai Property ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImageIndex === index ? 0.8 : 0,
              scale: currentImageIndex === index ? 1 : 1.1
            }}
            transition={{ duration: 1 }}
          />
        ))}
        
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="container mx-auto px-4 pt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl hero-heading mb-6 md:mb-8 text-white drop-shadow-lg font-bold">
              Turning Properties into Profit
            </h1>
            <p className="mt-4 md:mt-6 text-lg md:text-2xl lg:text-3xl text-white mb-8 md:mb-10 drop-shadow-lg px-4 md:px-0 leading-relaxed">
              Detail-oriented? We iron the welcome mats.<br />
              People-focused? We remember your cat's birthday.<br />
              Performance-driven? Our returns make economists blush.
            </p>

            {/* Quick Search Bar */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 max-w-3xl mx-auto mb-8">
              <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal flex-1",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "When would you like to stay?"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Input
                  type="number"
                  placeholder="Guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-24 md:w-32"
                  min="1"
                  max="20"
                />
                
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white w-full md:w-auto"
                  onClick={handleQuickSearch}
                >
                  Search Available Properties
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <FeyButton 
                onClick={() => navigate("/calculator")}
                className="w-full md:w-auto bg-[#8798CE] hover:bg-[#8798CE]/90"
              >
                <span className="flex items-center gap-2">
                  Calculate ROI
                  <Calculator className="w-4 h-4" />
                </span>
              </FeyButton>
              <FeyButton 
                onClick={() => navigate("/property-evaluation")}
                className="w-full md:w-auto bg-gradient-to-r from-[#4169E1] to-[#8798CE] hover:from-[#4169E1]/90 hover:to-[#8798CE]/90 animate-pulse"
              >
                <span className="flex items-center gap-2">
                  Evaluate Your Property
                  <ArrowRight className="w-4 h-4" />
                </span>
              </FeyButton>
            </div>
          </motion.div>
        </div>
      </div>

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
