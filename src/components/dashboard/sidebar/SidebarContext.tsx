import { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  animate?: boolean;
}

const SIDEBAR_STATE_KEY = "sidebar-state";

export const SidebarProvider = ({
  children,
  defaultOpen = true,
  animate = true,
}: SidebarProviderProps) => {
  const [open, setOpen] = useState(() => {
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    return savedState ? JSON.parse(savedState) : defaultOpen;
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(open));
  }, [open]);

  useEffect(() => {
    const handleToggle = () => setOpen(prev => !prev);
    document.addEventListener('toggle-sidebar', handleToggle);
    return () => document.removeEventListener('toggle-sidebar', handleToggle);
  }, []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      <div className="group" data-state={open ? "expanded" : "collapsed"}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
};