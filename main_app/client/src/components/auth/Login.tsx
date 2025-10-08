import React, { useState } from "react";
import {
  LucideEye,
  LucideEyeOff,
  LucideMail,
  LucideLock,
  LucideLoader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createApiClient, ENDPOINTS, handleApiError } from "../../config/api";
import LoginButton from "./LoginButton";
import { switchToNetwork, getContractInstance, getActiveNetwork } from "../../constants/network";

// Save profile to blockchain
const saveProfileToBlockchain = async (user: any) => {
  try {
    console.log("Preparing to save to blockchain. User:", user);

    if (!window.ethereum) {
      console.warn("MetaMask not installed");
      return;
    }

    const name = user?.name?.trim();
    const email = user?.email?.trim();
    const phone =
      user?.phoneNumber?.trim() || user?.phone?.trim() || "";

    if (!name || !email || !phone) {
      console.error("Missing required user data:", { name, email, phone });
      alert("Profile incomplete: Name, email, and phone are required.");
      return;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });

    await switchToNetwork("amoy");
    const active = await getActiveNetwork();
    console.log("Active chain:", active?.name);

    const contract = await getContractInstance("amoy");
    console.log("Contract address:", contract.target);

    console.log("Sending transaction with:", { name, email, phone });
    const tx = await contract.setFarmer(name, email, phone);
    console.log("Tx sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("Tx confirmed:", receipt.transactionHash);

    alert("Profile saved to blockchain successfully!");
  } catch (err) {
    console.error("Blockchain save failed:", err);
    alert("Failed to save profile to blockchain. Check console for details.");
  }
};
function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiClient = createApiClient();
      const response = await apiClient.post(ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Invalid response format from server");
      }

      // Ensure phoneNumber exists
      if (!user.phoneNumber && !user.phone) {
        throw new Error("Phone number missing from backend response");
      }

      login(user, token);

      // Save to blockchain if farmer and not already saved
      if (user.role === "farmer") {
        // Check if profile has already been saved to blockchain for this specific user
        const userSpecificKey = `blockchainProfileSaved_${user._id}`;
        const isAlreadySaved = localStorage.getItem(userSpecificKey) === 'true';
        
        if (!isAlreadySaved) {
          await saveProfileToBlockchain(user);
          localStorage.setItem(userSpecificKey, 'true');
        }
      }

      // Navigation logic
      if (user.kyc?.status === "verified") {
        if (user.role === "admin") navigate("/admin/dashboard");
        else if (user.role === "farmer") navigate("/farmer/dashboard");
        else if (user.role === "delivery_partner") navigate("/delivery-partner/dashboard");
        else if (user.role === "store_manager") navigate("/store_manager/dashboard");
        else if (user.role === "vendor") navigate("/vendor/dashboard");
        else navigate("/");
      } else {
        navigate("/farmer/ekyc");
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error("Login error:", { message: errorMessage, error });
      if (errorMessage.toLowerCase().includes("invalid credentials")) {
        setError("Invalid credentials");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-screen relative z-10">
        {/* Left side - Decorative */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-12">
          <motion.div
            className="text-center max-w-lg space-y-8"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <>
              <img src="/nat.svg" alt="Naturopura Logo" className="w-50 h-16 mx-auto mb-4" />
              <motion.h1
                className="text-6xl font-bold mb-4 text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-naturopura-gradient">
                  Welcome to Naturopura
                </span>
              </motion.h1>
            </>
            <motion.p
              className="text-xl text-gray-600 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Secure, elegant, and powerful. Manage your farm operations
              efficiently with our platform.
            </motion.p>
          </motion.div>
        </div>

        {/* Right side - Login form */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <motion.div
            className="w-full max-w-lg bg-white/60 backdrop-blur-md p-10 rounded-3xl border border-white/50 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2">
                <span className="text-naturopura-gradient">
                  Welcome back
                </span>
              </h2>
              <p className="text-gray-600 text-xl">
                Please sign in to your account
              </p>
            </div>

            {error && (
              <div className="mb-6 font-semibold p-4 rounded-2xl border border-red-200/50 text-red-600 bg-red-100/60 backdrop-blur-md">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-gray-700 text-sm font-semibold"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-naturopura-gradient">
                      <LucideMail className="h-4 w-4" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 py-2 text-lg w-full bg-transparent border border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-300/50 transition-all duration-200 text-gray-700 placeholder-gray-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-gray-700 text-sm font-semibold"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-naturopura-gradient transition-colors duration-200"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-naturopura-gradient">
                      <LucideLock className="h-4 w-4" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 py-2 text-lg w-full bg-transparent border border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-300/50 transition-all duration-200 text-gray-700 placeholder-gray-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <LucideEyeOff className="h-4 w-4" />
                      ) : (
                        <LucideEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-naturopura-gradient text-white py-4 font-semibold transition-all duration-300 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white/60 px-2 text-gray-600">
                    New to the platform?
                  </span>
                </div>
              </div>

              <div className="text-center text-gray-600 text-sm">
                <a
                  href="/register"
                  className="text-naturopura-gradient font-semibold hover:underline transition-all duration-200"
                >
                  Create an account
                </a>
              </div>
            </form>

            <div className="mt-6 flex flex-col items-center space-y-4">
              <LoginButton />
            </div>

            <div className="pt-4 text-center text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <a href="#terms" className="text-blue-600 hover:text-blue-700">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#privacy" className="text-blue-600 hover:text-blue-700">
                Privacy Policy
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;