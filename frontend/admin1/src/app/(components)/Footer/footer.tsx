import Link from "next/link";
import React from "react";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-blue-900 to-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">ABOUT</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  About us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Naturopura Stories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Corporate information
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">HELP</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Payments
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Consumer Policy Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">CONSUMER POLICY</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Terms of use
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  EPR Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and Social Icons */}
        <div className="border-t border-gray-600 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 Naturopura.com</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-blue-400">
              <FaFacebook />
            </Link>
            <Link href="#" className="hover:text-blue-300">
              <FaTwitter />
            </Link>
            <Link href="#" className="hover:text-pink-400">
              <FaInstagram />
            </Link>
            <Link href="#" className="hover:text-blue-500">
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
