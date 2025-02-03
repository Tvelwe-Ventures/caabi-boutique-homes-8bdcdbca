import { DesignSystemSection } from "./DesignSystemSection";
import { Gravity, MatterBody } from "@/components/ui/gravity";
import { Circle, Square, Hexagon, Triangle } from "lucide-react";

export const GravitySection = () => {
  return (
    <DesignSystemSection 
      title="Gravity Components" 
      description="Interactive physics-based components for various states and interactions."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Loading State</h3>
          <Gravity className="h-48 relative" debug={false}>
            <MatterBody x="30%" y="0%" bodyType="circle">
              <div className="p-3 bg-primary rounded-full text-white animate-pulse flex items-center justify-center min-w-[80px] min-h-[80px]">
                <span>Loading</span>
              </div>
            </MatterBody>
            <MatterBody x="50%" y="0%" bodyType="rectangle">
              <div className="p-3 bg-primary rounded-lg text-white animate-pulse flex items-center justify-center min-w-[80px] min-h-[80px]">
                <span>Please</span>
              </div>
            </MatterBody>
            <MatterBody x="70%" y="0%" bodyType="circle">
              <div className="p-3 bg-primary rounded-full text-white animate-pulse flex items-center justify-center min-w-[80px] min-h-[80px]">
                <span>Wait</span>
              </div>
            </MatterBody>
          </Gravity>
          <p className="text-sm text-gray-600 mt-4">
            Physics-based loading animation with interactive elements that settle at the bottom
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Empty State</h3>
          <Gravity className="h-48 relative" debug={false}>
            <MatterBody x="50%" y="0%" bodyType="rectangle">
              <div className="p-4 bg-secondary/20 rounded-lg flex flex-col items-center justify-center min-w-[120px] min-h-[120px]">
                <Square className="w-8 h-8 text-secondary-dark mb-2" />
                <span className="text-sm text-secondary-dark">No Data</span>
              </div>
            </MatterBody>
          </Gravity>
          <p className="text-sm text-gray-600 mt-4">
            Gentle animation for empty or no-data states
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Interactive Elements</h3>
          <Gravity className="h-48 relative" debug={false}>
            {[
              { Icon: Circle, text: "Drag", shape: "circle" },
              { Icon: Square, text: "And", shape: "rectangle" },
              { Icon: Hexagon, text: "Drop", shape: "circle" },
              { Icon: Triangle, text: "Me", shape: "circle" }
            ].map((item, index) => (
              <MatterBody
                key={index}
                x={`${(index + 1) * 20}%`}
                y="0%"
                bodyType={item.shape}
              >
                <div className="p-3 bg-primary-light hover:bg-primary transition-colors rounded-lg text-white cursor-grab active:cursor-grabbing flex flex-col items-center justify-center min-w-[80px] min-h-[80px]">
                  <item.Icon className="w-6 h-6 mb-1" />
                  <span className="text-sm">{item.text}</span>
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
            <li>Elements will naturally settle at the bottom due to gravity</li>
            <li>Use appropriate shapes and text to convey meaning</li>
          </ul>
        </div>
      </div>
    </DesignSystemSection>
  );
};