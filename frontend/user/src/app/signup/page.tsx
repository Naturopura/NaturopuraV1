"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import SignUp from "@/app/action/signupAuthAction";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    walletName: "MetaMask", // Default to MetaMask
  });

  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Checking if MetaMask is selected
    if (formData.walletName !== "MetaMask") {
      alert("Please select MetaMask to proceed.");
      return;
    }

    try {
      // Connecting to MetaMask
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const walletAddress: string = accounts[0];

        // Requesting the signature from the user
        const message = `Please sign this message to confirm your identity for Naturopura. Wallet: ${walletAddress}`;
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, walletAddress],
        });

        const key = walletAddress; // Replace with actual key if different

        // Dispatching sign-up action
        dispatch(
          SignUp({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            walletAddress: walletAddress, // Ensure wallet address is string
            phone: formData.phone,
            // Adding the key field
          })
        );
      } else {
        alert("MetaMask is not installed. Please install it to proceed.");
      }
    } catch (error) {
      console.error(
        "Error connecting to MetaMask or signing the message:",
        error
      );
      alert("Failed to connect with MetaMask. Please try again.");
    }
  };

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window.ethereum === "undefined") {
      console.log("MetaMask is not installed. Please install it.");
    }
  }, []);

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Registration Form
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@flowbite.com"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2.5">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="wallet"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Wallet
            </label>
            <div className="relative mt-2.5">
              <div className="">
                <select
                  id="walletName"
                  name="walletName"
                  title="walletName"
                  required
                  value={formData.walletName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="MetaMask">MetaMask</option>
                  {/* Other wallets can be added here if necessary */}
                </select>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone
            </label>
            <div className="mt-2.5">
              <input
                id="phone"
                name="phone"
                title="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-10 block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default UserSignup;
