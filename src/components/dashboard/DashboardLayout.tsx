import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarContent } from "./sidebar/SidebarContent";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <div className={cn(
        "fixed top-0 left-0 h-screen bg-card border-r shadow-sm transition-all duration-300",
        open ? "w-[250px]" : "w-[80px]"
      )}>
        <button
          onClick={() => setOpen(!open)}
          className="absolute -right-3 top-6 z-40 rounded-full border bg-background p-1 shadow-sm"
        >
          <svg
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
        <SidebarContent open={open} />
      </div>
      
      <main className={cn(
        "flex-1 transition-all duration-300",
        open ? "ml-[250px]" : "ml-[80px]"
      )}>
        <div className="container py-6 space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;