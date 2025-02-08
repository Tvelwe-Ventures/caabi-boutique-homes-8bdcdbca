
import { BentoSection } from "./design-system/BentoSection";
import { ButtonsSection } from "./design-system/ButtonsSection";
import { CardsSection } from "./design-system/CardsSection";
import { ChartSection } from "./design-system/ChartSection";
import { DateSelectionSection } from "./design-system/DateSelectionSection";
import { NavigationSection } from "./design-system/NavigationSection";
import { AnimationSection } from "./design-system/AnimationSection";
import { InformationCardsSection } from "./design-system/InformationCardsSection";
import { TypographySection } from "./design-system/TypographySection";
import { GradientsSection } from "./design-system/GradientsSection";
import { IconsSection } from "./design-system/IconsSection";
import { TimelineSection } from "./design-system/TimelineSection";
import { DataDisplaySection } from "./design-system/DataDisplaySection";
import { AnimatedComponentsSection } from "./design-system/AnimatedComponentsSection";
import { AnimatedCardsSection } from "./design-system/AnimatedCards";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import html2pdf from "html2pdf.js";

const DesignSystemDemo = () => {
  const { toast } = useToast();

  const handleExportPDF = async () => {
    const element = document.getElementById('design-system-content');
    if (!element) {
      toast({
        title: "Export Failed",
        description: "Could not find content to export",
        variant: "destructive",
      });
      return;
    }

    const opt = {
      margin: [0.5, 0.5],
      filename: 'quackos-design-system.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true,
        letterRendering: true,
        allowTaint: true,
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true,
      }
    };

    toast({
      title: "Generating PDF",
      description: "Your design system documentation is being exported...",
    });

    try {
      const pdf = await html2pdf().set(opt).from(element).save();
      console.log('PDF generation completed:', pdf);
      
      toast({
        title: "Export Complete",
        description: "Your design system has been exported to PDF",
      });
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast({
        title: "Export Failed",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold font-bricolage mb-4">QuackOS Design System</h1>
            <p className="text-lg text-gray-600">
              A comprehensive guide to QuackOS's design language, components, and patterns.
            </p>
          </div>
          <Button onClick={handleExportPDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export to PDF
          </Button>
        </div>

        <div id="design-system-content" className="space-y-24 bg-background">
          <TypographySection />
          <GradientsSection />
          <IconsSection />
          <ChartSection />
          <DataDisplaySection />
          <BentoSection />
          <ButtonsSection />
          <CardsSection />
          <AnimatedCardsSection />
          <InformationCardsSection />
          <TimelineSection />
          <DateSelectionSection />
          <NavigationSection />
          <AnimationSection />
          <AnimatedComponentsSection />
        </div>
      </div>
    </div>
  );
};

export default DesignSystemDemo;
