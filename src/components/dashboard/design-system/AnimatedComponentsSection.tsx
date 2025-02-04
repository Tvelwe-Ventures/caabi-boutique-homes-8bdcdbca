import { DesignSystemSection } from "./DesignSystemSection";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Marquee } from "@/components/ui/marquee";

export const AnimatedComponentsSection = () => {
  return (
    <DesignSystemSection
      title="Animated Components"
      description="A collection of reusable animated components for creating dynamic interfaces."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-white rounded-lg border relative h-[200px] flex items-center justify-center">
          <h3 className="text-lg font-medium mb-4">Orbiting Circles</h3>
          <div className="relative size-32">
            <OrbitingCircles>
              <div className="size-4 rounded-full bg-primary" />
            </OrbitingCircles>
            <OrbitingCircles reverse radius={40} delay={0}>
              <div className="size-3 rounded-full bg-primary" />
            </OrbitingCircles>
          </div>
        </div>

        <div className="p-8 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Marquee</h3>
          <Marquee className="rounded-lg border bg-muted/50">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-4 py-2"
                >
                  <div className="size-8 rounded-full bg-primary/20" />
                  <span>Item {i + 1}</span>
                </div>
              ))}
          </Marquee>
        </div>
      </div>
    </DesignSystemSection>
  );
};