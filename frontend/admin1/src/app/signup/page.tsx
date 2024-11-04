"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import SignUp from "@/app/action/signupAuthAction";
import { AiFillGoogleCircle, AiFillFacebook } from "react-icons/ai";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import { useRouter } from "next/navigation";

const AdminSignup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    dialingCode: "+91",
    addressLine: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    walletName: "MetaMask", // Default to MetaMask
  });

  const [role] = useState<Array<string>>([
    "admin",
    "consumer",
    "farmer",
    "distributors",
    "consultant",
    "agricultural_chemicals",
    "equipment_manufacturers",
    "marketing_agencies",
    "insurance",
    "cold-storage",
  ]);

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

        // Dispatching sign-up action
        await dispatch(
          SignUp({
            name: formData.name,
            email: formData.email,
            isRemember: true,
            isActive: true,
            walletAddress: walletAddress, // Ensure wallet address is string
            signature: signature, // Adding signature to the payload
            dialingCode: formData.dialingCode,
            addressLine: formData.addressLine,
            phone: formData.phone,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            zipCode: formData.zipCode,
            role: formData.role,
          })
        );

        // Redirecting if the role is "farmer"
        if (formData.role === "farmer") {
          router.push("/farmer");
        }
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl p-8">
        <div className="text-center mb-6">
          <Image
            width={200}
            height={200}
            src={Logo}
            alt="Naturopura Logo"
            className="mx-auto ml-[-550px] mt-[-110px]"
          />
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button className="text-4xl">
              <AiFillGoogleCircle />
            </button>
            <button className="text-4xl">
              <AiFillFacebook />
            </button>
          </div>
          <p className="mt-4 text-black">—— Or ——</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 text-xl border placeholder:text-xl rounded-md placeholder:text-black"
          />
          <input
            type="text"
            name="addressLine"
            placeholder="Address"
            value={formData.addressLine}
            onChange={handleChange}
            className="w-full px-4 py-2 text-xl placeholder:text-xl border rounded-md placeholder:text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 text-xl placeholder:text-xl border rounded-md placeholder:text-black"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 text-xl placeholder:text-xl border rounded-md placeholder:text-black"
          />

          <div className="relative mt-2.5">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <select
                id="dialingCode"
                title="dialingCode"
                name="dialingCode"
                onChange={handleChange}
                value={formData.dialingCode}
                className="h-full rounded-md text-xl border-0 bg-transparent py-0 pl-2 text-black"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
            </div>

            <input
              id="phone"
              name="phone"
              title="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-[77px] text-xl py-2 border rounded-md placeholder:text-black"
            />
          </div>

          <select
            name="wallet"
            value={formData.walletName}
            onChange={handleChange}
            className="w-full px-4 py-2 text-xl border rounded-md placeholder:text-black"
          >
            <option value="MetaMask">MetaMask</option>
          </select>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 text-xl placeholder:text-xl border rounded-md bg-white text-gray-900"
          >
            <option value="">Select Role</option>
            {role.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full text-xl px-4 py-2 placeholder:text-xl border rounded-md placeholder:text-black"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-4 text-xl py-2 placeholder:text-xl border rounded-md placeholder:text-black"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 text-xl placeholder:text-xl border rounded-md placeholder:text-black"
          />

          <button
            type="submit"
            className="col-span-2 w-full py-3 bg-[#ACB631] text-white font-semibold rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-2xl text-center text-black">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
