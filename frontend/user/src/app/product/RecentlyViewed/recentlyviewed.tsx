import Image from "next/image";
import React from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import coriander from "@/assets/61lC3tBxWwL._AC_UF1000,1000_QL80_.jpg";
import rice from "@/assets/image_processing20220225-11624-1qyve6q.png";
import dal from "@/assets/images (23).jpg";
import sooji from "@/assets/images (24).jpg";

const suggestions = [
  { id: 1, name: "Coriander Powder", price: "$349.00", image: coriander },
  { id: 2, name: "Rice", price: "$49.00", image: rice },
  { id: 3, name: "Dal", price: "$20.00", image: dal },
  { id: 4, name: "Sooji", price: "$39.90", image: sooji },
];

const RecentlyViewed = () => {
  return (
    <div className="mt-10 mx-6">
      <h2 className="text-xl font-bold text-gray-800">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {suggestions.map((item) => (
          <div key={item.id} className="flex flex-col">
            {/* Image Container */}
            <div className="p-4 border border-gray-300 rounded-2xl bg-gray-100 hover:shadow-md transition-shadow">
              <div className="relative w-52 h-52 rounded-lg flex items-center justify-center">
                {/* Heart Icon */}
                <button className="absolute bottom-48 left-64 text-xl">
                  <FiHeart />
                </button>
                {/* Centered Image */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={150}
                  height={150}
                  className="object-cover ml-14"
                />
              </div>
            </div>
            {/* Name and Price with Cart Icon */}
            <div className="mt-2 flex justify-between items-center pl-2 pr-2">
              <h3 className="text-xl font-medium text-gray-700">{item.name}</h3>
              <button className="text-xl bg-[#7FA200] rounded-xl text-white p-1.5 border">
                <FiShoppingCart />
              </button>
            </div>
            <div className="text-gray-800 font-bold text-lg pl-2">
              {item.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
