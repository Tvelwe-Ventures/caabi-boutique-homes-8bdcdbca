import { DesignSystemSection } from "./DesignSystemSection";

export const GradientsSection = () => {
  return (
    <DesignSystemSection 
      title="Gradients" 
      description="Consistent gradient styles for backgrounds and interactive elements."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 rounded-lg bg-gradient-radial from-primary via-primary-light to-transparent p-6">
          <span className="text-white font-medium">Radial Gradient</span>
        </div>
        
        <div className="h-32 rounded-lg bg-soft-gradient p-6">
          <span className="text-gray-800 font-medium">Soft Gradient</span>
        </div>
        
        <div className="h-32 rounded-lg bg-hero-gradient p-6">
          <span className="text-gray-800 font-medium">Hero Gradient</span>
        </div>
      </div>
    </DesignSystemSection>
  );
};