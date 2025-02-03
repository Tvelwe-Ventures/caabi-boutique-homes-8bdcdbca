import { DesignSystemSection } from "./DesignSystemSection";
import { Gravity, MatterBody } from "@/components/ui/gravity";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

export const GravitySection = () => {
  return (
    <DesignSystemSection 
      title="Gravity Components" 
      description="Interactive physics-based components for various states and interactions."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Loading State</h3>
          <Gravity className="h-32 relative" debug={false}>
            <MatterBody x="30%" y="0%" bodyType="circle">
              <div className="p-2 bg-primary rounded-full text-white animate-pulse">
                <ArrowUp size={24} />
              </div>
            </MatterBody>
            <MatterBody x="50%" y="0%" bodyType="circle">
              <div className="p-2 bg-primary rounded-full text-white animate-pulse">
                <ArrowDown size={24} />
              </div>
            </MatterBody>
            <MatterBody x="70%" y="0%" bodyType="circle">
              <div className="p-2 bg-primary rounded-full text-white animate-pulse">
                <ArrowRight size={24} />
              </div>
            </MatterBody>
          </Gravity>
          <p className="text-sm text-gray-600 mt-4">
            Physics-based loading animation with interactive elements
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Empty State</h3>
          <Gravity className="h-32 relative" debug={false}>
            <MatterBody x="50%" y="0%" bodyType="circle">
              <div className="p-3 bg-secondary/20 rounded-full">
                <ArrowLeft size={24} className="text-secondary-dark" />
              </div>
            </MatterBody>
          </Gravity>
          <p className="text-sm text-gray-600 mt-4">
            Gentle animation for empty or no-data states
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Interactive Elements</h3>
          <Gravity className="h-32 relative" debug={false}>
            {[ArrowUp, ArrowDown, ArrowLeft, ArrowRight].map((Icon, index) => (
              <MatterBody
                key={index}
                x={`${(index + 1) * 20}%`}
                y="0%"
                bodyType="circle"
              >
                <div className="p-2 bg-primary-light hover:bg-primary transition-colors rounded-full text-white cursor-grab active:cursor-grabbing">
                  <Icon size={24} />
                </div>
              </MatterBody>
            ))}
          </Gravity>
          <p className="text-sm text-gray-600 mt-4">
            Draggable elements with physics interactions
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Usage Guidelines</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>Use loading state for async operations</li>
            <li>Empty states should guide users to take action</li>
            <li>Interactive elements should provide clear feedback</li>
            <li>Maintain consistent physics properties across similar components</li>
          </ul>
        </div>
      </div>
    </DesignSystemSection>
  );
};