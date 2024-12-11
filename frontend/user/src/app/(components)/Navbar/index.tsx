"use client";

import Link from "next/link";
import { Search, ShoppingCart, UserCircleIcon } from "lucide-react";
import Image from "next/image";
import img2 from "@/assets/logo 1.png";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import axios from "axios";
import { BrowserProvider } from "ethers";
import { useAppSelector } from "@/store";
import { AiOutlineShoppingCart } from "react-icons/ai";

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

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main>
      <nav className="flex justify-between px-8 bg-gray-200 items-center py-2">
        <div className="flex items-center gap-8">
          <section className="flex items-center gap-4">
            {/* logo */}
            <Link href={"/"} className="text-4xl font-mono">
              <Image
                src={img2}
                className=""
                width={1200}
                height={1200}
                alt="Logo"
              />
            </Link>
          </section>

          <div className="relative flex items-center w-[500%]">
            <input
              type="search"
              placeholder="Search for products..."
              className="pl-4 pr-10 py-2 w-full border-2 border-gray-400 bg-white rounded-lg focus:outline-none"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <Search className="text-gray-400" />
            </div>
          </div>

          <div className="flex-shrink-0">
            <ConnectButton label="Sign in with wallet" />
          </div>
        </div>

        {/* sidebar mobile menu */}

        {/* last section */}
        <section className="flex items-center gap-14 mx-10">
          {/* cart icon */}
          <Link href={"/cart"}>
            <AiOutlineShoppingCart className="text-3xl" />
          </Link>
          {totalQuantity > 0 && (
            <span className="absolute top-3 ml-5 bg-red-500 text-white rounded-full text-sm w-5 h-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}

          <UserCircleIcon
            width={40}
            height={40}
            className="h-8 w-8 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-48 mr-20 w-48 bg-white border z-50 border-gray-200 rounded-lg shadow-lg"
            >
              <ul className="text-sm text-gray-700">
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-xl hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    className="block px-4 py-2 text-xl hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-xl hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Orders
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {/* avatar img */}
        </section>
      </nav>
    </main>
  );
};

export default Navbar;
