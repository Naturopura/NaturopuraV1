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
        <div className="relative h-[62.5rem] bg-white border-[3px] shadow-xl border-gray-300 flex items-center justify-center text-black text-lg font-semibold">
          {/* Crop Image in the background */}
          <Image
            width={1300}
            height={1300}
            src={crop}
            alt=""
            className="object-cover"
          />

          <Image
            width={500}
            height={500}
            src={greeneryleaf}
            className="absolute -mt-[41rem] -ml-[57.5rem]"
            alt=""
          />

          <Image
            width={800}
            height={800}
            src={seeds2}
            className="absolute -mt-[25rem]"
            alt=""
          />
          <Image
            width={200}
            height={200}
            src={leaf5}
            className="absolute -mt-[51.3rem]"
            alt=""
          />
          <div className="text-[#98A02D] text-6xl -mt-[47rem] font-medium absolute">
            Agriculture
          </div>

          <Image
            width={400}
            height={400}
            src={anothergreenleaf}
            className="absolute -mt-[37.5rem] ml-[58rem]"
            alt=""
          />

          {/* Adjusted Seeds Image positioned within the border */}
          <Image
            width={900}
            height={900}
            src={seeds}
            alt=""
            className="absolute bottom-[-2px] left-[15%] right-[10%] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AgricultureSeeds;
