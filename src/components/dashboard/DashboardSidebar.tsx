import { useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X,
  CreditCard, 
  Users, 
  LineChart, 
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { Gravity, MatterBody } from "@/components/ui/gravity";

const menuItems = [
  {
    title: "Financial Management",
    href: "/dashboard/financial",
    icon: CreditCard
  },
  {
    title: "Shareholder Analytics",
    href: "/dashboard/shareholders",
    icon: Users
  },
  {
    title: "Property Performance",
    href: "/dashboard/performance",
    icon: LineChart
  },
  {
    title: "Service Management",
    href: "/dashboard/services",
    icon: Settings
  }
];

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

const NavigationTabs = () => {
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

const GravityIcons = () => {
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

const DesktopSidebar = ({
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
      {children}
    </motion.div>
  );
};

const MobileSidebar = ({
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
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const DashboardSidebar = () => {
  return (
    <SidebarProvider>
      <>
        <DesktopSidebar>
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
        </DesktopSidebar>
        <MobileSidebar>
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
        </MobileSidebar>
      </>
    </SidebarProvider>
  );
};