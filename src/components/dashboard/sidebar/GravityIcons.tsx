import { Gravity, MatterBody } from "@/components/ui/gravity";
import { menuItems } from "./menuItems";

export const GravityIcons = () => {
  return (
    <Gravity className="h-32 relative mb-4" debug={false}>
      {menuItems.map((item, index) => (
        <MatterBody
          key={item.title}
          x={`${(index + 1) * 20}%`}
          y="0%"
          bodyType="circle"
        >
          <div className="p-2 bg-primary rounded-full text-white">
            <item.icon size={24} />
          </div>
        </MatterBody>
      ))}
    </Gravity>
  );
};