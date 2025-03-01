
import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { QuickSearch } from "@/components/booking/QuickSearch";
import { HeroCarousel } from "@/components/booking/HeroCarousel";
import { Features } from "@/components/booking/Features";
import { PropertyFilters, PropertyFilters as PropertyFiltersType } from "@/components/booking/PropertyFilters";

const Booking = () => {
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hostawayWidgetRef = useRef<HTMLDivElement>(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  const images = [
    "/lovable-uploads/c78fa731-6e3b-4ba8-9d05-cf24ba6177e7.png",
    "/lovable-uploads/2d171c22-90cf-46aa-824e-a1742f0b063b.png",
    "/lovable-uploads/9a203233-b92d-40c6-8f4b-1dfcf4ff761f.png",
    "/lovable-uploads/ebbf7c09-e663-412c-b8f5-29ddb23e577e.png",
    "/lovable-uploads/ec0bc7a8-68c9-47e2-bc82-245a20634e5b.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickSearch = () => {
    if (hostawayWidgetRef.current) {
      hostawayWidgetRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const handleFilterChange = (filters: PropertyFiltersType) => {
    console.log('Additional filters selected:', filters);
    toast({
      title: "Filters Updated",
      description: "Showing properties matching your preferences.",
      duration: 3000,
    });
  };

  const handleWhatsAppChat = () => {
    window.open('https://wa.me/+971585067700', '_blank');
  };

  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;

    const initializeWidget = () => {
      if (!window.searchBar) {
        console.error("Hostaway widget not loaded properly");
        return;
      }

      try {
        console.log("Initializing Hostaway widget...");
        window.searchBar({
          baseUrl: 'https://app.hostaway.com/widget/41616',
          showLocation: true,
          color: '#1A2957',
          rounded: true,
          openInNewTab: true, // Changed to true to avoid potential routing issues
          font: 'Inter',
          currency: 'AED',
          language: 'en',
          searchButtonBackground: '#1A2957',
          searchButtonText: 'Search',
          searchButtonTextColor: '#FFFFFF',
          focusColor: '#1A2957',
          dateFormat: 'DD/MM/YYYY',
          adults: 2,
          children: 0,
          infants: 0,
          forceMobileView: false,
          containerId: 'hostaway-booking-widget'
        });
        setWidgetLoaded(true);
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

    const loadWidget = () => {
      scriptElement = document.createElement("script");
      scriptElement.src = "https://d2q3n06xhbi0am.cloudfront.net/widget.js?1640277196";
      scriptElement.async = true;
      
      scriptElement.onerror = (error) => {
        console.error("Failed to load Hostaway widget script:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load booking widget. Please try refreshing the page.",
        });
      };

      scriptElement.onload = () => {
        // Add a small delay to ensure DOM is ready
        setTimeout(initializeWidget, 100);
      };

      document.body.appendChild(scriptElement);
    };

    // Ensure any existing script is removed before adding a new one
    const existingScript = document.querySelector('script[src*="widget.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Load the widget
    loadWidget();

    return () => {
      if (scriptElement && document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [toast]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <div className="relative">
        <HeroCarousel 
          images={images}
          currentImageIndex={currentImageIndex}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl hero-heading mb-4 sm:mb-6 text-white drop-shadow-lg font-bold px-4">
                Your Dubai Haven Awaits
              </h1>
              <p className="mt-2 md:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 sm:mb-8 drop-shadow-lg px-4 leading-relaxed">
                Discover handpicked luxury properties in Dubai's most coveted locations
              </p>
              
              <div 
                ref={hostawayWidgetRef}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto relative"
                style={{ zIndex: 1000 }}
              >
                <PropertyFilters onFilterChange={handleFilterChange} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Features />

      <Button
        onClick={handleWhatsAppChat}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        size="icon"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>

      <Footer />
    </motion.div>
  );
};

export default Booking;
