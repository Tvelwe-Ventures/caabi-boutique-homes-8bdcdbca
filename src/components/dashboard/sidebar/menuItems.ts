import { CreditCard, Users, LineChart, Settings } from "lucide-react";

export const menuItems = [
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
] as const;