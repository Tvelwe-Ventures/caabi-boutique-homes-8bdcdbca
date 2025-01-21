import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Header from "@/components/Header";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyShortTerm from "@/components/WhyShortTerm";
import DisplayCards from "@/components/ui/display-cards";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <Hero />
      <About />
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Featured Properties</h2>
        <DisplayCards />
      </div>
      <Services />
      <WhyShortTerm />
      <Stats />
    </motion.div>
  );
};

export default Index;