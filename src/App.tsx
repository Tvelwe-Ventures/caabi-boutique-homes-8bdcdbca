import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Calculator from "@/pages/Calculator";
import PropertyEvaluation from "@/pages/PropertyEvaluation";
import InvestmentProposal from "@/pages/InvestmentProposal";
import Auth from "@/pages/Auth";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import CommunityGuidelines from "@/pages/CommunityGuidelines";
import Statistics from "@/pages/Statistics";

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
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;