import { DesignSystemSection } from "./DesignSystemSection";

export const TypographySection = () => {
  return (
    <DesignSystemSection 
      title="Typography" 
      description="QuackOS typography system uses a consistent scale and clear hierarchical relationships."
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-500">Headers</h3>
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold font-bricolage">H1 - Display Large (36px)</h1>
              <p className="text-sm text-gray-500 mt-1">Font: Bricolage Grotesque, Weight: Bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold font-bricolage">H2 - Display Medium (30px)</h2>
              <p className="text-sm text-gray-500 mt-1">Font: Bricolage Grotesque, Weight: Semibold</p>
            </div>
            <div>
              <h3 className="text-2xl font-medium font-bricolage">H3 - Display Small (24px)</h3>
              <p className="text-sm text-gray-500 mt-1">Font: Bricolage Grotesque, Weight: Medium</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-500">Body Text</h3>
          <div className="space-y-4">
            <div>
              <p className="text-base font-inter">Body Large - Inter Regular (16px)</p>
              <p className="text-sm text-gray-500 mt-1">Font: Inter, Weight: Regular</p>
            </div>
            <div>
              <p className="text-sm font-inter">Body Medium - Inter Regular (14px)</p>
              <p className="text-sm text-gray-500 mt-1">Font: Inter, Weight: Regular</p>
            </div>
            <div>
              <p className="text-xs font-inter">Body Small - Inter Regular (12px)</p>
              <p className="text-sm text-gray-500 mt-1">Font: Inter, Weight: Regular</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-500">Special Text</h3>
          <div className="space-y-4">
            <div>
              <p className="text-base font-medium font-geist">UI Text - Geist Sans Medium (16px)</p>
              <p className="text-sm text-gray-500 mt-1">Font: Geist Sans, Weight: Medium</p>
            </div>
            <div>
              <p className="text-gradient text-xl font-semibold">Gradient Text</p>
              <p className="text-sm text-gray-500 mt-1">Gradient text effect using background clip</p>
            </div>
          </div>
        </div>
      </div>
    </DesignSystemSection>
  );
};