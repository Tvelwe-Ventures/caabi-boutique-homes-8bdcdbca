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
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}

const SIDEBAR_STATE_KEY = "sidebar-state";

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: SidebarProviderProps) => {
  const [openState, setOpenState] = useState(() => {
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    return savedState ? JSON.parse(savedState) : true;
  });
  
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = (value: boolean | ((prev: boolean) => boolean)) => {
    const newValue = typeof value === 'function' ? value(open) : value;
    if (setOpenProp) {
      setOpenProp(newValue);
    } else {
      setOpenState(newValue);
    }
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(newValue));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};