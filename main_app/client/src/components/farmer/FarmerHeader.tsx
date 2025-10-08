import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSidebar } from "../../context/SidebarContext";
import { useNotifications } from "../../context/NotificationContext";

import {
  Bell,
  Search,
  Menu,
  ChevronLeft,
  Clock
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import WarningDialog from "../ui/WarningDialog";

// Re-implement useMediaQuery hook
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false);
  
  React.useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);
    
    // Call once initially
    updateMatches();
    
    // Add listener
    media.addEventListener("change", updateMatches);
    return () => media.removeEventListener("change", updateMatches);
  }, [query]);
  
  return matches;
};

interface FarmerHeaderProps {
  title: string;
  subtitle: string;
}

function arrayBufferToBase64(buffer: number[] | Uint8Array): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const FarmerHeader: React.FC<FarmerHeaderProps> = ({ title, subtitle }) => {
  const { user, logout } = useAuth();
  const { isExpanded, toggleSidebar } = useSidebar();
  const { unreadCount, recentEvents, markAllAsRead, markAsRead, viewedEvents } = useNotifications();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 639px)");

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const headerOffset = useCallback(() => {
    if (isMobile) {
      return 0;
    }
    return isExpanded ? 256 : 64;
  }, [isExpanded, isMobile]);

  const handleLogout = () => {
    setIsLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    setIsLogoutDialogOpen(false);
    logout();
    navigate("/login");
  };

  const cancelLogout = () => {
    setIsLogoutDialogOpen(false);
  };

  return (
    <header
      className={cn(
        "farmer-header fixed top-0 right-0 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white pr-4 transition-all duration-300 ease-in-out"
      )}
      style={{
        left: `${headerOffset()}px`,
        width: `calc(100% - ${headerOffset()}px)`
      }}
    >
      {/* Left section with mobile menu button */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-green-100/80 active:scale-95 transition-all"
          onClick={() => {
            if (isExpanded) {
              navigate(-1);
            } else {
              toggleSidebar(true);
            }
          }}
        >
          {isMobile ? (
            <Menu className="h-5 w-5 naturopura-text" />
          ) : (
            isExpanded ? (
              <ChevronLeft className="h-5 w-5 naturopura-text" />
            ) : (
              <Menu className="h-5 w-5 naturopura-text" />
            )
          )}
        </Button>

        <div className="hidden sm:flex flex-col">
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-2xl mx-auto px-4 hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-9 bg-gray-50/90 border-gray-200 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Mobile search button */}
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => {
          }}
        >
          <Search className="h-4 w-4 text-gray-600" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 bg-white" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Notifications</p>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => markAllAsRead()}
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {recentEvents.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No notifications
              </div>
            ) : (
              <div className="max-h-[400px] overflow-y-auto">
                {recentEvents.map((event) => (
                  <DropdownMenuItem
                    key={event._id}
                    className="p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      markAsRead(event._id);
                      navigate('/farmer/protection/sensors');
                    }}
                  >
                    <div className="flex gap-3 w-full">
                      <div className="flex-shrink-0">
                        <img
                          src={`data:image/jpeg;base64,${arrayBufferToBase64(event.photo.data)}`}
                          alt="Motion"
                          className="h-12 w-12 rounded object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Motion Detected
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(event.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {event.detectedObjects?.map((obj: any) => obj.label).join(", ")}
                        </p>
                      </div>
                      {!viewedEvents.has(event._id) && (
                        <div className="flex-shrink-0">
                          <span className="h-2 w-2 rounded-full bg-blue-500" />
                        </div>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/farmer/protection/sensors" className="text-center text-sm text-blue-600">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
            >
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9 shadow-sm ">
                <AvatarFallback className="bg-naturopura-gradient text-white">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.name || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/farmer/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <WarningDialog 
        isOpen={isLogoutDialogOpen}
        message="Are you sure you want to logout?"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </header>
  );
};

export default FarmerHeader;
