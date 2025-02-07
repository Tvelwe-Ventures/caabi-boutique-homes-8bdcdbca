import { Button } from "@/components/ui/button";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { DesignSystemSection } from "./DesignSystemSection";

export const ButtonsSection = () => {
  return (
    <DesignSystemSection 
      title="Buttons" 
      description="Various button styles and states for different actions."
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <ButtonColorful label="Default Colorful" />
          <ButtonColorful label="Custom Label" className="w-48" />
          <ButtonColorful label="Long Button Text" className="w-56" />
        </div>
      </div>
    </DesignSystemSection>
  );
};