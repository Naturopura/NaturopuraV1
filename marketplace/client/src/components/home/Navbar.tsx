import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  X,
  ChevronRight,
  Mail,
  Phone,
  Shield,
  CreditCard,
  Loader2,
  Check,
  AlertCircle,
  ShoppingBag,
  Edit,
  Menu,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { switchToNetwork, getContractInstance } from "../../constants/network";
import WarningDialog from "../ui/WarningDialog";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [blockchainData, setBlockchainData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showFetchSuccess, setShowFetchSuccess] = useState(false);
  const [showFetchError, setShowFetchError] = useState(false);
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);

  // Automatically fetch blockchain data when profile opens
  useEffect(() => {
    if (isProfileOpen && user && !blockchainData.name) {
      handleFetchFromBlockchain();
    }
  }, [isProfileOpen, user]);

  const handleFetchFromBlockchain = async () => {
    setIsFetching(true);
    setShowFetchError(false);
    try {
      if (!window.ethereum) throw new Error("MetaMask not available");

      await switchToNetwork("amoy");
      const contract = await getContractInstance("amoy");

      const [name, email, phone] = await contract.getMyDetails();
      setBlockchainData({ name, email, phone });
      setShowFetchSuccess(true);
      setTimeout(() => setShowFetchSuccess(false), 3000);
    } catch (err) {
      console.error("Error fetching from blockchain:", err);
      setShowFetchError(true);
      setTimeout(() => setShowFetchError(false), 3000);
    } finally {
      setIsFetching(false);
    }
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileOpen(false);
  };

  const closeAllMenus = () => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  const profileMenuItems = [
    { icon: ShoppingBag, label: "My Orders", href: "/marketplace/my-orders" },
    {
      icon: CreditCard,
      label: "Pricing Info",
      href: "/marketplace/pricing-info",
    },
    {
      icon: Edit,
      label: "Manage Your Business",
      href: "/marketplace/management",
    },
    { icon: ShoppingBag, label: "Your Cart", href: "/marketplace/cart" },
  ];

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/#categories-section" },
    { label: "Explore Now", href: "/marketplace/buy-sell" },
  ];

  // Use real user data or fallback to defaults
  const displayName = user?.name || "User";
  const displayEmail = user?.email || "user@example.com";
  const displayPhone = user?.phoneNumber || "+1 (555) 123-4567";
  const userRole = "Farmer";

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="/assets/nat.png" // <-- absolute path from public folder
                alt="Logo"
                className="h-8 sm:h-10 w-auto max-w-[120px] sm:max-w-[200px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <span
                  key={item.label}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default navigation
                    if (item.label === "Categories") {
                      const section =
                        document.getElementById("categories-section");
                      if (section)
                        section.scrollIntoView({ behavior: "smooth" });
                    } else {
                      navigate(item.href);
                    }
                    closeAllMenus();
                  }}
                  className="cursor-pointer text-gray-700 hover:text-[#b0c632] transition-colors font-medium text-sm xl:text-base"
                >
                  {item.label}
                </span>
              ))}
            </div>

            {/* Desktop Profile & Mobile Menu Button */}
            <div className="flex items-center space-x-3">
              {/* Desktop Profile Button */}
              {!loading && user && (
                <button
                  onClick={toggleProfile}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[#8DA63F] via-[#707e22] to-[#666e21] rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {displayName.charAt(0)}
                  </div>
                  <span className="hidden lg:block text-gray-700 font-medium text-sm">
                    {displayName.split(" ")[0]}
                  </span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              {/* Mobile Profile Button */}
              {!loading && user && (
                <button
                  onClick={toggleProfile}
                  className="sm:hidden p-1 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[#8DA63F] via-[#707e22] to-[#666e21] rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {displayName.charAt(0)}
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-gray-200 bg-white overflow-hidden"
            >
              <div className="px-4 py-3 space-y-2">
                {navigationItems.map((item) => (
                  <span
                    key={item.label}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.label === "Categories") {
                        const section =
                          document.getElementById("categories-section");
                        if (section)
                          section.scrollIntoView({ behavior: "smooth" });
                      } else {
                        navigate(item.href);
                      }
                      closeAllMenus();
                    }}
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors font-medium"
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Overlay */}
      <AnimatePresence>
        {(isProfileOpen || isMobileMenuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAllMenus}
            className="fixed inset-0  bg-opacity-10 z-[60] backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      {/* Profile Sidebar */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-80 lg:w-96 bg-white shadow-2xl z-[70] overflow-y-auto border-l border-gray-100"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white backdrop-blur-sm border-b border-gray-100 p-4 sm:p-6 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Profile
              </h2>
              <button
                onClick={closeAllMenus}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Success/Error Messages */}
            <div className="p-4">
              <AnimatePresence>
                {showFetchSuccess && (
                  <motion.div
                    className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-700 border border-green-200 mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Check className="h-4 w-4" />
                    <p className="text-sm font-medium">
                      Blockchain data updated!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showFetchError && (
                  <motion.div
                    className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-700 border border-red-200 mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <AlertCircle className="h-4 w-4" />
                    <p className="text-sm font-medium">
                      Failed to fetch blockchain data
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Info */}
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#8DA63F] via-[#707e22] to-[#666e21] rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                  {displayName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                    {displayName}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-lg inline-block">
                    {userRole}
                  </p>
                  {isFetching && (
                    <div className="flex items-center gap-1 mt-1">
                      <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                      <span className="text-xs text-gray-500">Syncing...</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">
                    {blockchainData.email || displayEmail}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">
                    {blockchainData.phone || displayPhone}
                  </span>
                </div>
              </div>

              {/* Blockchain Data Indicator */}
              {blockchainData.name && (
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 font-medium">
                    Blockchain Verified
                  </span>
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="p-4">
              <div className="space-y-1">
                {profileMenuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={closeAllMenus}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-[#b0c632] flex-shrink-0" />
                    <span className="flex-1 text-gray-700 group-hover:text-[#b0c632] font-medium text-sm sm:text-base">
                      {item.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 flex-shrink-0" />
                  </Link>
                ))}
              </div>

              {/* Refresh Blockchain Data Button */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={handleFetchFromBlockchain}
                  disabled={isFetching}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 font-medium disabled:opacity-50 border border-gray-200 text-sm sm:text-base"
                >
                  {isFetching ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Syncing...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      <span>Sync Blockchain Data</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-100 mt-auto">
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  setShowLogoutWarning(true);
                }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group w-full text-left"
              >
                <LogOut className="w-5 h-5 text-gray-400 group-hover:text-[#b0c632] flex-shrink-0" />
                <span className="flex-1 text-gray-700 group-hover:text-[#b0c632] font-medium text-sm sm:text-base">
                  Sign Out
                </span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="p-4 bg-gray-50 m-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                Account Status
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 font-medium">Profile</p>
                  <p className="text-gray-800 font-bold">
                    {blockchainData.name ? "Verified" : "Pending"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Data Source</p>
                  <p className="text-gray-800 font-bold">
                    {blockchainData.name ? "Blockchain" : "Local"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Warning Dialog */}
      <WarningDialog
        isOpen={showLogoutWarning}
        message="Are you sure you want to sign out? You will need to log in again to access your account."
        onConfirm={() => {
          logout();
          setShowLogoutWarning(false);
          navigate("/marketplace/login");
        }}
        onCancel={() => {
          setShowLogoutWarning(false);
        }}
      />
    </>
  );
};

export default Navbar;
