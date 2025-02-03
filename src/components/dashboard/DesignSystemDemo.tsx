import { BentoSection } from "./design-system/BentoSection";
import { ButtonsSection } from "./design-system/ButtonsSection";
import { CardsSection } from "./design-system/CardsSection";
import { DateSelectionSection } from "./design-system/DateSelectionSection";
import { NavigationSection } from "./design-system/NavigationSection";
import { AnimationSection } from "./design-system/AnimationSection";
import { InformationCardsSection } from "./design-system/InformationCardsSection";
import { TypographySection } from "./design-system/TypographySection";

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
        <BentoSection />
        <ButtonsSection />
        <CardsSection />
        <InformationCardsSection />
        <DateSelectionSection />
        <NavigationSection />
        <AnimationSection />
      </div>
    </div>
  );
};

export default DesignSystemDemo;