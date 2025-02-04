import { SidebarProvider } from "./sidebar/SidebarContext";
import { DesktopSidebar } from "./sidebar/DesktopSidebar";
import { MobileSidebar } from "./sidebar/MobileSidebar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-mobile";

const DashboardLayout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('toggle-sidebar'));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <SidebarProvider defaultOpen={!isMobile}>
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