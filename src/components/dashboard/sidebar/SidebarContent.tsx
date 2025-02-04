
import { cn } from "@/lib/utils";
import { menuItems } from "./menuItems";
import { Link, useLocation } from "react-router-dom";

interface SidebarContentProps {
  open: boolean;
}

export const SidebarContent = ({ open }: SidebarContentProps) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col h-full bg-white">
      <div className={cn(
        "flex items-center p-6 transition-all duration-200",
        !open ? "justify-center" : "px-6"
      )}>
        <img 
          src="/lovable-uploads/5535b049-16de-4d80-b816-8fdeb93c5d60.png"
          alt="QuackOS"
          className={cn(
            "transition-all duration-300",
            open ? "w-32" : "w-8"
          )}
        />
      </div>

      <nav className="flex-1 px-3 py-4">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors",
                "hover:bg-gray-100",
                isActive && "bg-gray-100 text-primary font-medium",
                !open && "justify-center"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5",
                isActive ? "text-primary" : "text-gray-500"
              )} />
              {open && (
                <span className={cn(
                  "text-sm",
                  isActive ? "text-primary" : "text-gray-600"
                )}>
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
