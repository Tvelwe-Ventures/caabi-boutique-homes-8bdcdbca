import { Outlet } from "react-router-dom";
import { DesktopSidebar } from "./sidebar/DesktopSidebar";
import { MobileSidebar } from "./sidebar/MobileSidebar";
import { SidebarProvider } from "./sidebar/SidebarContext";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50">
        <DesktopSidebar />
        <MobileSidebar />
        <main className="lg:pl-[300px] pt-[76px]">
          <div className="container mx-auto px-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;