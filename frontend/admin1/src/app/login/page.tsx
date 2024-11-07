"use client";
<<<<<<< HEAD
import axios from 'axios';
import React, { useEffect, useState } from "react";
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Login from "@/app/action/loginAuthAction";
import Link from "next/link";
import toast from "react-hot-toast";
import img1 from "@/assets/Group-230.png"
// import { useAppDispatch } from "../redux";
// import { useDispatch } from "react-redux";
=======
import axios from "axios";
import React, { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Login from "@/app/action/loginAuthAction";
import Link from "next/link";
import toast from "react-hot-toast";
import img1 from "@/assets/Group-230.png";
>>>>>>> rakesh-bin
import { useAppDispatch } from "@/store";
import Image from "next/image";
import { BrowserProvider } from "ethers"; // Import BrowserProvider from ethers.js

const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const { address, isConnected } = useAccount();
  const [nonce, setNonce] = useState<number | undefined>(); // State for nonce
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (address) {
<<<<<<< HEAD
      const walletAddress = address.toLocaleLowerCase() || "" ;
=======
      const walletAddress = address.toLocaleLowerCase() || "";
>>>>>>> rakesh-bin
      sendAddress(walletAddress);
    }
  }, [address]);

  useEffect(() => {
    if (nonce) {
      signMessage();
    }
<<<<<<< HEAD
  }, [nonce]); 

  const sendAddress = async (walletAddress: string | "") => {
    try {
      const nami = await window.cardano.nami.enable();
      const addresses = await nami.getUsedAddresses();
      const message = "you are logging in to naturopura";
      const hexMessage = stringToHex(message); // Convert the message to hex

      const signature = await nami.signData(addresses[0], hexMessage);
      console.log("Wallet connected and data signed:", signature);
      console.log("error before ");
      dispatch(Login({ key: signature.key, signature: signature.signature }));
      console.log("error after ");
    } catch (error) {
      console.log("Error connecting to Nami wallet:", error);
      toast.error("Error connecting to Nami wallet!");
    }
  }
=======
  }, [nonce]);

  const sendAddress = async (walletAddress: string | "") => {
    try {
      console.log("sendAddress called");
      const response = await axios.post(
        "http://localhost:8000/auth/admin/login",
        { walletAddress }
      );
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
        // Dispatch the signature, nonce, and wallet address to the backend
        console.log("request sent");
        dispatch(
          Login({
            signature: signature,
            nonce: nonce,
            walletAddress: address?.toLocaleLowerCase() || "",
          })
        );
        console.log("response received");
      } catch (error) {
        console.error("Error signing message:", error);
        toast.error("Failed to sign the message.");
      }
    } else {
      toast.error("Please connect your wallet first.");
    }
  };
>>>>>>> rakesh-bin

  return (
    <div className="">
      <main className="main flex items-center flex-col">
<<<<<<< HEAD
        <Image
          src={img1}
          height={"100"}
          width={"200"}
          alt=""
          className="m-4"
        />
        {/* <label htmlFor="mySelect" className="text-red-700">
          Sign-up with Nami Wallet
        </label> */}
        {/* {isNamiInstalled ? (
          <button
            onClick={connectToNamiWallet}
            type="button"
            className="text-white bg-[#ACB631] hover:bg-[#ACB631]/90 focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mt-4"
          >
            Login with Nami Wallet
          </button>

        ) : (
          <p className="text-red-500">Nami Wallet is not installed.</p>
        )} */}

=======
        <Image src={img1} height={"100"} width={"200"} alt="" className="m-4" />
>>>>>>> rakesh-bin
        <button
          type="button"
          className="text-white bg-[#ACB631] focus:ring-4 focus:outline-none focus:ring-[#f3ff63]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mt-4"
        >
<<<<<<< HEAD
          <Link href={"/signup"}> <b>Signup</b> </Link>

=======
          <Link href={"/signup"}>
            {" "}
            <b>Signup</b>{" "}
          </Link>
>>>>>>> rakesh-bin
        </button>
        <div className="mt-2">
          <ConnectButton label="Sign in with wallet" />
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
