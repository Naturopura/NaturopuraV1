"use client";

import React, { useEffect } from "react";
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'; 
import Login from "@/app/action/loginAuthAction";
import Link from "next/link";
import toast from "react-hot-toast";
import img1 from "@/assets/Group-230.png";
import { useAppDispatch } from "@/store";
import Image from "next/image";
import { BrowserProvider } from "ethers"; // Import BrowserProvider from ethers.js

const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const { address, isConnected } = useAccount(); // Get the connected wallet address
  const message = "you are signing this message to log in to naturopura";

  useEffect(() => {
    if (address) {
      signMessage(); // Sign the message once the wallet is connected
    }
  }, [address]);

  const signMessage = async () => {
    if (window.ethereum && isConnected) {
      try {
        const provider = new BrowserProvider(window.ethereum); // Create a Web3 provider
        const signer = await provider.getSigner(); // Get the signer (connected wallet)
        const signature = await signer.signMessage(message); // Sign the message
        console.log("Signature:", signature);
        // Dispatch the signature and wallet address to the backend
        console.log("response sent");
        dispatch(Login({ key: address, signature }));
        console.log("response received");
      } catch (error) {
        console.error("Error signing message:", error);
        toast.error("Failed to sign the message.");
      }
    } else {
      toast.error("Please connect your wallet first.");
    }
  };

  return (
    <div className="">
      <main className="main flex items-center flex-col">
        <Image
          src={img1}
          height={"100"}
          width={"200"}
          alt=""
          className="m-4"
        />
        <button
          type="button"
          className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mt-4"
        >
          <Link href={"/signup"}> <b>Signup</b> </Link>
        </button>
        <div className="mt-2">
          <ConnectButton label="Sign in with wallet" />
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
