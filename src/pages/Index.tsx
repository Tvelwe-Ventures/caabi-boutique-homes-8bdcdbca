import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Header from "@/components/Header";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyShortTerm from "@/components/WhyShortTerm";
import DisplayCards from "@/components/ui/display-cards";
import { Globe } from "@/components/Globe";
import { BentoGallery } from "@/components/ui/bento-gallery";
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
      <About />
      <div className="container mx-auto px-4 py-8">
        <DisplayCards />
      </div>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold animated-gradient-text mb-6">
            Our Premium Properties
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Experience luxury living in our carefully curated collection of properties
          </p>
        </motion.div>
        <BentoGallery images={propertyImages} />
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