"use client";

import Link from "next/link";
import { Search, ShoppingCart, UserCircleIcon } from "lucide-react";
import Image from "next/image";
import img2 from "@/assets/logo 1.png";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import axios from "axios";
import { BrowserProvider } from "ethers";
import { useAppSelector } from "@/store";

const Navbar = () => {
  const { cartItems } = useAppSelector((state) => state.rootReducer.cart);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const { address, isConnected } = useAccount();
  const [nonce, setNonce] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (address) {
      const walletAddress = address.toLocaleLowerCase() || "";
      sendAddress(walletAddress);
    }
  }, [address]);

  useEffect(() => {
    if (nonce) {
      signMessage();
    }
  }, [nonce]);

  const sendAddress = async (walletAddress: string | "") => {
    try {
      console.log("sendAddress called");
      const response = await axios.post("http://localhost:4000/auth/signin", {
        walletAddress,
      });
      const nonce = response.data.data.nonce;
      console.log("Nonce received:", nonce);
      setNonce(nonce); // Set the nonce state
      setMessage(`Please sign this message to authenticate: ${nonce}`); // Set the message to be signed
    } catch (error) {
      console.error("Error sending address:", error);
      // toast.error("Failed to retrieve nonce.");
    }
  };

  const signMessage = async () => {
    if (window.ethereum && isConnected && message) {
      try {
        console.log("signMessage called");
        const provider = new BrowserProvider(window.ethereum); // Create a Web3 provider
        const signer = await provider.getSigner(); // Get the signer (connected wallet)
        const signature = await signer.signMessage(message); // Sign the message
        console.log("Signature:", signature);
        const walletAddress = address;
        console.log("request sent");
        const response = await axios.post("http://localhost:3000/auth/signin", {
          walletAddress,
          nonce,
          signature,
        });
        console.log("response received", response);
        toast.success("SignIn successful");
      } catch (error) {
        console.error("Error signing message:", error);
        toast.error("Failed to sign the message.");
      }
    } else {
      toast.error("Please connect your wallet first.");
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-100 border-b-2 border-gray-200 px-[15.63rem] py-3 z-50 top-0 w-full">
      <div className="container mx-auto flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={img2}
            className="ml-[-20px]"
            width={200}
            height={200}
            alt="Logo"
          />
        </Link>

        {/* Search Input */}
        <div className="relative w-full max-w-xs">
          <input
            type="search"
            placeholder="Search for products"
            className="pl-4 pr-10 py-2 w-full border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" />
          </div>
        </div>

        {/* Connect Button */}
        <div className="flex-shrink-0">
          <ConnectButton label="Sign in with wallet" />
        </div>

        {/* Cart Section */}
        <div className="relative flex items-center">
          <Link href={"/cart"} className="flex items-center">
            <ShoppingCart className="h-10 w-10" />
            <span className="ml-2 text-2xl">Cart</span>
          </Link>
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-[-10px] bg-red-500 text-white rounded-full text-sm w-5 h-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <UserCircleIcon
            className="h-10 w-10 cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border z-50 border-gray-200 rounded-lg shadow-lg">
              <ul className="text-sm text-gray-700">
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-xl hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    className="block px-4 py-2 text-xl hover:bg-gray-100"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-xl hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
