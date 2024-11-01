"use client";

import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import img2 from "@/assets/logo 1.png";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import axios from "axios";
import { BrowserProvider } from "ethers";

const Navbar = () => {
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
      const response = await axios.post("http://localhost:3000/auth/signin", {
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

  return (
    <nav className="bg-white border-b-2 border-gray-200 px-[250px] py-3 z-50 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src={img2}
            className="ml-[-20px]"
            width={200}
            height={200}
            alt=""
          />
        </Link>
        {/* Left Side - Search Input */}
        <div className="relative w-full md:w-60 mr-4">
          <input
            type="search"
            placeholder="Search for products"
            className="pl-4 pr-10 py-2 w-full border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" />
          </div>
        </div>
        {/* Right Side - Logo/Brand */}
        <div className="relative w-full md:w-60 mt-[2px] mr-4">
          <ConnectButton label="Sign in with wallet" />
        </div>

        <div className="mt-2">
          <Link href={"/cart"}>
            <ShoppingCart />
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
