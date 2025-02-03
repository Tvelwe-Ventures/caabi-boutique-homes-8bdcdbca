import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import { NavigationTabs } from "./NavigationTabs";
import { GravityIcons } from "./GravityIcons";
import { menuItems } from "./menuItems";

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  
  return (
    <motion.div
      className={cn(
        "fixed left-0 top-[76px] h-[calc(100vh-76px)] hidden md:flex md:flex-col bg-neutral-100 w-[300px] flex-shrink-0 px-4 py-4",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      <NavigationTabs />
      <GravityIcons />
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-200"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
      {children}
    </motion.div>
  );
};