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
        <main className="flex-1 transition-all duration-300 ease-in-out md:pl-[80px] md:group-data-[state=expanded]:pl-[300px]">
          <div className="container py-6 space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;