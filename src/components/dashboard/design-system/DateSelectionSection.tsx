import { Calendar } from "@/components/ui/calendar";
import { DesignSystemSection } from "./DesignSystemSection";

export const DateSelectionSection = () => {
  return (
    <DesignSystemSection 
      title="Date Selection" 
      description="Date pickers for selecting single dates or date ranges."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Single Date Selection</h3>
          <Calendar mode="single" className="rounded-md border" />
        </div>
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Usage Guidelines</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>Use for selecting specific dates for reports or scheduling</li>
            <li>Enable date range selection for period-based analysis</li>
            <li>Consider adding time selection for precise scheduling</li>
            <li>Implement date validation and restrictions as needed</li>
          </ul>
        </div>
      </div>
    </DesignSystemSection>
  );
};