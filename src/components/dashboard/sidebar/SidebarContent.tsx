import { cn } from "@/lib/utils";
import { LayoutDashboard, UserCog, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserCog
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings
  },
  {
    label: "Logout",
    href: "/auth",
    icon: LogOut
  }
];

interface SidebarContentProps {
  open: boolean;
}

export const SidebarContent = ({ open }: SidebarContentProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className={cn(
        "flex items-center gap-2 p-4 transition-all duration-200",
        !open && "justify-center"
      )}>
        <div className="h-8 w-8 rounded-lg bg-primary flex-shrink-0" />
        {open && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-semibold text-lg"
          >
            QuackOS
          </motion.span>
        )}
      </div>

      <nav className="flex-1 px-2 py-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent/50 transition-colors"
          >
            <item.icon className="h-5 w-5" />
            {open && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};