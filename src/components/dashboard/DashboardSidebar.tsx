import { SidebarProvider } from "./sidebar/SidebarContext";
import { DesktopSidebar } from "./sidebar/DesktopSidebar";
import { MobileSidebar } from "./sidebar/MobileSidebar";

export const DashboardSidebar = () => {
  return (
    <SidebarProvider>
      <>
        <DesktopSidebar />
        <MobileSidebar />
      </>
    </SidebarProvider>
  );
};