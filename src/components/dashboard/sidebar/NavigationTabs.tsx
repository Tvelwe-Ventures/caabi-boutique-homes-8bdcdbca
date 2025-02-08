
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { menuItems } from "./menuItems";
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";

type MenuItem = {
  title: string;
  href: string;
  icon: LucideIcon | (() => JSX.Element);
};

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
        icon: typeof item.icon === 'function' ? item.icon : item.icon,
        type: 'link' as const
      }))}
      onChange={handleTabChange}
      className="mb-4"
    />
  );
};
