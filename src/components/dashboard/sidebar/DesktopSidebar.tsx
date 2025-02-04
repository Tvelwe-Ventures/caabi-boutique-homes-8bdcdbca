import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import { menuItems } from "./menuItems";

export const DesktopSidebar = ({
  className,
}: {
  className?: string;
}) => {
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  
  return (
    <motion.div
      className={cn(
        "fixed left-0 top-[76px] h-[calc(100vh-76px)] hidden md:flex md:flex-col bg-white border-r w-[300px] flex-shrink-0 px-4 py-4",
        className
      )}
      animate={{
        width: open ? "300px" : "80px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex items-center space-x-2 p-2 rounded-lg transition-colors group",
                isActive 
                  ? "bg-primary text-white" 
                  : "hover:bg-gray-100 text-gray-600"
              )}
            >
              <Icon className={cn(
                "h-5 w-5",
                isActive ? "text-white" : "text-gray-600 group-hover:text-primary"
              )} />
              <motion.span
                initial={false}
                animate={{
                  opacity: open ? 1 : 0,
                  width: open ? "auto" : 0,
                }}
                className={cn(
                  "text-sm whitespace-nowrap overflow-hidden",
                  isActive ? "text-white" : "text-gray-600"
                )}
              >
                {item.title}
              </motion.span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4 border-t">
        <motion.img 
          src="/lovable-uploads/e3dce32b-7ebc-44e2-8286-7329641c3558.png" 
          alt="QuackOS"
          className="h-8 w-auto mx-auto"
          animate={{
            opacity: open ? 1 : 0,
          }}
        />
      </div>
    </motion.div>
  );
};