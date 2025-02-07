
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/ui/hero-section";
import { MarketBenchmarks } from "@/components/property-evaluation/MarketBenchmarks";
import { InvestmentSimulator } from "@/components/property-evaluation/InvestmentSimulator";
import { ForeignInvestor } from "@/components/property-evaluation/ForeignInvestor";
import { EvaluationForm } from "@/components/property-evaluation/EvaluationForm";

const PropertyEvaluation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E6FA] to-white">
      <Header />
      <main>
        <HeroSection 
          title="Property Evaluation"
          subtitle={{
            regular: "Get a detailed analysis of ",
            gradient: "your property's potential",
          }}
          description="Our AI-powered calculator provides accurate revenue projections, occupancy rates, and ROI estimates based on Dubai's current market conditions."
        />

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <MarketBenchmarks />
            <ForeignInvestor />
            <InvestmentSimulator />
          </div>

          <EvaluationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyEvaluation;
