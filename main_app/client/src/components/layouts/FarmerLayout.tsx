// src/components/farmer/FarmerLayout.tsx
import React, { ReactNode, useEffect } from 'react';
import { motion } from "framer-motion";
import FarmerHeader from '../farmer/FarmerHeader';
import FarmerSidebar from '../farmer/FarmerSidebar';
import { useSidebar } from '../../context/SidebarContext'; // Assuming you have this context
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { cn } from '../../lib/utils'; // Assuming you have a utility for classNames


interface FarmerLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const FarmerLayout: React.FC<FarmerLayoutProps> = ({ children, title, subtitle }) => {
  const { isExpanded, toggleSidebar } = useSidebar();
  const isMobile = useMediaQuery("(max-width: 639px)");

  // Handle initial mobile state and resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        toggleSidebar(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [toggleSidebar]);

  return (
    <div className="min-h-screen bg-gray-50">
      <FarmerSidebar />
      <FarmerHeader 
        title={title}
        subtitle={subtitle}
      />

      {/* Main content area */}
      <motion.main
        className={cn(
          "transition-all duration-300 ease-in-out p-4 sm:p-6",
          "relative"
        )}
        style={{
          marginLeft: isMobile ? 0 : (isExpanded ? "16rem" : "4rem"),
          marginTop: "4rem", // 64px header height
        }}
      >
        {/* Main content scrollable area */}
        {children}
      </motion.main>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => toggleSidebar(false)}
        />
      )}
    </div>
  );
};

export default FarmerLayout;