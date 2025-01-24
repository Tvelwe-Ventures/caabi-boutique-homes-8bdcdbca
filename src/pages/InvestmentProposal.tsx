import { motion } from "framer-motion";
import { ArrowRight, Building2, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OccupancyComparison from "@/components/charts/OccupancyComparison";
import RevenueMetrics from "@/components/charts/RevenueMetrics";

const InvestmentProposal = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pb-12">
        {/* Hero Section with Dubai Skyline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-[60vh] mb-16 rounded-2xl overflow-hidden"
        >
          <motion.img
            src="/lovable-uploads/f9449e44-5bd7-4a33-85c1-4daa76d02fe9.png"
            alt="Dubai Skyline"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative h-full flex items-center justify-center text-center z-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Investment Opportunities
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Join us in revolutionizing the short-term rental market in Dubai with our proven business model and exceptional returns.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Statistics Section */}
        <div className="space-y-12 mb-16">
          <OccupancyComparison />
          <RevenueMetrics />
        </div>

        {/* Rest of the content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <TrendingUp className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">High ROI</h3>
            <p className="text-gray-600">Consistently delivering above-market returns through our optimized rental strategy.</p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Building2 className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
            <p className="text-gray-600">Strategic properties in Dubai's most sought-after neighborhoods.</p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Management</h3>
            <p className="text-gray-600">Professional team handling all aspects of property management.</p>
          </Card>
        </motion.div>

        {/* Investment Process */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Investment Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Initial Consultation",
                  description: "Meet with our team to discuss your investment goals and explore opportunities."
                },
                {
                  step: "2",
                  title: "Property Selection",
                  description: "Choose from our curated selection of prime properties in Dubai."
                },
                {
                  step: "3",
                  title: "Investment Structure",
                  description: "Review and finalize the investment terms and documentation."
                },
                {
                  step: "4",
                  title: "Property Management",
                  description: "Let our team handle all aspects of property management and optimization."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto p-8 rounded-xl bg-primary/5">
            <h2 className="text-2xl font-bold mb-4">Ready to Invest?</h2>
            <p className="text-gray-600 mb-6">
              Take the first step towards profitable property investment in Dubai.
            </p>
            <button className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
              Schedule a Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default InvestmentProposal;
