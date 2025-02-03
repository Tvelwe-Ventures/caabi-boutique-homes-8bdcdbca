import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { menuItems } from "./menuItems";
import { useNavigate } from "react-router-dom";

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
        icon: item.icon
      }))}
      onChange={handleTabChange}
      className="mb-4"
    />
  );
};