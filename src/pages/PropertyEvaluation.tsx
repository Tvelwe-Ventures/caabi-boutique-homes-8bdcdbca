
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/ui/hero-section";
import { MarketBenchmarks } from "@/components/property-evaluation/MarketBenchmarks";
import { InvestmentSimulator } from "@/components/property-evaluation/InvestmentSimulator";
import { ForeignInvestor } from "@/components/property-evaluation/ForeignInvestor";
import { EvaluationForm } from "@/components/property-evaluation/EvaluationForm";
import { InvestmentSummary } from "@/components/property-evaluation/InvestmentSummary";
import { CashflowAnalysis } from "@/components/property-evaluation/CashflowAnalysis";
import { Button } from "@/components/ui/button";

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
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-lg font-semibold"
              size="lg"
            >
              Evaluate My Property
            </Button>
            <Button 
              className="bg-[#7E69AB] hover:bg-[#9b87f5] text-white px-8 py-6 text-lg font-semibold"
              size="lg"
            >
              Investment Simulator
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <InvestmentSummary />
            <CashflowAnalysis />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-12">
            <div className="col-span-1 lg:col-span-2">
              <MarketBenchmarks />
            </div>
            <ForeignInvestor />
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <EvaluationForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyEvaluation;
