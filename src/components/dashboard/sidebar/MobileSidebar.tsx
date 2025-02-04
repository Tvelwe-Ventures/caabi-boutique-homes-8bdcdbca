import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import { menuItems } from "./menuItems";

export const MobileSidebar = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  
  return (
    <div
      className={cn(
        "h-14 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-white border-b w-full fixed top-[76px] left-0 z-10"
      )}
      {...props}
    >
      <div className="flex justify-end z-20 w-full">
        <Menu
          className="text-gray-600 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className={cn(
              "fixed h-[calc(100vh-76px)] w-full left-0 top-[76px] bg-white p-6 z-[100] flex flex-col",
              className
            )}
          >
            <div className="absolute right-6 top-6 text-gray-600 cursor-pointer" onClick={() => setOpen(!open)}>
              <X />
            </div>
            <nav className="flex-1 space-y-4 mt-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 p-2 rounded-lg transition-colors",
                      isActive 
                        ? "bg-primary text-white" 
                        : "hover:bg-gray-100 text-gray-600"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-600")} />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto pt-6 border-t">
              <img 
                src="/lovable-uploads/e3dce32b-7ebc-44e2-8286-7329641c3558.png" 
                alt="QuackOS" 
                className="h-8 w-auto mx-auto"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};