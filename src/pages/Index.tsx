import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Header from "@/components/Header";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyShortTerm from "@/components/WhyShortTerm";
import DisplayCards from "@/components/ui/display-cards";
import { Globe } from "@/components/Globe";
import { Carousel3D } from "@/components/ui/3d-carousel";
import Footer from "@/components/Footer";

const propertyImages = [
  {
    src: "/lovable-uploads/079ce858-92b1-4b1e-914d-8c838c3da61d.png",
    alt: "Luxury apartment living room with city view"
  },
  {
    src: "/lovable-uploads/4618407b-b0d3-4877-a682-c280200322cd.png",
    alt: "Modern entertainment setup with gaming console"
  },
  {
    src: "/lovable-uploads/03283004-5262-4d41-8ab5-97f7c8cc6e12.png",
    alt: "Contemporary kitchen and dining area"
  },
  {
    src: "/lovable-uploads/a85771eb-2106-489b-845e-598e2bac79b3.png",
    alt: "Dubai skyline view from balcony"
  },
  {
    src: "/lovable-uploads/b19fc22a-34d1-423d-9fb8-5fb63ddbe95f.png",
    alt: "Cozy living room with Netflix setup"
  }
];

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-dark"
    >
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <Carousel3D images={propertyImages} />
      </div>
      <About />
      <div className="container mx-auto px-4 py-20">
        <DisplayCards />
      </div>
      <Globe />
      <Services />
      <WhyShortTerm />
      <Stats />
      <Footer />
    </motion.div>
  );
};

export default Index;