import { Bell, ChevronRight, Menu, Search, Settings, User } from "lucide-react";
import { DesignSystemSection } from "./DesignSystemSection";

export const NavigationSection = () => {
  return (
    <DesignSystemSection 
      title="Navigation Elements" 
      description="Components for user navigation and interaction."
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
          <Menu className="h-5 w-5 text-gray-600" />
          <Search className="h-5 w-5 text-gray-600" />
          <Bell className="h-5 w-5 text-gray-600" />
          <User className="h-5 w-5 text-gray-600" />
          <Settings className="h-5 w-5 text-gray-600" />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-primary" />
            <span className="font-medium">Menu Item Example</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </DesignSystemSection>
  );
};