import Link from "next/link";
import React from "react";

const categories = [
  [
    { href: "/tea-coffee", label: "Tea & Coffee" },
    { href: "/hot-drinks", label: "Hot Drinks" },
    { href: "/fizzy-drinks", label: "Fizzy Drinks" },
    { href: "/water", label: "Water" },
  ],
  [
    { href: "/squash", label: "Squash" },
    { href: "/juices", label: "Juices" },
    { href: "/mixers", label: "Mixers" },
    { href: "/still-sparkling", label: "Still & Sparkling" },
  ],
  [
    { href: "/no-added-sugar", label: "No Added Sugar" },
    { href: "/still-sparkling", label: "Still & Sparkling" },
    { href: "/cordials", label: "Cordials" },
  ],
];

const ProductCategoryLists = () => (
  <div className="container ml-[16.25rem] -mt-[3.125rem]">
    <div className="flex justify-between w-full">
      {categories.map((column, colIndex) => (
        <div
          key={colIndex}
          className={`space-y-6 ${
            colIndex === 0
              ? "-ml-[14.375rem]"
              : colIndex === 1
              ? "ml-24"
              : "mr-56"
          }`}
        >
          {column.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-2xl leading-6 text-black font-bold block"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default ProductCategoryLists;
