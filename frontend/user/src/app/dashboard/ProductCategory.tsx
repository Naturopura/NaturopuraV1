import Image from "next/image";
import Link from "next/link";
import React from "react";
import img3 from "@/assets/milk.png";
import img1 from "@/assets/file (1).png";
import img2 from "@/assets/apple2.png";
import img4 from "@/assets/vege.png";
import img5 from "@/assets/u copy 1.png";
import img6 from "@/assets/insecticide.png";
import img7 from "@/assets/spade.png";
import img8 from "@/assets/groceries.png";
import img9 from "@/assets/chips.png";

const productCategories = [
  {
    title: "Fresh Juices",
    link: "/juices",
    image: img1,
  },
  {
    title: "Fresh Fruits",
    link: "/fruits",
    image: img2,
  },
  {
    title: "Fresh Milk",
    link: "/milks",
    image: img3,
  },
  {
    title: "Fresh Vegetables",
    link: "/vegetables",
    image: img4,
  },
  {
    title: "Farming Chemicals",
    link: "/farming-chemicals",
    image: img6,
  },
  {
    title: "Farming Equipments",
    link: "/farming-equipments",
    image: img7,
  },
  {
    title: "All Groceries",
    link: "/groceries",
    image: img8,
  },
  {
    title: "Chips & Snacks",
    link: "/chips-snacks",
    image: img9,
  },
];

const ProductCategory = () => {
  return (
    <div className="min-h-screen mt-[19rem] flex items-center justify-center">
      <div className="relative mt-[-39.38rem] shadow-xl mx-[1.1rem] overflow-hidden w-[112.5rem] p-10">
        {/* Background Image */}
        <Image
          width={300}
          height={300}
          alt="Background"
          src={img5}
          className="absolute inset-0 object-fill px-5 -mt-2.5 w-full h-full"
        />

        {/* Product Grid */}
        <div className="grid grid-cols-4 gap-x-10 gap-y-40 relative z-10">
          {productCategories.map(({ title, link, image }, index) => (
            <div key={index} className="flex ml-10 items-center">
              {/* Text Section */}
              <div className="p-4">
                <h2 className="text-xl -ml-16 font-bold text-gray-800">
                  {title}
                  <Link href={link}>
                    <button
                      className={`text-white ml-1.5 bg-[#ACB631] font-semibold rounded-lg text-md px-4 py-3 mt-4`}
                    >
                      Shop now
                    </button>
                  </Link>
                </h2>
              </div>

              {/* Image Section */}
              <div className="w-64 h-40 -ml-[4.6875rem] flex items-center justify-center">
                <Image alt={title} src={image} className={`object-cover`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
