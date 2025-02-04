import { CreditCard, Users, LineChart, Settings, Palette, BookOpen, HelpCircle, DollarSign, UserCheck } from "lucide-react";

export const menuItems = [
  {
    title: "Financial Dashboard",
    href: "/dashboard",
    icon: DollarSign
  },
  {
    title: "Financial Management",
    href: "/dashboard/financial",
    icon: CreditCard
  },
  {
    title: "Guest Management",
    href: "/dashboard/guests",
    icon: UserCheck
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