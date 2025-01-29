import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CalculatorForm } from "@/components/CalculatorForm";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { HeroSection } from "@/components/ui/hero-section";

const PropertyEvaluation = () => {
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleCalculate = async (inputs: any) => {
    try {
      // Save lead information
      const { data: lead, error: leadError } = await supabase
        .from('property_leads')
        .insert({
          first_name: "Test",  // We'll add a contact form later
          last_name: "User",
          email: "test@example.com",
          source: "website"
        })
        .select()
        .single();

      if (leadError) throw leadError;

      // Save evaluation details
      const { error: evalError } = await supabase
        .from('property_evaluations')
        .insert({
          lead_id: lead.id,
          location: inputs.type === 'rental' ? inputs.rental?.location : 'downtown',
          bedrooms: inputs.type === 'rental' ? inputs.rental?.bedrooms : 1,
          max_guests: inputs.type === 'rental' ? inputs.rental?.bedrooms * 2 : 2,
          estimated_revenue: 0,
          estimated_occupancy: 85,
          average_daily_rate: 1000
        });

      if (evalError) throw evalError;

      toast({
        title: "Success",
        description: "Your property evaluation has been saved. We'll send you a detailed report shortly.",
      });
    } catch (error) {
      console.error('Error saving evaluation:', error);
      toast({
        title: "Error",
        description: "There was an error saving your evaluation. Please try again.",
        variant: "destructive",
      });
    }
  };

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
          gridOptions={{
            opacity: 0.2,
            lightLineColor: "#8394CA",
            darkLineColor: "#1A2957",
            angle: 55,
            cellSize: 50
          }}
        />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <Card className="p-6 shadow-lg bg-white/90 backdrop-blur-sm border border-[#8394CA]/20 hover:border-[#8394CA]/30 transition-all duration-300">
              <CalculatorForm onCalculate={handleCalculate} />
            </Card>

            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 bg-white/90 backdrop-blur-sm border border-[#8394CA]/20">
                  <h2 className="text-2xl font-bold mb-4 text-[#1A2957]">Evaluation Results</h2>
                  <pre>{JSON.stringify(results, null, 2)}</pre>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyEvaluation;