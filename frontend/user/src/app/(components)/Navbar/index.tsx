"use client";

import Link from "next/link";
import Image from "next/image";
import Naturopura from "@/assets/logo 1.png";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import axios from "axios";
import { BrowserProvider } from "ethers";
import { useAppSelector } from "@/store";
import {
  FiShoppingCart,
  FiUser,
  FiHeart,
  FiBox,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";

const Navbar = () => {
  const { cartItems } = useAppSelector((state) => state.rootReducer.cart);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const { address, isConnected } = useAccount();
  const [nonce, setNonce] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

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
      console.log("Response:", response);

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
        const response = await axios.post("http://localhost:4000/auth/signin", {
          walletAddress,
          nonce,
          signature,
        });
        console.log("response received", response);
        toast.success("SignIn successful");
        console.log("JWT Token", response.data.data.token);
        localStorage.setItem("accessToken", response.data.data.token);
      } catch (error) {
        console.error("Error signing message:", error);
        toast.error("Failed to sign the message.");
      }
    } else {
      toast.error("Please connect your wallet first.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("#user-dropdown")) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent closing due to document click
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md fixed top-0 left-0 w-full z-50 transition-all">
      {/* Left Section: Logo */}
      <div className="flex items-center space-x-2">
        <Link href={"/"}>
          <Image src={Naturopura} alt="Logo" width={180} height={180} />
        </Link>
      </div>

      {/* Center Section: Navigation */}
      <nav className="flex space-x-6 text-gray-700 font-medium">
        {["Home", "Services", "Forum", "Contact us"].map((item) => (
          <Link
            key={item}
            href={
              item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`
            }
            className="hover:text-gray-500 hover:underline"
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* Right Section: Cart, Wallet Button, and User Icon */}
      <div className="flex items-center space-x-4">
        {/* Cart Icon */}
        <Link href={"/cart"} aria-label="Cart" className="relative">
          <FiShoppingCart className="text-2xl text-gray-700 hover:text-gray-400" />
          {totalQuantity > 0 && (
            <span className="absolute bottom-4 left-4 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {totalQuantity}
            </span>
          )}
        </Link>

        {isConnected ? (
          // Show the user icon if the wallet is connected
          <div id="user-dropdown" className="relative">
            <button
              aria-label="User Profile"
              onClick={toggleDropdown}
              className="relative"
            >
              <FiUser className="text-2xl text-gray-700 mt-2 hover:text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-48  bg-white border border-gray-200 shadow-lg rounded-lg transition-all duration-300 ${
                dropdownVisible
                  ? "opacity-100 transform scale-100"
                  : "opacity-0 transform scale-95 pointer-events-none"
              }`}
            >
              {[
                { name: "Wishlist", path: "/wishlist", icon: <FiHeart /> },
                { name: "Orders", path: "/orders", icon: <FiBox /> },
                { name: "Settings", path: "/settings", icon: <FiSettings /> },
                { name: "Disconnect", path: "#", icon: <FiLogOut /> },
              ].map(({ name, path, icon }) => (
                <Link
                  key={name}
                  href={path}
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  <span className="mr-2">{icon}</span>
                  {name}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          // Show Connect Wallet button if not connected
          <ConnectButton />
        )}
      </div>
    </header>
  );
};

export default Navbar;
