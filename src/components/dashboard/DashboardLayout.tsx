import { SidebarProvider } from "./sidebar/SidebarContext";
import { DesktopSidebar } from "./sidebar/DesktopSidebar";
import { MobileSidebar } from "./sidebar/MobileSidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DesktopSidebar />
        <MobileSidebar />
        <main className="flex-1 md:pl-[300px] transition-all duration-300 ease-in-out">
          <div className="container py-6 space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;