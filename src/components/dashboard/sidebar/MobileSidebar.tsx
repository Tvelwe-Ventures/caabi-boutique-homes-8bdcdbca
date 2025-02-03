import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import { menuItems } from "./menuItems";

export const MobileSidebar = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  
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
                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-600">{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};