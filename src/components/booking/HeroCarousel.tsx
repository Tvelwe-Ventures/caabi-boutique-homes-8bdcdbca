
import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";

interface HeroCarouselProps {
  images: string[];
  currentImageIndex: number;
}

export const HeroCarousel = ({ images, currentImageIndex }: HeroCarouselProps) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] sm:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
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
    </div>
  );
};
