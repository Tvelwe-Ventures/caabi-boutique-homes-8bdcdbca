import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "@/pages/Index";
import Calculator from "@/components/Calculator";
import PropertyEvaluation from "@/pages/PropertyEvaluation";
import InvestmentProposal from "@/pages/InvestmentProposal";
import Auth from "@/pages/Auth";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import CommunityGuidelines from "@/pages/CommunityGuidelines";
import Statistics from "@/pages/Statistics";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/property-evaluation" element={<PropertyEvaluation />} />
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
  );
}

export default App;