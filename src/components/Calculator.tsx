import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CalculatorForm } from "./calculator/CalculatorForm";
import { CalculatorResults } from "./calculator/CalculatorResults";
import { calculateROI } from "./calculator/calculatorUtils";
import type { CalculatorInputs, CalculatorResults as ResultsType } from "./calculator/types";
import { CardSpotlight } from "./ui/card-spotlight";
import { GlowingStars } from "./ui/glowing-stars";
import { BorderBeam } from "./ui/border-beam";
import { Carousel3D } from "./ui/3d-carousel";
import InstagramFeed from "./InstagramFeed";

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  actions?: Array<{
    label: string;
    href: string;
    variant?: string;
  }>;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, actions, className }) => (
  <div className={`text-center py-12 ${className}`}>
    {title}
    <p className="mt-4 text-lg text-gray-400">{subtitle}</p>
    {actions && (
      <div className="mt-6 flex justify-center gap-4">
        {actions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
          >
            {action.label}
          </a>
        ))}
      </div>
    )}
  </div>
);

const propertyImages = [
  {
    src: "/lovable-uploads/079ce858-92b1-4b1e-914d-8c838c3da61d.png",
    alt: "Luxury apartment living room with city view"
  },
  {
    src: "/lovable-uploads/4618407b-b0d3-4877-a682-c280200322cd.png",
    alt: "Modern entertainment setup with gaming console"
  },
  {
    src: "/lovable-uploads/03283004-5262-4d41-8ab5-97f7c8cc6e12.png",
    alt: "Contemporary kitchen and dining area"
  },
  {
    src: "/lovable-uploads/a85771eb-2106-489b-845e-598e2bac79b3.png",
    alt: "Dubai skyline view from balcony"
  },
  {
    src: "/lovable-uploads/b19fc22a-34d1-423d-9fb8-5fb63ddbe95f.png",
    alt: "Cozy living room with Netflix setup"
  },
  {
    src: "/lovable-uploads/3ffed215-b004-433e-9136-f88ccbe86091.png",
    alt: "Elegant living space with city views"
  },
  {
    src: "/lovable-uploads/912b4b6f-2827-4f22-969f-7b069b737a37.png",
    alt: "Dubai Downtown aerial view"
  },
  {
    src: "/lovable-uploads/827ceac9-51ef-47f1-a593-66925dabcc6a.png",
    alt: "Modern apartment with blue accents"
  }
];

const Calculator = () => {
  const [results, setResults] = useState<ResultsType>({
    annualRevenue: 0,
    netProfit: 0,
    roi: 0,
    occupancyRate: 0,
    averageNightlyRate: 0,
  });

  const handleCalculate = (inputs: CalculatorInputs) => {
    const calculatedResults = calculateROI(inputs);
    setResults(calculatedResults);
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Hero 
        title={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-gradient">Maximize</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent"
            >
              your real estate investments
            </motion.span>
          </motion.div>
        }
        subtitle="Request a free consultation over a coffee"
        actions={[
          {
            label: "Book Consultation",
            href: "/contact",
            variant: "default"
          }
        ]}
        className="mb-12"
      />

      <div className="container mx-auto px-4 mb-20">
        <Carousel3D images={propertyImages} className="mb-20" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pb-20"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="moving-border relative">
            <CardSpotlight className="overflow-hidden relative">
              <BorderBeam />
              <GlowingStars />
              <CardHeader className="text-center relative z-10">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
                  Calculate Your Property's Potential
                </CardTitle>
                <CardDescription className="text-lg mt-4 text-gray-400">
                  Use our interactive calculator to estimate your potential returns from 
                  short-term rental property management in Dubai.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="mt-6">
                  <CalculatorForm onCalculate={handleCalculate} />
                </div>
              </CardContent>
            </CardSpotlight>
          </div>

          {results.annualRevenue > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="moving-border relative">
                <CardSpotlight className="relative">
                  <BorderBeam delay={2} />
                  <GlowingStars />
                  <CardContent className="p-6 relative z-10">
                    <CalculatorResults results={results} />
                  </CardContent>
                </CardSpotlight>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <InstagramFeed />
    </div>
  );
};

export default Calculator;