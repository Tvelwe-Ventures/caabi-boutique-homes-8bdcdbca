import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import { menuItems } from "./menuItems";

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 w-full fixed top-[76px] left-0 z-10"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <Menu
            className="text-neutral-800 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-[calc(100vh-76px)] w-full left-0 top-[76px] bg-white p-10 z-[100] flex flex-col",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <X />
              </div>
              <nav className="flex-1 space-y-4">
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
          )}
        </AnimatePresence>
      </div>
    </>
  );
};