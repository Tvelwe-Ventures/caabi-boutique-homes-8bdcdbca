
import React from "react";
import { CreditCard, Users, LineChart, Settings, Palette, BookOpen, HelpCircle, Upload, Egg } from "lucide-react";

export const menuItems = [
  {
    title: "QuacQBoard",
    href: "/dashboard",
    icon: () => <img src="/lovable-uploads/cf11a80b-158e-468d-821f-7527807fb753.png" alt="QuackOS" className="h-6 w-6" />
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
    title: "Data Import",
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
