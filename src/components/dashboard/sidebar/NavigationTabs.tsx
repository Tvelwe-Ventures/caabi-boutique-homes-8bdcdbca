
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { menuItems } from "./menuItems";
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface TabItem {
  title: string;
  icon: LucideIcon | (() => JSX.Element);
  type: "tab" | "separator";
}

export const NavigationTabs = () => {
  const navigate = useNavigate();
  
  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      navigate(menuItems[index].href);
    }
  };

  return (
    <ExpandableTabs
      tabs={menuItems.map(item => ({
        title: item.title,
        icon: item.icon,
        type: "tab" as const
      }))}
      onChange={handleTabChange}
      className="mb-4"
    />
  );
};

