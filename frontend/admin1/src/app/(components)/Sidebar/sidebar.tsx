import Image from "next/image";
import Link from "next/link";
import React from "react";
import plus from "@/assets/plus.png";
import manage from "@/assets/manage.png";

const Sidebar = () => {
  return (
    <div className="h-[800px] w-[300px] bg-white text-black border-2 border-gray-300 flex flex-col p-4">
      <nav className="flex flex-col space-y-4">
        {/* Add Product Link with Icon */}
        <Link
          href="/farmer/newproduct"
          className="flex items-center space-x-2 px-4 py-2 text-2xl rounded-md cursor-pointer"
        >
          <Image
            width={200}
            height={200}
            src={plus}
            alt="plus icon"
            className="w-6 h-6"
          />
          <span>Add Product</span>
        </Link>

        {/* Divider */}
        <hr className="border-t w-[300px] border-black my-1 ml-[-17px]" />

        {/* Manage Product Link */}
        <Link
          href="/farmer/manageproduct"
          className="flex items-center space-x-2 px-4 py-2 text-2xl rounded-md cursor-pointer"
        >
          <Image
            width={200}
            height={200}
            src={manage}
            alt="plus icon"
            className="w-6 h-6"
          />
          <span>Manage Product</span>
        </Link>

        <hr className="border-t w-[300px] border-black my-1 ml-[-17px]" />

        <Link
          href="/farmer/consultation"
          className="flex items-center space-x-2 px-4 py-2 text-2xl rounded-md cursor-pointer"
        >
          <Image
            width={200}
            height={200}
            src={manage}
            alt="plus icon"
            className="w-6 h-6"
          />
          <span>Schedule Consultation</span>
        </Link>

        <hr className="border-t w-[300px] border-black my-1 ml-[-17px]" />

        <Link
          href="/farmer/news-blog"
          className="flex items-center space-x-2 px-4 py-2 text-2xl rounded-md cursor-pointer"
        >
          <Image
            width={200}
            height={200}
            src={manage}
            alt="plus icon"
            className="w-6 h-6"
          />
          <span>View news and blogs</span>
        </Link>

        <hr className="border-t w-[300px] border-black my-1 ml-[-17px]" />
      </nav>
    </div>
  );
};

export default Sidebar;
