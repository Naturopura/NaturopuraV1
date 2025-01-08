import React from "react";
import mango from "@/assets/yellow-mango.png";
import poha from "@/assets/shuddh-desi-poha.jpg";
import sugar from "@/assets/71wjSz+A4JL.jpg";
import salt from "@/assets/61u9sWJM3sL._AC_UF1000,1000_QL80_.jpg";
import Image from "next/image";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const suggestions = [
  { id: 1, name: "Mango", price: "$349.00", image: mango },
  { id: 2, name: "Poha", price: "$49.00", image: poha },
  { id: 3, name: "Sugar", price: "$20.00", image: sugar },
  { id: 4, name: "Salt", price: "$39.90", image: salt },
];

const SimilarItems = () => {
  return (
    <div className="mx-6">
      <h2 className="text-xl font-bold text-gray-800">Similar Items</h2>
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
              <button className="text-xl p-1.5 border bg-[#7FA200] rounded-xl text-white">
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

export default SimilarItems;
