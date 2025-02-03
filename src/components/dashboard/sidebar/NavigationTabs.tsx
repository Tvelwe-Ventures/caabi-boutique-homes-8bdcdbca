import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { menuItems } from "./menuItems";

export const NavigationTabs = () => {
  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      window.location.href = menuItems[index].href;
    }
  };

  return (
    <ExpandableTabs
      tabs={menuItems}
      onChange={handleTabChange}
      className="mb-4"
    />
  );
};