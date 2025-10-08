
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SidebarContextType {
  isExpanded: boolean;
  toggleSidebar: (expand?: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isExpanded: false,
  toggleSidebar: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Stable toggle function to prevent unnecessary re-renders
  const toggleSidebar = React.useCallback((expand?: boolean) => {
    setIsExpanded(prev => typeof expand === "boolean" ? expand : !prev);
  }, []);

  // Check if we're on mobile on initial load and prevent auto-toggling
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (isMobile) {
      setIsExpanded(false);
    }
  }, []);

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;