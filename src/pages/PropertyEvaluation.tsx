import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CalculatorForm } from "@/components/CalculatorForm";
import { CalculatorResults } from "@/components/calculator/CalculatorResults";
import { calculateROI } from "@/components/calculator/calculatorUtils";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";
import { CalculatorInputs } from "@/components/calculator/types";

const PropertyEvaluation = () => {
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleCalculate = async (inputs: CalculatorInputs) => {
    const results = calculateROI(inputs);
    setResults(results);

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
          estimated_revenue: results.annualRevenue,
          estimated_occupancy: results.occupancyRate,
          average_daily_rate: results.averageNightlyRate
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Property Evaluation</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get a detailed analysis of your property's potential in Dubai's short-term rental market.
              Our AI-powered calculator will provide you with accurate revenue projections and ROI estimates.
            </p>
          </div>

          <Card className="p-6">
            <CalculatorForm onCalculate={handleCalculate} />
          </Card>

          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CalculatorResults results={results} />
            </motion.div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyEvaluation;