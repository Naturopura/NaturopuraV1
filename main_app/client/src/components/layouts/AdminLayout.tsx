// src/layouts/AdminLayout.tsx
import React,{useState,useEffect,useCallback, ReactNode} from 'react';
import AdminSidebar from '../admin/AdminSidebar';
import AdminHeader from '../admin/AdminHeader';
import { SidebarProvider, useSidebar } from '../../context/SidebarContext';
import { AuthProvider } from '../../context/AuthContext';

// Media query hook - Assuming this is in src/hooks/useMediaQuery.ts
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    setMatches(media.matches); // Initial check
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
};

// Main content wrapper to handle dynamic left margin
const MainContentWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isExpanded } = useSidebar();
  const isMobile = useMediaQuery("(max-width: 639px)"); // up to sm breakpoint

  // Effective sidebar width logic based on visibility and screen size
  const effectiveSidebarWidth = useCallback(() => {
    if (isMobile) {
      return 0; // On mobile, sidebar is an overlay (or hidden), no margin needed
    }
    // On sm (640px) and up, consider the actual expanded/collapsed width
    return isExpanded ? 256 : 64; // In pixels (16rem = 256px, 4rem = 64px)
  }, [isExpanded, isMobile]);

  const [mainContentMarginLeft, setMainContentMarginLeft] = useState(0);

  useEffect(() => {
    setMainContentMarginLeft(effectiveSidebarWidth());
  }, [effectiveSidebarWidth]);

  return (
    <main
      className="flex-1 p-4 sm:p-6 transition-all duration-300 ease-in-out" // Added responsive padding
      style={{
        marginLeft: `${mainContentMarginLeft}px`,
        // The header is h-16, which is 4rem. Add padding-top instead of margin-top to avoid content jump.
        paddingTop: '4rem'
      }}
    >
      {children}
    </main>
  );
};

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="flex min-h-screen bg-gray-100">
          {/* AdminSidebar is placed here. It will be fixed. */}
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <AdminHeader 
              title={title} 
              subtitle={subtitle}
            />
            <MainContentWrapper>
              {children}
            </MainContentWrapper>
          </div>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default AdminLayout;