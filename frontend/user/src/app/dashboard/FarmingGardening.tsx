import Image from "next/image";
import React from "react";
import farmingequipment from "@/assets/farmingequipment.png";
import mugs from "@/assets/mugs.png";
import leafy from "@/assets/leafy.png";
import leaf from "@/assets/leaf.png";

const FarmingGardening = () => {
  const images = [
    {
      src: farmingequipment,
      className: "-ml-72 mt-16",
      width: 1000,
      height: 1000,
    },
    {
      src: leafy,
      className: "absolute top-2 -right-14",
      width: 600,
      height: 600,
    },
    { src: leaf, className: "absolute -mt-[31.3rem]", width: 200, height: 200 },
    { src: mugs, className: "absolute ml-[18.8rem]", width: 400, height: 400 },
  ];

  return (
    <div className="w-full px-[31px] mt-5">
      <div className="relative h-[62.5rem] border-3 bg-gray-100 border-gray-200 shadow-xl flex items-center justify-center text-black font-semibold">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img.src}
            alt=""
            width={img.width}
            height={img.height}
            className={img.className}
          />
        ))}
        <div className="absolute text-[#98A02D] text-4xl -mt-[27.5rem]">
          Farming & Gardening
        </div>
        <div className="absolute text-2xl font-normal -mt-[21.25rem]">
          Illustrations
        </div>
        <button className="absolute bottom-12 left-[90%] transform -translate-x-1/2 bg-[#ACB631] text-white rounded-md px-2 py-2 text-xl font-semibold">
          Know more
        </button>
      </div>
    </div>
  );
};

export default FarmingGardening;
