import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSidebar } from "../../context/SidebarContext";
import WarningDialog from "../ui/WarningDialog";
import {
  Home,
  Wallet,
  ShoppingCart,
  LineChart,
  Shield,
  Headphones,
  LogOut,
  Leaf,
  Cloud,
  Bug,
  Brain,
  Truck,
  BadgeDollarSign,
  Zap,
  ChevronDown,
  ChevronRight,
  FileCheck,
  X,
  ChevronLeft,
  Menu,
  Search,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    listener();
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
};

const FarmerSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isExpanded, toggleSidebar } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

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

  // This is the new function to handle the marketplace redirection logic.
  const handleMarketplaceClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = `http://localhost:5175/marketplace/login?token=${token}`;
    } else {
      console.error("No token found!");
    }
  };

  // Media queries
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(max-width: 1023px)");
  const isDesktopOrTablet = useMediaQuery("(min-width: 640px)");

  // Keep track of previous media query states
  const prevIsMobile = useRef(isMobile);
  const prevIsTablet = useRef(isTablet);

  const toggleExpand = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path)
        ? prev.filter((item) => item !== path)
        : [...prev, path]
    );
  };

  const navItems = [
    {
      title: "Dashboard",
      path: "/farmer/dashboard",
      icon: Home,
    },
    {
      title: "Financial Services",
      path: "/farmer/loans/apply",
      icon: Wallet,
      subItems: [
        {
          title: "Apply for Loans",
          path: "/farmer/loans/apply",
          icon: BadgeDollarSign,
        },
        {
          title: "eKYC Verification",
          path: "/farmer/ekyc",
          icon: FileCheck,
        },
        {
          title: "Insurance",
          path: "/farmer/insurance",
          icon: Shield,
        },
        {
          title: "Apply for Insurance",
          path: "/farmer/insurance/apply",
          icon: Shield,
        },
        {
          title: "Subsidies",
          path: "/farmer/subsidies",
          icon: Leaf,
        },
        {
          title: "Apply Subsidy",
          path: "/farmer/subsidies/apply",
          icon: Leaf,
        },
      ],
    },
    {
      title: "Marketplace",
      path: "http://localhost:5175/marketplace/login",
      icon: ShoppingCart,
      isExternal: true,
    },
    {
      title: "Monitoring & Advisory",
      path: "/farmer/monitoring/weather",
      icon: LineChart,
      subItems: [
        {
          title: "Weather Updates",
          path: "/farmer/monitoring/weather",
          icon: Cloud,
        },
        {
          title: "Soil Health",
          path: "/farmer/monitoring/soil",
          icon: Leaf,
        },
        {
          title: "Pest Alerts",
          path: "/farmer/monitoring/pests",
          icon: Bug,
        },
        {
          title: "AI Insights",
          path: "/farmer/monitoring/ai/insights",
          icon: Brain,
        },
      ],
    },
    {
      title: "Animal Attack Prevention",
      path: "/farmer/protection/sensors",
      icon: Shield,
      subItems: [
        {
          title: "IoT Sensors",
          path: "/farmer/protection/sensors",
          icon: Zap,
        },
        {
          title: "Drone Surveillance",
          path: "/farmer/drone/schedule",
          icon: Truck,
        },
        {
          title: "Drone Services",
          path: "/farmer/drone/my-schedules",
          icon: Cloud,
        },
        {
          title: "Cold Store Tracker",
          path: "/farmer/cold-store-tracker",
          icon: Leaf,
        },
      ],
    },
    {
      title: "Feedback & Support",
      path: "/farmer/feedback",
      icon: Headphones,
    },
    {
      title: "Equipment Search",
      path: "/farmer/equipment/search",
      icon: Search,
    },
    {
      title: "Equipment Requests",
      path: "/farmer/equipment/requests",
      icon: FileCheck,
    },
  ];

  // Effect to handle sidebar state on resize
  useEffect(() => {
    const wasMobile = prevIsMobile.current;
    const wasTablet = prevIsTablet.current;

    if ((isMobile || isTablet) && !(wasMobile || wasTablet)) {
      // resized from desktop to mobile/tablet
      toggleSidebar(false);
    } else if (!(isMobile || isTablet) && (wasMobile || wasTablet)) {
      // resized from mobile/tablet to desktop
      toggleSidebar(false);
    }

    prevIsMobile.current = isMobile;
    prevIsTablet.current = isTablet;
  }, [isMobile, isTablet, toggleSidebar]);

  // Use useCallback to ensure stable function identity for memoizedToggleSidebar
  const memoizedToggleSidebar = useCallback(
    (expand: boolean) => {
      toggleSidebar(expand);
    },
    [toggleSidebar]
  );

  // Close sidebar by default on mobile
  useEffect(() => {
    if (isMobile) {
      toggleSidebar(false);
    }
  }, [isMobile, toggleSidebar]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => toggleSidebar(false)}
            />
          )}
        </AnimatePresence>
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobile ? (isExpanded ? 0 : "-100%") : 0,
          width: isMobile ? "85%" : isExpanded ? "16rem" : "4rem",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed inset-y-0 left-0",
          "flex h-full flex-col border-r border-gray-200 bg-white",
          "z-50 shadow-lg",
          !isExpanded && !isMobile && "items-center"
        )}
        style={{
          width: isMobile ? "85%" : isExpanded ? "16rem" : "4rem",
        }}
      >
        {/* Header/Logo section for sidebar */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 flex-shrink-0">
          <Link
            to="/farmer/dashboard"
            className="flex items-center h-full overflow-hidden"
          >
            {isExpanded || isDesktopOrTablet ? (
              <img
                src="/nat.svg"
                alt="Logo"
                className="h-full max-h-12 w-auto object-contain"
              />
            ) : (
              <Leaf className="h-6 w-6 text-green-600" />
            )}
          </Link>
          {/* Toggle button */}
          <>
            <motion.button
              initial={{
                opacity: isExpanded ? 0 : 1,
                rotate: isExpanded ? 180 : 0,
              }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
              onClick={() => toggleSidebar(!isExpanded)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMobile ? (
                isExpanded ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </motion.button>
          </>
        </div>

        {/* Navigation Items */}
        <nav
          className={cn(
            "flex-1 overflow-y-auto py-2 sm:py-4 px-2 sm:px-3 space-y-0.5 sm:space-y-1",
            !isExpanded && "w-full"
          )}
        >
          {navItems.map((item) => (
            <div key={item.path} className="mb-0.5 sm:mb-1">
              {/* Conditional rendering for Marketplace link */}
              {item.title === "Marketplace" ? (
                <div
                  className={cn(
                    "group flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg transition-all cursor-pointer",
                    "text-gray-700 hover:bg-gray-100/80",
                    !isExpanded && "justify-center"
                  )}
                  onClick={() => {
                    handleMarketplaceClick();
                    (isMobile || isTablet) && memoizedToggleSidebar(false);
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <item.icon
                      className={cn(
                        "h-4 w-4 sm:h-4.5 sm:w-4.5 transition-colors",
                        "text-gray-500 group-hover:text-gray-700"
                      )}
                    />
                    {isExpanded && (
                      <span className="text-sm font-medium">{item.title}</span>
                    )}
                  </div>
                </div>
              ) : (
                <Link to={item.path} className="group">
                  <motion.div
                    whileHover={{ x: isExpanded ? 2 : 0 }}
                    className={cn(
                      "flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg transition-all cursor-pointer",
                      location.pathname === item.path ||
                        (item.subItems &&
                          location.pathname.startsWith(item.path + "/"))
                        ? "bg-emerald-50 text-[#636d1e] shadow-sm ring-1 ring-emerald-100"
                        : "text-gray-700 hover:bg-gray-100/80",
                      !isExpanded && "justify-center"
                    )}
                    onClick={(e) => {
                      if (item.subItems && isExpanded) {
                        e.preventDefault();
                        toggleExpand(item.path);
                      } else if (
                        item.subItems &&
                        (isMobile || isTablet) &&
                        !isExpanded
                      ) {
                        e.preventDefault();
                        memoizedToggleSidebar(true);
                        setTimeout(() => toggleExpand(item.path), 300);
                      }
                      if (
                        !item.subItems &&
                        (isMobile || isTablet) &&
                        isExpanded
                      ) {
                        memoizedToggleSidebar(false);
                      }
                    }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <item.icon
                        className={cn(
                          "h-4 w-4 sm:h-4.5 sm:w-4.5 transition-colors",
                          location.pathname === item.path ||
                            (item.subItems &&
                              location.pathname.startsWith(item.path + "/"))
                            ? "text-[#636d1e]"
                            : "text-gray-500 group-hover:text-gray-700"
                        )}
                      />
                      {isExpanded && (
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      )}
                    </div>
                    {item.subItems && isExpanded && (
                      <motion.div
                        animate={{
                          rotate: expandedItems.includes(item.path) ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              )}

              <AnimatePresence>
                {item.subItems &&
                  isExpanded &&
                  expandedItems.includes(item.path) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className={cn(
                        "space-y-0.5 sm:space-y-1 overflow-hidden",
                        isExpanded ? "ml-4 mt-1" : "mt-1"
                      )}
                    >
                      {item.subItems.map((subItem) => (
                        <motion.div
                          key={subItem.path}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -10, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            to={subItem.path}
                            className={cn(
                              "flex items-center gap-2 sm:gap-3 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2.5 text-xs sm:text-sm transition-all",
                              location.pathname === subItem.path
                                ? "naturopura-text bg-emerald-50/80 shadow-sm ring-1 ring-emerald-100"
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            )}
                            onClick={() =>
                              (isMobile || isTablet) &&
                              memoizedToggleSidebar(false)
                            }
                          >
                            <subItem.icon className="h-3.5 w-3.5 sm:h-4 w-4" />
                            <span>{subItem.title}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* User Profile and Logout */}
        <motion.div
          className={cn(
            "border-t border-gray-100 bg-white/50",
            !isExpanded && "w-full"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isExpanded ? (
            <Link
              to="/farmer/profile"
              className={cn(
                "flex items-center gap-2 sm:gap-3 p-3 sm:p-4 transition-colors hover:bg-gray-50/80",
                location.pathname === "/farmer/profile"
                  ? "bg-emerald-50/80 shadow-sm ring-1 ring-emerald-100"
                  : "hover:bg-gray-50/80"
              )}
              onClick={() =>
                (isMobile || isTablet) && memoizedToggleSidebar(false)
              }
            >
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-emerald-100 shadow-sm">
                <AvatarFallback className="bg-naturopura-gradient text-white">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 w-4 text-gray-400" />
            </Link>
          ) : (
            <Avatar
              className="h-9 w-9 sm:h-10 sm:w-10 border-2 border-emerald-100 shadow-sm my-3 sm:my-4 cursor-pointer hover:ring-2 hover:ring-emerald-200 transition-all"
              onClick={() => navigate("/farmer/profile")}
            >
              <AvatarFallback className="bg-emerald-50 text-emerald-600 text-sm sm:text-base font-medium">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          )}

          <div
            className={cn(
              "px-3 pb-3 sm:px-4 sm:pb-4",
              !isExpanded && "flex justify-center"
            )}
          >
            <Button
              variant="ghost"
              className={cn(
                "text-gray-600 hover:text-red-600 hover:bg-red-50/80 transition-colors",
                isExpanded
                  ? "w-full justify-start gap-2 text-sm"
                  : "w-9 h-9 p-0"
              )}
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              {isExpanded && <span>Logout</span>}
            </Button>
          </div>
        </motion.div>
      </motion.aside>
      <WarningDialog
        isOpen={isLogoutDialogOpen}
        message="Are you sure you want to logout?"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
};

export default FarmerSidebar;
