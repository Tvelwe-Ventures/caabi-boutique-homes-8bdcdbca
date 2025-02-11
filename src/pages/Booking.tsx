
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Booking = () => {
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
          color: '#1A2957',
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
      className="min-h-screen bg-gradient-to-br from-primary-light/20 via-white to-secondary-light/20"
    >
      <Header />
      
      <main className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 font-bricolage">
                Book Your Dubai Stay
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience luxury living in Dubai's most prestigious locations
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

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

            {/* Additional Information */}
            <div className="text-center mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Book With Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-primary mb-4">Premium Locations</h3>
                  <p className="text-gray-600">
                    All our properties are handpicked in Dubai's most desirable neighborhoods,
                    ensuring you get the best experience during your stay.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-primary mb-4">Luxury Amenities</h3>
                  <p className="text-gray-600">
                    From high-end furnishings to premium services, every property is equipped
                    to provide a five-star experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Booking;
