import Image from "next/image";
import React from "react";
import mango from "@/assets/mango.png";
import pineapple from "@/assets/pineapple.png";
import strawberry from "@/assets/strawberry.png";
import blackberry from "@/assets/blackberry.jpg";

const fruitData = [
  {
    season: "Summer",
    title: "Fresh Mango",
    description:
      "Conveniently innovate user-centric benefits architectures rapidiously builmortar testing manufacture distinctively.",
    image: mango,
  },
  {
    season: "Winter",
    title: "Fresh Pineapple",
    description:
      "Conveniently innovate user-centric benefits architectures rapidiously builmortar testing manufacture distinctively.",
    image: pineapple,
  },
  {
    season: "Autumn",
    title: "Fresh Strawberry",
    description:
      "Conveniently innovate user-centric benefits architectures rapidiously builmortar testing manufacture distinctively.",
    image: strawberry,
  },
  {
    season: "Spring",
    title: "Fresh Blackberry",
    description:
      "Conveniently innovate user-centric benefits architectures rapidiously builmortar testing manufacture distinctively.",
    image: blackberry,
  },
];

const SeasonalFruits = () => {
  return (
    <div className="px-6 py-16 -mt-[8.25rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {fruitData.map((fruit, index) => (
          <div
            key={index}
            className="border border-gray-300 bg-gray-50 p-4 flex flex-row items-center gap-6"
          >
            <Image
              width={300}
              height={300}
              src={fruit.image}
              className="object-cover rounded-md"
              alt={fruit.title}
            />
            <div>
              <div className="font-semibold text-2xl -ml-10 text-center">
                {fruit.season}
              </div>
              <div className="mt-3 ml-2 text-[#98A02D] text-3xl font-semibold">
                {fruit.title}
              </div>
              <div className="text-xl mt-4 font-semibold">
                {fruit.description}
              </div>
              <button className="bg-[#ACB631] font-medium text-white py-2 px-4 mt-7 text-xl rounded-xl">
                View Products &gt;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonalFruits;
