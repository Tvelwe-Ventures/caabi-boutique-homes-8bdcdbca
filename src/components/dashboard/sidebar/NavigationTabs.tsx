
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { menuItems } from "./menuItems";
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import type { Tab } from "@/components/ui/expandable-tabs";

interface NavigationTab extends Tab {
  title: string;
  icon: LucideIcon | (() => JSX.Element);
}

export const NavigationTabs = () => {
  const navigate = useNavigate();
  
  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      navigate(menuItems[index].href);
    }
  };

  const tabs = menuItems.map(item => ({
    title: item.title,
    icon: item.icon
  }));

  return (
    <ExpandableTabs
      tabs={tabs}
      onChange={handleTabChange}
      className="mb-4"
    />
  );
};
