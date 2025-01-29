import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CalculatorForm } from "@/components/CalculatorForm";
import { useToast } from "@/components/ui/use-toast";
import { CalculatorInputs } from "@/components/calculator/types";
import { supabase } from "@/lib/supabaseClient";

const PropertyEvaluation = () => {
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleCalculate = async (inputs: CalculatorInputs) => {
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
    <div className="min-h-screen bg-gradient-to-b from-secondary-light to-white">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary to-primary-light py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Property Evaluation
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Get a detailed analysis of your property's potential in Dubai's short-term rental market.
                Our AI-powered calculator provides accurate revenue projections and ROI estimates.
              </p>
            </motion.div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Form Section */}
        <div className="container mx-auto px-4 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm">
              <CalculatorForm onCalculate={handleCalculate} />
            </Card>

            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Evaluation Results</h2>
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