import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Header from "@/components/Header";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyShortTerm from "@/components/WhyShortTerm";
import { Globe } from "@/components/Globe";
import Portfolio from "@/components/Portfolio";
import PropertyPerformance from "@/components/PropertyPerformance";
import Feedback from "@/components/Feedback";
import { WebsiteFeedback } from "@/components/WebsiteFeedback";
import Footer from "@/components/Footer";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Chat from "@/components/Chat";

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
      <Globe />
      <Services />
      <Portfolio />
      <Stats />
      <PropertyPerformance />
      <WhyShortTerm />
      <Feedback />
      <Footer />
      <WebsiteFeedback />
      
      {/* Floating Chat Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg bg-primary hover:bg-primary/90"
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] h-[600px] p-0">
          <Chat />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Index;