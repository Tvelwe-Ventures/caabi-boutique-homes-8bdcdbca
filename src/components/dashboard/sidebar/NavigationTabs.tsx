
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { menuItems } from "./menuItems";
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface TabItem {
  title: string;
  icon: LucideIcon | (() => JSX.Element);
  type: "tab";
}

export const NavigationTabs = () => {
  const navigate = useNavigate();
  
  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      navigate(menuItems[index].href);
    }
  };

  const tabs: TabItem[] = menuItems.map(item => ({
    title: item.title,
    icon: item.icon,
    type: "tab"
  }));

  return (
    <ExpandableTabs
      tabs={tabs}
      onChange={handleTabChange}
      className="mb-4"
    />
  );
};
