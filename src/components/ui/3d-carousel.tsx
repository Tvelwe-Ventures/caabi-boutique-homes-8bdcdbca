import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselImage {
  src: string;
  alt: string;
}

interface Carousel3DProps {
  images: CarouselImage[];
  className?: string;
}

export const Carousel3D = ({ images, className }: Carousel3DProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={cn("relative w-full h-[600px] overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover rounded-xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index
                ? "bg-white w-4"
                : "bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};