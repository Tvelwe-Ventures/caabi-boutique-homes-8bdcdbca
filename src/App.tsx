import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { useEffect } from "react";
import Index from "./pages/Index";
import Calculator from "./components/Calculator";
import InvestmentProposal from "./pages/InvestmentProposal";
import Statistics from "./pages/Statistics";
import Community from "./components/Community";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    console.log("Checking loaded fonts:", document.fonts.check("1em Bricolage Grotesque"));
    document.fonts.ready.then(() => {
      console.log("All fonts loaded successfully");
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen w-full overflow-x-hidden">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/investment" element={<InvestmentProposal />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/community" element={<Community />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/guidelines" element={<CommunityGuidelines />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;