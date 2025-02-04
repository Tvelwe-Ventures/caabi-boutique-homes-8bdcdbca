import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, UserCog, Settings, LogOut } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

const menuItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserCog
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings
  },
  {
    label: "Logout",
    href: "/auth",
    icon: LogOut
  }
];

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarContent>
          <SidebarHeader className="p-4">
            <div className={cn(
              "flex items-center gap-2 transition-all duration-200",
              !open && "justify-center"
            )}>
              <div className="h-8 w-8 rounded-lg bg-primary flex-shrink-0" />
              {open && (
                <span className="font-semibold text-lg">QuackOS</span>
              )}
            </div>
          </SidebarHeader>
          <SidebarMenu>
            {menuItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <a href={item.href} className="flex items-center gap-3 px-4 py-2">
                    <item.icon className="h-5 w-5" />
                    {open && <span>{item.label}</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      
      <main className={cn(
        "flex-1 transition-all duration-300",
        open ? "pl-[250px]" : "pl-[80px]"
      )}>
        <div className="container py-6 space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;