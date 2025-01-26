import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Header from "@/components/Header";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyShortTerm from "@/components/WhyShortTerm";
import { DisplayCards } from "@/components/ui/display-cards";
import { Globe } from "@/components/Globe";
import Portfolio from "@/components/Portfolio";
import Feedback from "@/components/Feedback";
import { WebsiteFeedback } from "@/components/WebsiteFeedback";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Header />
      <Hero />
      <About />
      <div className="relative bg-white py-12">
        <DisplayCards />
      </div>
      <Globe />
      <Services />
      <Portfolio />
      <Feedback />
      <div className="py-16 px-4 bg-gray-50">
        <WebsiteFeedback />
      </div>
      <WhyShortTerm />
      <Stats />
      <Footer />
    </motion.div>
  );
};

export default Index;