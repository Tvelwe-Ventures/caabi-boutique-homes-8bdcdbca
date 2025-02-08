
import React from "react";
import { CreditCard, Users, LineChart, Settings, Palette, BookOpen, HelpCircle, Upload, Egg } from "lucide-react";

export const menuItems = [
  {
    title: "QuacQBoard",
    href: "/dashboard",
    icon: () => <div className="font-bold text-xl text-primary">Q</div>
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
    title: "Data Export",
    href: "/dashboard/data-import",
    icon: Upload
  },
  {
    title: "QuacQOS Design System",
    href: "/dashboard/design-system",
    icon: Palette
  },
  {
    title: "Duck-umentation",
    href: "/dashboard/docs",
    icon: Egg
  },
  {
    title: "Help & Support",
    href: "/dashboard/help",
    icon: HelpCircle
  }
] as const;
