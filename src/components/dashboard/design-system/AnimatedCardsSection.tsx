import { DesignSystemSection } from "./DesignSystemSection";
import { PropertyCard } from "@/components/ui/property-card";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Meteors } from "@/components/ui/meteors";

export const AnimatedCardsSection = () => {
  return (
    <DesignSystemSection 
      title="Animated Cards" 
      description="Interactive card components with animations and effects."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Property Card */}
        <PropertyCard 
          property={{
            name: "Luxury Downtown Suite",
            location: "Downtown Dubai",
            image: "/lovable-uploads/147ce66e-9e92-42a5-86bd-23aca1487925.png",
            maxGuests: 4
          }}
          content={{
            title: "Premium Living Space",
            description: "Experience luxury living in the heart of Dubai with stunning views.",
            price: "AED 1,500/night"
          }}
        />

        {/* Gradient Card */}
        <BackgroundGradient className="rounded-[22px] p-4 bg-white dark:bg-zinc-900">
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-xl text-primary">Gradient Effect</h3>
            <p className="text-sm text-gray-500">
              Animated gradient background with hover effects
            </p>
          </div>
        </BackgroundGradient>

        {/* Meteor Card */}
        <div className="relative h-96">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary to-primary-light rounded-lg">
            <div className="absolute inset-0 h-full w-full backdrop-blur-[2px] rounded-lg">
              <Meteors number={20} />
            </div>
          </div>
          <div className="relative h-full w-full p-4 flex items-center justify-center">
            <h3 className="text-white font-semibold text-xl">Meteor Effect</h3>
          </div>
        </div>
      </div>
    </DesignSystemSection>
  );
};