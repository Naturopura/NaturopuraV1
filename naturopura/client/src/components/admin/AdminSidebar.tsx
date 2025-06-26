import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard, Users, CreditCard, Settings, LogOut, Tractor, Sprout, Store,
  FileText, HelpCircle, ChevronLeft, User, Bell, Lock, Globe, Database, Mail, X, Leaf
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";
import { useSidebar } from "../../context/SidebarContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface SubMenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path?: string;
  submenu?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { title: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
  { title: "Farmers", icon: Users, path: "/admin/farmers" },
  {
    title: "Financial", icon: CreditCard, submenu: [
      { title: "Loans", icon: CreditCard, path: "/admin/loans" },
      { title: "Subsidies", icon: CreditCard, path: "/admin/subsidies" },
      { title: "Insurance", icon: CreditCard, path: "/admin/insurance" },
    ],
  },
  { title: "Purchases", icon: CreditCard, path: "/admin/purchases" },
  { title: "Feedback", icon: User, path: "/admin/feedback" },
  {
    title: "Farm Management", icon: Tractor, submenu: [
      { title: "Crops", icon: Sprout, path: "/admin/crops" },
      { title: "Equipment", icon: Tractor, path: "/admin/equipment" },
      { title: "Drone Schedules", icon: Database, path: "/admin/drone/schedules" },
    ],
  },
  { title: "Marketplace", icon: Store, path: "/admin/marketplace" },
  { title: "Documents", icon: FileText, path: "/admin/documents" },
  { title: "Support", icon: HelpCircle, path: "/admin/support" },
  {
    title: "Settings", icon: Settings, submenu: [
      { title: "General", icon: Globe, path: "/admin/settings/general" },
      { title: "Security", icon: Lock, path: "/admin/settings/security" },
      { title: "Notifications", icon: Bell, path: "/admin/settings/notifications" },
      { title: "Database", icon: Database, path: "/admin/settings/database" },
      { title: "Email", icon: Mail, path: "/admin/settings/email" },
    ],
  },
  { title: "Delivery Partners", icon: Users, path: "/admin/delivery-partners" },
  { title: "Store Managers", icon: Users, path: "/admin/store-managers" },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isExpanded, toggleSidebar } = useSidebar();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const isMobile = useMediaQuery("(max-width: 639px)");
  const isDesktopOrTablet = useMediaQuery("(min-width: 640px)");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const menuToExpand = menuItems
      .filter((item) => item.submenu?.some((subItem) => currentPath.startsWith(subItem.path)))
      .map((item) => item.title);

    if (menuToExpand.length > 0) {
      setExpandedMenus((prev) => [...new Set([...prev, ...menuToExpand])]);
    }

    // This is the key change: only close sidebar on mobile if it's currently open
    // and when the screen *becomes* mobile or if a link is clicked on mobile.
    // We'll manage initial mobile state and link clicks separately.
    if (isMobile) {
      toggleSidebar(false); // Ensure sidebar is closed on mobile by default or when resized to mobile
    } else {
      // If resizing from mobile to desktop/tablet, ensure it's expanded by default on larger screens
      toggleSidebar(true);
    }

  }, [location.pathname, isMobile, toggleSidebar]);

  // Initial setup for sidebar state based on screen size when component mounts
  useEffect(() => {
    if (isMobile) {
      toggleSidebar(false);
    } else {
      toggleSidebar(true); // Default to expanded on desktop/tablet
    }
  }, []); // Run only once on mount

  const toggleSubmenu = (title: string) => {
    setExpandedMenus((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  const isMenuActive = (item: MenuItem): boolean => {
    if (item.path) return location.pathname.startsWith(item.path);
    if (item.submenu) return item.submenu.some((sub) => location.pathname.startsWith(sub.path));
    return false;
  };

  const submenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn("sidebar-overlay", isExpanded && isMobile && "visible")}
        onClick={() => toggleSidebar(false)}
      />

      <motion.div
        id="admin-sidebar"
        initial={false}
        animate={{
          x: isMobile && !isExpanded ? "-100%" : 0,
          width: isMobile ? (isExpanded ? "80%" : "80%") : (isExpanded ? "16rem" : "4rem"),
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed inset-y-0 left-0 z-40",
          "border-r border-gray-200 bg-white h-screen flex flex-col shadow-sm",
          isDesktopOrTablet && !isExpanded && "items-center"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 flex-shrink-0">
          <Link to="/admin/dashboard" className="flex items-center h-full overflow-hidden">
            {(isExpanded || isDesktopOrTablet) ? (
              <img src="/nat.svg" alt="Logo" className="h-full max-h-12 w-auto object-contain" />
            ) : (
              <Leaf className="h-6 w-6 text-green-600" />
            )}
          </Link>
          <AnimatePresence>
            {isExpanded && (
              <motion.button
                initial={{ opacity: 0, rotate: 180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
                onClick={() => toggleSidebar(false)}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMobile ? <X className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 flex flex-col gap-1 p-3 mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {menuItems.map((item) => {
            const isActive = isMenuActive(item);
            const isSubmenuOpen = expandedMenus.includes(item.title);

            return (
              <div key={item.title} className="mb-0.5">
                <Link
                  to={item.path || "#"}
                  onClick={(e) => {
                    if (item.submenu) {
                      e.preventDefault();
                      if (isExpanded) {
                        toggleSubmenu(item.title);
                      } else {
                        if (isDesktopOrTablet) {
                          toggleSidebar(true);
                          setTimeout(() => toggleSubmenu(item.title), 300);
                        } else {
                          toggleSubmenu(item.title);
                        }
                      }
                    } else if (isMobile && isExpanded) {
                      toggleSidebar(false);
                    }
                  }}
                >
                  <motion.div
                    whileHover={{ x: isExpanded && isDesktopOrTablet ? 2 : 0 }}
                    className={cn(
                      "flex items-center px-3 py-2.5 rounded-lg transition-all cursor-pointer",
                      isActive ? "bg-green-100 text-green-700 font-medium" : "text-gray-700 hover:bg-gray-100",
                      isDesktopOrTablet && !isExpanded && "justify-center"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 flex-shrink-0", isExpanded && "mr-3")} />
                    {isExpanded && <span>{item.title}</span>}
                  </motion.div>
                </Link>

                <AnimatePresence initial={false}>
                  {item.submenu && isSubmenuOpen && isExpanded && (
                    <motion.div
                      variants={submenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="pl-8"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          to={subItem.path}
                          key={subItem.title}
                          onClick={() => { if (isMobile) toggleSidebar(false); }}
                        >
                          <div
                            className={cn(
                              "flex items-center gap-2 py-2 text-sm transition-all rounded-md px-2",
                              location.pathname.startsWith(subItem.path)
                                ? "bg-green-50 text-green-700 font-medium"
                                : "text-gray-600 hover:bg-gray-100"
                            )}
                          >
                            <subItem.icon className="h-4 w-4" />
                            <span>{subItem.title}</span>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-2 px-3 py-2 w-full rounded-md text-red-600 hover:bg-red-50 transition",
              isDesktopOrTablet && !isExpanded && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5" />
            {isExpanded && <span>Logout</span>}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default AdminSidebar;