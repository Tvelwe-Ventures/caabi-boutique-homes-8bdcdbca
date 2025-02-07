import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/ui/hero-section";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, MapPin, Bed, User, Mail, Phone } from "lucide-react";
import { MarketBenchmarks } from "@/components/property-evaluation/MarketBenchmarks";
import { InvestmentSimulator } from "@/components/property-evaluation/InvestmentSimulator";
import { ForeignInvestor } from "@/components/property-evaluation/ForeignInvestor";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PropertyEvaluation = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "downtown",
    bedrooms: 1,
    maxGuests: 2,
    annualRent: 120000,
    propertyType: "apartment",
    isFurnished: true
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data: lead, error: leadError } = await supabase
        .from('property_leads')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          source: 'website'
        })
        .select()
        .single();

      if (leadError) throw leadError;

      const { error: evalError } = await supabase
        .from('property_evaluations')
        .insert({
          lead_id: lead.id,
          location: formData.location,
          bedrooms: formData.bedrooms,
          max_guests: formData.maxGuests,
          property_type: formData.propertyType,
          is_furnished: formData.isFurnished,
        });

      if (evalError) throw evalError;

      toast({
        title: "Evaluation Submitted Successfully",
        description: "We've sent your detailed property evaluation report to your email.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "downtown",
        bedrooms: 1,
        maxGuests: 2,
        annualRent: 120000,
        propertyType: "apartment",
        isFurnished: true
      });

    } catch (error: any) {
      console.error('Error in submission process:', error);
      toast({
        title: "Error",
        description: "There was an error saving your evaluation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
        />

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <MarketBenchmarks />
            <ForeignInvestor />
            <InvestmentSimulator />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-6 md:p-8 shadow-lg bg-white/90 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      First Name
                    </Label>
                    <Input
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="bg-white border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Last Name
                    </Label>
                    <Input
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="bg-white border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Email
                    </Label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      Phone
                    </Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-white border-primary/20"
                    />
                  </div>

                  {/* Property Information */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Location
                    </Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => handleInputChange('location', value)}
                    >
                      <SelectTrigger className="bg-white border-primary/20">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="downtown">Downtown Dubai</SelectItem>
                        <SelectItem value="marina">Dubai Marina</SelectItem>
                        <SelectItem value="palm">Palm Jumeirah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      Property Type
                    </Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => handleInputChange('propertyType', value)}
                    >
                      <SelectTrigger className="bg-white border-primary/20">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-primary" />
                      Bedrooms
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
                      className="bg-white border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      Annual Rent (AED)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.annualRent}
                      onChange={(e) => handleInputChange('annualRent', parseInt(e.target.value))}
                      className="bg-white border-primary/20"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button 
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-2"
                    disabled={loading}
                  >
                    {loading ? "Generating Report..." : "Get Free Property Evaluation"}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyEvaluation;
