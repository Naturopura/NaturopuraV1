"use client";

import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import img1 from "@/assets/logo 1.png";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-100 border-b-2 border-gray-300 px-[250px] py-3 z-50 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/farmer"}>
          <Image
            src={img1}
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
