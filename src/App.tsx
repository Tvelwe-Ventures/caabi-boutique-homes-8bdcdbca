import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Calculator from "@/components/Calculator";
import PropertyEvaluation from "@/pages/PropertyEvaluation";
import InvestmentProposal from "@/pages/InvestmentProposal";
import Auth from "@/pages/Auth";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import CommunityGuidelines from "@/pages/CommunityGuidelines";
import Statistics from "@/pages/Statistics";
import { WebsiteFeedback } from "@/components/WebsiteFeedback";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Chat from "@/components/Chat";
import Community from "@/components/Community";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/property-evaluation" element={<PropertyEvaluation />} />
            <Route path="/investment" element={<InvestmentProposal />} />
            <Route path="/investment-proposal" element={<InvestmentProposal />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/community-guidelines" element={<CommunityGuidelines />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/community" element={<Community />} />
          </Routes>
          
          {/* Global Feedback Component */}
          <WebsiteFeedback />
          
          {/* Global Chat Dialog */}
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
          
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;