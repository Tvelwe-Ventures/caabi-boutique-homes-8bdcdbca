import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Header from "@/components/Header";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyShortTerm from "@/components/WhyShortTerm";
import { DisplayCards } from "@/components/ui/display-cards";
import { Globe } from "@/components/Globe";
import Footer from "@/components/Footer";

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
      <Globe />
      <Services />
      <WhyShortTerm />
      <Stats />
      <Footer />
    </motion.div>
  );
};

export default Index;