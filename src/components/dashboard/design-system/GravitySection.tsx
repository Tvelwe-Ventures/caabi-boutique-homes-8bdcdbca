import { DesignSystemSection } from "./DesignSystemSection";
import { Gravity, MatterBody } from "@/components/ui/gravity";

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
                <img 
                  src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=80&h=80&fit=crop" 
                  alt="Loading" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </MatterBody>
            <MatterBody x="50%" y="0%" bodyType="rectangle">
              <div className="p-3 bg-primary rounded-lg text-white animate-pulse flex items-center justify-center min-w-[80px] min-h-[80px]">
                <img 
                  src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=80&h=80&fit=crop" 
                  alt="Please wait" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </MatterBody>
            <MatterBody x="70%" y="0%" bodyType="circle">
              <div className="p-3 bg-primary rounded-full text-white animate-pulse flex items-center justify-center min-w-[80px] min-h-[80px]">
                <img 
                  src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=80&h=80&fit=crop" 
                  alt="Loading" 
                  className="w-full h-full object-cover rounded-full"
                />
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
                <img 
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=120&h=120&fit=crop" 
                  alt="No data" 
                  className="w-full h-full object-cover rounded-lg"
                />
                <span className="text-sm text-secondary-dark mt-2">No Data</span>
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
              { text: "Drag", shape: "circle" },
              { text: "And", shape: "rectangle" },
              { text: "Drop", shape: "circle" },
              { text: "Me", shape: "circle" }
            ].map((item, index) => (
              <MatterBody
                key={index}
                x={`${(index + 1) * 20}%`}
                y="0%"
                bodyType={item.shape as "circle" | "rectangle"}
              >
                <div className="p-3 bg-primary-light hover:bg-primary transition-colors rounded-lg text-white cursor-grab active:cursor-grabbing flex flex-col items-center justify-center min-w-[80px] min-h-[80px]">
                  <img 
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=80&h=80&fit=crop" 
                    alt={item.text}
                    className="w-full h-full object-cover rounded-lg mb-1"
                  />
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