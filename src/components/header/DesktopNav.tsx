import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "./NavLink";
import { useState } from "react";
import { Calculator, Building2, FileSpreadsheet, ChevronDown, BarChart3, Users } from "lucide-react";

type NavItem = {
  id: number;
  label: string;
  subMenus?: {
    title: string;
    items: {
      label: string;
      description: string;
      icon: React.ElementType;
      link: string;
    }[];
  }[];
  link?: string;
};

const navItems: NavItem[] = [
  {
    id: 1,
    label: "Investment Tools",
    subMenus: [
      {
        title: "Analysis Tools",
        items: [
          {
            label: "ROI Calculator",
            description: "Calculate your return on investment",
            icon: Calculator,
            link: "/calculator"
          },
          {
            label: "Property Evaluation",
            description: "Evaluate property potential",
            icon: Building2,
            link: "/property-evaluation"
          },
          {
            label: "Investment Proposal",
            description: "Create investment proposals",
            icon: FileSpreadsheet,
            link: "/investment"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "Statistics",
    link: "/statistics"
  },
  {
    id: 3,
    label: "Community",
    link: "/community"
  }
];

export const DesktopNav = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isHover, setIsHover] = useState<number | null>(null);

  const handleHover = (menuLabel: string | null) => {
    setOpenMenu(menuLabel);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="hidden md:flex items-center space-x-6"
    >
      <ul className="relative flex items-center space-x-2">
        {navItems.map((navItem) => (
          <li
            key={navItem.label}
            className="relative"
            onMouseEnter={() => handleHover(navItem.label)}
            onMouseLeave={() => handleHover(null)}
          >
            {navItem.link ? (
              <NavLink to={navItem.link} className="py-1.5 px-4 rounded-full hover:bg-primary-light/10">
                {navItem.label}
              </NavLink>
            ) : (
              <button
                className="text-sm py-1.5 px-4 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 text-white/90 hover:text-white relative rounded-full"
                onMouseEnter={() => setIsHover(navItem.id)}
                onMouseLeave={() => setIsHover(null)}
              >
                <span>{navItem.label}</span>
                {navItem.subMenus && (
                  <ChevronDown
                    className={`h-4 w-4 group-hover:rotate-180 duration-300 transition-transform
                      ${openMenu === navItem.label ? "rotate-180" : ""}`}
                  />
                )}
                {(isHover === navItem.id || openMenu === navItem.label) && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute inset-0 size-full bg-primary-light/10"
                    style={{ borderRadius: 99 }}
                  />
                )}
              </button>
            )}

            <AnimatePresence>
              {openMenu === navItem.label && navItem.subMenus && (
                <div className="w-auto absolute left-0 top-full pt-2">
                  <motion.div
                    className="bg-white border border-gray-200 p-4 w-max shadow-lg"
                    style={{ borderRadius: 16 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="w-fit shrink-0 flex space-x-9 overflow-hidden">
                      {navItem.subMenus.map((sub) => (
                        <motion.div layout className="w-full" key={sub.title}>
                          <h3 className="mb-4 text-sm font-medium capitalize text-gray-500">
                            {sub.title}
                          </h3>
                          <ul className="space-y-6">
                            {sub.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <li key={item.label}>
                                  <NavLink
                                    to={item.link}
                                    className="flex items-start space-x-3 group"
                                  >
                                    <div className="border border-gray-200 text-gray-700 rounded-md flex items-center justify-center size-9 shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                                      <Icon className="h-5 w-5 flex-none" />
                                    </div>
                                    <div className="leading-5 w-max">
                                      <p className="text-sm font-medium text-gray-700 shrink-0 group-hover:text-primary">
                                        {item.label}
                                      </p>
                                      <p className="text-xs text-gray-500 shrink-0 group-hover:text-primary/80 transition-colors duration-300">
                                        {item.description}
                                      </p>
                                    </div>
                                  </NavLink>
                                </li>
                              );
                            })}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};