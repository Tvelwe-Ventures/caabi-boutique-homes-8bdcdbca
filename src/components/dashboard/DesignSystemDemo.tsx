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

const DesignSystemDemo = () => {
  return (
    <div className="p-8 space-y-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold font-bricolage mb-4">QuackOS Design System</h1>
        <p className="text-lg text-gray-600">
          A comprehensive guide to QuackOS's design language, components, and patterns.
        </p>
      </div>

      <div className="space-y-16">
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
  );
};

export default DesignSystemDemo;