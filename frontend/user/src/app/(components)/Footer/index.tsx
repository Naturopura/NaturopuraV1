import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-lg font-bold">Naturopura</h1>
          </div>

          {/* Links */}
          <div className="mb-4 md:mb-0 flex space-x-6">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="contact" className="hover:text-gray-300">
              Contact
            </Link>
            <Link href="privacy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
          </div>

          {/* Copyright Section */}
          <div>
            <p className="text-sm">© 2024 Naturopura. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
