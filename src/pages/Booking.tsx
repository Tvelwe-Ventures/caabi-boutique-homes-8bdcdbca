
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { useState } from "react";

const Booking = () => {
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/lovable-uploads/c5902c9f-a64c-4de1-9b6d-761cb47d05d8.png", // Living room
    "/lovable-uploads/fcea24d8-44c8-4a75-9f8c-329a416f9fa8.png", // Dining room
    "/lovable-uploads/20ef23e7-7914-4739-8e09-59c7660417c8.png", // Bedroom
    "/lovable-uploads/7991a2c3-27fc-4d0e-a270-d195af276951.png", // Kitchen
    "/lovable-uploads/d5623907-02e5-4601-8db4-e7614ef6f391.png"  // Bathroom
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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
      className="min-h-screen bg-white"
    >
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
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl hero-heading mb-6 md:mb-8 text-white drop-shadow-lg font-bold">
              Your Dubai Haven Awaits
            </h1>
            <p className="mt-4 md:mt-6 text-lg md:text-2xl lg:text-3xl text-white mb-8 md:mb-10 drop-shadow-lg px-4 md:px-0 leading-relaxed">
              Discover handpicked luxury properties<br />
              in Dubai's most coveted locations
            </p>
            
            {/* Search Widget */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 max-w-3xl mx-auto">
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
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-primary-light/20 via-white to-secondary-light/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
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
      </section>

      <Footer />
    </motion.div>
  );
};

export default Booking;
