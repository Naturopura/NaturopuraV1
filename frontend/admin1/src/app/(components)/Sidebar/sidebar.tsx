"use client";

import React, { useState } from "react";
import { PlusCircleIcon, Clipboard, Calendar, Newspaper } from "lucide-react";
import Link from "next/link";

interface SidebarItemProps {
  name: string;
  icon: React.ReactNode;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  icon,
  href,
  isActive,
  onClick,
}) => {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer mb-2 ${
          isActive ? "bg-gray-300 text-gray-900" : "hover:bg-gray-200"
        }`}
      >
        <div className={`text-gray-600 ${isActive ? "text-gray-800" : ""}`}>
          {icon}
        </div>
        <span
          className={`font-semibold text-xl text-gray-600 ${
            isActive ? "text-gray-900" : ""
          }`}
        >
          {name}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>("");

  const menuItems = [
    {
      name: "Add Product",
      icon: <PlusCircleIcon className="h-6 w-6" />,
      href: "/farmer/newproduct",
    },
    {
      name: "Manage Products",
      icon: <Clipboard className="h-6 w-6" />,
      href: "/farmer/manageproduct",
    },
    {
      name: "Schedule Consultation",
      icon: <Calendar className="h-6 w-6" />,
      href: "/farmer/consultation",
    },
    {
      name: "News & Blog",
      icon: <Newspaper className="h-6 w-6" />,
      href: "/farmer/news-blog",
    },
  ];

  return (
    <div className="w-64 min-h-screen mt-24 bg-gray-100 p-4">
      <nav>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.name}
            name={item.name}
            icon={item.icon}
            href={item.href}
            isActive={activeItem === item.name}
            onClick={() => setActiveItem(item.name)}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
