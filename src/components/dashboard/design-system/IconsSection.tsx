import { 
  AlertCircle, 
  ArrowRight, 
  Bell, 
  Calendar, 
  Check, 
  ChevronRight, 
  Home,
  Mail, 
  Settings, 
  User 
} from "lucide-react";
import { DesignSystemSection } from "./DesignSystemSection";

export const IconsSection = () => {
  const icons = [
    { icon: AlertCircle, name: "AlertCircle" },
    { icon: ArrowRight, name: "ArrowRight" },
    { icon: Bell, name: "Bell" },
    { icon: Calendar, name: "Calendar" },
    { icon: Check, name: "Check" },
    { icon: ChevronRight, name: "ChevronRight" },
    { icon: Home, name: "Home" },
    { icon: Mail, name: "Mail" },
    { icon: Settings, name: "Settings" },
    { icon: User, name: "User" }
  ];

  return (
    <DesignSystemSection 
      title="Icons" 
      description="Lucide icons used throughout the application."
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {icons.map(({ icon: Icon, name }) => (
          <div key={name} className="flex flex-col items-center space-y-2 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
            <Icon className="h-6 w-6 text-gray-600" />
            <span className="text-sm text-gray-600">{name}</span>
          </div>
        ))}
      </div>
    </DesignSystemSection>
  );
};