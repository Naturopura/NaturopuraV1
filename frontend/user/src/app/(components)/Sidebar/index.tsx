"use client";

import Image from "next/image";
import React from "react";
import arrowup from "@/assets/arrow-up-01-512.jpg";

type SidebarProps = {
  title: string;
  items: (string | number)[];
};

const filters = {
  brand: ["Rita", "Paper Boat", "Tropicana"],
  ratings: [4, 3, 2, 1],
  type: ["Mango Juice", "Apple Juice", "Orange Juice"],
};

const Sidebar = () => {
  const CheckboxGroup = ({ title, items }: SidebarProps) => (
    <div className="mt-5">
      <h4 className="font-semibold text-xl">
        {title}
        <Image
          className="float-right mt-1"
          src={arrowup}
          alt=""
          width={20}
          height={20}
        />
      </h4>
      {Array.isArray(items) ? (
        items.map((item, index) => (
          <div key={index} className="flex items-center text-xl mb-2">
            <input type="checkbox" className="mr-3 w-5 h-5 cursor-pointer" />
            <label>
              {item} {title === "CUSTOMER RATINGS" && "★ & above"}
            </label>
          </div>
        ))
      ) : (
        <div className="text-red-500">Invalid items type</div>
      )}
    </div>
  );
  return (
    <div className="flex overflow-x-hidden min-h-screen">
      <div className="w-[20rem] p-6 border-r-2 border-black">
        <h3 className="font-semibold text-2xl mb-6">Filters</h3>
        <hr className="border-black -ml-6 mb-5 w-[200rem]" />

        <CheckboxGroup title="BRAND" items={filters.brand} />
        <hr className="border-black my-5 -ml-7 w-[20.2rem]" />

        <CheckboxGroup title="CUSTOMER RATINGS" items={filters.ratings} />
        <hr className="border-black my-5 -ml-7 w-[20.2rem]" />

        <CheckboxGroup title="TYPE" items={filters.type} />
      </div>
    </div>
  );
};

export default Sidebar;
