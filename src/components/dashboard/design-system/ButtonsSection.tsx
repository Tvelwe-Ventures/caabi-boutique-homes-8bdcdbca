import { Button } from "@/components/ui/button";
import { DesignSystemSection } from "./DesignSystemSection";

export const ButtonsSection = () => {
  return (
    <DesignSystemSection 
      title="Buttons" 
      description="Various button styles and states for different actions."
    >
      <div className="flex flex-wrap gap-4">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </DesignSystemSection>
  );
};