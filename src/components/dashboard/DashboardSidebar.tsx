import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Users, 
  LineChart, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "../ui/button";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const menuItems = [
  {
    title: "Financial Management",
    icon: CreditCard,
    path: "/dashboard/financial"
  },
  {
    title: "Shareholder Analytics",
    icon: Users,
    path: "/dashboard/shareholders"
  },
  {
    title: "Property Performance",
    icon: LineChart,
    path: "/dashboard/performance"
  },
  {
    title: "Service Management",
    icon: Settings,
    path: "/dashboard/services"
  }
];

export const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-[76px] h-[calc(100vh-76px)] bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-[60px]" : "w-[250px]"
      }`}
    >
      <div className="flex flex-col h-full">
        <nav
          onMouseLeave={() => setActiveItem(null)}
          className="relative flex-1 py-6"
        >
          {menuItems.map((item) => (
            <div
              key={item.title}
              onMouseEnter={() => setActiveItem(item.title)}
              className="relative"
            >
              <Link
                to={item.path}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <item.icon className="h-5 w-5 min-w-[20px]" />
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium">{item.title}</span>
                )}
              </Link>
              {activeItem === item.title && !isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={transition}
                  className="absolute left-full top-0 ml-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-48"
                >
                  <div className="text-sm text-gray-600">
                    Additional options for {item.title}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </nav>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </motion.div>
  );
};