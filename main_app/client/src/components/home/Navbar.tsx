import  { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  User,
  UserPlus,
  Truck,
  Store,
  Sprout,
} from "lucide-react";

const Navbar = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const registerOptions = [
    {
      to: "/register",
      icon: <Sprout className="w-5 h-5" />,
      title: "Register as Farmer",
      description: "Join as a farmer to sell your produce",
      color: "text-green-600",
    },
    {
      to: "/store-manager/register",
      icon: <Store className="w-5 h-5" />,
      title: "Store Manager",
      description: "Manage retail operations",
      color: "text-purple-600",
    },
    {
      to: "/delivery-partner/register",
      icon: <Truck className="w-5 h-5" />,
      title: "Delivery Partner",
      description: "Join our delivery network",
      color: "text-blue-600",
    },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/30 shadow-lg"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-naturopura-gradient">
                <img
                  src="/nat.svg"
                  alt="Logo"
                  className="h-full max-h-12 w-auto object-contain"
                />
              </span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-gray-700 hover:text-[#636d1e] font-medium rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Link>
            </motion.div>

            {/* Register Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsRegisterOpen(!isRegisterOpen)}
                className="flex items-center px-4 py-2 bg-naturopura-gradient text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:bg-naturopura-gradient"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register
                <ChevronDown
                  className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                    isRegisterOpen ? "rotate-180" : ""
                  }`}
                />
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isRegisterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 overflow-hidden"
                    onMouseLeave={() => setIsRegisterOpen(false)}
                  >
                    <div className="p-2">
                      {registerOptions.map((option, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02, x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            to={option.to}
                            className="flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-all duration-200 group"
                            onClick={() => setIsRegisterOpen(false)}
                          >
                            <div
                              className={`${option.color} group-hover:scale-110 transition-transform duration-200`}
                            >
                              {option.icon}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">
                                {option.title}
                              </div>
                              <div className="text-xs text-gray-600 group-hover:text-gray-700">
                                {option.description}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
