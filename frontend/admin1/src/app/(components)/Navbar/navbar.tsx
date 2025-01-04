"use client";

import Link from "next/link";
import Image from "next/image";
import Naturopura from "@/assets/logo 1.png";
import "@rainbow-me/rainbowkit/styles.css";
import React, { useEffect, useState } from "react";
import { FiShoppingCart, FiUser, FiBox, FiSettings } from "react-icons/fi";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

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

          <span className="absolute bottom-4 left-4 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            1
          </span>
        </Link>
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
              { name: "Orders", path: "/orders", icon: <FiBox /> },
              { name: "Settings", path: "/settings", icon: <FiSettings /> },
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
      </div>
    </header>
  );
};

export default Navbar;
