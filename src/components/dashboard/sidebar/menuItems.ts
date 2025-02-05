
import { CreditCard, Users, LineChart, Settings, Palette, BookOpen, HelpCircle, Bird } from "lucide-react";

export const menuItems = [
  {
    title: "QuackBoard",
    href: "/dashboard",
    icon: Bird
  },
  {
    title: "Finance & Revenue Management",
    href: "/dashboard/financial-management",
    icon: CreditCard
  },
  {
    title: "Guest Management",
    href: "/dashboard/guest-management",
    icon: Users
  },
  {
    title: "Shareholder Analytics",
    href: "/dashboard/shareholder-analytics",
    icon: Users
  },
  {
    title: "Property Performance",
    href: "/dashboard/property-performance",
    icon: LineChart
  },
  {
    title: "Service Management",
    href: "/dashboard/service-management",
    icon: Settings
  },
  {
    title: "QuackOS Design System",
    href: "/dashboard/design-system",
    icon: Palette
  },
  {
    title: "Documentation",
    href: "/dashboard/docs",
    icon: BookOpen
  },
  {
    title: "Help & Support",
    href: "/dashboard/help",
    icon: HelpCircle
  }
] as const;
