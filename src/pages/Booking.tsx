
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

const Booking = () => {
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [date, setDate] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const hostawayWidgetRef = useRef<HTMLDivElement>(null);

  const images = [
    "/lovable-uploads/c78fa731-6e3b-4ba8-9d05-cf24ba6177e7.png", // Main hero (dining room)
    "/lovable-uploads/2d171c22-90cf-46aa-824e-a1742f0b063b.png", // Lounge area
    "/lovable-uploads/9a203233-b92d-40c6-8f4b-1dfcf4ff761f.png", // Living room with view
    "/lovable-uploads/ebbf7c09-e663-412c-b8f5-29ddb23e577e.png", // Kitchen amenities
    "/lovable-uploads/ec0bc7a8-68c9-47e2-bc82-245a20634e5b.png"  // Dining chair detail
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleQuickSearch = () => {
    if (hostawayWidgetRef.current) {
      hostawayWidgetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
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
          baseUrl: 'https://proxy3.holidayfuture.com/',
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

  const handleWhatsAppChat = () => {
    window.open('https://wa.me/+971585067700', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white pt-16 sm:pt-0"
    >
      <QuickSearch
        date={date}
        setDate={setDate}
        guests={guests}
        setGuests={setGuests}
        onSearch={handleQuickSearch}
      />

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
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl hero-heading mb-4 sm:mb-6 md:mb-8 text-white drop-shadow-lg font-bold">
                Your Dubai Haven Awaits
              </h1>
              <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-2xl lg:text-3xl text-white mb-6 sm:mb-8 md:mb-10 drop-shadow-lg px-4 md:px-0 leading-relaxed">
                Discover handpicked luxury properties<br className="hidden sm:block" />
                in Dubai's most coveted locations
              </p>
              
              <div 
                ref={hostawayWidgetRef}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-8 max-w-3xl mx-auto"
              >
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
