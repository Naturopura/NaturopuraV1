"use client";

import React, { useEffect, useState } from "react";
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Login from "@/app/action/loginAuthAction";
import Link from "next/link";
import toast from "react-hot-toast";
import img1 from "@/assets/Group-230.png"
// import { useAppDispatch } from "../redux";
// import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/store";
import Image from "next/image";

// Helper function to convert string to hex
const stringToHex = (str: string) => {
  return Buffer.from(str, "utf8").toString("hex");
};

const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const [isNamiInstalled, setIsNamiInstalled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.cardano?.nami) {
      setIsNamiInstalled(true);
      console.log("new commit");
    }
  }, []);

  async function connectToNamiWallet() {
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
