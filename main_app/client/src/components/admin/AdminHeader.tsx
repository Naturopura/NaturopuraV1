// src/components/admin/AdminHeader.tsx
import  {  useCallback} from 'react';
import { Menu, Bell } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import { Button } from '../ui/button';
import ProfileDropdown from './ProfileDropdown';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface AdminHeaderProps {
  title: string;
  subtitle: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle }) => {
  const { user} = useAuth();
  const { isExpanded, toggleSidebar } = useSidebar();

  
  

  const isMobile = useMediaQuery("(max-width: 639px)"); // Same breakpoint
  const isDesktopOrTablet = useMediaQuery("(min-width: 640px)"); // Desktop/tablet

  // Calculate the effective sidebar width for positioning of the header
  const headerOffset = useCallback(() => {
    if (isMobile) {
      return 0; // Header starts from left 0 on mobile, as sidebar is an overlay
    }
    // On desktop/tablet, header aligns with the sidebar's right edge
    return isExpanded ? 256 : 64; // In pixels (16rem = 256px, 4rem = 64px)
  }, [isExpanded, isMobile]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-20 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white pr-4 transition-all duration-300 ease-in-out"
      )}
      style={{
        left: `${headerOffset()}px`,
        width: `calc(100% - ${headerOffset()}px)`
      }}
    >
      <div className="flex items-center">
        {/*
          Show the Menu button under these conditions:
          1. If it's a mobile screen AND the sidebar is currently NOT expanded (so we need to open it).
          2. If it's a desktop/tablet screen AND the sidebar is currently NOT expanded (so we need to expand it from 4rem to 16rem).
          This ensures the button is *always* visible when the sidebar is in a state where it can be "opened" further.
        */}
        {(isMobile && !isExpanded) || (isDesktopOrTablet && !isExpanded) ? (
          <Button
            variant="ghost"
            className="h-12 w-12 mr-2 lg:mr-4"
            onClick={() => toggleSidebar(true)} // Always set to true to attempt opening/expanding
            title="Open Sidebar"
          >
            <Menu className="h-7 w-7" />
          </Button>
        ) : (
          // This div acts as a spacer when the sidebar is open/expanded on desktop/tablet.
          // On mobile, when the sidebar is open, this area will be covered by the sidebar itself.
          <div className="h-12 w-12 mr-2 lg:mr-4" />
        )}

        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        <Button variant="ghost" className="relative h-12 w-12">
          <Bell className="h-7 w-7 text-gray-600" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>
        </Button>

        <ProfileDropdown userName={user?.name} userEmail={user?.email} />
      </div>
    </header>
  );
};

export default AdminHeader;