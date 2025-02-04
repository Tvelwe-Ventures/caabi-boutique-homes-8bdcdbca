import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import { menuItems } from "./menuItems";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        "fixed left-0 top-[76px] h-[calc(100vh-76px)] hidden md:flex md:flex-col bg-white border-r flex-shrink-0 px-4 py-4 z-30",
        className
      )}
      animate={{
        width: open ? "300px" : "80px",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="absolute right-2 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        {open ? (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        )}
      </button>

      <nav className="flex-1 space-y-2 mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary text-white" 
                  : "hover:bg-gray-100 text-gray-600"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-transform duration-200",
                isActive ? "text-white" : "text-gray-600 group-hover:text-primary",
                !open && "transform scale-110"
              )} />
              <motion.span
                initial={false}
                animate={{
                  opacity: open ? 1 : 0,
                  width: open ? "auto" : 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut"
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
            scale: open ? 1 : 0.8,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
};