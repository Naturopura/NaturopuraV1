import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Check, Loader2, Download,X } from "lucide-react";
import { Label } from "../ui/label";
import FarmerLayout from "../layouts/FarmerLayout";
import { switchToNetwork, getContractInstance } from "../../constants/network";

const FarmerProfile = () => {
  const { user } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [showFetchSuccess, setShowFetchSuccess] = useState(false);
  const [showFetchError, setShowFetchError] = useState(false);
  const [blockchainData, setBlockchainData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Automatically fetch blockchain data on component mount
  useEffect(() => {
    handleFetchFromBlockchain();
  }, []); // The empty dependency array ensures this runs only once

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

  return (
    <motion.div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Success Message */}
      <AnimatePresence>
        {showFetchSuccess && (
          <motion.div
            className="flex items-center gap-3 rounded-lg bg-emerald-50 p-3 sm:p-4 text-emerald-800 border border-emerald-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Check className="h-5 w-5 text-emerald-500" />
            <p className="font-medium text-sm sm:text-base">
              Profile successfully fetched from blockchain!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {showFetchError && (
          <motion.div
            className="flex items-center gap-3 rounded-lg bg-red-50 p-3 sm:p-4 text-red-800 border border-red-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <X className="h-5 w-5 text-red-500" />
            <p className="font-medium text-sm sm:text-base">
              Failed to fetch profile from blockchain. Please try again.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-4 border-emerald-100">
            <AvatarFallback className="bg-naturopura-gradient text-white">
              {user?.name?.charAt(0) || "F"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {user?.name}
            </h1>
            <p className="text-sm naturopura-text">Farmer</p>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <Card className="overflow-hidden border-t-4 border-t-[#636d1e]">
        <CardHeader>
          <CardTitle className="text-xl">Profile Information</CardTitle>
          <CardDescription>Your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  value={user?.name || ""}
                  disabled
                  className="pl-10 bg-gray-50"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  value={user?.email || ""}
                  disabled
                  className="pl-10 bg-gray-50"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  value={user?.phoneNumber || ""}
                  disabled
                  className="pl-10 bg-gray-50"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Actions */}
      <div className="flex flex-wrap gap-4 justify-end mt-6">
        <Button
          className="bg-naturopura-gradient text-white"
          onClick={handleFetchFromBlockchain}
          disabled={isFetching}
          variant="outline"
        >
          {isFetching ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Fetching...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Fetch from Blockchain
            </>
          )}
        </Button>
      </div>

      {blockchainData.name && (
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-xl shadow-md border border-emerald-200 bg-naturopura-gradient p-6 sm:p-8 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Check className="w-5 h-5 text-white" />
                Blockchain Profile
              </h2>
              <span className="px-2 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-md">
                On-Chain Data
              </span>
            </div>

            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                <span className="font-medium text-gray-600 dark:text-gray-200">
                  Name:
                </span>
                <span className="text-gray-800 dark:text-white">
                  {blockchainData.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                <span className="font-medium text-gray-600 dark:text-gray-200">
                  Email:
                </span>
                <span className="text-gray-800 dark:text-white">
                  {blockchainData.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                <span className="font-medium text-gray-600 dark:text-gray-200">
                  Phone:
                </span>
                <span className="text-gray-800 dark:text-white">
                  {blockchainData.phone}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const WrappedFarmerProfile = () => (
  <FarmerLayout
    title="My Profile"
    subtitle="View your personal information and blockchain data"
  >
    <FarmerProfile />
  </FarmerLayout>
);

export default WrappedFarmerProfile;