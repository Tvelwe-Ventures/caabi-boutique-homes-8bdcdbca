import { BentoSection } from "./design-system/BentoSection";
import { ButtonsSection } from "./design-system/ButtonsSection";
import { CardsSection } from "./design-system/CardsSection";
import { DateSelectionSection } from "./design-system/DateSelectionSection";
import { NavigationSection } from "./design-system/NavigationSection";
import { AnimationSection } from "./design-system/AnimationSection";
import { InformationCardsSection } from "./design-system/InformationCardsSection";

const DesignSystemDemo = () => {
  return (
    <div className="p-8 space-y-8">
      <BentoSection />
      <ButtonsSection />
      <CardsSection />
      <InformationCardsSection />
      <DateSelectionSection />
      <NavigationSection />
      <AnimationSection />
    </div>
  );
};

export default DesignSystemDemo;