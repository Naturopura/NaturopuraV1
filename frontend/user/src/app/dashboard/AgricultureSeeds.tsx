import Image from "next/image";
import React from "react";
import crop from "@/assets/crop.png";
import leaf5 from "@/assets/leaf.png";
import seeds from "@/assets/seeds.png";
import seeds2 from "@/assets/seeds2.png";
import greeneryleaf from "@/assets/greenery-leaf.png";
import anothergreenleaf from "@/assets/anothergreenleaf.png";

const AgricultureSeeds = () => {
  return (
    <div>
      <div className="w-full px-7 mt-5">
        <div className="relative h-[1000px] bg-white border-[3px] shadow-xl border-gray-300 flex items-center justify-center text-black text-lg font-semibold">
          {/* Crop Image in the background */}
          <Image
            width={700}
            height={700}
            src={crop}
            alt=""
            className="w-full h-full object-cover"
          />

          <Image
            width={400}
            height={400}
            src={greeneryleaf}
            className="absolute mt-[-660px] w-[450px] ml-[-1400px]"
            alt=""
          />

          <Image
            width={500}
            height={500}
            src={seeds2}
            className="absolute mt-[-400px] w-[900px]"
            alt=""
          />
          <Image
            width={200}
            height={200}
            src={leaf5}
            className="absolute mt-[-820px]"
            alt=""
          />
          <div className="text-[#98A02D] text-6xl mt-[-750px] font-medium absolute">
            Agriculture
          </div>

          <Image
            width={400}
            height={400}
            src={anothergreenleaf}
            className="absolute mt-[-650px] w-[450px] h-[450px] ml-[1355px]"
            alt=""
          />

          {/* Adjusted Seeds Image positioned within the border */}
          <Image
            width={700}
            height={700}
            src={seeds}
            alt=""
            className="absolute bottom-[-2px] left-[18%] right-[10%] h-[65%] w-[65%] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AgricultureSeeds;
